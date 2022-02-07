import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend';
import Image from 'next/image'

export default function Navbar() { 
  const { data: session, status } = useSession()
  console.log("SESSION: ", session)

  return (
    <nav className="border-b border-primary-500/50">
      <div className="flex justify-between items-center container mx-auto px-5 py-3">

    
        <Link href="/">
          <a >
            <Image 
              src="/images/company_logo.svg" 
              width="150" 
              height="40" 
            />
          </a>
        </Link>
        <ul className="flex">
          {!session?.user && (
            <li className='flex items-center'>
              <Link href="/api/auth/signin">
                <a className="bg-secondary hover:bg-secondary-300 text-white py-2 px-6 rounded">Login</a>
              </Link>
            </li>
          )}
          {session?.user && (
            <li>
              <button 
                className="bg-secondary hover:bg-secondary-300 text-white py-2 px-4 rounded" 
                onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}