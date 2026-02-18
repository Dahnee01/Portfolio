import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithTheme } from '@/lib/test-utils';
import { Experience } from './Experience';
import { EXPERIENCES } from '@/lib/data';

describe('Experience', () => {
	it("renders with section id='experience'", () => {
		const { container } = renderWithTheme(<Experience />);
		expect(container.querySelector('#experience')).toBeInTheDocument();
	});

	it('renders section heading', () => {
		renderWithTheme(<Experience />);
		// Use role query to target h2 with the exact heading text
		const heading = screen.getByRole('heading', { name: 'Experience.' });
		expect(heading).toBeInTheDocument();
	});

	it('renders all experience roles', () => {
		renderWithTheme(<Experience />);
		for (const exp of EXPERIENCES) {
			const matches = screen.getAllByText(exp.role);
			expect(matches.length).toBeGreaterThanOrEqual(1);
		}
	});

	it('renders company names with accent-text class', () => {
		renderWithTheme(<Experience />);
		for (const exp of EXPERIENCES) {
			const matches = screen.getAllByText(exp.company);
			expect(matches.length).toBeGreaterThanOrEqual(1);
			// At least one matching element should have the accent class
			const hasAccent = matches.some((el) =>
				(el as HTMLElement).className.includes('text-accent-text')
			);
			expect(hasAccent).toBe(true);
		}
	});

	it('renders technology tags', () => {
		renderWithTheme(<Experience />);
		// Check first experience's technologies
		for (const tech of EXPERIENCES[0].technologies) {
			const matches = screen.getAllByText(tech);
			expect(matches.length).toBeGreaterThanOrEqual(1);
		}
	});

	it('renders period information', () => {
		renderWithTheme(<Experience />);
		for (const exp of EXPERIENCES) {
			const matches = screen.getAllByText(exp.period);
			expect(matches.length).toBeGreaterThanOrEqual(1);
		}
	});
});
