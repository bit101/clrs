(function() {
	var clrs = {

		rgba: function(r, g, b, a) {
			var clr = Object.create(this.color);
			clr.setRGBA(r, g, b, a);
			return clr;
		},

		rgb: function(r, g, b) {
			return this.rgba(r, g, b, 1);
		},

		randomRGB: function() {
			return this.rgb(
				Math.floor(Math.random() * 256), 
				Math.floor(Math.random() * 256), 
				Math.floor(Math.random() * 256)
			);
		},

		randomGray: function() {
			return this.gray(Math.floor(Math.random() * 256));
		},

		white: function() {
			return this.rgb(255, 255, 255);
		},

		black: function() {
			return this.rgb(0, 0, 0);
		},

		gray: function(shade) {
			return this.rgb(shade, shade, shade);
		},

		named: function(name) {
			var vals = this.colorMap[name];
			if(vals) {
				return this.rgba(vals[0], vals[1], vals[2], 1);
			}
			return null;
		},

		define: function(name, r, g, b) {
			this.colorMap[name] = [r, g, b];
		},

		str: function(str) {
			var red, green, blue, alpha;
			if(str.charAt(0) === "#") {
				str = str.substring(1);
				if(str.length === 8) {
					alpha = parseInt("0x" + str.substring(0, 2), 16) / 255;
					red = parseInt("0x" + str.substring(2, 4), 16);
					green = parseInt("0x" + str.substring(4, 6), 16);
					blue = parseInt("0x" + str.substring(6, 8), 16);
					return this.rgba(red, green, blue, alpha);
				}
				if(str.length === 6) {
					red = parseInt("0x" + str.substring(0, 2), 16);
					green = parseInt("0x" + str.substring(2, 4), 16);
					blue = parseInt("0x" + str.substring(4, 6), 16);
					return this.rgb(red, green, blue);
				}
				if(str.length === 3) {
					red = parseInt("0x" + str.charAt(0), 16);
					green = parseInt("0x" + str.charAt(1), 16);
					blue = parseInt("0x" + str.charAt(2), 16);
					return this.rgb(red << 4 | red, green << 4 | green, blue << 4 | blue);
				}		
			}
			else if(str.indexOf("rgb(") != -1) {
				var start = str.indexOf("(") + 1,
					end = str.indexOf(")");
					vals = str.substring(start, end).split(",");
				console.log(vals);
				return this.rgb(parseInt(vals[0]), parseInt(vals[1]), parseInt(vals[2]));
			}
			else if(str.indexOf("rgba(") != -1) {
				var start = str.indexOf("(") + 1,
					end = str.indexOf(")");
					vals = str.substring(start, end).split(",");
				console.log(vals);
				return this.rgba(parseInt(vals[0]), parseInt(vals[1]), parseInt(vals[2]), parseFloat(vals[3]));
			}
			else if(this.colorMap[str]) {
				return this.named(str);
			}
			return this.black();
		},

		num: function(num) {
			var red = num >> 16,
				green = num >> 8 & 0xff,
				blue = num & 0xff;
			return this.rgb(red, green, blue);
		},

		hsv: function(h, s, v) {
			var r, g, b,
				i = Math.floor(h * 6),
				f = h * 6 - i,
				p = v * (1 - s),
				q = v * (1 - f * s),
				t = v * (1 - (1 - f) * s);
			switch (i % 6) {
				case 0: r = v, g = t, b = p; break;
				case 1: r = q, g = v, b = p; break;
				case 2: r = p, g = v, b = t; break;
				case 3: r = p, g = q, b = v; break;
				case 4: r = t, g = p, b = v; break;
				case 5: r = v, g = p, b = q; break;
			}
			return this.rgb(
				Math.floor(r * 255),
				Math.floor(g * 255),
				Math.floor(b * 255)
			);
		}, 

		// rgbToHsl: function(r, g, b) {
		// 	r /= 255, g /= 255, b /= 255;
		// 	var max = Math.max(r, g, b), min = Math.min(r, g, b);
		// 	var h, s, l = (max + min) / 2;

		// 	if(max == min){
		// 		h = s = 0; // achromatic
		// 	}
		// 	else {
		// 		var d = max - min;
		// 		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		// 		switch(max){
		// 			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
		// 			case g: h = (b - r) / d + 2; break;
		// 			case b: h = (r - g) / d + 4; break;
		// 		}
		// 		h /= 6;
		// 	}

		// 	return [h, s, l];
		// },	
		
		lerp: function(colorA, colorB, t) {
			var redDelta = colorB.getRed() - colorA.getRed(),
				greenDelta = colorB.getGreen() - colorA.getGreen(),
				blueDelta = colorB.getBlue() - colorA.getBlue(),
				alphaDelta = colorB.getAlpha() - colorA.getAlpha();
				console.log(t);
			return this.rgba(
				colorA.getRed() + redDelta * t,
				colorA.getGreen() + greenDelta * t,
				colorA.getBlue() + blueDelta * t,
				colorA.getAlpha() + alphaDelta * t
			);
		},

		colorMap: {
			blueviolet: [138,43,226],
			brown: [165,42,42],
			aliceblue: [240,248,255],
			antiquewhite: [250,235,215],
			aqua: [0,255,255],
			aquamarine: [127,255,212],
			azure: [240,255,255],
			beige: [245,245,220],
			bisque: [255,228,196],
			black: [0,0,0],
			blanchedalmond: [255,235,205],
			blue: [0,0,255],
			burlywood: [222,184,135],
			cadetblue: [95,158,160],
			chartreuse: [127,255,0],
			chocolate: [210,105,30],
			coral: [255,127,80],
			cornflowerblue: [100,149,237],
			cornsilk: [255,248,220],
			crimson: [220,20,60],
			cyan: [0,255,255],
			darkblue: [0,0,139],
			darkcyan: [0,139,139],
			darkgoldenrod: [184,134,11],
			darkgray: [169,169,169],
			darkgreen: [0,100,0],
			darkgrey: [169,169,169],
			darkkhaki: [189,183,107],
			darkmagenta: [139,0,139],
			darkolivegreen: [85,107,47],
			darkorange: [255,140,0],
			darkorchid: [153,50,204],
			darkred: [139,0,0],
			darksalmon: [233,150,122],
			darkseagreen: [143,188,143],
			darkslateblue: [72,61,139],
			darkslategray: [47,79,79],
			darkslategrey: [47,79,79],
			darkturquoise: [0,206,209],
			darkviolet: [148,0,211],
			deeppink: [255,20,147],
			deepskyblue: [0,191,255],
			dimgray: [105,105,105],
			dimgrey: [105,105,105],
			dodgerblue: [30,144,255],
			firebrick: [178,34,34],
			floralwhite: [255,250,240],
			forestgreen: [34,139,34],
			fuchsia: [255,0,255],
			gainsboro: [220,220,220],
			ghostwhite: [248,248,255],
			gold: [255,215,0],
			goldenrod: [218,165,32],
			gray: [128,128,128],
			green: [0,128,0],
			greenyellow: [173,255,47],
			grey: [128,128,128],
			honeydew: [240,255,240],
			hotpink: [255,105,180],
			indianred: [205,92,92],
			indigo: [75,0,130],
			ivory: [255,255,240],
			khaki: [240,230,140],
			lavender: [230,230,250],
			lavenderblush: [255,240,245],
			lawngreen: [124,252,0],
			lemonchiffon: [255,250,205],
			lightblue: [173,216,230],
			lightcoral: [240,128,128],
			lightcyan: [224,255,255],
			lightgoldenrodyellow: [250,250,210],
			lightgray: [211,211,211],
			lightgreen: [144,238,144],
			lightgrey: [211,211,211],
			lightpink: [255,182,193],
			lightsalmon: [255,160,122],
			lightseagreen: [32,178,170],
			lightskyblue: [135,206,250],
			lightslategray: [119,136,153],
			lightslategrey: [119,136,153],
			lightsteelblue: [176,196,222],
			lightyellow: [255,255,224],
			lime: [0,255,0],
			limegreen: [50,205,50],
			linen: [250,240,230],
			magenta: [255,0,255],
			maroon: [128,0,0],
			mediumaquamarine: [102,205,170],
			mediumblue: [0,0,205],
			mediumorchid: [186,85,211],
			mediumpurple: [147,112,219],
			mediumseagreen: [60,179,113],
			mediumslateblue: [123,104,238],
			mediumspringgreen: [0,250,154],
			mediumturquoise: [72,209,204],
			mediumvioletred: [199,21,133],
			midnightblue: [25,25,112],
			mintcream: [245,255,250],
			mistyrose: [255,228,225],
			moccasin: [255,228,181],
			navajowhite: [255,222,173],
			navy: [0,0,128],
			oldlace: [253,245,230],
			olive: [128,128,0],
			olivedrab: [107,142,35],
			orange: [255,165,0],
			orangered: [255,69,0],
			orchid: [218,112,214],
			palegoldenrod: [238,232,170],
			palegreen: [152,251,152],
			paleturquoise: [175,238,238],
			palevioletred: [219,112,147],
			papayawhip: [255,239,213],
			peachpuff: [255,218,185],
			peru: [205,133,63],
			pink: [255,192,203],
			plum: [221,160,221],
			powderblue: [176,224,230],
			purple: [128,0,128],
			rebeccapurple: [102,51,153],
			red: [255,0,0],
			rosybrown: [188,143,143],
			royalblue: [65,105,225],
			saddlebrown: [139,69,19],
			salmon: [250,128,114],
			sandybrown: [244,164,96],
			seagreen: [46,139,87],
			seashell: [255,245,238],
			sienna: [160,82,45],
			silver: [192,192,192],
			skyblue: [135,206,235],
			slateblue: [106,90,205],
			slategray: [112,128,144],
			slategrey: [112,128,144],
			snow: [255,250,250],
			springgreen: [0,255,127],
			steelblue: [70,130,180],
			tan: [210,180,140],
			teal: [0,128,128],
			thistle: [216,191,216],
			tomato: [255,99,71],
			turquoise: [64,224,208],
			violet: [238,130,238],
			wheat: [245,222,179],
			white: [255,255,255],
			whitesmoke: [245,245,245],
			yellow: [255,255,0],
			yellowgreen: [154,205,50]
		}
	};

	clrs.color = {
		_r: 255,
		_g: 255,
		_b: 255,
		_a: 1,
		_boundObject: null,
		_boundProperty: null,

		bind: function(object, property) {
			this._boundObject = object;
			this._boundProperty = property;
			this.update();
		},

		update: function() {
			if(this._boundObject) {
				this._boundObject[this._boundProperty] = this.toString();
			}
		},

		setRed: function(r) {
			this._r = r;
			this.update();
			return this;
		},

		getRed: function() {
			return this._r;
		},

		setGreen: function(g) {
			this._g = g;
			this.update();
			return this;
		},

		getGreen: function() {
			return this._g;
		},

		setBlue: function(b) {
			this._b = b;
			this.update();
			return this;
		},

		getBlue: function() {
			return this._b;
		},

		setAlpha: function(a) {
			this._a = a;
			this.update();
			return this;
		},

		getAlpha: function() {
			return this._a;
		},

		setRGB: function(r, g, b) {
			return this.setRGBA(r, g, b, 1);
		},

		setRGBA: function(r, g, b, a) {
			this._r = r;
			this._g = g;
			this._b = b;
			this._a = a;
			this.update();
			return this;
		},

		toString: function() {
			return "rgba(" + Math.floor(this._r) + "," + Math.floor(this._g) + "," + Math.floor(this._b) + "," + this._a + ")";
		}
	};

	if (typeof define === "function" && define.amd) {
	    define(clrs);
	} else {
	   window.clrs = clrs;
	}

}());


