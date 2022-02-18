import React, { useState } from 'react'
import { IoChevronForward as DrawerIcon } from 'react-icons/io5'


function FAQ (props) {
  const {
    questions,
    open
  } = props

  const [openQuestions, setOpenQuestions] = useState(open ? questions.map((q, i) => i) : [])

  const handleCheck = (index) => {
    if(openQuestions.includes(index)) {
      setOpenQuestions(openQuestions.filter(i => i !== index))
    } else {
      setOpenQuestions([...openQuestions, index])
    }
  }


  return (
    <div className='my-6 flex-col justify-start'>
      {questions?.map((q, i) => (
        <div key={q._key} className='my-1 flex items-start justify-start transition-all duration-200'>
          <label 
            for={`trigger${i}`} 
            className='relative flex-1 flex-col group cursor-pointer'
          >
            <input checked={openQuestions.includes(i)} onClick={() => handleCheck(i)} className='hidden peer' id={`trigger${i}`} type="checkbox" />
            <DrawerIcon className='absolute top-2 left-0 peer-checked:rotate-90 w-8 h-8 mr-2 stroke-secondary transition-all duration-300 ease-in-out' />
            <h5 className='group-hover:text-grey-800 pt-3 pb-1 rounded-md mb-2 ml-10 flex flex-1 mb-0 h-full transition-all duration-300 ease-out cursor-pointer display-block font-heading font-bold font-base' for={`trigger${i}`}>
              {q.question}
            </h5>
            <div className='hidden h-0 peer-checked:h-full peer-checked:flex mb-3 ml-10 overflow-hidden transition-all ease-in-out duration-400'>
              <p className=''>
                {q.answer}
              </p>
            </div>
          </label>
        </div>
      ))}
    </div>
  )
}

export default FAQ


//  @nest &:checked {
//   @nest & ~ svg {
//     transform: rotate(90deg);
//   }
//   @nest & ~ .infoWrapper > .answer-wrapper {
//     max-height: 350px;
//   }
//   @nest & ~ .infoWrapper > .question {
//     padding-bottom: 1rem;
//   }
// }