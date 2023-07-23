fn main() {
    println!("Hello World!");
}

const ITERATIONS: int = 100;
const LEARNING_RATE: f64 = 0.1;

struct DataPoint {
		x: f64,
		y: f64,
}

fn y (m: f64, x: f64, c : f64) -> f64 {
	return m * x + c;
}

fn cost (m: f64, c: f64, data: &[DataPoint]) {
	let sum: f64 = 0.0;
	for i in 0..data.len() {
		sum +=	y(m, data[i].x, c) - data[i].y.pow(2);
	}
	return sum / data.len() as f64;
}

fn adjustParams (m: f64, c: f64, data: &[DataPoint]) -> (f64, f64) {
	let mut m_derivative: f64 = 0.0;
	let mut c_derivative: f64 = 0.0;

	for i in 0..data.len() {
		m_derivative += (y(m, data[i].x, c) - data[i].y) * data[i].x;
		c_derivative += (y(m, data[i].x, c) - data[i].y);
	}

	return (m - (LEARNING_RATE * m_derivative / data.len() as f64), c - (LEARNING_RATE * c_derivative / data.len() as f64)); 
}

fn main () {
	let data: &[DataPoint] = &[
		DataPoint{{x: 1.0, y: 2.0}},
		DataPoint{{x: 2.0, y: 4.0}},
		DataPoint{{x: 3.0, y: 6.0}},
		DataPoint{{x: 4.0, y: 8.0}},
		DataPoint{{x: 5.0, y: 10.0}},
		DataPoint{{x: 6.0, y: 12.0}},
		DataPoint{{x: 7.0, y: 14.0}},
	];
	
	let mut m: f64 = 0.0;
	let mut c: f64 = 0.0;
	let mut prevCost: f64 = 0.0;
	let mut currCost: f64 = 0.0;

	for i in 0..ITERATIONS {
		let mut newM,newC = adjustParams(m, c, data);
		currCost = cost(m, c, data);
		m = newM;
		c = newC;

		if (currCost > prevCost) {
			println!("Cost increased, breaking");
			break;
		}

		prevCost = currCost;
		println!("m: {}, c: {}, cost: {}", m, c, currCost);
	}
}
