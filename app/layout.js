import './globals.css';
import { CartProvider } from '@/lib/cartContext';
import { AuthProvider } from '@/lib/authContext';

export const metadata = {
  title: 'Louis Vuitton - Official International Website',
  description: 'A clone of the Louis Vuitton website built with Next.js and Tailwind CSS.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Typsnittet 'jost' tillämpas globalt från globals.css,
        precis som i din ursprungliga CSS-inställning.
      */}
      <body>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}