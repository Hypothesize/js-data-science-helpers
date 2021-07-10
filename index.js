module.exports = {
  clipOutliers: require("./clip-outliers.js"),
  containsOnlyNumbers: require("./contains-only-numbers.js"),
  diagonalize: require("./diagonalize.js"),
  getCorrelationMatrix: require("./get-correlation-matrix.js"),
  getHighlyCorrelatedColumns: require("./get-highly-correlated-columns.js"),
  getMagnitude: require("./get-magnitude.js"),
  getOneHotEncodings: require("./get-one-hot-encodings.js"),
  getPValueMatrix: require("./get-p-value-matrix.js"),
  getPercentages: require("./get-percentages.js"),
  gramSchmidtOrthonormalize: require("./gram-schmidt-orthonormalize.js"),
  inferType: require("./infer-type.js"),
  isBinary: require("./is-binary.js"),
  normalize: require("./normalize.js"),
  pValue: require("./p-value.js"),
  preprocess: require("./preprocess.js"),
  project: require("./project.js"),
  rScore: require("./r-score.js"),
  sortCorrelationMatrix: require("./sort-correlation-matrix.js"),

  dump: function () {
    const self = this

    Object.keys(self).forEach(key => {
      global[key] = self[key]
    })
  },
}
