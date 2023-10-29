import Footer from "../components/landingPage/Footer";
import Header from "../components/landingPage/Header";
import GuestLayout from "../components/layout/GuestLayout";

function Page404() {
	return (
		<div className="min-h-screen">
			<Header />
			<GuestLayout>
				<div class="h-[40rem] flex flex-col justify-center items-center">
					<h1 class="text-5xl text-err font-semibold">404 - Page Not Found</h1>
					<p class="mt-4 text-xl ">
						The page you are looking for doesn't exist.
					</p>
					<a href="/" class="btn btn-accent mt-8">
						Go back to the home page
					</a>
				</div>
			</GuestLayout>
			<Footer />
		</div>
	);
}

export default Page404;
