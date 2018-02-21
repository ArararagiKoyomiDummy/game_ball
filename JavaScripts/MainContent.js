function MainContent(pController){
	this.pController = pController;
	this.pNode = null;

	//assist
	var self = this;

	this.init = function(){
		var _nodeContent = $('<div id="main_content"></div>');
		var _margin = parseInt(pController.pBaseNode.width() * 0.03);
		var _border = pController.pBaseNode.width() - 2 * _margin;
		var _top = pController.pMainTitle.pNode.height() + 2 * _margin;
		
		_nodeContent.css({
			"top"	:_top,
			"left"	:_margin,
			"width"	:_border,
			"height":_border,
			"border":"1px solid white",
			"box-sizing": "border-box"
		});

		self.pNode = _nodeContent;
		self.pController.pBaseNode.append(_nodeContent);


		//init pCells

	}

	self.init();
}