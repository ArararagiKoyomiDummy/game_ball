function MainTitle(pController){
	this.pController = pController;
	this.pNode = null;

	//assist
	var self = this;

	this.init = function(){
		var _nodeTitle = $('<div id="main_title">123</div>');
		var _margin = parseInt(pController.pBaseNode.width() * 0.03);
		var _border = pController.pBaseNode.width() - 2 * _margin;
		var _height = parseInt(_border * 0.2);

		_nodeTitle.css({
			"top"	: _margin,
			"left"	: _margin,
			"width"	:_border,
			"height":_height,
			"border":"1px solid white",
			"box-sizing": "border-box"
		});

		self.pNode = _nodeTitle;
		self.pController.pBaseNode.append(_nodeTitle);
	}

	self.init();
}