import React from 'react'
import Link from 'next/link'
import { ImPhone as PhoneIcon, ImFacebook as FacebookIcon, ImLinkedin2 as LinkedinIcon } from 'react-icons/im'
import { IoMdMail as MailIcon } from 'react-icons/io'
import { IoLogoInstagram as InstagramIcon } from 'react-icons/io5'

function Footer (props) {
  const {
    items
  } = props

  console.log("FOOTER: ", props)

  const renderSiteMapItem = (item) => {
    return (
      <div>
        <h5 className='font-heading text-grey-400 text-md font-bold mb-1'>{item.title}</h5>
        <ul className='flex flex-col gap-1'>
          {item.links && item.links.map((l => (
            renderLink(l)
          )))}
        </ul>
      </div>
    )
  }

  const renderLink = (l) => {
    
    return (
      <li>
        <Link href="/"><a className='hover:text-grey-400 font-body text-base'>{l.title || l?.document?.title}</a></Link>
      </li>
    )
  }


  return (
    <footer className='bg-primary w-full text-grey-500'>
      <div className='container mx-auto px-5 py-24 display flex flex-col gap-24'>
        <div className='flex justify-between'>

          <div className='flex flex-col gap-2'>
            <div className='flex items-center'>
              <PhoneIcon className='text-secondary w-5 h-5 mr-4'/>
              <p>+56 9 5555 5555</p>
            </div>
            <div className='flex items-center'>
              <MailIcon className='text-secondary w-5 h-5 mr-4'/>
              <p>hola@luzdamelio.com</p>
            </div>
          </div>

          {items && (
            <div className='flex gap-8'>
              {items.map(item => (renderSiteMapItem(item)))}
            </div>
          )}

          
        </div>

        <div className='flex justify-between'>
          <div>
            © Luz D'Amelio {new Date().getFullYear()}
          </div>
          <div className='flex gap-4'>
            <InstagramIcon className='w-8 h-8'/>
            <FacebookIcon className='w-8 h-8' />
            <LinkedinIcon className='w-8 h-8' />
          </div> 
        </div>
      </div>
    </footer>
  )
}

export default Footer