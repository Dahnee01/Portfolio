// ============================================================
// All portfolio content — typed interfaces + constants
// ============================================================

// ---------- Navigation ----------
export interface NavItem {
	label: string;
	href: string;
}

export const NAV_ITEMS: NavItem[] = [
	{ label: 'Home', href: '#hero' },
	{ label: 'About', href: '#about' },
	{ label: 'Experience', href: '#experience' },
	{ label: 'Projects', href: '#projects' },
	{ label: 'Skills', href: '#skills' },
	{ label: 'Contact', href: '#contact' },
];

// ---------- Hero ----------
export interface HeroData {
	headline: string[];
	subheadline: string;
	ctaPrimary: { label: string; href: string };
	ctaSecondary: { label: string; href: string };
	resumeUrl: string;
}

export const HERO: HeroData = {
	headline: ['Building', 'the', 'Future', 'of', 'Web', 'in', 'Milliseconds.'],
	subheadline:
		'Daniel Eghosa Erhunmwonsere — Front-End Engineer crafting performant, beautiful digital experiences.',
	ctaPrimary: { label: 'View Projects', href: '#projects' },
	ctaSecondary: { label: 'Get in Touch', href: '#contact' },
	resumeUrl: '/resume.pdf',
};

// ---------- About / Bento ----------
export interface TechItem {
	name: string;
	icon: string;
}

export interface Metric {
	label: string;
	value: number;
	suffix: string;
}

export interface BentoData {
	techStack: TechItem[];
	location: {
		city: string;
		coordinates: { lat: number; lng: number };
	};
	metrics: Metric[];
	currentlyBuilding: {
		project: string;
		description: string;
		isLive: boolean;
	};
}

export const BENTO: BentoData = {
	techStack: [
		{ name: 'React', icon: 'react' },
		{ name: 'Next.js', icon: 'nextjs' },
		{ name: 'TypeScript', icon: 'typescript' },
		{ name: 'Node.js', icon: 'nodejs' },
		{ name: 'Tailwind CSS', icon: 'tailwind' },
	],
	location: {
		city: 'Lagos, Nigeria',
		coordinates: { lat: 6.5244, lng: 3.3792 },
	},
	metrics: [
		{ label: 'Years Experience', value: 2, suffix: '+' },
		{ label: 'Projects Delivered', value: 3, suffix: '+' },
	],
	currentlyBuilding: {
		project: 'WB exchange',
		description:
			'Building and maintaining a high-traffic web-based exchange platform handling millions of transactions per quarter',
		isLive: true,
	},
};

// ---------- Experience ----------
export interface ExperienceItem {
	id: string;
	role: string;
	company: string;
	period: string;
	description: string;
	technologies: string[];
	type: 'fulltime' | 'contract' | 'remote';
}

export const EXPERIENCES: ExperienceItem[] = [
	{
		id: 'exp-1',
		role: 'Front End Developer',
		company: 'Darkel Microsystems Limited',
		period: 'Dec 2025 — Present',
		description:
			'Contributed to the development and maintenance of a high-traffic web-based exchange platform, implementing scalable filtering solutions and integrating backend APIs to support real-time trading data. Led frontend improvements and resolved critical bugs to enhance performance, reliability, and user experience.',
		technologies: ['nextjs', 'Node.js', 'TypeScript', 'Tailwind CSS', 'Redux'],
		type: 'contract',
	},
	{
		id: 'exp-2',
		role: 'Front End Developer',
		company: 'Cartinary Global',
		period: 'Aug 2024 — present',
		description:
			'Developed responsive React dashboards with CRUD functionality, integrated RESTful APIs and Redux for state management, implemented secure authentication and real-time features, and built interactive data visualizations while optimizing performance and usability across devices.',
		technologies: ['nextjs', 'Node.js', 'TypeScript', 'Tailwind CSS', 'Redux'],
		type: 'fulltime',
	},
];

// ---------- Projects ----------
export interface Project {
	id: string;
	title: string;
	description: string;
	longDescription: string;
	image: string;
	video?: string;
	technologies: string[];
	liveUrl?: string;
	githubUrl?: string;
	featured: boolean;
}

export const PROJECTS: Project[] = [
	{
		id: 'proj-1',
		title: 'Cartinary Global',
		description:
			'Ecommerce connects buyers and local sellers through a hybrid platform for product discovery, real-time communication, and optimized shopping logistics',
		longDescription:
			'Cartinary.com is a hybrid logistics and shopping  platform that helps buyers discover local sellers, plan optimized shopping routes, communicate in-app, and adjust plans in real time to save time and effort when buying items. It also allows sellers to list products, set prices, and connect with nearby buyers seamlessly.',
		image: '/Asset 6@4x (1) 2 (1).png',
		technologies: ['Next.js', 'TypeScript', 'Node.js', 'MUI', 'Redux'],
		liveUrl: 'https://cartinary.com/',
		featured: true,
	},
	{
		id: 'proj-2',
		title: 'WB Exchange',
		description: 'crypto exchange platform',
		longDescription:
			'WBExchange is a crypto exchange platform that buys popular cryptocurrencies like BTC, USDT, and ETH at competitive rates, offers loyalty rewards on trades, and provides a user dashboard to track rewards and activity.',
		image: '/logo.png',
		technologies: ['Next.js', 'TypeScript', 'Node.js', 'MUI', 'Redux'],
		liveUrl: 'https://wBexchange.com',
		featured: true,
	},
];

// ---------- Skills ----------
export interface SkillCategory {
	category: string;
	skills: { name: string; icon: string }[];
}

export const SKILLS: SkillCategory[] = [
	{
		category: 'Frontend',
		skills: [
			{ name: 'React', icon: 'react' },
			{ name: 'Next.js', icon: 'nextjs' },
			{ name: 'TypeScript', icon: 'typescript' },
			{ name: 'Tailwind CSS', icon: 'tailwind' },
			{ name: 'MUI', icon: 'mui' },
			{ name: 'Framer Motion', icon: 'framer' },
		],
	},
];

// ---------- Contact ----------
export interface SocialLink {
	platform: string;
	url: string;
	icon: string;
	brandColor: string;
}

export const SOCIALS: SocialLink[] = [
	{
		platform: 'GitHub',
		url: 'https://github.com/Dahnee01/',
		icon: 'Github',
		brandColor: '#f5f5f5',
	},
	{
		platform: 'LinkedIn',
		url: 'https://www.linkedin.com/in/daniel-erhunmwonsere/',
		icon: 'Linkedin',
		brandColor: '#0A66C2',
	},
	{
		platform: 'Email',
		url: 'mailto:erhunmwonseredaniel@gmail.com',
		icon: 'Mail',
		brandColor: '#10B981',
	},
];

// ---------- Site Metadata ----------
export const SITE = {
	name: 'Daniel Eghosa Erhunmwonsere',
	title: 'Daniel Eghosa Erhunmwonsere | Front-End Engineer',
	description:
		'Front-End Engineer building performant, beautiful digital experiences. Specializing in React, Next.js, and modern web technologies.',
	url: 'https://patrickiyiakimo.dev',
};
