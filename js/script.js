var table;
var table2;
var n;
var m;
var typeCondition;

function random() {
	n = document.getElementById("width").value;
	m = document.getElementById("height").value;
	table = new Array(n);
	for (i = 0; i < n; i++) {
		table[i] = new Array(m);
	}
	table2 = new Array(n);
	for (i = 0; i < n; i++) {
		table2[i] = new Array(m);
	}
	for (i = 0; i < n; i++) {
		for (j = 0; j < m; j++) {
			table[i][j] = Math.round(Math.random());
		}
	}
	for (i = 0; i < n; i++) {
		for (j = 0; j < m; j++) {
			table2[i][j] = table[i][j];
		}
	}
}

function glider() {
	n = document.getElementById("width").value;
	m = document.getElementById("height").value;
	table = new Array(n);
	for (i = 0; i < n; i++) {
		table[i] = new Array(m);
	}
	table2 = new Array(n);
	for (i = 0; i < n; i++) {
		table2[i] = new Array(m);
	}
	for (i = 0; i < n; i++) {
		for (j = 0; j < m; j++) {
			table[i][j] = 0;
		}
	}
	table[10][3] = 1;
	table[11][3] = 1;
	table[12][3] = 1;
	table[10][4] = 1;
	table[11][5] = 1;
	for (i = 0; i < n; i++) {
		for (j = 0; j < m; j++) {
			table2[i][j] = table[i][j];
		}
	}
}

function blinker() {
	n = document.getElementById("width").value;
	m = document.getElementById("height").value;
	table = new Array(n);
	for (i = 0; i < n; i++) {
		table[i] = new Array(m);
	}
	table2 = new Array(n);
	for (i = 0; i < n; i++) {
		table2[i] = new Array(m);
	}
	for (i = 0; i < n; i++) {
		for (j = 0; j < m; j++) {
			table[i][j] = 0;
		}
	}
	table[10][10] = 1;
	table[10][11] = 1;
	table[10][12] = 1;
	for (i = 0; i < n; i++) {
		for (j = 0; j < m; j++) {
			table2[i][j] = table[i][j];
		}
	}
}

function block() {
	n = document.getElementById("width").value;
	m = document.getElementById("height").value;
	table = new Array(n);
	for (i = 0; i < n; i++) {
		table[i] = new Array(m);
	}
	table2 = new Array(n);
	for (i = 0; i < n; i++) {
		table2[i] = new Array(m);
	}
	for (i = 0; i < n; i++) {
		for (j = 0; j < m; j++) {
			table[i][j] = 0;
		}
	}
	table[10][10] = 1;
	table[11][11] = 1;
	table[10][11] = 1;
	table[11][10] = 1;
	for (i = 0; i < n; i++) {
		for (j = 0; j < m; j++) {
			table2[i][j] = table[i][j];
		}
	}
}

function execute() {
	typeCondition = document.getElementById("periodic").checked;
	draw2();
}


function updateTable2() {
	var sum = 0;
	for (i = 0; i < n; i++) {
		for (j = 0; j < m; j++) {
			if (typeCondition == true) {
				sum = countActiveNeighboursPeriodic(i, j, table);
			} else {
				sum = countActiveNeighboursNoPeriodic(i, j, table);
			}
			if (table[i][j] == 0) {
				if (sum == 3) {
					table2[i][j] = 1;
				} else {
					table2[i][j] = 0;
				}
			} else {
				if (sum == 2 || sum == 3) {
					table2[i][j] = 1;
				} else {
					table2[i][j] = 0;
				}
			}
		}
	}
}

function updateTable1() {
	var sum;
	for (i = 0; i < n; i++) {
		for (j = 0; j < m; j++) {
			if (typeCondition == true) {
				sum = countActiveNeighboursPeriodic(i, j, table2);
			} else {
				sum = countActiveNeighboursNoPeriodic(i, j, table2);
			}
			if (table2[i][j] == 0) {
				if (sum == 3) {
					table[i][j] = 1;
				} else {
					table[i][j] = 0;
				}
			} else {
				if (sum == 2 || sum == 3) {
					table[i][j] = 1;
				} else {
					table[i][j] = 0;
				}
				sum = 0;
			}
		}
	}
}

function draw() {
	updateTable1();
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	for (i = 0; i < n; i++) {
		for (j = 0; j < m; j++) {
			if (table[i][j] == 1) {
				ctx.fillStyle = "red";
			} else {
				ctx.fillStyle = "black";
			}
			ctx.fillRect(i * 10, j * 10, 10, 10);
		}
	}
	setTimeout("draw2()", 50);
}

function draw2() {
	updateTable2();
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	for (i = 0; i < n; i++) {
		for (j = 0; j < m; j++) {
			if (table2[i][j] == 1) {
				ctx.fillStyle = "red";
			} else {
				ctx.fillStyle = "black";
			}
			ctx.fillRect(i * 10, j * 10, 10, 10);
		}
	}
	setTimeout("draw()", 50);
}

function countActiveNeighboursNoPeriodic(x, y, table) {
	var sum = 0;
	for (k = x - 1; k <= (x + 1); k++) {
		for (l = y - 1; l <= (y + 1); l++) {
			if (y == l && x == k)
				continue;
			if (k == -1 || k == n || l == -1 || l == m)
				continue;
			if (table[k][l] == 1)
				sum++;
		}
	}
	return sum;
}

function countActiveNeighboursPeriodic(x, y, table) {
	var sum = 0;
	var licznik = 0;
	for (k = x - 1; k <= (x + 1); k++) {
		for (l = y - 1; l <= (y + 1); l++) {
//			licznik++;
			if (y == l && x == k)
				continue;
			if (k == -1) {
				k = n - 1;
				if (table[k][l] == 1)
					sum++;
				k = -1;
				continue;
			}
			if (k == n) {
				k = 0;
				if (table[k][l] == 1)
					sum++;
				k = n;
				continue;
			}
			if (l == -1) {
				l = m - 1;
				if (table[k][l] == 1)
					sum++;
				l = -1;
				continue;
			}
			if (l == m) {
				l = 0;
				if (table[k][l] == 1)
					sum++;
				l = m;
				continue;
			}

			if (table[k][l] == 1)
				sum++;
//			if (licznik == 9)
//				break;
		}
//		if (licznik == 9)
//			break;
	}
	return sum;
}
