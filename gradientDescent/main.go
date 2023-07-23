package main

import (
	"fmt"
	"math"
)

const (
	learningRate = 0.03
	iterations   = 100
)

type DataPoint struct {
	x, y float64
}

func y(m, x, c float64) float64 {
	return m*x + c
}

func toFixed3(f float64, unit ...float64) float64 {
	newUnit := 0.001
	if len(unit) > 0 {
		newUnit = unit[0]
	}
	return math.Trunc(f/newUnit) * newUnit
}

func cost(m, c float64, data []DataPoint) float64 {
	sum := 0.0
	for _, point := range data {
		sum += math.Pow(y(m, point.x, c)-point.y, 2.0)
	}
	return float64(sum) / float64(len(data))
}

func adjustParams(m, c float64, data []DataPoint) (float64, float64) {
	var mDerivative, cDerivative float64 = 0.0, 0.0
	for _, point := range data {
		mDerivative += (y(m, point.x, c) - point.y) * point.x
		cDerivative += (y(m, point.x, c) - point.y)
	}

	return (m - (learningRate * mDerivative / float64(len(data)))), c - (learningRate * cDerivative / float64(len(data)))
}

func main() {

	var initialData = []DataPoint{
		{1, 2},
		{2, 4},
		{3, 6},
		{4, 8},
		{5, 10},
		{6, 12},
		{7, 14},
	}

	m, c := 1.0, 0.0
	prevCost, currCost := 0.0, 0.0

	for i := 0; i < iterations; i++ {
		newM, newC := adjustParams(m, c, initialData)
		currCost = cost(m, c, initialData)
		m = newM
		c = newC

		if prevCost == 0 || toFixed3(prevCost) > toFixed3(currCost) {
			fmt.Printf("%d cost = %.3f\n", i+1, currCost)
		}
		prevCost = currCost
	}
	fmt.Printf("\ny = %.3fx + %.3f\n", m, c)
}
