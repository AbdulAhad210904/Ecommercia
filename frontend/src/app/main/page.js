"use client";
import React from 'react';

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem('token');
		window.location.reload();
	};

	return (
		<div className="bg-gray-100 dark:bg-gray-900">
			<nav className="bg-white dark:bg-gray-800 shadow-lg">
				<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
					<div className="relative flex items-center justify-between h-16">
						<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
							<button
								type="button"
								className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
								aria-controls="mobile-menu"
								aria-expanded="false"
							>
								<span className="sr-only">Open main menu</span>
								<svg
									className="block h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16m-7 6h7"
									/>
								</svg>
								<svg
									className="hidden h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>

						<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
							<div className="flex-shrink-0">
								<h1 className="text-xl font-bold text-gray-900 dark:text-white">Landin Page</h1>
							</div>
						</div>

						<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
							<button
								className="bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
								onClick={handleLogout}
							>
								Logout
							</button>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Main;
