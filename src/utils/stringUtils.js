const getShortName = (name) => {
  let shortName = ''
  const sepStrs = name.split(' ')

  sepStrs.forEach((sepStr) => {
    if (sepStr.length !== 0) shortName += sepStr[0].toUpperCase()
    if (sepStrs.length === 1) shortName += sepStr[1]
  })

  return shortName
}

export default getShortName
