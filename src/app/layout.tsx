import '@/styles/main.sass';
import { Roboto_Condensed } from 'next/font/google';
import { NavigationBar } from '@/components/index';

const font = Roboto_Condensed({
	subsets: ['latin'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={font.className}>
			<body>
				<NavigationBar />
				<main className={'app-main'}>{children}</main>
			</body>
		</html>
	);
}
