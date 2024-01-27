import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <div className='p-3 md:p-4 xl:-5 h-full w-full'>{children}</div>;
}
