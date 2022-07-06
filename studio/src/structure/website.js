import S from '@sanity/desk-tool/structure-builder'
import { VscSettings } from 'react-icons/vsc'
import { IoLanguage } from 'react-icons/io5'
import { MdOutlineDevices } from 'react-icons/md'
import { IoHome, IoMegaphone } from 'react-icons/io5'
import { FaToolbox } from 'react-icons/fa'


export default S.listItem()
    .title('Website')
    .icon(MdOutlineDevices)
    .child(
      S.list()
        .title('Website panel')
        .items([
          S.listItem()
            .title('Settings')
            .icon(VscSettings)
            .child(
              S.document()
                .schemaType('siteSettings')
                .documentId('siteSettings')
            ),
          S.listItem()
            .title('Homepage')
            .icon(IoHome)
            .child(
              S.document()
                .schemaType('page')
                .documentId('homepage')
            ),
            S.listItem()
              .title('Projects page')
              .icon(FaToolbox)
              .child(
                S.document()
                  .schemaType('page')
                  .documentId('projects')
              ),
            S.listItem()
              .title('Blog page')
              .icon(IoMegaphone)
              .child(
                S.document()
                  .schemaType('page')
                  .documentId('blog')
              ),
        ])
    )