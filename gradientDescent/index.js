const y = (m, x, c) => (m * x) + c

const learningRate = 0.03;
const iterations = 100;

const initialData = [
	{ x: 1, y: 2 },
	{ x: 2, y: 4 },
	{ x: 3, y: 6 },
	{ x: 4, y: 8 },
	{ x: 5, y: 10 },
	{ x: 6, y: 12 },
	{ x: 7, y: 14 },
]

const cost = (m, c) => {
	let sum = 0;
	initialData.forEach((data) => {
		sum += Math.pow((y(m, data.x, c) - data.y), 2);
	})
	return sum / (2 * initialData.length);
}

const adjustParams = (m, c) => {
	let mDerivative = 0;
	let cDerivative = 0;

	initialData.forEach((data) => {
		mDerivative += (y(m, data.x, c) - data.y) * data.x;
		cDerivative += (y(m, data.x, c) - data.y);
	})

	return {
		newM: m - (learningRate * mDerivative) / initialData.length,
		newC: c - (learningRate * cDerivative) / initialData.length
	}
}

const performanceR2 = (m, c) => {
	let sRes = 0, sTot = 0
	const yMean = initialData.reduce((acc, curr) => acc + curr.y, 0) / initialData.length;

	initialData.forEach((data) => {
		sRes += Math.pow((y(m, data.x, c) - data.y), 2);
		sTot = Math.pow((data.y - yMean), 2);
	})

	return 1 - (sRes / sTot);
}

const performanceR2Adjusted = (m, c) => {
	const r2 = performanceR2(m, c)
	const n = initialData.length;
	const p = 1; // number of parameters

	return 1 - ((1 - r2) * (n - 1) / (n - p - 1))
}

const main = () => {
	let m = 1, c = 0;
	let prevCost = 0;
	let currCost = 0;

	for (let i = 0; i < iterations; i++) {
		const { newM, newC } = adjustParams(m, c);
		currCost = cost(m, c);
		if (currCost > prevCost) {
			console.log(`\nCost increased from ${prevCost.toFixed(3)} to ${currCost.toFixed(3)} at iteration ${i + 1}`)
			break;
		}

		m = newM;
		c = newC;
		if (prevCost === 0 || prevCost.toFixed(3) > currCost.toFixed(3)) {
			console.log(i + 1, `cost: ${currCost.toFixed(3)}`)
		}
		prevCost = currCost;
	}
	const r2 = performanceR2(m, c) * 100;
	const adjustedR2 = performanceR2Adjusted(m, c) * 100;

	console.log(`\nR2: ${r2.toFixed(3)}%`)
	console.log(`Adjusted R2: ${adjustedR2.toFixed(3)}%`)
	console.log(`\ny = ${m.toFixed(3)}x + ${c.toFixed(3)}`)
}

main()
