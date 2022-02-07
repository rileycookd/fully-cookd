import S from '@sanity/desk-tool/structure-builder'
import { FaHandHoldingUsd, FaChalkboardTeacher } from 'react-icons/fa'
import { BsGiftFill } from 'react-icons/bs'

export default S.listItem()
  .title('Services')
  .icon(FaHandHoldingUsd)
  .child(
    S.list()
      .title('Services panel')
      .items([
        S.listItem()
          .title('Packages')
          .icon(BsGiftFill)
          .child(
            S.documentTypeList('classPackage')
          ),
        S.listItem()
          .title('Class types')
          .icon(FaChalkboardTeacher)
          .child(
            S.documentTypeList('classType')
              .title('Class types')
          )
      ])
    )