import Alert from '../components/alert'
import Footer from '../components/footer'
import Meta from '../components/meta'
import Navbar from './navbar'

export default function Layout({ footer, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Navbar />
        <main>{children}</main>
      </div>
      <Footer {...footer} />
    </>
  )
}
