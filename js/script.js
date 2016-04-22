var table;
var table2;
var n = 50;
var m = 50;
function execute() {

	createTable();

	 draw2();
	//var a = countActiveNeighbours2(49, 49);
	//console.log(a);
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

//	table[20][20] = 1;    //glider
//	table[21][20] = 1;
//	table[22][20] = 1;
//	table[20][21] = 1;
//	table[21][22] = 1;
	
//	table[20][21] = 1;		//oscylator  
//	table[20][22] = 1;  
//	table[20][23] = 1;  
	
		
//	table[20][21] = 1;  	//zaba
//	table[20][22] = 1;  
//	table[20][23] = 1; 
//	table[21][22] = 1;		  
//	table[21][23] = 1;  
//	table[21][24] = 1;  
	
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
			sum = countActiveNeighbours1(i, j);
			if (table[i][j] == 0) {
				if (sum == 3) {
					if(i==0){

					}
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
		//break;
	}

}

function updateTable1() {
	var sum;
	for (i = 0; i < n; i++) {
		for (j = 0; j < m; j++) {
			sum = countActiveNeighbours2(i, j);
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
	setTimeout("draw2()", 1000);
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
	setTimeout("draw()", 1000);
}

function countActiveNeighbours1(x, y) {
	var sum = 0;
	for (k = x - 1; k <= (x + 1); k++) {
		for (l = y - 1; l <= (y + 1); l++) {
			if (y == l && x == k) {
				continue;
			}
			if (k == -1 || k == n || l == -1 || l == m) {
				continue;
			}
			if (table[k][l] == 1) {
				sum++;
			}
		}
	}
	return sum;
}

function countActiveNeighbours2(x, y) {
	var sum = 0;
	for (k = x - 1; k <= (x + 1); k++) {
		for (l = y - 1; l <= (y + 1); l++) {
			if (y == l && x == k)
				continue;
			if (k == -1 || k == n || l == -1 || l == m) {
				continue;
			}
			if (table2[k][l] == 1) {
				sum++;
			}
		}
	}
	return sum;
}