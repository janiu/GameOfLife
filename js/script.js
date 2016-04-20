var table;
var table2;
var n = 50;
var m = 50;
var a;
function execute() {

	//var t =new Array(3);;
	//t[0]=5;
	
	/*if(typeof(t[-1])!='undefined'){
		var a = t[0];
		console.log(a);
	}*/

	
	createTable();
	
	
	// showTable();
	// createRule();

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
			//table[i][j] = Math.round(Math.random());
			table[i][j]=0;
		}
	}
// table[20][20]=1;
// table[20][21]=1;
// table[20][22]=1;
// table[21][20]=1;
// table[22][21]=1;
	table[20][20]=1;
	table[21][20]=1;
	table[22][20]=1;
	table[20][21]=1;
	table[21][22]=1;
	for (i = 0; i < n; i++) {
		for (j = 0; j < m; j++) {
			// table[i][j] = Math.round(Math.random());
			table2[i][j]=table[i][j];
		}
	}
// table[20][20]=1;
// table[20][21]=1;
// table[20][22]=1;
// table[100][101]=1;
// table[101][102]=1;
}

function showTable() {
	for (i = 0; i < n; i++) {
		for (j = 0; j < m; j++) {
			document.write(table[i][j]);
		}
		document.write('<br />');
	}
}

function createRule() {
	for (i = 0; i < n ; i++) {
		for (j = 0; j < m ; j++) {
			if ((table[i - 1][j] == 1 && table[i][j] == 0 && table[i + 1][j] == 1)
					|| (table[i - 1][j] == 1 && table[i][j] == 0 && table[i + 1][j] == 0)
					|| (table[i - 1][j] == 0 && table[i][j] == 1 && table[i + 1][j] == 1)
					|| (table[i - 1][j] == 0 && table[i][j] == 1 && table[i + 1][j] == 0)) {
				table[i][j + 1] = 1;
			} else {
				table[i][j + 1] = 0;
			}
		}
	}
}

function updateTable2() {
	var sum;
	for (i = 0; i < n ; i++) {
		for (j = 0; j < m ; j++) {
			if (i == 0 || i == n - 1 || j == 0 || j == m-1) {
				//table[i-1];
				//if(table[i-1] == 'undefined'){
					
				//}
				
			} else {
//			if(table[i-1] == 'undefined'){
//				
//			}
			//else{
				sum = table[i][j + 1] + table[i + 1][j] + table[i][j - 1]
				+ table[i - 1][j] + table[i + 1][j + 1]
				+ table[i - 1][j - 1] + table[i - 1][j + 1]
				+ table[i + 1][j - 1];

			//}
			
				if (table[i][j] == 0) {
					if (sum == 3){
						table2[i][j] = 1;
					}else{
						table2[i][j] = 0;
					}
				} else {
					if (sum == 2 || sum == 3)
						table2[i][j] = 1;
					else
						table2[i][j]=0;
				}
			}
		}
		sum=0;
	}
}

function updateTable1() {
	var sum;
	//var neighbours[8];
	for (i = 1; i < n - 1; i++) {
		for (j = 1; j < m - 1; j++) {
			/*if (i == 0){
				neighbours[0]=0;
				neighbours[1]=0;
				neighbours[2]=0;
			} else{
				neighbours[0]=table[i-1][j-1];
				neighbours[1]=table[i-1][j];
				neighbours[2]=table[i-1][j+1];
			}
			if (i == n - 1){
				neighbours[3]=0;
				neighbours[4]=0;
				neighbours[5]=0;
			} else{
				neighbours[0]=table[i+1][j-1];
				neighbours[1]=table[i+1][j];
				neighbours[2]=table[i+1][j+1];
			}
			if (j == 0){
				neighbours[0]=table[i-1][j-1];
				neighbours[6]=0;
				neighbours[7]=0;
			} else{
				neighbours[0]=table[i-1][j-1];
				neighbours[6]=table[i+1][j+1];
				neighbours[7]=table[i-1][j-1];
			}
			if (j == m-1){
				
			} else{
				
			}*/
					
			// else {
				
				//sum = countActiveNeighbours(neighbours);
				sum = table2[i][j + 1] + table2[i + 1][j] + table2[i][j - 1]
						+ table2[i - 1][j] + table2[i + 1][j + 1]
						+ table2[i - 1][j - 1] + table2[i - 1][j + 1]
						+ table2[i + 1][j - 1];
				if (table2[i][j] == 0) {
					if (sum == 3){
						table[i][j] = 1;
					}else{
						table[i][j] = 0;
					}
				} else {
					if (sum == 2 || sum == 3)
						table[i][j] = 1;
					else
						table[i][j]=0;
				//}
			}
			sum=0;
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
			ctx.fillRect(i*10, j*10, 10, 10);
		}
	}
	// updateTable();
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
			ctx.fillRect(i*10, j*10,10, 10);
		}
	}
	// updateTable();
	setTimeout("draw()", 1000);

}

function countActiveNeighbours (neighbours){
	var sum=0;
	for(i=0 ; i<8 ; i++){
		sum=sum+neighbours[i];
	}
	return sum;
}