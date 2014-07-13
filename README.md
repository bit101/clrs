clrs
====

Color lib for HTML/JS. Lots of easy ways to generate colors for use in CSS or Canvas drawing.

### Static Methods. These return an instance of clrs.color, which can be used in any JavaScript code that requires a color string.

	rgba(r, g, b, a) // define a color using red, green, blue and alpha channels. r, g, b are 0 to 255, a is 0 to 1.

	rgb(r, g, b) // define a color using red, green, blue channels, all 0 to 255.
	
	randomRGB() // defines a random 24-bit (fully opaque) color.
	
	randomGray() // defines a random gray (fully opaque) color.
	
	white() // defines white. equivalent to rgb(255, 255, 255).
	
	black() // defines black. equivalent to rgb(0, 0, 0).
	
	gray(shade) // defines a gray color where shade is a number from 0 to 255.
	
	named(name) // name is a string containing any named CSS color or any color added with the define method.
	
	define(name, r, g, b) // add a color by name, which can then be used by the named method.

	str(str) // str can be a named color ("blue"), a #rgb defined color ("#ffcc00" or "#fc0") or rgb/rgba ("rgb(255,128,0)" or "rgba(255,128,0,0.5)")
	
	num(num) // num is a 24-bit number, often specified by hex: 0xffcc00.
	
	hsv(h, s, v): // define a color using hue, saturation, value.

	lerp(colorA, colorB, t) // defines a new color which is linearly interplated between colorA and colorB. t is a normal value usually between 0 and 1. 

### Examples

	document.body.style.backgroundColor = clrs.rgb(255, 128, 0);

	context2d.fillStyle = clrs.randomRGB();

### Instance Methods. These exist on instanced of color objects returned from any of the static methods.


	bind(object, property) // binds this color to a property of an object so that any time this color changes, the property will be re-set.
	update() // updates any bound property. usually only called internally.
	setRed(r) // sets the red value of this color. chainable.
	getRed() // gets the red value of this color.
	setGreen(g) // sets the green value of this color. chainable.
	getGreen() // gets the green value of this color.
	setBlue(b) // sets the blue value of this color. chainable.
	getBlue() // gets the blue value of this color.
	setAlpha(a) // sets the alpha value of this color. chainable.
	getAlpha() // gets the alpha value of this color.
	setRGB(r, g, b) // sets the r, g and b channels of this color. chainable.
	setRGBA(r, g, b, a) // sets the r, g, b and a channels of this color. chainable.
	toString() // returns string representation of this color. 

### Examples

	// create a color object
	var clr = clrs.rgb(255, 0, 255);

	// bind this color to the body's background color style.
	clr.bind(context, "fillStyle");

	document.body.addEventListener("mousemove", function(event) {
		// when mouse is moved, change red and blue values.
		// body.style.backgroundColor is automatically updated.
		// this also demonstrates chaining.
		clr.setRed(event.clientX / window.innerWidth * 255)
		   .setBlue(event.clientY / window.innerHeight * 255);
		context.fillRect(event.clientX - 10, event.clientY - 10, 20, 20);
	});

Note: use of bind is not necessary, but makes things easier if you are going to be changing the color values and want a property to update. If you are only going to set the color once, you can just say:

	context.fillStyle = clr;

or simply:

	context.fillStyle = clrs.rgb(255, 0, 255);
