'use client';

import { motion } from 'framer-motion';
import { SOCIALS, SITE } from '@/lib/data';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Github, Linkedin, Twitter, Mail, Send, Heart } from 'lucide-react';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

const iconMap: Record<string, React.ReactNode> = {
	Github: <Github className='w-5 h-5' />,
	Linkedin: <Linkedin className='w-5 h-5' />,
	Twitter: <Twitter className='w-5 h-5' />,
	Mail: <Mail className='w-5 h-5' />,
};

export function Contact() {
	const [status, setStatus] = useState<
		'idle' | 'loading' | 'success' | 'error'
	>('idle');

	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;

		// Basic client-side validation: prevent sending empty fields
		const formData = new FormData(form);
		const name = (formData.get('name') as string) || '';
		const email = (formData.get('email') as string) || '';
		const message = (formData.get('message') as string) || '';

		if (!name.trim() || !email.trim() || !message.trim()) {
			setErrorMessage('Please fill out all fields before sending.');
			setStatus('idle');
			return;
		}

		setErrorMessage(null);
		setStatus('loading');
		console.log(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
		console.log(process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);
		console.log(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
		try {
			await emailjs.sendForm(
				process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
				process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
				form,
				process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
			);
			setStatus('success');
			form.reset();
			setErrorMessage(null);
		} catch {
			setStatus('error');
		}
	};

	return (
		<section id='contact' className='py-24 px-6'>
			<div className='max-w-4xl mx-auto'>
				{/* Big heading */}
				<motion.div
					variants={fadeInUp}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-50px' }}
					className='text-center mb-16'>
					<h2 className='text-4xl md:text-6xl lg:text-7xl font-bold'>
						Let&apos;s Work <span className='text-gradient'>Together</span>
					</h2>
					<p className='mt-4 text-text-tertiary text-lg'>
						Have a project in mind? Let&apos;s build something great.
					</p>
				</motion.div>

				<div className='grid md:grid-cols-2 gap-12 md:gap-16'>
					{/* Contact form */}
					<motion.form
						variants={staggerContainer}
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, margin: '-50px' }}
						className='space-y-5'
						onSubmit={handleSubmit}>
						<motion.div variants={staggerItem}>
							<Input
								label='Name'
								name='name'
								glow
								onChange={() => setErrorMessage(null)}
							/>
						</motion.div>
						<motion.div variants={staggerItem}>
							<Input
								label='Email'
								name='email'
								type='email'
								glow
								onChange={() => setErrorMessage(null)}
							/>
						</motion.div>
						<motion.div variants={staggerItem}>
							<Textarea
								label='Message'
								name='message'
								glow
								onChange={() => setErrorMessage(null)}
							/>
						</motion.div>

						<motion.div variants={staggerItem}>
							<MagneticButton>
								<Button
									variant='primary'
									size='lg'
									className='w-full md:w-auto'
									disabled={status === 'loading'}>
									<Send className='w-4 h-4' />
									{status === 'loading' ? 'Sending...' : 'Send Message'}
								</Button>
							</MagneticButton>
							{errorMessage && (
								<p className='text-red-500 mt-2 text-sm'>{errorMessage}</p>
							)}
							{status === 'success' && (
								<p className='text-green-500 mt-2 text-sm'>Message sent!</p>
							)}
							{status === 'error' && (
								<p className='text-red-500 mt-2 text-sm'>
									Something went wrong. Try again.
								</p>
							)}
						</motion.div>
					</motion.form>

					{/* Social links */}
					<motion.div
						variants={staggerContainer}
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, margin: '-50px' }}
						className='flex flex-col justify-center gap-4'>
						<motion.p
							variants={staggerItem}
							className='text-text-tertiary text-sm mb-2'>
							Or find me on
						</motion.p>
						{SOCIALS.map((social) => (
							<motion.a
								key={social.platform}
								variants={staggerItem}
								href={social.url}
								target='_blank'
								rel='noopener noreferrer'
								className='group flex items-center gap-4 p-4 rounded-xl border border-border-subtle hover:border-border transition-all duration-300 relative overflow-hidden'
								whileHover={{ scale: 1.02 }}>
								{/* Brand color fill on hover */}
								<motion.div
									className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500'
									style={{ backgroundColor: `${social.brandColor}10` }}
								/>

								<span className='relative z-10 text-text-secondary group-hover:text-text-primary transition-colors duration-300'>
									<span className='group-hover:hidden'>
										{iconMap[social.icon]}
									</span>
									<span
										className='hidden group-hover:block'
										style={{ color: social.brandColor }}>
										{iconMap[social.icon]}
									</span>
								</span>

								<div className='relative z-10'>
									<span className='text-text-primary font-medium text-sm group-hover:text-text-primary transition-colors'>
										{social.platform}
									</span>
									<span className='block text-xs text-text-muted group-hover:text-text-secondary transition-colors'>
										{social.url.replace('https://', '').replace('mailto:', '')}
									</span>
								</div>
							</motion.a>
						))}
					</motion.div>
				</div>

				{/* Footer */}
				<motion.footer
					variants={fadeInUp}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					className='mt-24 pt-8 border-t border-border-subtle text-center'>
					<p className='text-sm text-text-muted flex items-center justify-center gap-1.5'>
						Built by {SITE.name}
					</p>
					<p className='text-xs text-text-faint mt-2'>
						&copy; {new Date().getFullYear()} All rights reserved.
					</p>
				</motion.footer>
			</div>
		</section>
	);
}
