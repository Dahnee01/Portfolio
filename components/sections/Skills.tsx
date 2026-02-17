'use client';

import { motion } from 'framer-motion';
import { SKILLS } from '@/lib/data';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TechIcon } from '@/components/ui/TechIcon';
import { fadeInUp } from '@/lib/animations';
import type { SkillCategory } from '@/lib/data';

function OrbitGroup({ data }: { data: SkillCategory }) {
	const orbitRadius = 110;
	const count = data.skills.length;

	return (
		<motion.div
			variants={fadeInUp}
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true, margin: '-50px' }}
			className='relative flex mx-auto items-center justify-center h-[300px]'
			style={{ width: orbitRadius * 2, height: orbitRadius * 2 }}>
			{/* Center label */}
			<div className='relative z-10 flex flex-col items-center'>
				<span className='text-lg font-semibold text-text-primary'>
					{data.category}
				</span>
				<span className='text-xs text-text-muted mt-1'>{count} skills</span>
			</div>

			{/* Orbit ring (visual) */}
			<div
				className='absolute rounded-full border border-border-subtle'
				style={{ width: orbitRadius * 2, height: orbitRadius * 2 }}
			/>

			{/* Rotating container */}
			<motion.div
				className='absolute'
				style={{ width: orbitRadius * 2, height: orbitRadius * 2 }}
				animate={{ rotate: 360 }}
				transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
				{data.skills.map((skill, i) => {
					const angle = (2 * Math.PI * i) / count;
					const x = Math.cos(angle) * orbitRadius;
					const y = Math.sin(angle) * orbitRadius;

					return (
						<motion.div
							key={skill.name}
							className='absolute flex items-center justify-center w-11 h-11 rounded-full bg-surface backdrop-blur-sm border border-border group'
							style={{
								left: `calc(50% + ${x}px - 22px)`,
								top: `calc(50% + ${y}px - 22px)`,
							}}
							animate={{ rotate: -360 }}
							transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
							whileHover={{
								scale: 1.3,
								borderColor: 'var(--glow-lg)',
								boxShadow: '0 0 15px var(--glow-sm)',
							}}>
							<TechIcon name={skill.icon} className='w-5 h-5' />

							{/* Tooltip */}
							<div className='absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'>
								<span
									className='text-[10px] whitespace-nowrap px-2 py-1 rounded'
									style={{
										backgroundColor: 'var(--tooltip-bg)',
										color: 'rgba(255, 255, 255, 0.8)',
									}}>
									{skill.name}
								</span>
							</div>
						</motion.div>
					);
				})}
			</motion.div>
		</motion.div>
	);
}

export function Skills() {
	return (
		<section id='skills' className='py-24 px-6 max-w-6xl mx-auto'>
			<SectionHeading
				title='Skills & Tools'
				subtitle='Technologies I work with daily.'
			/>

			<div className='flex flex-wrap justify-center gap-8 md:gap-12'>
				{SKILLS.map((category) => (
					<OrbitGroup key={category.category} data={category} />
				))}
			</div>
		</section>
	);
}
