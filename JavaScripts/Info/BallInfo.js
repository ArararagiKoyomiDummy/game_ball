function BallInfo(){
	this.info = new Array();

	//assist
	var self = this;
	this.init = function(){
		var _infoCount = 7;
		for (var i = 0; i < _infoCount; ++i) {
			var _id = i;
			var _sourceName = "ballEx_" + i;
			this.info[i] = {
				"id"			: _id,
				"sourceName"	: _sourceName
			}
		}
	}

	this.getInfo = function(id){
		return self.info[id];
	}

	this.getAllTypeCount = function(){
		return self.info.length;
	}

	self.init();
}

var __BallInfo = new BallInfo();