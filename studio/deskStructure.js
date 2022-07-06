import S from '@sanity/desk-tool/structure-builder'
import { MdSettings } from 'react-icons/md'
import { CgBrowser } from 'react-icons/cg'
import { IoHome } from 'react-icons/io5'
import { IoMdSettings } from 'react-icons/io'
import website from './src/structure/website'

const hiddenTypes = ['siteSettings', 'companyInfo']

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
      .title('Company Settings')
      .icon(IoMdSettings)
      .child(
        S.document()
          .schemaType('companyInfo')
          .documentId('companyInfo')
      ),
      website,
      // S.listItem()
      //   .title('Website')
      //   .icon(CgBrowser)
      //   .child(
      //     S.list()
      //       .title('Website panel')
      //       .items([
      //         S.listItem()
      //         .title('Site Settings')
      //         .child(
      //           S.editor()
      //             .id('siteSettings')
      //             .schemaType('siteSettings')
      //             .documentId('siteSettings')
      //         )
      //         .icon(MdSettings),
      //         S.documentListItem()
      //           .title('Homepage')
      //           .schemaType('homepage')
      //           .icon(IoHome)
      //           .child(
      //             S.document()
      //               .schemaType('homepage')
      //               .documentId('homepage')
      //               // .views([S.view.form(), PreviewIFrame()])
      //         ),
      //         pageBuilder,
      //       ])
      //   ), 

      ...S.documentTypeListItems().filter(listItem => !hiddenTypes.includes(listItem.getId())),
    ])
