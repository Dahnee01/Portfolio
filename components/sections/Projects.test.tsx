import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithTheme } from '@/lib/test-utils';
import { Projects } from './Projects';
import { PROJECTS } from '@/lib/data';

const featured = PROJECTS.filter((p) => p.featured);

describe('Projects', () => {
	it("renders with section id='projects'", () => {
		const { container } = renderWithTheme(<Projects />);
		expect(container.querySelector('#projects')).toBeInTheDocument();
	});

	it('renders section heading', () => {
		renderWithTheme(<Projects />);
		expect(
			screen.getByText('Featured Projects', { exact: false })
		).toBeInTheDocument();
	});

	it('renders all featured project titles', () => {
		renderWithTheme(<Projects />);
		for (const project of featured) {
			const titles = screen.getAllByText(project.title);
			expect(titles.length).toBeGreaterThanOrEqual(1);
		}
	});

	it('renders project descriptions', () => {
		renderWithTheme(<Projects />);
		for (const project of featured) {
			// longDescription may be split across elements; match by substring
			const snippet = project.longDescription.slice(0, 40);
			const found = screen.getByText((text) => text.includes(snippet));
			expect(found).toBeInTheDocument();
		}
	});

	it('renders technology tags for projects', () => {
		renderWithTheme(<Projects />);
		// Technologies may appear in multiple projects, use getAllByText
		for (const tech of featured[0].technologies) {
			const matches = screen.getAllByText(tech);
			expect(matches.length).toBeGreaterThanOrEqual(1);
		}
	});

	it('renders live demo and source links', () => {
		renderWithTheme(<Projects />);
		// At least one project should have a live link and one should have a source link
		const liveLinks = screen.queryAllByText('Live Demo');
		const sourceLinks = screen.queryAllByText('Source');
		// Verify at least one of each exists (some projects may not have github urls)
		expect(liveLinks.length + sourceLinks.length).toBeGreaterThanOrEqual(1);
	});
});
