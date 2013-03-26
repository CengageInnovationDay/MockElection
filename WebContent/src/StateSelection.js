Jax5.StateSelection = function(){
    new Jax5.DrawSVG();
    this.data = Jax5.HistoryObject['2012'].states;
    this.calculateTotalVotes();
    this.bar = new Jax5.SelectionBar(this.totalVotes);
    this.setClickEvents();
};

Jax5.StateSelection.prototype = {
        calculateTotalVotes: function() {
            this.totalVotes = 0;
            for(state in this.data) {
                var curState = this.data[state];
               for(var candidate in curState){
                   if(curState[candidate].electoralPoints){
                       this.totalVotes += curState[candidate].electoralPoints;
                   }
               } 
            }
        },
        setClickEvents: function () {
            var that = this;
            repubVotes = 0;
            demoVotes = 0;
            $('.state').click(function () {
                var stateObj = that.data[this.id];
                var electoralPoints = 0;
                for(var candidate in stateObj){
                    if(stateObj[candidate].electoralPoints){
                        electoralPoints += stateObj[candidate].electoralPoints;
                    }
                }
                if ($(this).attr("class") === "state red") {
                    $(this).attr("class", "state blue");
                    repubVotes -= electoralPoints;
                    demoVotes += electoralPoints;
                } else if ($(this).attr("class") === "state blue") {
                    $(this).attr("class", "state");
                    demoVotes -= electoralPoints;
                } else {
                    $(this).attr("class", "state red");
                    repubVotes += electoralPoints;
                }
                that.bar.redrawBars(repubVotes, demoVotes);
            });
        }
};