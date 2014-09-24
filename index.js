var MAXPEOPLE = 10e5;
var MAXSITE = 100;


$(function () {
	$('#container').highcharts({
		title: {
			text: 'Three kind of sort',
			x: -20 //center
		},

		xAxis: {
			categories: ['0', '1', '2', '3', '4', '5', '6', '7']
		},
		yAxis: {
			title: {
				text: 'time'
			},
			plotLines: [{
				value: 0,
				width: 1,
				color: '#808080'
			}]
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'middle',
			borderWidth: 0
		},
		series: [{
			name: 'plain',
			data: plainSort()
		}, {
			name: 'insert sort',
			data: insertSort()
		}, {
			name: 'heap sort',
			data: heapSort()
		}]
	});
});

function randomData() {
	var data = [];
	for (var i = 0; i < 8; i++)
		data.push(Math.random() * 10);
	return data;
}

function now() {
	return new Date().getTime();
}

function waitTime() {
	return Math.random() * 10;
}

function getPool() {
	var pool = [];
	for (var i = 0; i < MAXSITE; i++)
		pool[i] = 0;
	return pool;
}
function plainSort() {
	var start = new Date().getTime();
	var pool = getPool();
	var data = [];
	for (var k = 0; k < 8; k++) {
		for (var i = 0; i < MAXPEOPLE / 8; i++) {

			//find the shortest queue
			var min = 0x3f3f3f3f;
			var index = 0;
			for (var j = 0; j < MAXSITE / 8; j++) {
				if (pool[i] === 0) {
					min = 0;
					index = j;
					break;
				} else if (pool[i] < min) {
					min = pool[i];
					index = j;
				}
			}
			pool[index] += waitTime();
		}
		data.push((now() - start));
	}
	return data;
}

function insertSort() {
	var start = new Date().getTime();
	var pool = getPool();
	var data = [];
	
	for (var k = 0; k < 8; k++) {
		for (var i = 0; i < MAXPEOPLE / 8; i++) {

			//the first one is the smallest one, then insert it to the correct position.
			var current = pool[0] + waitTime();	
			for (var j = 0; j < MAXSITE; j++)
				if (pool[j] <= current) {
					var tmp = pool[j];
					pool[j] = current;
					pool[0] = tmp;
				}
		}
		data.push((now() - start));
	}

	return data;

}

function heapSort() {
	var start = new Date().getTime();
	var data = [];
	var queue = new PriorityQueue();
	for (var i = 0; i < MAXSITE; i++)
		queue.queue(0);

	for (var k = 0; k < 8; k++) {
		for (var i = 0; i < MAXPEOPLE/ 8; i++) {
			queue.queue(queue.dequeue() + waitTime());
		}
		data.push(now() - start);
	}
	return data;
}
