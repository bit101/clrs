(function() {

	var c = clrs.randomRGB();
	c.bind(document.body.style, "backgroundColor");

	document.addEventListener("mousemove", function(event) {

		c.setRed(event.clientX / window.innerWidth * 255)
		 .setBlue(event.clientY / window.innerHeight * 255);
	});
}());