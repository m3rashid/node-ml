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

const main = () => {
	let m = 1, c = 0;
	let prevCost = 0;
	let currCost = 0;

	for (let i = 0; i < iterations; i++) {
		const { newM, newC } = adjustParams(m, c);
		currCost = cost(m, c);

		m = newM;
		c = newC;
		if (prevCost === 0 || prevCost.toFixed(3) > currCost.toFixed(3)) {
			console.log(i + 1, `cost: ${currCost.toFixed(3)}`)
		}
		prevCost = currCost;
	}
	console.log(`\ny = ${m.toFixed(3)}x + ${c.toFixed(3)}`)
}

main()
