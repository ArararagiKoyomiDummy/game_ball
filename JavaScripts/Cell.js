function Cell(pController, pMainContent, x, y){
	this.pController = pController;
	this.pMainContent = pMainContent;
	this.x = x;
	this.y = y;
	this.pNode = null;
	//ball
	this.pBall = null;
	//assist
	var self = this;

	this.init = function(){
		var _border	= parseInt(self.pMainContent.pNode.width() * 0.01);
		var _width	= parseInt(self.pMainContent.pNode.width() * 0.11);
		var _top	= _border + self.y * _width;
		var _left	= _border + self.x * _width;


		var _nodeCell = $('<div class="div_cell"></div>');
		_nodeCell.css({
			"top"	:_top,
			"left"	:_left,
			"width"	:_width,
			"height":_width,
			"border":"1px solid rgba(200,200,200,0.5)",
			"box-sizing": "border-box"
		})

		self.pNode = _nodeCell;
		self.pMainContent.pNode.append(_nodeCell);
	}

	this.newBall = function(type){
		if (self.pBall != null) {
			alert('Error! the Cell in x:' + self.x + ' y:' + self.y + ' had a ball.');
			alert(self.pBall);
			return false;
		}
		var _pBall = new Ball(
				self.pController,
				self.pMainContent,
				self,
				type
			);
		self.pBall = _pBall;
	}

	self.init();
}