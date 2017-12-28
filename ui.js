// Set up the canvas
const canvas = document.getElementById("c")
const ctx = canvas.getContext("2d")
ctx.canvas.width = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth
ctx.canvas.height = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth
const cx = canvas.width / 2
const cy = canvas.height / 2

const attributesUl = document.getElementById("attributes")
const valuesUl = document.getElementById("values")
var attributes = []
var rawValues = []

update()

function addAttributeButtonPressed() {
	const value = document.getElementById("attributeInputField").value

	if (value != "") {
		document.getElementById("attributeInputField").value = ""
		addAttribute(value)
	}
}

function addAttribute(value) {
	if (attributes.findIndex(function(a) { return a == value }) >= 0) {
		return
	}

	attributes.push(value)
	const li = document.createElement("li")
	const p = document.createElement("p")
	p.innerText = value
	p.style = "display: inline"

	const button = document.createElement("button")
	button.innerText = "Remove"
	button.style = "margin-left: 10px"
	button.onclick = function() {
		const index = attributes.findIndex(function(a) { return a == value })

		if (index >= 0) {
			attributes.splice(index, 1)
			li.remove()
		}

		update()
	}

	li.appendChild(p)
	li.appendChild(button)
	attributesUl.appendChild(li)

	update()
}

function addValueButtonPressed() {
	const valueFields = document.getElementById("valueFields")
	var newValues = []

	for (var i = 0; i < valueFields.children.length; i++) {
		if (valueFields.children[i].nodeName == "INPUT") {
			newValues.push(parseFloat(valueFields.children[i].value))
			valueFields.children[i].value = ""
		}
	}

	addValues(newValues)
}

function addValues(newValues) {
	const li = document.createElement("li")
	
	for (var i = 0; i < newValues.length; i++) {
		const p = document.createElement("p")
		p.innerText = newValues[i]
		p.style = "display: inline; margin-left: 10px"
		li.appendChild(p)
	}

	const button = document.createElement("button")
	button.innerText = "Remove"
	button.style = "margin-left: 10px"
	button.onclick = function() {
		const index = rawValues.findIndex(function(a) { return a == newValues })

		if (index >= 0) {
			rawValues.splice(index, 1)
			li.remove()
		}

		update()
	}

	li.appendChild(button)
	valuesUl.appendChild(li)

	rawValues.push(newValues)
	update()
}

function updateValueFields() {
	const div = document.getElementById("valueFields")
	
	while (div.firstChild) {
		div.removeChild(div.firstChild);
	}

	for (var i = 0; i < attributes.length; i++) {
		const p = document.createElement("p")
		const input = document.createElement("input")

		p.innerText = attributes[i]
		div.appendChild(p)
		div.appendChild(input)
		div.appendChild(document.createElement("br"))
	}
}

function update() {
	ctx.restore()
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	for (var i = 0; i < attributesUl.children.length; i++) {
		attributesUl.children[i].firstChild.style.color = colors[i]
	}
	
	if (valuesUl.children.length > 0) {
		document.getElementById("addAttributeButton").disabled = true
		for (var i = 0; i < attributesUl.children.length; i++) {
			attributesUl.children[i].children[1].disabled = true
		}
	}
	else {
		document.getElementById("addAttributeButton").disabled = false
		for (var i = 0; i < attributesUl.children.length; i++) {
			attributesUl.children[i].children[1].disabled = false
		}
	}

	updateValueFields()

	if (attributes.length < 3) {
		ctx.font = "30px Arial"
		ctx.textAlign = "center"
		ctx.fillStyle = "black"
		ctx.fillText("You need at least 3 attributes", cx, cy)
		document.getElementById("addValueButton").disabled = true
		return
	}
	else {
		document.getElementById("addValueButton").disabled = false
	}

	// Defina a new polygon
	const polygon = new Polygon(attributes.length, cy * 0.9, cx, cy)

	const values = document.getElementById("convertCheckBox").checked ? convertValues(rawValues) : rawValues

	for (var i = 0; i < values.length; i++) {
		placeDot(polygon, values[i], colors[i])	
	}
}