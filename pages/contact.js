import React, { useState } from 'react'

import Layout from '../components/layout'
import Head from 'next/head'

import ContactInfoBlock from 'components/contact-info-block'
import ContactForm from 'components/forms/contact-form'


export default function Contact({ }) {
  
  return (
    <>
      <Layout>
        <Head>
          <title>Contact us | Fully Cookd</title>
        </Head>
        <ContactInfoBlock />

        <div className='flex-1 flex'>
          <div className='flex-1 w-full justify-between  flex  gap-8 flex-1 p-page my-24'>

            <div className='flex h-full flex-col gap-8 w-full max-w-lg'>
              <h1 className='font-heading text-6xl font-bold text-left w-full'>Contact the chef</h1>
              <p className='font-body text-md max-w-sm text-grey-800'>We're ready to cook something up together. Let us know what you're craving.</p>
            </div>
            
            <ContactForm />
                

          </div>
        </div>

      </Layout>
    </>
  )
}

// export async function getStaticProps() {
//   const pageBlocks = await getPageBlocks('homepage')
//   const footer = await getPageFooter('homepage')
//   const languageData = await getAllLanguageData()
//   return {
//     props: { footer, pageBlocks, languageData },
//     revalidate: 1
//   }
// }
