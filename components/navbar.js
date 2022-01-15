import Link from 'next/link'
import { useUser } from "@auth0/nextjs-auth0"
import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend';
import Image from 'next/image'

export default function Navbar() {
  const { user, error, isLoading } = useUser();
  console.log(user)

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
          {!user && (
            <li className='flex items-center'>
              <Link href="/api/auth/login">
                <a className="bg-secondary hover:bg-secondary-300 text-white py-2 px-6 rounded">Login</a>
              </Link>
            </li>
          )}
          {user && (
            <li>
              <Link href="/api/auth/logout">
                <a className="bg-secondary hover:bg-secondary-300 text-white py-2 px-4 rounded">Logout</a>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}