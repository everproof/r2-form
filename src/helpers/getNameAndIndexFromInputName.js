const match = (str, pattern) => {
  const firstIndex = 0
  const matches = str.match(pattern)

  return matches ? matches[firstIndex] : null
}

export default name => ({
  index: match(name, /(?!\[)([0-9]+)(?=\])/gi),
  name: match(name, /(^[A-Za-z.]+)/gi),
})
