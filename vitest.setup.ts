import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock framer-motion globally — use our manual mock implementation
import * as framerMock from './__mocks__/framer-motion';
vi.mock('framer-motion', () => framerMock as any);

// Mock window.matchMedia (not available in jsdom)
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: (query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: () => {},
		removeListener: () => {},
		addEventListener: () => {},
		removeEventListener: () => {},
		dispatchEvent: () => false,
	}),
});

// Mock IntersectionObserver (not available in jsdom)
class IntersectionObserverMock {
	observe = vi.fn();
	unobserve = vi.fn();
	disconnect = vi.fn();
	takeRecords = vi.fn(() => []);
}
Object.defineProperty(window, 'IntersectionObserver', {
	writable: true,
	value: IntersectionObserverMock,
});

// Mock Element.scrollIntoView (not available in jsdom)
Element.prototype.scrollIntoView = vi.fn();
