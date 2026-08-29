import type { Metadata } from 'next';
import './globals.css';
import './route-menu.css';

export const metadata: Metadata = {
  title: 'DoingGood Youth Connect',
  description: 'Learn. Speak. Serve. Be heard.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><div className="site-route-menu"><a href="/">Home</a><a href="/stewardship">Stewardship</a><a href="/opportunities">Opportunities</a><a href="/stories">Stories</a><a href="/ambassadors">Ambassadors</a><a className="route-join" href="/join">Join DYC</a></div>{children}</body>
    </html>
  );
}
