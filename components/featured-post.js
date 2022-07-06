import React, { useState, useEffect } from 'react';
import { BsCaretDownFill, BsCaretRightFill } from 'react-icons/bs'
import { imageBuilder } from 'lib/sanity';
import Link from 'next/link'

export default function FeaturedPost(props) {
  const {
    index,
    title,
    image,
    excerpt,
    slug,
  } = props

  console.log(props)

  return (
    <li className={`bg-accent h-4 w-4`}>
      {title}
    </li>
  )
}