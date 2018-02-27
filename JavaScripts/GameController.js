function GameController(){
	this.pBaseNode = null;
	this.pMainTitle = null;
	this.pMainContent = null;
	this.pNextBalls = null;


	//global config
	this.ballTypeCount = __BallInfo.getAllTypeCount();
	this.cellCountX = 9;
	this.cellCountY = 9;
	this.round = 0;
	this.nextBallCount = 3;
	
	//cells
	this.cells = new Array();
	this.unusedCells = new Array();


	//assist
	var self = this;

	this.initScreen = function(){
		var _width = $(window).width();
		var _height = $(window).height();

		var _nodeScreen = $('<div id="main_screen"></div>');
		if (5 * _width > 4 * _height) {
			//pc端模式
			_nodeScreen.css({
				"width"	:"800px",
				"height":"100%",
				"left"	:"-400px",
				"margin-left": "50%"
			});
		}
		else {
			//移动端模式
			_nodeScreen.css({
				"width"	:"100%",
				"height":"100%",
				"left"	:"-50%",
				"margin-left": "50%"
			});
		}
		self.pBaseNode = _nodeScreen;
		$('body').append(_nodeScreen);

		//init font-size
		var _fontSize = parseInt(_nodeScreen.width() / 40);
		$('html').css({
			"fontSize"	: _fontSize
		})

		//init title
		var _pMainTitle = new MainTitle(self);
		self.pMainTitle = _pMainTitle;

		//init content
		var _pMainContent = new MainContent(self);
		self.pMainContent = _pMainContent;

		//init cells
		self.cells = new Array();
		for (var x = 0; x < self.cellCountX ; ++x) {
			self.cells[x] = new Array();
			for (var y = 0; y < self.cellCountY ; ++y) {
				var _pCell = new Cell(self, self.pMainContent, x, y);
				self.cells[x][y] = _pCell;
			}
		}

		//init unusedCells
		self.initUnusedCells();

		//NextBalls
		var _pNextBalls = new NextBalls(self, self.pMainTitle);
		self.pNextBalls = _pNextBalls;



		//new 3Balls todo delete
		setTimeout(
			function(){
				self.fillBalls();
			},
			1500
		)
		

		//test
		for (var i = 0; i < 27; i++) {
			setTimeout(function(){
				self.fillBalls();
			},
			3000 * (i + 1)
			)
		}
		
	}

	this.fillBalls = function(){
		//showTime();

		var _waitingTime = 500;

		var _ballList = self.pNextBalls.getBallList();
		for (var index in _ballList) {
			console.log(index);

			//check
			if (_ballList[index].hasBall == false) {
				alert(_ballList);
				alert('Error! No ball in the basket!');
				return false;
			}

			//flashOut 等待区的球
			var _time = 0;
			//var _time = _waitingTime * index;
			self.pNextBalls.useBall({
				'index'		: index,
				'waitTime'	: index *_waitingTime,
				'callback'	: {
					'pFun'		: self.newBall,
					'params'	: {'type' : _ballList[index].type},
					'waitTime'	: _time
				}
			});
		}
		setTimeout(
			function(){ self.pNextBalls.fillAllBalls(); },
			_waitingTime * 3
		)
		
	}

	this.newBall = function(params){
		var _type = params.type;

		var _unusedCount = self.unusedCells.length;
		if (_unusedCount <= 0) {
			//没有空格子，则游戏失败
			alert('游戏结束');
			//todo 进入游戏结束结算流程
			return;
		}
		var _randResult = random(_unusedCount -1);
		var _unusedCellXY = self.unusedCells.splice(_randResult,1);

		var _pCell = self.getCell(_unusedCellXY[0].x, _unusedCellXY[0].y);
		if (!_pCell) {
			alert('Error! No Cell is Found!');
			alert(self.cells);
			return;
		}
		//var _type = random(self.ballTypeCount - 1);
		_pCell.newBall(_type);


	}

	this.initUnusedCells = function(){
		self.unusedCells = new Array();
		for (var x in self.cells){
			for (var y in self.cells[x]){
				if (self.cells[x][y] == null) {
					continue;
				}
				self.unusedCells.push({
					"x" : x,
					"y" : y
				})
			}
		}
	}

	this.getCell = function(x, y){
		if (x != parseInt(x) || x < 0 || x > self.cellCountX) {
			return false;
		}
		if (y != parseInt(y) || y < 0 || y > self.cellCountY) {
			return false;
		}
		return self.cells[x][y];
	}

	self.initScreen();
}