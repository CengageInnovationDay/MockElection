Jax5.SelectionBar = function(totalVotes){
    $('#svgHolder').prepend(this.getBars());
    this.totalVotes = totalVotes || 0;
    this.showVotesNeeded();
};

Jax5.SelectionBar.prototype = {
        redrawBars: function(repubVotes, demoVotes) {
            var redPct = Math.ceil((repubVotes / this.totalVotes) * 100);
            var bluePct = Math.ceil((demoVotes / this.totalVotes) * 100);
            $('#democraticBar').css('width',bluePct + '%');
            $('#republicanBar').css('width',redPct + '%');
        },
        setTotalVotes: function(totalVotes){
            this.totalVotes = totalVotes;
            this.showVotesNeeded();
        },
        showVotesNeeded: function(){
            $('#votesNeededArea').text(Math.ceil(this.totalVotes/2));
        },
        getBars: function(){
            return '<div id="votesBar" class="ui-progressbar ui-widget ui-widget-content ui-corner-all">' +
                '<div id="republicanBar"></div><div id="democraticBar"></div>' +
                '</div><div id="middlePointsBar"></div><div id="votesNeededArea"></div>';
        }
};