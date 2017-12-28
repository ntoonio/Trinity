// Create the polygon class
class Polygon {
	constructor (corners, size, x, y) {
		this.corners = corners
		this.size = size
		this.x = x
		this.y = y
		this.points = drawPolygon(this)
	}
}

const colors = ["#3498db", "#2ecc71", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#bdc3c7", "#7f8c8d", "#16a085"]

// Draw a dot at the defines coordinates, with size, filled, and color
function drawDotAt(x, y, r = 1, fill, c = "#FF0000") {
	ctx.beginPath()
	ctx.arc(x, y, r, 0, 2 * Math.PI, false)
	if (fill) {
		ctx.fillStyle = c
		ctx.fill()
	}
	else {
		ctx.strokeStyle = c
		ctx.stroke()
	}
	
	ctx.restore()
}

// Draw a polygon, with the defined size
function drawPolygon(polygon) {
	// Shortcuts
	const corners = polygon.corners
	const width = polygon.size
	const cx = polygon.x
	const cy = polygon.y

	// Define some variables
	var points = []

	// Define some math-variables
	const angle = 2 * Math.PI / corners
	const rotation = -Math.PI / 2

	// Calculate corner positions
	for (var i = 0; i < corners; i++) {
		const x = cx + width * Math.cos(rotation + (i * angle))
		const y = cy + width * Math.sin(rotation + (i * angle))
		
		points[i] = [x, y]
	}

	// Draw the polygon
	ctx.beginPath()
	ctx.moveTo(points[corners - 1][0], points[corners - 1][1])
	
	for (var i = 0; i < corners; i++) {
		const x = points[i][0]
		const y = points[i][1]
		ctx.lineTo(points[i][0], points[i][1])
	}
	
	ctx.strokeStyle = "#000000"
	ctx.stroke()
	ctx.restore()
	
	if (corners <= colors.length) {
		for (var i = 0; i < corners; i++) {
			const x = points[i][0]
			const y = points[i][1]

			ctx.lineWidth = 5;
			drawDotAt(x + (x - cx) * 0.05, y + (y - cy) * 0.05, 5, false, colors[i])
			ctx.lineWidth = 1;
		}
	}

	drawDotAt(cx, cy, 3, false, "#00FF00")
	return points
}

// Place a dot in a polygon
function placeDot(polygon, rawValues, color) {
	// Sum all the values
	const sum = rawValues.reduce(function (a, b) {return a + b}, 0)

	// Calculate ant put the proportion values in an array
	var values = []
	for (var i = 0; i < polygon.corners; i++) {
		values[i] = rawValues[i] / sum
	}

	// Put x and y in the center
	var x = cx
	var y = cy

	// Move x and y according to the values
	for (var i = 0; i < polygon.corners; i++) {
		x += (polygon.points[i][0] - cx) * values[i]
		y += (polygon.points[i][1] - cy) * values[i]
	}

	// Place the final value on the canvas
	drawDotAt(x, y, 3, true, color)
}

function convertValues(values, invert) {
	// Find the highest value for each index
	var maxs = []
	for (var i = 0; i < values.length; i++) {
		if (i != 0 && values[i - 1].length != values[i].length) {
			throw new DOMException("Not the same length")
		}
		
		for (var j = 0; j < values[i].length; j++) {
			if (maxs[j] == undefined || values[i][j] > maxs[j]) {
				maxs[j] = values[i][j]
			}
		}
	}

	// Convert the values
	var output = []
	for (var i = 0; i < values.length; i++) {
		output[i] = []

		for (var j = 0; j < values[i].length; j++) {
			const val = values[i][j] / maxs[j]
			
			output[i][j] = invert != undefined && invert[j] ? 1 - val : val
		}
	}

	return output
}