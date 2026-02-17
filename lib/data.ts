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
		{ label: 'Lighthouse Score', value: 98, suffix: '%' },
		{ label: 'Years Experience', value: 2, suffix: '+' },
		{ label: 'Projects Delivered', value: 5, suffix: '+' },
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
		title: 'Rewindly',
		description: 'AI-powered video highlight generator for content creators',
		longDescription:
			'A smart video editing platform that uses AI to automatically detect key moments, generate highlight reels, and optimize content for social media platforms.',
		image: '/projects/rewindly.jpg',
		technologies: ['Next.js', 'TypeScript', 'Python', 'FFmpeg', 'OpenAI'],
		liveUrl: 'https://rewindly.app',
		githubUrl: 'https://github.com',
		featured: true,
	},
	{
		id: 'proj-2',
		title: 'Kingz World',
		description: 'Immersive gaming community platform with real-time features',
		longDescription:
			'A feature-rich community platform for gamers with live chat, tournament brackets, leaderboards, and integrated streaming support.',
		image: '/projects/kingzworld.jpg',
		technologies: ['React', 'Node.js', 'Socket.io', 'PostgreSQL', 'Redis'],
		liveUrl: 'https://kingzworld.com',
		githubUrl: 'https://github.com',
		featured: true,
	},
	{
		id: 'proj-3',
		title: 'CloudSync Dashboard',
		description: 'Real-time infrastructure monitoring with predictive alerts',
		longDescription:
			'A comprehensive cloud infrastructure dashboard featuring real-time metrics, predictive alerting powered by ML models, and automated incident response workflows.',
		image: '/projects/cloudsync.jpg',
		technologies: ['Next.js', 'D3.js', 'Python', 'AWS', 'Docker'],
		liveUrl: 'https://example.com',
		githubUrl: 'https://github.com',
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
			{ name: 'Framer Motion', icon: 'framer' },
			{ name: 'Vue.js', icon: 'vue' },
		],
	},
	{
		category: 'Backend',
		skills: [
			{ name: 'Node.js', icon: 'nodejs' },
			{ name: 'Python', icon: 'python' },
			{ name: 'PostgreSQL', icon: 'postgresql' },
			{ name: 'MongoDB', icon: 'mongodb' },
			{ name: 'GraphQL', icon: 'graphql' },
			{ name: 'Redis', icon: 'redis' },
		],
	},
	{
		category: 'DevOps',
		skills: [
			{ name: 'Docker', icon: 'docker' },
			{ name: 'AWS', icon: 'aws' },
			{ name: 'CI/CD', icon: 'cicd' },
			{ name: 'Kubernetes', icon: 'kubernetes' },
			{ name: 'Terraform', icon: 'terraform' },
			{ name: 'GitHub Actions', icon: 'github' },
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
		url: 'https://github.com',
		icon: 'Github',
		brandColor: '#f5f5f5',
	},
	{
		platform: 'LinkedIn',
		url: 'https://linkedin.com',
		icon: 'Linkedin',
		brandColor: '#0A66C2',
	},
	{
		platform: 'Twitter',
		url: 'https://twitter.com',
		icon: 'Twitter',
		brandColor: '#1DA1F2',
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
