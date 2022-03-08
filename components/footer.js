import React from 'react'
import Link from 'next/link'
import { ImPhone as PhoneIcon, ImFacebook as FacebookIcon, ImLinkedin2 as LinkedinIcon } from 'react-icons/im'
import { IoMdMail as MailIcon, IoLogoWhatsapp as WhatsappIcon } from 'react-icons/io'
import { IoLogoInstagram as InstagramIcon, IoLogoYoutube as YoutubeIcon, } from 'react-icons/io5'
import { getLinkRoute } from 'lib/helpers'

function Footer (props) {
  const {
    items
  } = props

  console.log("FOOTER: ", props)

  const renderSiteMapItem = (item) => {
    return (
      <li key={item._key}>
        <h5 className='font-heading text-grey-400 text-md font-bold mb-1'>{item.title}</h5>
        <ul className='flex flex-col'>
          {item.links && item.links.map((l => (
            renderLink(l)
          )))}
        </ul>
      </li>
    )
  }

  const renderLink = (l) => {
    
    return (
      <li key={l._key} className='flex'>
        <Link href={getLinkRoute(l)}><a className='hover:text-grey-700 text-grey-600 py-1 font-body text-base'>{l.title || l?.document?.title}</a></Link>
      </li>
    )
  }


  return (
    <footer className='bg-primary w-full text-grey-500'>
      <div className='container mx-auto px-5 py-24 display flex flex-col gap-24'>
        <div className='flex justify-between'>

          <div className='flex flex-col gap-4'>
            <div className='flex items-center'>
              <WhatsappIcon className='text-secondary w-5 h-5 mr-4'/>
              <p className='font-body text-grey-700'>+56 9 5555 5555</p>
            </div>
            <div className='flex items-center'>
              <MailIcon className='text-secondary w-5 h-5 mr-4'/>
              <p className='font-body text-grey-700'>hola@luzdamelio.com</p>
            </div>
          </div>

          {items && (
            <ul className='flex gap-8'>
              {items.map(item => (renderSiteMapItem(item)))}
            </ul>
          )}

          
        </div>

        <div className='flex justify-between'>
          <p className='font-body text-grey-700'>
            © Luz D'Amelio {new Date().getFullYear()}
          </p>
          <div className='ml-4 flex text-grey-800'>
            <a target="_blank" href="https://www.instagram.com/spanishlessonsbyluz/" className='hover:text-grey-600 transition-colors p-3 duration-100' rel="noopener noreferrer">
              <InstagramIcon className='w-8 h-8'/>
            </a>
            <a target="_blank" href="https://www.facebook.com/ameliolanguageinstitute" className='hover:text-grey-600 transition-colors p-3 duration-100' rel="noopener noreferrer">
              <FacebookIcon className='w-8 h-8' />
            </a>
            <a target="_blank" href="https://www.youtube.com/channel/UCOMOGxsNHZOq8DJETweqbuA" className='hover:text-grey-600 transition-colors p-3 duration-100' rel="noopener noreferrer">
              <YoutubeIcon className='w-8 h-8' />
            </a>

          </div> 
        </div>
      </div>
    </footer>
  )
}

export default Footer