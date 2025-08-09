import { Roboto } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import Header from '@/app/components/Header'
import { ClerkProvider } from "@clerk/nextjs";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: "swap"
});



//<meta name="viewport" content="initial-scale=1, width=device-width" />

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${roboto.className} antialiased`}
        >
          <Header />
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
    
  );
}
