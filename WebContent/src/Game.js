var Game = (function() {

    var public = {};
    var private = {};

    private.issues = ['Do you support abortion?', 'Do you support immigration reform?', 'Do you support the war in Iraq?'];

    private.player = {};
    private.competitor = {};
    private.electionYear = null;


    public.setPlayer = function(player) {
        player.rating = 0;
        private.player = player;
    };

    public.getPlayer = function() {
        return private.player;
    };

    public.setElectionYear = function(year) {
        private.electionYear = year;
    };

    public.getElectionYear = function() {
        return private.electionYear;
    };

    public.setStance = function(issue, stance) {
        if(private.player.stances[issue] !== undefined) {
            private.player.rating -= 1;
        }
        private.player.stances[issue] = stance;
    };

    public.getStance = function(issue) {
        return private.player.stances[issue];
    };

    public.setCompetitor = function(competitor) {
        competitor.rating = 0;
        private.competitor = competitor;
    };

    public.getCompetitor = function() {
        return private.competitor;
    };

    public.pollStatus = function() {
        if(private.competitor.rating === private.player.rating) {
            return 'tie';
        }  else if (private.competitor.rating > private.player.rating) {
            return 'behind';
        } else {
            return 'up';
        }
    };

    public.askQuestion = function() {
        var issue = Math.floor(Math.random() * private.issues.length);
        return private.issues[issue];
    }


    return public;

})();