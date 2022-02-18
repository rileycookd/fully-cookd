export function getClassSizeString(min, max) {
  let minStudents = min ? min : '1'
  let maxStudents = max ? `-${max}` : '+'
  let classSize = `${minStudents}${max !== min ? maxStudents : ''}`
  if(!max && !min) {
    classSize = '1+'
  }
  return classSize
}

export function getClassDurationString(pricing) {
  const durationArray = pricing.map(p => {
    return p.duration
  }).sort((a, b) => {
    return a - b
  })

  const durationRange = durationArray.length > 1
  ? `${durationArray[0] / 60}-${durationArray[durationArray.length - 1] / 60} hour${durationArray[durationArray.length - 1] === 1 ? '' : 's'}`
  : `${durationArray[0] / 60} hour${durationArray[0] === 60 ? '' : 's'}`

  return durationRange
}

export function calculateClassPrice(pricing, packages, classSize, duration, classQuantity) {
  let option = pricing.find(p => p.duration === duration)
  let price = option.price
  let quantityDiscount = packages.find(p => p.quantity === classQuantity).discount / 100
  if(classSize > min && option.classSizeDiscounts.length) {
    let discounts = option.classSizeDiscounts.filter(d => d.size <= classSize)
    price = discounts[discounts.length - 1].price
  } 
  grossPrice = price * classQuantity
  price = grossPriceprice - (grossPrice * quantityDiscount)
  price = (Math.round((price + Number.EPSILON) * 100) / 100).toFixed(2);
  return {
    price,
    grossPrice,
  }
}

export function calculateRegistrationPrice(classType, days, size, chosenPackage) {
  if(classType?.pricing) {
    let durations = days.map(d => d.duration)
    let basePrices = durations.map(d => {
      let classPricing = classType.pricing.find(o => o.duration === Number(d))
      if(size > classType.min && classPricing?.groupDiscounts?.length) {
        let discountSizes = [...classPricing.groupDiscounts]
          .sort((a,b) => a.size - b.size)
          .filter(d => d.size <= size)
        console.log("Group discounts", discountSizes)
        if(discountSizes?.length) {
          return discountSizes[discountSizes.length - 1].price
        } else {
          return classPricing?.price
        }
      } else {
        return classPricing?.price
      }
    })
    let remainder = chosenPackage.quantity % basePrices.length
    let quotient = Math.floor(chosenPackage.quantity / basePrices.length)
    let totalPrices = basePrices.map((p, i) => {
      if(i <= (remainder - 1)) {
        return p * (quotient + 1)
      } else {
        return p * quotient
      }
    })
    let totalPrice = totalPrices.reduce((a, b) => a + b, 0);
    // console.log("Base Prices", basePrices)
    // console.log("Quotient", quotient)
    // console.log("Total Prices", totalPrices)
    // console.log("Total Price", totalPrice)
    return (totalPrice - totalPrice * (chosenPackage.discount / 100)).toFixed(2);
  } else {
    return 0
  }
}

export function range(start, stop, step) {
  return Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step))
}