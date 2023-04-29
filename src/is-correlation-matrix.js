function isCorrelationMatrix(x) {
	try {
		const prop = "@sparkwave/js-data-science-helpers/get-correlation-matrix"
		return x[prop] === Symbol.for(prop)
	}
	catch (e) {
		return false
	}
}

module.exports = isCorrelationMatrix
