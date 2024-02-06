export default function DashboardLayout({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return (
		<section className='dashboard-layout'>
			{/* Include shared UI here e.g. a header or sidebar */}
			<nav>
				<li>Link 1</li>
				<li>Link 2</li>
				<li>Link 3</li>
			</nav>

			{children}
		</section>
	);
}
