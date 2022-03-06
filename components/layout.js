import React, { useState, useEffect } from 'react'
import Alert from '../components/alert'
import Footer from '../components/footer'
import Meta from '../components/meta'
import Navbar from './navbar'

import { useDispatch, useSelector } from 'react-redux'
import { showModal, clearModal } from 'redux/features/modalSlice'


import { 
  LoginModal,
  SignupModal
} from 'components/modals'

export default function Layout({ footer, children, hideNav }) {
  const dispatch = useDispatch()

  const modalState = useSelector(state => state.modal)
  
  let Modal
  if(modalState.modalContent === 'LOGIN') Modal = LoginModal
  if(modalState.modalContent === 'SIGNUP') Modal = SignupModal

  console.log(Modal)

  return (
    <>
      <Meta />
      <div className="relative flex flex-col">
        {!hideNav && (<Navbar />)}
        <main className='flex-1 flex flex-col'>{children}</main>
        {modalState.showModal && (
          <div 
            onClick={() => dispatch(clearModal())}
            className='fixed z-50 bg-primary-900/80 top-0 left-0 right-0 bottom-0 flex justify-center items-center'
          >
            <div className={'flex items-center justify-center'} onClick={(e) => e.stopPropagation()} >
              <Modal />
            </div>
          </div>
        )}
        {footer && <Footer {...footer} />}
      </div>
    </>
  )
}
