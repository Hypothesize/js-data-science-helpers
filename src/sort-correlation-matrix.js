const {
  argmax,
  assert,
  copy,
  isEqual,
  max,
  min,
  pow,
  reverse,
  sum,
  transpose,
} = require("@jrc03c/js-math-tools")

function sortCorrelationMatrix(correlations) {
  assert(
    correlations.get &&
      correlations.values &&
      correlations.columns &&
      correlations.index,
    "You must pass a DataFrame into the `sortCorrelationMatrix` function!"
  )

  assert(
    isEqual(correlations.values, transpose(correlations.values)),
    "The correlations matrix passed into the `sortCorrelationMatrix` function must be symmetrical!"
  )

  assert(
    isEqual(correlations.columns, correlations.index),
    "The correlations matrix passed into the `sortCorrelationMatrix` function must be symmetrical! (In this case, the values themselves are symmetrical, but the row and column names don't match!)"
  )

  assert(
    max(correlations.values) <= 1 && min(correlations.values) >= -1,
    "The correlations matrix passed into the `sortCorrelationMatrix` function must not contain values less than -1 or greater than 1!"
  )

  const freeRows = copy(correlations.index)
  const fixedRows = []

  while (freeRows.length > 0) {
    // get row with greatest 2-norm
    if (fixedRows.length === 0) {
      let highestTwoNorm = 0
      let rowWithHighestTwoNorm = freeRows[0]

      freeRows.forEach((rowName, i) => {
        const values = correlations.values[i]
        const twoNorm = sum(pow(values, 2))

        if (twoNorm > highestTwoNorm) {
          highestTwoNorm = twoNorm
          rowWithHighestTwoNorm = rowName
        }
      })

      fixedRows.push(rowWithHighestTwoNorm)
      freeRows.splice(freeRows.indexOf(rowWithHighestTwoNorm), 1)
    }

    // get free row with highest correlation with first fixed row
    // and fix it
    else {
      const j = correlations.index.indexOf(fixedRows[fixedRows.length - 1])
      const values = copy(correlations.values[j])
      values[j] = -2
      let k = argmax(values)

      while (fixedRows.indexOf(correlations.index[k]) > -1) {
        values[k] = -2
        k = argmax(values)
      }

      const nextRow = correlations.index[k]
      fixedRows.push(nextRow)
      freeRows.splice(freeRows.indexOf(nextRow), 1)
    }
  }

  const reversedFixedRows = reverse(fixedRows)
  return correlations.get(reversedFixedRows, reversedFixedRows)
}

module.exports = sortCorrelationMatrix
