Jax5.ElectionHistory = function () {
	this.svg = new Jax5.DrawSVG();
	$('#svgHolder').append(this.historyHolder());
    this.$div = $('#electionHisDiv');
    this.div = this.$div.get(0);
    //this.loadHistory();
    this.showHistory();
    this.svg.forYear(Jax5.HistoryObject['2012']);
};

Jax5.ElectionHistory.prototype = {
//    calculateTotalVotes: function(data) {
//	    var totalVotes = 0;
//	    for(state in data) {
//	        var curState = data[state];
//	       for(var candidate in curState) {
//	           if(curState[candidate].electoralPoints) {
//	               totalVotes += curState[candidate].electoralPoints;
//	           }
//	       } 
//	    }
//	    return totalVotes;
//	},
		historyHolder: function() {
			return '<div id="electionHisDiv" style="width:200px;border:1px dotted green;float:left;"></div>';
		},
//		loadHistory: function(){
//			var that = this;
//			$.ajax('src/PresidentalElectionHistory.json', {
//				dataType: 'json',
//				success: function(data, status, xhr) {
//					that.showHistory(data);
//				},
//				error: function(xhr, status, errorThrown) {
//					console.log('Error loading PresidentalElectionHistory.json: ' + errorThrown);
//				}
//			});
//		},
		showHistory: function(/*data*/){
			var that = this;
			var data = Jax5.HistoryObject;
			this.$div.append('<ul id="theGreatList"></ul>');
			this.listHolder = $('#theGreatList');
			$(data.years).each(function(){
				if(data[this]){
					that.showHistoricalYear(data[this],this);
				}
			});
			this.listHolder.selectable({
				selected: function(event, ui) {
				that.svg.forYear(Jax5.HistoryObject[$(ui.selected).attr('jaxYear')]);
				}
			});
		},
		showHistoricalYear: function(data,year) {
			//this.$div.append("<div id='asdf'> <button class='yearSelection'>" + year + ': <ul>' + this.listCandidates(data.candidates) + '</ul>' + '</button> </div>');

			this.listHolder.append('<li jaxYear="' + year + '" class="ui-widget-content">' + year + '</li>');
		
		},
		listCandidates: function(candidates) {
			var toReturn = '';
			$(candidates).each(function(){
				toReturn = toReturn + '<li>' + this.name + ' (' + this.party + ')</li>';
			});
			return toReturn;
		}
};