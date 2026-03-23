// components/Breadcrumb.tsx
import { Link, useLocation } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  path: string;
  isLast?: boolean;
}

interface BreadcrumbProps {
  customItems?: BreadcrumbItem[];
  homeLabel?: string;
  separator?: React.ReactNode;
}

export default function Breadcrumb({
  customItems,
  homeLabel = "Home",
  separator = "/",
}: BreadcrumbProps) {
  const location = useLocation();

  // Generate breadcrumb items from the current path
  const generateItemsFromPath = (): BreadcrumbItem[] => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    const items: BreadcrumbItem[] = [];

    // Add Home
    items.push({
      label: homeLabel,
      path: "/",
      isLast: pathnames.length === 0,
    });

    // Build path progressively
    let accumulatedPath = "";
    pathnames.forEach((name, index) => {
      accumulatedPath += `/${name}`;
      const isLast = index === pathnames.length - 1;

      // Format the label (capitalize and replace hyphens)
      let label = name.replace(/-/g, " ");
      label = label.charAt(0).toUpperCase() + label.slice(1);

      items.push({
        label,
        path: accumulatedPath,
        isLast,
      });
    });

    return items;
  };

  const items = customItems || generateItemsFromPath();

  return (
    <nav className="flex items-center flex-wrap" aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-1">
        {items.map((item, index) => (
          <li key={item.path + index} className="flex items-center">
            {index > 0 && (
              <span className="text-gray-500 mx-1 text-sm">{separator}</span>
            )}
            {item.isLast ? (
              <span className="text-[#2979FF] text-sm font-medium">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="text-gray-400 hover:text-[#2979FF] text-sm transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
