const Footer = () => {
	return (
		<footer className="bg-gray-900 text-gray-300 py-4 px-6 text-sm">
			<div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-8 flex-wrap">
				<div className="flex items-center space-x-2">
					<span className="text-base font-bold">EV Service</span>
					<span className="text-gray-500">| Your trusted EV platform</span>
				</div>

				<div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
					<a href="/about" className="hover:underline">
						About
					</a>
					<a href="/services" className="hover:underline">
						Services
					</a>
					<a href="/contact" className="hover:underline">
						Contact
					</a>
					<a href="/privacy" className="hover:underline">
						Privacy
					</a>
					<a href="/terms" className="hover:underline">
						Terms
					</a>
				</div>

				<div className="text-xs text-gray-500 text-center md:text-right w-full md:w-auto">
					© 2025 EV Service Platform
				</div>
			</div>
		</footer>
	);
};

export default Footer;
