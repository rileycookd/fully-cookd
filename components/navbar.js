import Link from 'next/link'

export default function Navbar() {


  return (
    <nav className="flex">
      <ul className="flex">
        
        <li>
          <Link href="/">
            <a className="hover:underline">Home</a>
          </Link>
        </li>
        <li>
          <Link href="/auth/signin">
            <a className="bg-secondary hover:bg-secondary-300 text-white py-2 px-4 rounded">Login</a>
          </Link>
        </li>
        <li>
          <Link href="/api/auth/logout">
            <a className="bg-secondary hover:bg-secondary-300 text-white py-2 px-4 rounded">Logout</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
