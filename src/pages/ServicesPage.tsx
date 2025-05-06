import React from "react";
import { Battery, Wrench, Sparkles, Clock } from "lucide-react";

export default function ServicesPage() {
	const services = [
		{
			icon: <Battery className="w-12 h-12 text-emerald-600" />,
			title: "Battery Services",
			description:
				"Complete battery diagnostics and optimization services for all EV models",
			features: [
				"Health check",
				"Performance optimization",
				"Replacement service",
			],
		},
		{
			icon: <Wrench className="w-12 h-12 text-emerald-600" />,
			title: "Maintenance",
			description:
				"Regular maintenance and check-ups to keep your EV in perfect condition",
			features: ["System diagnostics", "Software updates", "Component checks"],
		},
		{
			icon: <Sparkles className="w-12 h-12 text-emerald-600" />,
			title: "Cleaning Services",
			description:
				"Professional cleaning and detailing services for your vehicle",
			features: ["Interior detailing", "Exterior washing", "Sanitization"],
		},
		{
			icon: <Clock className="w-12 h-12 text-emerald-600" />,
			title: "Quick Service",
			description: "Rapid response and quick fix solutions for common issues",
			features: ["30-min diagnostics", "Minor repairs", "Emergency support"],
		},
	];

	return (
		<div className="min-h-screen bg-gradient-to-b from-white to-emerald-50">
			{/* Hero Section with Ethiopian cityscape */}
			<div className="relative h-64 bg-emerald-950 overflow-hidden">
				<img
					src="https://images.unsplash.com/photo-1562777289-cefd155de388?q=80&w=2038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt="Addis Ababa Skyline"
					className="absolute inset-0 w-full h-full object-cover opacity-30"
				/>
				<div className="relative h-full flex items-center justify-center">
					<h1 className="text-4xl font-bold text-white text-center">
						Our Services
					</h1>
				</div>
			</div>

			{/* Services Grid */}
			<div className="max-w-7xl mx-auto px-4 py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{services.map((service, index) => (
						<div
							key={index}
							className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
						>
							<div className="flex items-center mb-4">
								{service.icon}
								<h3 className="text-2xl font-semibold ml-4">{service.title}</h3>
							</div>
							<p className="text-gray-600 mb-4">{service.description}</p>
							<ul className="space-y-2">
								{service.features.map((feature, idx) => (
									<li key={idx} className="flex items-center text-gray-700">
										<span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
										{feature}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>

			{/* Electric texture footer */}
			<div className="h-32 bg-gradient-to-t from-emerald-600 to-emerald-500 relative overflow-hidden">
				<div className="absolute inset-0 opacity-10">
					<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
				</div>
			</div>
		</div>
	);
}
