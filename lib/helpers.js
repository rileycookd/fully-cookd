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