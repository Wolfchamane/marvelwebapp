import { Html, Head, Main, NextScript } from 'next/document'
import Link from 'next/link'

export default function Document() {
    return (
        <Html>
            <Head>
                <title>Zara Web Challenge</title>
            </Head>
            <body>
            <aside>
                <ul>
                    <li>
                        <Link href={'/'}>Characters</Link>
                    </li>
                    <li>
                        <Link href={'/favourites'}>Favourites</Link>
                    </li>
                </ul>
            </aside>
            <Main/>
            <NextScript />
            </body>
        </Html>
    )
}