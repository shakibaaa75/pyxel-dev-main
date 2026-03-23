export interface PortfolioFeature {
  title: string;
  description: string;
}

export interface PortfolioFaq {
  question: string;
  answer: string;
}

export interface PortfolioItem {
  id: number;
  slug: string; // URL-friendly title e.g. "stellar-tech-solutions"
  title: string;
  description: string;
  image: string;
  secondImage: string;
  category: string;
  client: string;
  date: string;
  overview: string[];
  challengeIntro: string;
  challenges: string[];
  featuresIntro: string;
  features: PortfolioFeature[];
  faqs: PortfolioFaq[];
}

export const categories = [
  "All Projects",
  "Mobile App",
  "Web Design",
  "Branding",
  "UI/UX",
  "E-Commerce",
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    slug: "stellar-tech-solutions",
    title: "Stellar Tech Solutions",
    description:
      "We redesigned Stellar Tech's mobile app to enhance user experience and drive engagement.",
    image:
      "https://img.freepik.com/premium-photo/mobile-app-ui-design-dark-mode-black-interface-orange-accents_1222783-62120.jpg?w=800",
    secondImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
    category: "Mobile App",
    client: "Stellar Tech Solutions",
    date: "2024",
    overview: [
      "Stellar Tech Solutions required a complete mobile app redesign to better serve their growing user base. We focused on dark-mode aesthetics with vivid orange accents, building an interface that feels both modern and highly functional for daily business use.",
      "From onboarding flows to real-time dashboards, every screen was designed with user clarity in mind. The new app reduced support tickets by 40% and increased daily active users within the first month of launch.",
    ],
    challengeIntro:
      "Building a performant, visually striking mobile app that handled complex data flows while remaining accessible and delightful to use on all screen sizes.",
    challenges: [
      "Scalable architecture for growing user base",
      "Real-time data sync across devices",
      "Accessible dark-mode interface design",
      "Push notification and onboarding system",
    ],
    featuresIntro:
      "The app shipped with several award-winning features that set a new bar for mobile design in the tech services sector.",
    features: [
      {
        title: "Best Design Award",
        description:
          "Recognised by the Mobile UX Awards for outstanding interface design and user experience innovation.",
      },
      {
        title: "Dribbble Winner",
        description:
          "Featured as a Dribbble top shot, earning praise from the global design community for its visual quality.",
      },
    ],
    faqs: [
      {
        question: "What platform was the app built for?",
        answer:
          "The app was built for both iOS and Android using React Native, ensuring a consistent experience across all devices.",
      },
      {
        question: "How long did the project take?",
        answer:
          "The full redesign and development cycle took approximately 12 weeks from discovery to final launch.",
      },
      {
        question: "Was user testing conducted?",
        answer:
          "Yes, we ran three rounds of usability testing with real users, iterating on feedback at each stage before the final release.",
      },
      {
        question: "Can the design be extended to a web app?",
        answer:
          "Absolutely. The design system we built is platform-agnostic and can be extended to a web dashboard with minimal effort.",
      },
      {
        question: "Do you provide post-launch support?",
        answer:
          "We offer a 90-day post-launch support window covering bug fixes, minor enhancements, and performance monitoring.",
      },
    ],
  },
  {
    id: 2,
    slug: "green-wave-foods",
    title: "Green Wave Foods",
    description:
      "We built a user-friendly shopping platform for Green Wave Foods with seamless checkout.",
    image:
      "https://cdn.dribbble.com/userupload/45840875/file/00faab2fd3f9d11acb8f902f24ec0d46.png?resize=800x",
    secondImage:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",
    category: "Web Design",
    client: "Green Wave Foods",
    date: "2024",
    overview: [
      "Green Wave Foods needed a fresh e-commerce experience that matched their commitment to clean, sustainable food. We designed and built a modern web platform focused on effortless product discovery, transparent ingredient sourcing, and a checkout flow that converts.",
      "The platform features a custom CMS for the Green Wave team to manage inventory, promotions, and blog content without developer involvement. Since launch, cart abandonment has dropped and average order value has increased by 28%.",
    ],
    challengeIntro:
      "Balancing a visually rich, food-forward design with fast load times and a frictionless checkout was the core design and engineering challenge.",
    challenges: [
      "High-fidelity product photography integration",
      "One-page seamless checkout flow",
      "Mobile-first responsive layout",
      "Custom CMS for non-technical editors",
    ],
    featuresIntro:
      "The platform delivered measurable results — a faster checkout, richer product pages, and a content system the team actually loves using.",
    features: [
      {
        title: "Best E-Commerce Design",
        description:
          "Awarded best e-commerce UX at the 2024 Digital Commerce Summit for conversion-focused design.",
      },
      {
        title: "Dribbble Winner",
        description:
          "The product listing pages were featured on Dribbble as a top example of clean, conversion-focused web design.",
      },
    ],
    faqs: [
      {
        question: "What e-commerce platform was used?",
        answer:
          "We built on a headless Shopify architecture with a custom React frontend for full design flexibility.",
      },
      {
        question: "Is the site optimised for mobile?",
        answer:
          "Yes, the site was designed mobile-first and tested across all major devices and browsers.",
      },
      {
        question: "Can the client update products themselves?",
        answer:
          "Yes, the Shopify CMS allows the Green Wave team to add, edit, and remove products, collections, and blog posts without any coding.",
      },
      {
        question: "How was the checkout improved?",
        answer:
          "We reduced the checkout from 4 steps to a single scrollable page, with saved addresses and express payment options built in.",
      },
      {
        question: "What results were achieved after launch?",
        answer:
          "Within 60 days of launch, cart abandonment dropped by 22% and average order value increased by 28% compared to the previous platform.",
      },
    ],
  },
  {
    id: 3,
    slug: "horizon-real-estate",
    title: "Horizon Real Estate",
    description:
      "We helped Horizon Real Estate establish a trusted brand identity across all platforms.",
    image:
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs/1d5e3b174890851.64aa8bf1d92be.jpg",
    secondImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
    category: "Branding",
    client: "Horizon Real Estate",
    date: "2024",
    overview: [
      "Horizon Real Estate came to us with a fragmented brand presence — inconsistent logo usage, mismatched color palettes, and no clear visual identity. We built a complete brand system from the ground up, designed to convey trust, sophistication, and ambition.",
      "The rebrand spans logo design, typography system, color palette, business cards, signage, and digital assets. Every touchpoint now communicates a single coherent message: Horizon is the partner you trust with your most important investment.",
    ],
    challengeIntro:
      "Creating a brand that stands out in a conservative industry while still building immediate trust and credibility with high-net-worth buyers.",
    challenges: [
      "Balancing boldness with credibility",
      "Consistent application across print and digital",
      "Photography art direction and style guide",
      "Rollout across 12 regional offices",
    ],
    featuresIntro:
      "The new identity has been praised by both the Horizon team and their clients, and has since won recognition in the property sector.",
    features: [
      {
        title: "Brand Identity Award",
        description:
          "Recognised at the Property Marketing Awards for outstanding brand identity design in the real estate sector.",
      },
      {
        title: "Dribbble Winner",
        description:
          "The brand system was featured on Dribbble as a top pick for real estate branding excellence.",
      },
    ],
    faqs: [
      {
        question: "What did the branding project include?",
        answer:
          "The project covered logo design, color palette, typography, business cards, signage templates, email signatures, and a full brand guidelines document.",
      },
      {
        question: "How long did the branding process take?",
        answer:
          "The project ran over 8 weeks, including discovery, concept exploration, refinement, and final delivery.",
      },
      {
        question: "Was the old brand completely replaced?",
        answer:
          "Yes, the previous identity was retired entirely. We conducted a phased rollout to transition all offices and digital channels simultaneously.",
      },
      {
        question: "Do you provide brand guidelines?",
        answer:
          "Yes, every branding project includes a comprehensive brand guidelines PDF covering usage rules for all assets across digital and print.",
      },
      {
        question: "Can the brand be applied to digital ads?",
        answer:
          "Absolutely. We also delivered a set of social media templates and digital ad templates as part of the final deliverables.",
      },
    ],
  },
  {
    id: 4,
    slug: "creative-edge-agency",
    title: "Creative Edge Agency",
    description:
      "We redesigned Creative Edge's mobile app to boost engagement and streamline workflows.",
    image:
      "https://img.freepik.com/premium-photo/mobile-app-design-colorful-shopping-interface_1222783-18765.jpg?w=800",
    secondImage:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&q=80",
    category: "Mobile App",
    client: "Creative Edge Agency",
    date: "2024",
    overview: [
      "Creative Edge Agency needed a mobile app that reflected their bold, creative identity while offering practical project management features for their team. We designed a vibrant, colorful interface that balances playfulness with professional utility.",
      "The app brought together task management, client communication, and asset sharing in one cohesive experience. Team adoption was near-instant, with 95% of staff using it daily within the first two weeks.",
    ],
    challengeIntro:
      "Designing a tool that felt creative and on-brand without sacrificing the clarity and speed required for day-to-day agency work.",
    challenges: [
      "Merging creativity with functional UI patterns",
      "Real-time collaboration features",
      "File and asset management system",
      "Cross-platform iOS and Android parity",
    ],
    featuresIntro:
      "The app's standout features made it both a productivity tool and a showcase of what great mobile design can look like.",
    features: [
      {
        title: "Best Mobile App Design",
        description:
          "Awarded best mobile app design at the Creative Tools Summit for its innovative blend of aesthetics and usability.",
      },
      {
        title: "Dribbble Winner",
        description:
          "Featured as a Dribbble top shot for its distinctive colorful interface and intuitive user flows.",
      },
    ],
    faqs: [
      {
        question: "What features does the app include?",
        answer:
          "The app includes task management, client messaging, file sharing, time tracking, and a project timeline view.",
      },
      {
        question: "Is the app available offline?",
        answer:
          "Core features like task viewing and note-taking work offline, with automatic sync when connectivity is restored.",
      },
      {
        question: "How many users can the app support?",
        answer:
          "The architecture supports unlimited users. The current deployment handles over 200 concurrent users without performance issues.",
      },
      {
        question: "Can clients access the app?",
        answer:
          "Yes, there is a limited-access client portal mode that allows clients to view project updates and approve deliverables.",
      },
      {
        question: "What was the biggest design challenge?",
        answer:
          "Making the colorful, expressive interface feel professional enough for client-facing use without toning down the brand personality.",
      },
    ],
  },
  {
    id: 5,
    slug: "dynamic-brand-studio",
    title: "Dynamic Brand Studio",
    description:
      "We crafted a complete UI/UX overhaul for Dynamic Brand Studio's client portal.",
    image:
      "https://img.freepik.com/premium-photo/mobile-phone-with-app-screen-mockup_1222783-26491.jpg?w=800",
    secondImage:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
    category: "UI/UX",
    client: "Dynamic Brand Studio",
    date: "2024",
    overview: [
      "Dynamic Brand Studio's existing client portal was outdated and causing friction for both the team and their clients. We conducted a full UX audit before redesigning the product from the ground up with a focus on clarity, speed, and delight.",
      "The new portal reduced the average time to complete a client review cycle from 3 days to under 6 hours. Clients reported feeling more confident and informed throughout the process.",
    ],
    challengeIntro:
      "Untangling a complex approval workflow and making it feel simple and intuitive for both agency staff and non-technical clients.",
    challenges: [
      "Simplifying multi-step approval workflows",
      "Designing for both technical and non-technical users",
      "Integrating with existing project management tools",
      "Reducing time-to-approval across all project types",
    ],
    featuresIntro:
      "The redesigned portal introduced several features that immediately transformed how the studio collaborates with clients.",
    features: [
      {
        title: "UX Excellence Award",
        description:
          "Recognised for outstanding UX design in a B2B SaaS product at the 2024 Design Leaders Forum.",
      },
      {
        title: "Dribbble Winner",
        description:
          "The portal's clean dashboard UI was featured on Dribbble as a top reference for B2B product design.",
      },
    ],
    faqs: [
      {
        question: "What tools were used in the UX process?",
        answer:
          "We used Figma for design, Maze for usability testing, and Notion for documentation and handoff.",
      },
      {
        question: "Were real users involved in the design process?",
        answer:
          "Yes, we interviewed 12 existing clients and 6 internal team members before starting any design work.",
      },
      {
        question: "How was the redesign rolled out?",
        answer:
          "We ran a phased rollout — 20% of users first, then 60%, then full release — monitoring feedback at each stage.",
      },
      {
        question: "Did the redesign improve client satisfaction?",
        answer:
          "Client satisfaction scores improved from 6.2 to 8.9 out of 10 within three months of the new portal launching.",
      },
      {
        question: "Is the portal mobile-friendly?",
        answer:
          "Yes, the portal is fully responsive and was designed with mobile clients in mind from the very first wireframe.",
      },
    ],
  },
  {
    id: 6,
    slug: "elegant-design-hub",
    title: "Elegant Design Hub",
    description:
      "We built a sleek web platform for Elegant Design Hub to showcase their portfolio and attract clients.",
    image:
      "https://img.freepik.com/premium-photo/dark-dashboard-ui-design-with-colorful-charts_1222783-36112.jpg?w=800",
    secondImage:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80",
    category: "Web Design",
    client: "Elegant Design Hub",
    date: "2024",
    overview: [
      "Elegant Design Hub needed a website that was itself a demonstration of their craft. We designed a refined, dark-themed platform with smooth animations and an editorial layout that puts their work at the center.",
      "The site features a dynamic case study system, a contact flow that pre-qualifies leads, and a blog built for SEO. Within 90 days of launch, inbound enquiries increased by 65% and average session duration doubled.",
    ],
    challengeIntro:
      "Designing a website for a design studio means every pixel is scrutinised. The bar for quality was exceptionally high, with no room for anything generic.",
    challenges: [
      "Achieving a premium feel without overcomplicating navigation",
      "Smooth animation performance across all devices",
      "SEO-optimised blog and case study architecture",
      "Lead qualification integrated into the contact flow",
    ],
    featuresIntro:
      "The site became one of our most praised deliverables, earning recognition from both the client and the wider design community.",
    features: [
      {
        title: "Best Web Design Award",
        description:
          "Won best agency website design at the 2024 Awwwards regional ceremony for its refined dark aesthetic.",
      },
      {
        title: "Dribbble Winner",
        description:
          "The homepage hero animation was shared widely on Dribbble and cited as a reference for high-end agency web design.",
      },
    ],
    faqs: [
      {
        question: "What CMS powers the blog and case studies?",
        answer:
          "The site is built on Next.js with Sanity as the headless CMS, giving the team full control over content without touching code.",
      },
      {
        question: "How were the animations built?",
        answer:
          "All animations were built with Framer Motion and GSAP, optimised for 60fps performance even on lower-end devices.",
      },
      {
        question: "Is the site optimised for search engines?",
        answer:
          "Yes, every page includes structured metadata, open graph tags, and the blog uses a topic cluster strategy for SEO.",
      },
      {
        question: "Can the client add new case studies themselves?",
        answer:
          "Yes, the Sanity CMS includes a custom case study editor with all required fields, image upload, and live preview.",
      },
      {
        question: "What results did the new site produce?",
        answer:
          "Inbound enquiries grew by 65% in the first 90 days, and the average session duration increased from 1m 12s to 2m 48s.",
      },
    ],
  },
  {
    id: 7,
    slug: "unique-concept-agency",
    title: "Unique Concept Agency",
    description:
      "We redesigned Unique Concept's app to create a more immersive and intuitive user experience.",
    image:
      "https://img.freepik.com/premium-photo/minimal-dark-app-ui-design-with-maps_1222783-25601.jpg?w=800",
    secondImage:
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?w=1200&q=80",
    category: "Mobile App",
    client: "Unique Concept Agency",
    date: "2023",
    overview: [
      "Unique Concept Agency approached us to redesign their location-based mobile app, which had strong functionality but poor usability. We stripped back the interface to its essentials and rebuilt the experience around clarity and spatial awareness.",
      "The new design integrates a minimal dark UI with a full-screen map experience, gesture-based navigation, and contextual overlays that deliver the right information at the right time without cluttering the screen.",
    ],
    challengeIntro:
      "Simplifying a feature-rich location app without removing functionality — making it feel effortless while keeping all the power users needed.",
    challenges: [
      "Reducing visual noise on a map-heavy interface",
      "Gesture navigation system design",
      "Offline map caching for low-connectivity areas",
      "Contextual information delivery without clutter",
    ],
    featuresIntro:
      "The redesign earned strong praise from users who described the new experience as the clearest and most intuitive location app they had used.",
    features: [
      {
        title: "Best Navigation UX",
        description:
          "Awarded best navigation UX at the 2023 Mobile Innovation Awards for its minimal, gesture-driven map interface.",
      },
      {
        title: "Dribbble Winner",
        description:
          "The minimal dark map UI was featured as a top Dribbble shot and used as a design reference across the community.",
      },
    ],
    faqs: [
      {
        question: "What mapping SDK was used?",
        answer:
          "The app uses Mapbox GL for rendering, chosen for its flexibility in custom styling and offline tile support.",
      },
      {
        question: "Does the app work offline?",
        answer:
          "Yes, users can download map regions for offline use. Cached data updates automatically when connectivity is available.",
      },
      {
        question: "How was the gesture system designed?",
        answer:
          "We prototyped 6 gesture interaction models and tested them with 20 users before selecting the final system used in production.",
      },
      {
        question: "Was the existing user base involved in the redesign?",
        answer:
          "Yes, we ran a survey with 300 existing users and conducted 10 in-depth interviews to understand pain points before designing anything.",
      },
      {
        question: "What platforms is the app available on?",
        answer:
          "The app is available on iOS and Android. Both versions are built from a shared React Native codebase.",
      },
    ],
  },
  {
    id: 8,
    slug: "brilliant-brand-builders",
    title: "Brilliant Brand Builders",
    description:
      "We built a high-converting e-commerce platform for Brilliant Brand Builders focused on mobile shopping.",
    image:
      "https://img.freepik.com/premium-photo/mobile-ecommerce-app-ui-design-colorful_1222783-19021.jpg?w=800",
    secondImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
    category: "E-Commerce",
    client: "Brilliant Brand Builders",
    date: "2023",
    overview: [
      "Brilliant Brand Builders needed an e-commerce app that could handle a high volume of SKUs while delivering a shopping experience that felt personal and curated. We designed a colorful, category-driven interface built for impulse discovery and repeat purchases.",
      "The app features smart product recommendations, a one-tap reorder system, and a loyalty rewards dashboard. Within the first quarter post-launch, repeat purchase rate grew by 34% and the app store rating climbed to 4.8 stars.",
    ],
    challengeIntro:
      "Building an app that makes browsing hundreds of products feel enjoyable rather than overwhelming, while driving conversions on mobile.",
    challenges: [
      "Intuitive navigation for large product catalogs",
      "Personalised recommendation engine integration",
      "One-tap checkout and saved payment methods",
      "Loyalty program UI and rewards tracking",
    ],
    featuresIntro:
      "The app's commercial results spoke for themselves — higher retention, better reviews, and a checkout experience users actually enjoy.",
    features: [
      {
        title: "Best Commerce App",
        description:
          "Recognised as best commerce app at the 2023 Retail Innovation Awards for its conversion-focused mobile design.",
      },
      {
        title: "Dribbble Winner",
        description:
          "The product listing and cart UI were featured on Dribbble as standout examples of colorful, high-energy e-commerce design.",
      },
    ],
    faqs: [
      {
        question: "What commerce platform powers the backend?",
        answer:
          "The app connects to a Shopify backend via the Storefront API, with a custom React Native frontend for full design control.",
      },
      {
        question: "How does the recommendation engine work?",
        answer:
          "We integrated a third-party ML recommendation engine that surfaces products based on browsing history, purchase patterns, and trending items.",
      },
      {
        question: "Is Apple Pay and Google Pay supported?",
        answer:
          "Yes, both are supported natively through the Shopify Payments integration, enabling one-tap checkout for eligible users.",
      },
      {
        question: "How is the loyalty programme managed?",
        answer:
          "Points are tracked server-side and displayed in real time within the app. The client manages reward tiers through a simple admin panel.",
      },
      {
        question: "What were the post-launch metrics?",
        answer:
          "Repeat purchase rate grew 34%, average order value increased by 19%, and the app achieved a 4.8-star rating on both stores.",
      },
    ],
  },
  {
    id: 9,
    slug: "pixel-perfect-agency",
    title: "Pixel Perfect Agency",
    description:
      "We developed a comprehensive brand identity for Pixel Perfect Agency across all digital and print platforms.",
    image:
      "https://img.freepik.com/premium-photo/mobile-app-screens-dark-ui-design-mockup_1222783-25347.jpg?w=800",
    secondImage:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&q=80",
    category: "Branding",
    client: "Pixel Perfect Agency",
    date: "2023",
    overview: [
      "Pixel Perfect Agency had built a strong reputation for quality work but lacked a brand that communicated that quality at first glance. We created a sophisticated identity system built around precision, craft, and technical excellence.",
      "The identity spans a custom wordmark, icon system, motion guidelines, and a complete set of digital and print assets. The agency reports that the rebrand has directly contributed to winning three major new client pitches since launch.",
    ],
    challengeIntro:
      "Designing a brand for a design agency is uniquely challenging — the identity has to impress other designers while also resonating with business decision-makers.",
    challenges: [
      "Impressing a design-literate audience",
      "Crafting a wordmark that scales from favicon to billboard",
      "Defining motion and animation brand guidelines",
      "Delivering assets for 20+ use cases across digital and print",
    ],
    featuresIntro:
      "The resulting brand system is one of our most complete deliverables — every detail considered, every asset production-ready.",
    features: [
      {
        title: "Best Brand Identity",
        description:
          "Awarded best brand identity for a creative agency at the 2023 Brand Impact Awards.",
      },
      {
        title: "Dribbble Winner",
        description:
          "The logo reveal animation and brand guidelines spread were both featured as top Dribbble picks in the same week.",
      },
    ],
    faqs: [
      {
        question: "What was included in the brand package?",
        answer:
          "The package included a custom wordmark, icon, full color system, typography guidelines, business cards, letterhead, email signature, social media kit, and a 60-page brand guidelines PDF.",
      },
      {
        question: "Were motion guidelines included?",
        answer:
          "Yes, we produced a motion guidelines document covering logo animation, transition styles, and recommended easing values for use across digital products.",
      },
      {
        question: "How many logo concepts were presented?",
        answer:
          "We presented three distinct directions at the initial concept stage, then refined the chosen direction through two rounds of revisions.",
      },
      {
        question: "Can the brand assets be used by third-party vendors?",
        answer:
          "Yes, the brand guidelines document includes clear instructions for third-party usage, with approved and prohibited use cases fully documented.",
      },
      {
        question: "Has the rebrand impacted business results?",
        answer:
          "The agency attributes three major client wins directly to the improved brand presence since the rebrand launched in late 2023.",
      },
    ],
  },
];