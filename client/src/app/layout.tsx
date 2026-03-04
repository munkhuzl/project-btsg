import { PropsWithChildren } from 'react';
import { ApolloWrapper } from '@/components/providers';
import { LoginProvider } from '@/context/LoginContext';
import './global.css';
import { AuthProvider } from "@/context/AuthProvider";
import { Header } from "@/components/Header";
import { Theme } from "@radix-ui/themes";
export const metadata = {
  title: 'Биеийн тамир спортын газар',
  description: 'Биеийн тамир спортын газар',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body className="bg-[#F4F4F5] mx-auto">
        <ApolloWrapper>
          <AuthProvider>
            <LoginProvider>
              <Theme>
                <Header />
                {children}
              </Theme>
            </LoginProvider>
          </AuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
