var gameOfLife = (function() {

	document.addEventListener('DOMContentLoaded', startPage, false);
	var variables = {
		table : [],
		table2 : [],
		n : 50,
		m : 50,
		typeCondition : true,
		canvas : 0,
		ctx : 0

	};
	var elements = {};

	function startPage() {
		elements.buttonRandom = document.getElementById("buttonRandom");
		elements.buttonStartGame = document.getElementById("buttonStartGame");
		elements.buttonGilder = document.getElementById("buttonGilder");
		elements.buttonBlinker = document.getElementById("buttonBlinker");
		elements.buttonBlock = document.getElementById("buttonBlock");
		elements.buttonMouse = document.getElementById("buttonMouse");
		elements.widthTable = document.getElementById("width");
		elements.heightTable = document.getElementById("height");
		elements.canvas = document.getElementById("myCanvas");

		elements.buttonRandom.addEventListener('click', random, false);
		elements.buttonStartGame.addEventListener('click', execute, false);
		elements.buttonGilder.addEventListener('click', glider, false);
		elements.buttonBlinker.addEventListener('click', blinker, false);
		elements.buttonBlock.addEventListener('click', block, false);
		elements.buttonMouse.addEventListener('click', mouse, false);

		variables.ctx = elements.canvas.getContext("2d");

		createTable();
	}

	function createTable() {
		variables.n = elements.widthTable.value;
		variables.m = elements.heightTable.value;
		variables.typeCondition = document.getElementById("periodic").checked;
		variables.table = new Array(variables.n);
		for (var i = 0; i < variables.n; i++) {
			variables.table[i] = new Array(variables.m);
		}
		variables.table2 = new Array(variables.n);
		for (var i = 0; i < variables.n; i++) {
			variables.table2[i] = new Array(variables.m);
		}
		for (var i = 0; i < variables.n; i++) {
			for (var j = 0; j < variables.m; j++) {
				var cell = {
					state : 0
				};
				variables.table[i][j] = {
					state : 0
				};
				variables.table2[i][j] = {
					state : 0
				};
			}
		}
		for (var i = 0; i < variables.n; i++) {
			for (var j = 0; j < variables.m; j++) {
				if (variables.table[i][j].state == 1) {
					variables.ctx.fillStyle = "red";
				} else {
					variables.ctx.fillStyle = "black";
				}
				variables.ctx.fillRect(i * 10, j * 10, 10, 10);
			}
		}
	}

	function mouse() {
		createTable();
		elements.canvas.addEventListener('mousedown', function(evt) {
			var mousePos = getMousePos(elements.canvas, evt);
			var tx = Math.round(mousePos.x / 10);
			var ty = Math.round(mousePos.y / 10);
			variables.ctx.fillStyle = "red";
			variables.ctx.fillRect(tx * 10, ty * 10, 10, 10);
			variables.table[tx][ty].state = 1;
		}, false);
	}

	function getMousePos(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		return {
			x : Math.round((evt.clientX - rect.left) / (rect.right - rect.left)
					* canvas.width),
			y : Math.round((evt.clientY - rect.top) / (rect.bottom - rect.top)
					* canvas.height)
		};
	}

	function random() {
		createTable();
		for (var i = 0; i < variables.n; i++) {
			for (var j = 0; j < variables.m; j++) {
				variables.table[i][j].state = Math.round(Math.random());
				variables.table2[i][j].state = variables.table[i][j].state;
			}
		}
	}

	function glider() {
		createTable();
		variables.table[10][3].state = 1;
		variables.table[11][3].state = 1;
		variables.table[12][3].state = 1;
		variables.table[10][4].state = 1;
		variables.table[11][5].state = 1;
		for (var i = 0; i < variables.n; i++) {
			for (var j = 0; j < variables.m; j++) {
				variables.table2[i][j].state = variables.table[i][j].state;
			}
		}
	}

	function blinker() {
		createTable();
		variables.table[10][10].state = 1;
		variables.table[10][11].state = 1;
		variables.table[10][12].state = 1;
		for (var i = 0; i < variables.n; i++) {
			for (var j = 0; j < variables.m; j++) {
				variables.table2[i][j].state = variables.table[i][j].state;
			}
		}
	}

	function block() {
		createTable();
		variables.table[10][10].state = 1;
		variables.table[11][11].state = 1;
		variables.table[10][11].state = 1;
		variables.table[11][10].state = 1;
		for (var i = 0; i < variables.n; i++) {
			for (var j = 0; j < variables.m; j++) {
				variables.table2[i][j].state = variables.table[i][j].state;
			}
		}
	}

	function execute() {
		variables.typeCondition = document.getElementById("periodic").checked;
		draw2();
	}

	function updateTable2() {
		var sum = 0;
		for (var i = 0; i < variables.n; i++) {
			for (var j = 0; j < variables.m; j++) {
				if (variables.typeCondition == true) {
					sum = countActiveNeighboursPeriodic(i, j, variables.table);
				} else {
					sum = countActiveNeighboursNoPeriodic(i, j, variables.table);
				}
				if (variables.table[i][j].state == 0) {
					if (sum == 3) {
						variables.table2[i][j].state = 1;
					} else {
						variables.table2[i][j].state = 0;
					}
				} else {
					if (sum == 2 || sum == 3) {
						variables.table2[i][j].state = 1;
					} else {
						variables.table2[i][j].state = 0;
					}
				}
			}
		}
	}

	function updateTable1() {
		var sum;
		for (var i = 0; i < variables.n; i++) {
			for (var j = 0; j < variables.m; j++) {
				if (variables.typeCondition == true) {
					sum = countActiveNeighboursPeriodic(i, j, variables.table2);
				} else {
					sum = countActiveNeighboursNoPeriodic(i, j,
							variables.table2);
				}
				if (variables.table2[i][j].state == 0) {
					if (sum == 3) {
						variables.table[i][j].state = 1;
					} else {
						variables.table[i][j].state = 0;
					}
				} else {
					if (sum == 2 || sum == 3) {
						variables.table[i][j].state = 1;
					} else {
						variables.table[i][j].state = 0;
					}
					sum = 0;
				}
			}
		}
	}

	function draw() {
		updateTable1();
		for (var i = 0; i < variables.n; i++) {
			for (var j = 0; j < variables.m; j++) {
				if (variables.table[i][j].state == 1) {
					variables.ctx.fillStyle = "red";
				} else {
					variables.ctx.fillStyle = "black";
				}
				variables.ctx.fillRect(i * 10, j * 10, 10, 10);
			}
		}
		setTimeout(draw2, 50);
	}

	function draw2() {
		updateTable2();
		for (var i = 0; i < variables.n; i++) {
			for (var j = 0; j < variables.m; j++) {
				if (variables.table2[i][j].state == 1) {
					variables.ctx.fillStyle = "red";
				} else {
					variables.ctx.fillStyle = "black";
				}
				variables.ctx.fillRect(i * 10, j * 10, 10, 10);
			}
		}
		setTimeout(draw, 50);
	}

	function countActiveNeighboursNoPeriodic(x, y, table) {
		var sum = 0;
		for (var i = x - 1; i <= (x + 1); i++) {
			for (var j = y - 1; j <= (y + 1); j++) {
				if (y == j && x == i)
					continue;
				if (i == -1 || i == variables.n || j == -1 || j == variables.m)
					continue;
				if (table[i][j].state == 1)
					sum++;
			}
		}
		return sum;
	}

	function countActiveNeighboursPeriodic(x, y, table) {
		var sum = 0;
		var temp1 = 0;
		var temp2 = 0;
		for (var i = x - 1; i <= (x + 1); i++) {
			for (var j = y - 1; j <= (y + 1); j++) {
				temp1 = i;
				temp2 = j;
				if (y == temp2 && x == temp1)
					continue;
				if (temp1 == -1) {
					temp1 = variables.n - 1;
				}
				if (temp1 == variables.n) {
					temp1 = 0;
				}
				if (temp2 == -1) {
					temp2 = variables.m - 1;
				}
				if (temp2 == variables.m) {
					temp2 = 0;
				}
				if (table[temp1][temp2].state == 1)
					sum++;
			}
		}
		return sum;
	}
}());
