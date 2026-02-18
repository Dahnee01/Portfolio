import React from 'react';
import { vi } from 'vitest';

const NON_DOM_PROPS = new Set([
	'variants',
	'initial',
	'animate',
	'exit',
	'transition',
	'whileInView',
	'whileHover',
	'whileTap',
	'viewport',
	'custom',
	'layoutId',
	'onViewportEnter',
	'layout',
	'layoutDependency',
	'layoutScroll',
]);

function filterProps(props: Record<string, unknown>) {
	const filtered: Record<string, unknown> = {};
	for (const key in props) {
		if (NON_DOM_PROPS.has(key)) continue;
		// Filter motion values (objects) out of the style prop to avoid React warnings
		if (
			key === 'style' &&
			typeof props[key] === 'object' &&
			props[key] !== null
		) {
			const style: Record<string, unknown> = {};
			for (const [k, v] of Object.entries(
				props[key] as Record<string, unknown>
			)) {
				if (typeof v !== 'object' || v === null) {
					style[k] = v;
				}
			}
			filtered[key] = style;
		} else {
			filtered[key] = props[key];
		}
	}
	return filtered;
}

function createMotionComponent(Tag: string) {
	const Component = React.forwardRef<
		HTMLElement,
		React.PropsWithChildren<Record<string, unknown>>
	>(
		(
			{ children, ...props }: React.PropsWithChildren<Record<string, unknown>>,
			ref
		) => React.createElement(Tag, { ...filterProps(props), ref }, children)
	);
	Component.displayName = `motion.${Tag}`;
	return Component;
}

export const motion = {
	div: createMotionComponent('div'),
	nav: createMotionComponent('nav'),
	span: createMotionComponent('span'),
	p: createMotionComponent('p'),
	footer: createMotionComponent('footer'),
	form: createMotionComponent('form'),
	a: createMotionComponent('a'),
};

export function AnimatePresence({ children }: { children: React.ReactNode }) {
	return React.createElement(React.Fragment, null, children);
}

function createMotionValue() {
	return {
		set: vi.fn(),
		get: vi.fn(() => 0),
		on: vi.fn(() => vi.fn()),
	};
}

export const useMotionValue = vi.fn(() => createMotionValue());
export const useSpring = vi.fn(() => createMotionValue());
export const useScroll = vi.fn(() => ({
	scrollX: createMotionValue(),
	scrollY: createMotionValue(),
	scrollXProgress: createMotionValue(),
	scrollYProgress: createMotionValue(),
}));
export const useTransform = vi.fn(() => createMotionValue());
export const useInView = vi.fn(() => false);
