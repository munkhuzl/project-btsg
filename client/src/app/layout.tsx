import { PropsWithChildren } from 'react';
import { ApolloWrapper } from '@/components/providers';
import { LoginProvider } from '@/context/LoginContext';
import { cookies } from 'next/headers';
import './global.css'
export const metadata = {
  title: 'Welcome to example-frontend',
  description: 'Generated by create-nx-workspace',
};

const RootLayout = async ({ children }: PropsWithChildren) => {
  const cookiesStore = cookies();
  const token: string = (await cookiesStore).get('authtoken')?.value || '';
  return (
    <html lang="en">
      <body className="bg-[#F4F4F5]">
        <ApolloWrapper token={token}>
            <LoginProvider>
              {children}
            </LoginProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
