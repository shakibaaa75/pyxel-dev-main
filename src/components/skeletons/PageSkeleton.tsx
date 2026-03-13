const SkeletonBlock = ({ className }: { className: string }) => (
  <div className={`bg-gray-800 animate-pulse rounded ${className}`} />
);

export const HeroSkeleton = () => (
  <div className="bg-black pt-20 pb-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-[1400px] mx-auto">
      <SkeletonBlock className="h-8 w-3/4 max-w-2xl mb-6" />
      <SkeletonBlock className="h-4 w-full max-w-xl mb-4" />
      <SkeletonBlock className="h-4 w-2/3 max-w-lg mb-8" />
      <SkeletonBlock className="h-12 w-40 rounded-lg" />
    </div>
  </div>
);

export const ContentSkeleton = () => (
  <div className="bg-black py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-900 rounded-xl p-6 border border-gray-800"
          >
            <SkeletonBlock className="h-48 w-full mb-4 rounded-lg" />
            <SkeletonBlock className="h-6 w-3/4 mb-3" />
            <SkeletonBlock className="h-4 w-full mb-2" />
            <SkeletonBlock className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const TextSkeleton = () => (
  <div className="bg-black py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-[1400px] mx-auto max-w-3xl">
      <SkeletonBlock className="h-10 w-1/2 mb-8" />
      <SkeletonBlock className="h-4 w-full mb-4" />
      <SkeletonBlock className="h-4 w-full mb-4" />
      <SkeletonBlock className="h-4 w-5/6 mb-4" />
      <SkeletonBlock className="h-4 w-full mb-4" />
      <SkeletonBlock className="h-4 w-4/5 mb-8" />
      <SkeletonBlock className="h-64 w-full rounded-xl mb-8" />
      <SkeletonBlock className="h-4 w-full mb-4" />
      <SkeletonBlock className="h-4 w-full mb-4" />
      <SkeletonBlock className="h-4 w-3/4" />
    </div>
  </div>
);

// Default full page skeleton
const PageSkeleton = () => (
  <div className="min-h-screen bg-black">
    <HeroSkeleton />
    <ContentSkeleton />
  </div>
);

export default PageSkeleton;
