import S from '@sanity/desk-tool/structure-builder'
import { BsChatDots as ContactIcon, BsInboxesFill as SubmissionsIcon } from "react-icons/bs"
import { FaChalkboardTeacher } from 'react-icons/fa' 
import { MdMoneyOff } from 'react-icons/md'
import { GiCheckMark } from 'react-icons/gi'

export default S.listItem()
  .title('Inbox')
  .icon(SubmissionsIcon)
  .child(
    S.list()
      .title('Inboxes')
      .items([
        S.listItem()
          .title('Registrations')
          .icon(FaChalkboardTeacher)
          .child(
            S.list()
              .title('Registration List')
              .items([
                S.listItem('all')
                  .title('All registrations')
                  .child(
                    S.documentTypeList('registration')
                  ),
                S.listItem('teacher')
                  .title('Registrations by Teacher')
                  // .icon(BsBuilding)
                  .child(
                    S.documentList()
                      .title('Teacher')
                      .schemaType('teacher')
                      .filter('_type == "teacher"')
                      .child(id => // Returns the id for the selected category document
                        S.documentList()
                          .title('Related registrations')
                          .schemaType('registration')
                          .filter('_type == "registration" && $id == teacher._ref')
                          .params({id}) // use the id in the filter to return sampleProjects that has a reference to the category
                      )
                  ),
                  S.listItem('teacher')
                    .title('Registrations by Student')
                    // .icon(BsBuilding)
                    .child(
                      S.documentList()
                        .title('Student')
                        .schemaType('student')
                        .filter('_type == "student"')
                        .child(id => // Returns the id for the selected category document
                          S.documentList()
                            .title('Related registrations')
                            .schemaType('registration')
                            .filter('_type == "registration" && $id == students[]._ref')
                            .params({id}) // use the id in the filter to return sampleProjects that has a reference to the category
                        )
                    ),
              ]),
          ),
        S.listItem()
          .title('Messages')
          .icon(ContactIcon)
          .child(
            S.documentTypeList('contactForm')
              .title('Contact form inbox')   
          )
      ])
  )