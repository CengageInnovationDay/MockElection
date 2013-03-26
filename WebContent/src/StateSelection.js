Jax5.StateSelection = function(){
    new Jax5.DrawSVG();
    this.data = Jax5.HistoryObject['2012'].states;
    this.calculateTotalVotes();
    this.bar = new Jax5.SelectionBar(this.totalVotes);
    this.generateStatesList();
    this.setClickEvents();
    this.repubVotes = 0;
    this.demoVotes = 0;
};

Jax5.StateSelection.prototype = {
        calculateTotalVotes: function() {
            var curState;
            this.totalVotes = 0;
            for(state in this.data) {
               curState = this.data[state];
               for(var candidate in curState){
                   if(curState[candidate].electoralPoints){
                       this.totalVotes += curState[candidate].electoralPoints;
                   }
               } 
            }
        },
        generateStatesList: function() {
            var totalStateVotes, curState;
            $('#svgHolder').append('<ul id="statesList"></ul>');
            var statesHolder = $('#statesList');
            for(state in this.data){
                totalStateVotes = 0;
                curState = this.data[state];
                for(var candidate in curState){
                    if(curState[candidate].electoralPoints){
                        totalStateVotes += curState[candidate].electoralPoints;
                    }
                }
                statesHolder.append('<li jaxID="' + state + '" class="ui-widget-content stateListItem">' + state + '<span>' + totalStateVotes + '</span></li>');
            }
        },
        setClickEvents: function () {
            this.stateClickEvent();
            this.stateListClickEvent();
        },
        stateClickEvent: function(){
            var that = this;
            $('.state').click(function () {
                var stateid = this.id;
                var svgState = this;
                var listState = $('#statesList LI[jaxID="' + stateid + '"]');
                that.handleStateClick(stateid,svgState,listState);
            });
        },
        stateListClickEvent: function(){
            var that = this;
            $('.stateListItem').click(function(){
                var stateID = $(this).attr('jaxID');
                var svgState = $('#' + stateID);
                var listState = $(this);
                that.handleStateClick(stateID, svgState, listState);
            });
        },
        handleStateClick: function(stateid,svgState,listState){
            var stateObj = this.data[stateid];
            var electoralPoints = 0;
            for(var candidate in stateObj){
                if(stateObj[candidate].electoralPoints){
                    electoralPoints += stateObj[candidate].electoralPoints;
                }
            }
            if ($(svgState).attr("class") === "state red") {
                $(svgState).attr("class", "state blue");
                listState.removeClass('red').addClass('blue');
                this.repubVotes -= electoralPoints;
                this.demoVotes += electoralPoints;
            } else if ($(svgState).attr("class") === "state blue") {
                $(svgState).attr("class", "state");
                listState.removeClass('blue');
                this.demoVotes -= electoralPoints;
            } else {
                $(svgState).attr("class", "state red");
                listState.addClass('red');
                this.repubVotes += electoralPoints;
                
            }
            this.bar.redrawBars(this.repubVotes, this.demoVotes);
        }
};