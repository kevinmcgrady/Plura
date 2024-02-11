import { UserButton } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';

import { ModeToggle } from '../global/ModeToggle';

type NavigationProps = {
  user?: null | User;
};

export const Navigation = ({ user }: NavigationProps) => {
  return (
    <div className='p-4 flex items-center justify-between relative z-10'>
      <aside className='flex items-center gap-2'>
        <Image
          src='/assets/plura-logo.svg'
          alt='Plura logo'
          width={40}
          height={40}
        />
        <span className='text-xl font-bold'>Plura.</span>
      </aside>
      <nav className='hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]'>
        <ul className='flex items-center justify-center gap-8'>
          <Link href='/'>Pricing</Link>
          <Link href='/'>About</Link>
          <Link href='/'>Documentation</Link>
          <Link href='/'>Features</Link>
        </ul>
      </nav>
      <aside className='flex gap-2 items-center'>
        <Link
          className='bg-primary text-white p-2 px-4 rounded-md hover:bg-primary/80'
          href='/agency'
        >
          Login
        </Link>
        <UserButton />
        <ModeToggle />
      </aside>
    </div>
  );
};
