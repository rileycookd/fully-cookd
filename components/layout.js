import React, { useState, useEffect } from 'react'
import Meta from 'components/meta'
import Navbar from './navbar'
// import Alert from 'components/alert'
// import Footer from 'components/footer'

export default function Layout({ footer, children, hideNav }) {

  return (
    <>
      <Meta />
      <div className="relative flex flex-col min-h-full">
        {!hideNav && (<Navbar />)}
        <main className='flex-1 flex flex-col bg-secondary-200'>{children}</main>
        {footer && <Footer {...footer} />}
      </div>
    </>
  )
}
