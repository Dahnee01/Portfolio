import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithTheme } from '@/lib/test-utils';
import { About } from './About';
import { BENTO } from '@/lib/data';

describe('About', () => {
	it("renders with section id='about'", () => {
		const { container } = renderWithTheme(<About />);
		expect(container.querySelector('#about')).toBeInTheDocument();
	});

	it('renders section heading', () => {
		renderWithTheme(<About />);
		expect(screen.getByText('About Me', { exact: false })).toBeInTheDocument();
	});

	it('renders tech stack items', () => {
		renderWithTheme(<About />);
		for (const tech of BENTO.techStack.slice(0, 3)) {
			const items = screen.getAllByText(tech.name);
			expect(items.length).toBeGreaterThanOrEqual(1);
		}
	});

	it('renders location city', () => {
		renderWithTheme(<About />);
		expect(screen.getByText(BENTO.location.city)).toBeInTheDocument();
	});

	it('renders currently building project name', () => {
		renderWithTheme(<About />);
		expect(
			screen.getByText(BENTO.currentlyBuilding.project)
		).toBeInTheDocument();
	});

	it('renders metrics labels', () => {
		renderWithTheme(<About />);
		for (const metric of BENTO.metrics) {
			expect(screen.getByText(metric.label)).toBeInTheDocument();
		}
	});
});
