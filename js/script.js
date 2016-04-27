//(function(){
	


	//document.body.onload = random();
	//document.getElementById("buttonRandom").addEventListener("click", random2);
	
	
	var table;
	var table2;
	var n;
	var m;
	var typeCondition;
	var state;
	var canvas;
	var ctx;
	
	function createTable(){
		canvas= document.getElementById("myCanvas");
		canvas.style.height = n+"px";
		canvas.style.weight = m+"px";
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
				table2[i][j] = table[i][j];
			}
		}
		
		ctx = canvas.getContext("2d");
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
	}
	
	
	function mouse(){				
		canvas.addEventListener('mousedown', function(evt) {
	        var mousePos = getMousePos(canvas, evt);
	      //  var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
	        var tx = Math.round(mousePos.x/10);
	        var ty = Math.round(mousePos.y/10);
	        ctx.fillStyle = "red";
	        ctx.fillRect(tx*10, ty*10, 10, 10);
	        table[tx][ty]=1;
	      }, false);		
	}
	
	function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
        	x: Math.round((evt.clientX-rect.left)/(rect.right-rect.left)*canvas.width),
        	y: Math.round((evt.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height)
        };
      }
	
    function writeMessage(canvas, message) {
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = '18pt Calibri';
        context.fillStyle = 'black';
        context.fillText(message, 10, 25);
      }
    
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
				//var cell = {};
				//cell.state = Math.round(Math.random());
				table[i][j] = Math.round(Math.random());
				table2[i][j] = table[i][j];
				//console.log(table2[i][j].state);
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
		/*for (i = 0; i < n; i++) {
			for (j = 0; j < m; j++) {
				console.log(table2[i][j]);
			}
		}*/
		
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
						table[i][j]= 0;
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
		var temp1 = 0;
		var temp2 = 0;
		for (k = x - 1; k <= (x + 1); k++) {
			for (l = y - 1; l <= (y + 1); l++) {
				temp1 = k;
				temp2 = l;
				if (y == temp2 && x == temp1)
					continue;
				if (temp1 == -1) {
					temp1 = n - 1;
				}
				if (temp1 == n) {
					temp1 = 0;
				}
				if (temp2 == -1) {
					temp2 = m - 1;
				}
				if (temp2 == m) {
					temp2 = 0;
				}
			/*	console.log(temp1);
				console.log(temp2);*/
				if (table[temp1][temp2] == 1)
					sum++;
			}
		}
		return sum;
	}
//}());