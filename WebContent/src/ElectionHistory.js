Jax5.ElectionHistory = function () {
	this.yearSelected = '2012'
	this.svg = new Jax5.DrawSVG();
	$('#svgHolder').append(this.historyHolder());
    this.$div = $('#electionHisDiv');
    this.div = this.$div.get(0);
    //this.loadHistory();
    this.showHistory();
	this.bar = new Jax5.SelectionBar();
    this.forYear(Jax5.HistoryObject[this.yearSelected]);
    this.setInfoClickEvent();
};

Jax5.ElectionHistory.prototype = {
		historyHolder: function() {
			return '<div id="electionHisDiv" style="width:250px; border:1px dotted green;float:left;"></div>' +
			       '<div id="stateInfo" style="width:250px; border:1px dotted green; float:left;"></div>' ;
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
					that.yearSelected = $(ui.selected).attr('jaxYear')
					that.forYear(Jax5.HistoryObject[that.yearSelected]);
					$('#stateInfo').html('');
				}
			});
		},
		showHistoricalYear: function(data,year) {
			this.listHolder.append('<li jaxYear="' + year + '" class="ui-widget-content">' + year + '</li>');
		
		},
		listCandidates: function(candidates) {
			var toReturn = '';
			$(candidates).each(function(){
				toReturn = toReturn + '<li>' + this.name + ' (' + this.party + ')</li>';
			});
			return toReturn;
		},
        setInfoClickEvent: function() {
			var that = this;
        	$('.state').click(function () {
        		var stateIdentifier = this.id;
        		var data = Jax5.HistoryObject[that.yearSelected];
        		var currentStateData = data.states[stateIdentifier];
        		var info = '';
        		info += '<h1>' + Jax5.stateIdToStateName[stateIdentifier] + '</h1>';
        		info += '<ul>';
        		info += '<li>Total Votes: ' + (currentStateData.totalVotes).toLocaleString() + '</li>';
        		for(candidate in currentStateData) {
	        		if(candidate !== 'totalVotes') {
	        			info += '<li> Candiate: ' + that.findCandidate(data.candidates, candidate) +
	        			  '<ul>' +
	        			     '<li>Votes: ' + (currentStateData[candidate].totalVotes).toLocaleString() + '</li>' +
	        			     '<li>Electoral Votes: ' + (currentStateData[candidate].electoralPoints).toLocaleString() + '</li>' +
	        			  '</ul></li>'
	        		}
        		}

        		info += "</ul>"
        		$('#stateInfo').html(info);        		
        	});
        },
        findCandidate: function(candidates, candidateIndex) {
        	for(var i = 0; i < candidates.length;i++){
        		if(candidates[i].index === candidateIndex){
        			return candidates[i].name;
        		}
        	}
        },
        forYear: function(data) {
    		var allStates =	$('.state');
    		var stateData = data.states;
    		var candidates = data.candidates;
            var demoVotes = 0;
            var repVotes = 0;

    		allStates.each(function() {
    			var state = this;
    		    var stateIdentifier = state.id;
    		    var currentStateData = stateData[stateIdentifier];

    	        var stateWinner, winnerPoints = 0;

    		    for(var candidate in currentStateData) {
    			    if(currentStateData[candidate].electoralPoints && currentStateData[candidate].electoralPoints > winnerPoints){
    			    	stateWinner = candidate;
    			    	winnerPoints = currentStateData[candidate].electoralPoints;
    			    }
    		    }
    		    
    		    $(candidates).each(function() {
    		    	if (this.index === stateWinner) {
    		    		if (this.party === 'Democratic') {
    		    			demoVotes = demoVotes + winnerPoints;
    		    		    $(state).attr("class", "state blue");
    		    		} else if(this.party === 'Republican') {
    		    			repVotes = repVotes + winnerPoints;
    		    			$(state).attr("class", "state red");
    		    		} else {
    		    			$(state).attr("class", "state yellow");
    		    		}
    		    		return;
    		    	}
    		    });
    		});
    		this.bar.setTotalVotes(repVotes + demoVotes);
    		this.bar.redrawBars(repVotes, demoVotes);
        }
};