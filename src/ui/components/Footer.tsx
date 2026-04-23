import Link from "next/link";
import Image from "next/image";
import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { ChannelSelect } from "./ChannelSelect";
import { ChannelsListDocument, MenuGetBySlugDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";

export async function Footer({ channel }: { channel: string }) {
	const footerLinks = await executeGraphQL(MenuGetBySlugDocument, {
		variables: { slug: "footer", channel },
		revalidate: 60 * 60 * 24,
	});
	const channels = process.env.SALEOR_APP_TOKEN
		? await executeGraphQL(ChannelsListDocument, {
				withAuth: false,
				headers: {
					Authorization: `Bearer ${process.env.SALEOR_APP_TOKEN}`,
				},
		  })
		: null;
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-neutral-900 text-white">
			<div className="mx-auto max-w-7xl px-4 lg:px-8">
				{/* Newsletter Section */}
				<div className="py-16 border-b border-neutral-700">
					<div className="max-w-2xl mx-auto text-center">
						<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
							<Mail className="w-8 h-8" />
						</div>
						<h3 className="text-3xl md:text-4xl font-bold mb-4">Stay in the Loop</h3>
						<p className="text-neutral-300 mb-6">
							Get exclusive offers, new arrivals, and insider updates delivered to your inbox.
						</p>
						<form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
							<input
								type="email"
								placeholder="Enter your email"
								className="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-neutral-400 focus:outline-none focus:border-white transition-colors"
							/>
							<button
								type="submit"
								className="px-8 py-3 bg-white text-neutral-900 rounded-full font-semibold hover:bg-neutral-100 transition-colors"
							>
								Subscribe
							</button>
						</form>
					</div>
				</div>

				{/* Main Footer Links */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16">
					{footerLinks.menu?.items?.map((item) => {
						return (
							<div key={item.id}>
								<h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{item.name}</h3>
								<ul className="space-y-3">
									{item.children?.map((child) => {
										if (child.category) {
											return (
												<li key={child.id}>
													<LinkWithChannel
														href={`/categories/${child.category.slug}`}
														className="text-sm text-neutral-400 hover:text-white transition-colors"
													>
														{child.category.name}
													</LinkWithChannel>
												</li>
											);
										}
										if (child.collection) {
											return (
												<li key={child.id}>
													<LinkWithChannel
														href={`/collections/${child.collection.slug}`}
														className="text-sm text-neutral-400 hover:text-white transition-colors"
													>
														{child.collection.name}
													</LinkWithChannel>
												</li>
											);
										}
										if (child.page) {
											return (
												<li key={child.id}>
													<LinkWithChannel
														href={`/pages/${child.page.slug}`}
														className="text-sm text-neutral-400 hover:text-white transition-colors"
													>
														{child.page.title}
													</LinkWithChannel>
												</li>
											);
										}
										if (child.url) {
											return (
												<li key={child.id}>
													<LinkWithChannel
														href={child.url}
														className="text-sm text-neutral-400 hover:text-white transition-colors"
													>
														{child.name}
													</LinkWithChannel>
												</li>
											);
										}
										return null;
									})}
								</ul>
							</div>
						);
					})}
				</div>

				{/* Social & Currency */}
				<div className="py-8 border-t border-neutral-700">
					<div className="flex flex-col md:flex-row justify-between items-center gap-6">
						{/* Social Icons */}
						<div className="flex gap-4">
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
								aria-label="Instagram"
							>
								<Instagram className="w-5 h-5" />
							</a>
							<a
								href="https://facebook.com"
								target="_blank"
								rel="noopener noreferrer"
								className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
								aria-label="Facebook"
							>
								<Facebook className="w-5 h-5" />
							</a>
							<a
								href="https://twitter.com"
								target="_blank"
								rel="noopener noreferrer"
								className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
								aria-label="Twitter"
							>
								<Twitter className="w-5 h-5" />
							</a>
						</div>

						{/* Currency Selector */}
						{channels?.channels && (
							<div className="text-neutral-400">
								<label className="flex items-center gap-2">
									<span className="text-sm">Change currency:</span>
									<ChannelSelect channels={channels.channels} />
								</label>
							</div>
						)}
					</div>
				</div>

				{/* Copyright */}
				<div className="flex flex-col justify-between border-t border-neutral-700 py-8 sm:flex-row gap-4">
					<p className="text-sm text-neutral-400">
						Copyright &copy; {currentYear} Your Store, Inc. All rights reserved.
					</p>
					<p className="flex items-center gap-2 text-sm text-neutral-400">
						Powered by{" "}
						<Link target={"_blank"} href={"https://saleor.io/"} className="hover:text-white transition-colors">
							Saleor
						</Link>
						<Link href={"https://github.com/saleor/saleor"} target={"_blank"} className={"opacity-50 hover:opacity-100 transition-opacity"}>
							<Image alt="Saleor github repository" height={20} width={20} src={"/github-mark.svg"} />
						</Link>
					</p>
				</div>
			</div>
		</footer>
	);
}
