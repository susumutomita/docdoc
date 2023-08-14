import { Analytics, AnalyticsProps } from '@vercel/analytics/react';

interface CustomAnalyticsProps extends AnalyticsProps {
  id: string;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Analytics id="UA-XXXXXXXXX-X" />
      <main>{children}</main>
    </>
  );
}
