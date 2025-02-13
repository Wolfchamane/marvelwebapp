import { Roboto_Condensed } from 'next/font/google';
import '@/styles/main.sass';
import { NavigationBar } from '@/components/index';

const font = Roboto_Condensed({
	subsets: ['latin'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={font.className}>
			<body>
				<NavigationBar />
				<main>{children}</main>
			</body>
		</html>
	);
}
