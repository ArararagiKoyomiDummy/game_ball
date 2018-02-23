function NextBalls(pController, pMainTitle){
	this.pController = pController;
	this.pMainTitle = pMainTitle;

	//this.pNodes = new Array();
	this.pBallList = new Array();

	this.nextBallCount = pController.nextBallCount;

	//assist
	var self = this;

	//init 
	this.init = function(){
		var _ballCount = self.nextBallCount;

		for (var i = 0; i < _ballCount; i++) {

			var _nodeFrame = $('<div class="div_next_balls"></div>');
			var _width	= parseInt(self.pMainTitle.pNode.width() * 0.09);
			var _bottom	= parseInt(self.pMainTitle.pNode.height() * 0.05);
			var _right	= (i + 1) * _bottom + i * _width;

			_nodeFrame.css({
				"bottom":_bottom,
				"right"	:_right,
				"width"	:_width,
				"height":_width,
				"border":"1px solid rgba(200,200,200,0.5)",
				"box-sizing": "border-box"
			});

			self.pBallList[i] = {
				"node"		：_nodeFrame,
				"type"		: null,
				"hasBall"	: false
			}
			self.pMainTitle.pNode.append(_nodeFrame);
		}

		//new 3Balls
		self.fillAllBalls();
	}

	this.useBall = function(index){
		if (self.pBallList[index] == null) {
			alert(self.pBallList);
			alert('Error!');
			return;
		}

		var _node = self.pBallList[index].node;
		if (_node.hasClass('flashOut')) {
			//保险起见，先删除一次
			_node.removeClass('flashOut');
		}
		_node.removeClass('flashOut');

		//set false
		self.pBallList[index].hasBall = false;
	}

	this.fillAllBalls = function(){
		if (!self.isAllBallUsed()) {
			alert('Error! Balls in waiting area have not been used totally.');
			return;
		}

		for (var i in self.pBallList) {
			//清空node
			self.pBallList[i].node.children().remove();

			//开始生成新的ballType
			var _type = random(self.pController.ballTypeCount - 1);
			self.pBallsType[i].type = _type;

			//添加node
			var _ballInfo = __BallInfo.getInfo(_type);
			var _src = "Source/Img/" + _ballInfo.sourceName + ".png";

			var _width	= self.pNodes[i].css('width');
			var _nodeBall = $('<div class="div_ball"></div>');
			_nodeBall.css({
				"width"	:'100%',
				"height":'100%',
				"top"	:"-50%",
				"left"	:"-50%",
				"margin-top"	: "50%",
				"margin-left"	: "50%",
			})
			var _nodeImg = $('<img with="100%" height="100%" src="'+ _src +'" />');
			_nodeBall.append(_nodeImg);

			if (_nodeBall.hasClass('flashIn')) {
				//保险起见，先删除一次
				_nodeBall.removeClass('flashIn');
			}
			_nodeBall.addClass("flashIn");

			//finish
			self.pBallList[i].hasBall = true;
		}
	}

	this.isAllBallUsed = function(){
		for (var i in self.pBallList) {
			if (self.pBallList[i].hasBall == true) {
				return false;
			}
		}
		return true;
	}

	this.getBallList = function(){
		return self.pBallList;
	}

	self.init();
}