var table;
var table2;
var n = 50;
var m = 50;

function execute() {
	createTable();
	draw2();
}

function createTable() {
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
			// table[i][j] = Math.round(Math.random());
			table[i][j] = 0;
		}
	}

	table[20][3] = 1; // glider
	table[21][3] = 1;
	table[22][3] = 1;
	table[20][4] = 1;
	table[21][5] = 1;

	// table[20][20] = 1; // oscylator no-periodic
	// table[20][21] = 1;
	// table[20][22] = 1;

	// table[20][0] = 1; // oscylator periodic
	// table[20][1] = 1;
	// table[20][49] = 1;

	// table[20][21] = 1; //zaba
	// table[20][22] = 1;
	// table[20][23] = 1;
	// table[21][22] = 1;
	// table[21][23] = 1;
	// table[21][24] = 1;

	// table[20][0] = 1; //kwadrat
	// table[20][1] = 1;
	// table[20][48] = 1;
	// table[20][49] = 1;

	for (i = 0; i < n; i++) {
		for (j = 0; j < m; j++) {
			table2[i][j] = table[i][j];
		}
	}

}

function updateTable2() {
	var sum = 0;
	for (i = 0; i < n; i++) {
		for (j = 0; j < m; j++) {
			// sum = countActiveNeighboursNoPeriodic(i, j, table);
			sum = countActiveNeighboursPeriodic(i, j, table);
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
			// sum = countActiveNeighboursNoPeriodic(i, j, table2);
			sum = countActiveNeighboursPeriodic(i, j, table2);
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
			licznik++;
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
			if (licznik == 9)
				break;
		}
		if (licznik == 9)
			break;
	}
	return sum;
}
