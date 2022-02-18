import React, { useState, useEffect } from 'react'
import Alert from '../components/alert'
import Footer from '../components/footer'
import Meta from '../components/meta'
import Navbar from './navbar'

export default function Layout({ footer, children, modal, hideNav }) {
  return (
    <>
      <Meta />
      <div className="relative min-h-screen flex flex-col">
        {!hideNav && (<Navbar />)}
        <main className='flex-1 flex flex-col'>{children}</main>
        {modal && (
          <div className='absolute bg-primary-900/80 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            {modal}
          </div>)}
      </div>
      {footer && <Footer {...footer} />}
    </>
  )
}
