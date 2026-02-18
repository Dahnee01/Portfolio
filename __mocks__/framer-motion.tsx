import React, { forwardRef } from 'react';

// Minimal motion element factory that forwards refs and props to a native element
const elementFactory = (tag: string) =>
	forwardRef<any, any>((props, ref) => {
		const { children, ...rest } = props;
		return React.createElement(tag, { ref, ...rest }, children);
	});

const motion = new Proxy({} as Record<string, any>, {
	get: (_target, prop: string) => {
		// Return a forwardRef component for any motion.<tag> usage (div, span, etc.)
		return elementFactory(prop);
	},
});

function createMotionValue(initial = 0) {
	let value = initial;
	const listeners: Record<string, Array<(v: any) => void>> = {};

	return {
		set(v: any) {
			value = v;
			if (listeners.change) listeners.change.forEach((fn) => fn(value));
		},
		get() {
			return value;
		},
		on(event: string, cb: (v: any) => void) {
			listeners[event] = listeners[event] || [];
			listeners[event].push(cb);
			// Immediately call the callback with current value so tests see a value
			cb(value);
			return () => {
				listeners[event] = listeners[event].filter((f) => f !== cb);
			};
		},
	};
}

export function useInView() {
	return true;
}

export function useMotionValue(initial = 0) {
	return createMotionValue(initial);
}

export function useSpring(motionValue: any) {
	// return the same motion value for tests
	return motionValue;
}

export function useScroll() {
	return { scrollYProgress: createMotionValue(0) };
}

export function useTransform(
	_input: any,
	_inputRange: any[],
	outputRange: any[]
) {
	// Return a static mapped value suitable for tests (first output)
	return outputRange[0];
}

// AnimatePresence is a component that allows React children to animate out when removed
export const AnimatePresence = ({
	children,
}: {
	children?: React.ReactNode;
}) => <>{children}</>;

export { motion };

export default {
	motion,
	useInView,
	useMotionValue,
	useSpring,
	useScroll,
	useTransform,
	AnimatePresence,
};
