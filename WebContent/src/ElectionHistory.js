Jax5.ElectionHistory = function () {
	var svg = new Jax5.DrawSVG();
	$('#svgHolder').append(this.historyHolder());
    this.$div = $('#electionHisDiv');
    this.div = this.$div.get(0);
    //this.loadHistory();
    this.showHistory();
    svg.forYear(Jax5.HistoryObject['2012']);
};

Jax5.ElectionHistory.prototype = {
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
			$(data.years).each(function(){
				if(data[this]){
					that.showHistoricalYear(data[this],this);
				}
			});
		},
		showHistoricalYear: function(data,year){
			this.$div.append('<div>' + year + ':<br />' + this.listCandidates(data.candidates));
		},
		listCandidates: function(candidates){
			var toReturn = '';
			$(candidates).each(function(){
				toReturn = toReturn + this.name + ' (' + this.party + ')<br />';
			});
			return toReturn;
		}
};