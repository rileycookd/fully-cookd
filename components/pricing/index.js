import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { TabList, Tab, Tabs, TabPanel } from 'react-tabs'
import { IoAdd as AddIcon, IoRemove as SubtractIcon, IoChevronDown } from 'react-icons/io5'
import { Select } from '../form'
import { range } from '../../lib/helpers'
import { DropdownMenu } from '../../components/form'


function Pricing ({ title, pricing, packages, min, max }) {

  console.log("PRICING: ", pricing)

  const [ isChecked, setIsChecked ] = useState(false)
  const [ classSize, setClassSize ] = useState(min)
  const [ classQuantity, setClassQuantity] = useState(packages[0].quantity)

  const calculatePrice = (duration) => {
    let option = pricing.find(p => p.duration === duration)
    let price = option.price
    let quanityDiscount = packages.find(p => p.quantity === classQuantity).discount / 100
    if(classSize > min && option.classSizeDiscounts.length) {
      let discounts = option.classSizeDiscounts.filter(d => d.size <= classSize)
      price = discounts[discounts.length - 1].price
    } 
    price = price * classQuantity
    price = price - (price * quanityDiscount)
    price = (Math.round((price + Number.EPSILON) * 100) / 100).toFixed(2);
    return `${price}`
  }

  return (
    <div className='flex flex-col gap-8 w-full'>

      <div className='flex justify-start gap-8'>
      
      
{/*   
      <div className="flex justify-center w-full border-collapse">
 

      </div> */}
      {/* {(!max || max > 1) && (
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
      )} */}
      </div>
      <table className='table-auto w-full'>
        <thead>
          <tr>
            <th className='px-4 pb-2 text-left'>Class</th>
            <th className='px-1 pb-2 text-left'>
              <DropdownMenu 
                value={classSize}
                label='Group size'
                options={
                  range(min, max, 1).map((option) => (
                    {value: option, label: `${option} student${option > 1 ? 's' : ' '}`}
                  ))
                }
                onChange={setClassSize}
              />
            </th>
            <th className='px-4 pb-2 text-left'>Time</th>
            <th className='px-1 pb-2 text-left'>
              <DropdownMenu 
                value={classQuantity}
                label='Quantity'
                options={
                  packages.map((p) => (
                    {value: p.quantity, label: `${p.quantity} class${p.quantity > 1 ? 'es' : ''} ${p.discount > 0 ? `(${p.discount}% off)` : ''}`}
                  ))
                }
                onChange={setClassQuantity}
              />
            </th>
            <th className='px-4 pb-2 text-left'>Price</th>
          </tr>
        </thead>  
        <tbody className='rounded-lg overflow-hidden'>
          {pricing.map(p => (
            <tr className='bg-white border-grey-300 border'>
              <td className='px-4 py-6 text-left font-heading text-base' data-column="Class">{title}</td>
              <td className='px-4 py-6 text-left font-heading text-base' data-column="Group Size">{`${classSize} student${classSize > 1 ? 's' : ''}`}</td>
              <td className='px-4 py-6 text-left font-heading text-base' data-column="Time">{`${p.duration / 60} hour${p.duration / 60 > 1 ? 's' : ''}`}</td>
              <td className='px-4 py-6 text-left font-heading text-base' data-column="Quantity">{classQuantity} class{classQuantity > 1 ? 'es' : ''}</td>
              <td className='px-4 py-6 text-left font-heading text-base' data-column="Price"><span className='text-secondary font-medium'>{`$${calculatePrice(p.duration)}`}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}

export default Pricing