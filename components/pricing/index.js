import React, { useState } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { TabList, Tab, Tabs, TabPanel } from 'react-tabs'
import { IoAdd as AddIcon, IoRemove as SubtractIcon } from 'react-icons/io5'

function Pricing ({ title, pricing, packages, min, max, maxDiscount, sizeDiscount }) {

  console.log("PRICING: ", pricing)

  const [ numStudents, setNumStudents ] = useState(min || 1)
  const [ isChecked, setIsChecked ] = useState(false)

  let currentSizeDiscount = 0;
  if (sizeDiscount && numStudents > min) {
    currentSizeDiscount = sizeDiscount * (numStudents - min);
    if(currentSizeDiscount > maxDiscount) {
      currentSizeDiscount = maxDiscount / 100;
    } else {
      currentSizeDiscount = currentSizeDiscount / 100;
    }
  }

  const calculateBasePrice = (basePrice) => {
    let classPrice = basePrice;
    if(sizeDiscount && numStudents > min) {
      classPrice = classPrice - (classPrice * (currentSizeDiscount))
    }
    if(isChecked === true) {
      classPrice = classPrice * numStudents;
    }
    classPrice = (Math.round((classPrice + Number.EPSILON) * 100) / 100).toFixed(2);
    return classPrice;
  }

  const calculatePackagePrice = (basePrice, quantity, discount) => {
    let classPrice = basePrice * quantity;
    if(discount) {
      classPrice = classPrice - (classPrice * (discount / 100));
    }
    classPrice = (Math.round((classPrice + Number.EPSILON) * 100) / 100).toFixed(2);
    return classPrice
  }

  let basePrices = pricing.map(b => (
    {classType: title, quantity: 1, price: calculateBasePrice(b.price), duration: b.duration, _key: b.key}
  ))

  let packagePrices = [basePrices]

  if(packages) {
    packagePrices = packages.map(p => (
      basePrices.map(b => (
        {
          classType: title, 
          quantity: p.quantity, 
          price: calculatePackagePrice(b.price, p.quantity, p.discount),
          duration: b.duration,
          key: `${p.title}${b._key}`
        }
      ))
    ))
    packagePrices.unshift(basePrices)
  }

  const renderPricingTable = (pp) => (
    <table className='table-auto w-full'>
      <thead>
        <tr>
          <th className='px-4 pb-2 text-left'>Class</th>
          <th className='px-4 pb-2 text-left'>Group Size</th>
          <th className='px-4 pb-2 text-left'>Time</th>
          <th className='px-4 pb-2 text-left'>Quantity</th>
          <th className='px-4 pb-2 text-left'>Price</th>
        </tr>
      </thead>  
      <tbody className='rounded-lg overflow-hidden'>
        {pp.map(p => (
          <tr className='bg-white border-grey-300 border'>
            <td className='px-4 py-6 text-left font-heading text-base' data-column="Class">{title}</td>
            <td className='px-4 py-6 text-left font-heading text-base' data-column="Group Size">1 student</td>
            <td className='px-4 py-6 text-left font-heading text-base' data-column="Time">{`${p.duration / 60} hour${p.duration / 60 > 1 ? 's' : ''}`}</td>
            <td className='px-4 py-6 text-left font-heading text-base' data-column="Quantity">{p.quantity}</td>
            <td className='px-4 py-6 text-left font-heading text-base' data-column="Price"><span className='text-secondary font-medium'>{`$${p.price}`}</span></td>
          </tr>
        ))}
      </tbody>
    </table>
  )

  return (
    <div className='flex flex-col gap-4 my-4 w-full'>

      <div className='flex flex-col items-center gap-6'>
      
      {(!max || max > 1) && (
        <div className='flex flex-col items-center w-min gap-2'>
          <label className='w-full font-heading text-center' for="class-size">Choose class size:</label>
          <div className='flex justify-center gap-2'>
            <span 
              onClick={() => (numStudents === min || numStudents === 1) 
                ? null 
                : setNumStudents(numStudents - 1)} 
              className='flex justify-center content-center border-grey-300 shadow border rounded-md p-2'
            ><SubtractIcon/></span>
            <input 
              className='shadow appearance-none border border-grey-300 rounded w-min max-w-min py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
              type="text" 
              value={numStudents} 
              min="0" 
              max="10"
              name="class-size"
              id="class-size"
              inputmode="numeric"
              pattern="[0-9]*"
            />
            <span 
              onClick={() => numStudents === max ? null : setNumStudents(numStudents + 1)} 
              className='flex justify-center content-center border-grey-300 shadow border rounded-md p-2'
            ><AddIcon/></span>
          </div>
        </div>
      )}
      {(!max || max > 1) && (
        <label className='' for="price-toggle">
          Price per student
          <input 
            type="checkbox" 
            className=''
            id="price-toggle" 
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <span className=''>
            <span className=''></span>
          </span>
          Total price
        </label>
      )}
      </div>
      {packagePrices.length > 1 && (
        <Tabs className='' selectedTabClassName=''>
          <TabList className=''>
            <Tab className=''>
              <h6 className=''>Single</h6>
              <p className=''>1 class</p>
            </Tab>
            {packages.map(p => (
              <Tab className=''>
                <h6 className=''>{p.title}</h6>
                <p className=''>{`${p.quantity} classes`}</p>
              </Tab>
            ))}
          </TabList>

          {packagePrices.map(pp => (
            <TabPanel>
              {renderPricingTable(pp)}
            </TabPanel>
          ))}   
        </Tabs>
      )}
      {packagePrices.length === 1 && (
        <>
          {renderPricingTable(packagePrices[0])}
        </>
      )}
    </div>
  )
}

export default Pricing