describe('Game', function() {

    var steveJobs, barackObama;

    beforeEach(function() {
        barackObama = {
            'name': 'Barack Obama',
            'state': 'Illinois',
            'party': 'Democrat',
            'stances': {}
        };

        Game.setCompetitor(barackObama);

        steveJobs = {
            'name': 'Steve Jobs',
            'state': 'California',
            'party': 'Democrat',
            'stances': {}
        };

        Game.setPlayer(steveJobs);
    });

    it('should exist', function() {
       expect(Game).toBeDefined();
    });

    it('should have a player', function() {
        var player = Game.getPlayer();

        expect(player.name).toBe('Steve Jobs');
        expect(player.state).toBe('California');
        expect(player.party).toBe('Democrat');
    });


    it('should have an election year', function() {
        Game.setElectionYear(2012);
        var electionYear = Game.getElectionYear();

        expect(electionYear).toBe(2012);
    });

    it('should allow players to set their stance on issues', function() {
        var issue = "Abortion";
        var stance = -1;

        Game.setStance(issue, stance);
        var playerStance = Game.getStance(issue);

        expect(playerStance).toBe(-1);
    });

    it('should give players a base score of 0', function() {
        var player = Game.getPlayer();
        expect(player.rating).toBe(0);
    });

    it('should penalize players for changing their stance', function() {
        var player = Game.getPlayer();

        var issue = 'Abortion';
        var stance = 1;
        Game.setStance(issue, stance);
        var priorRating = player.rating;

        var issue = 'Abortion';
        var stance = -1;
        Game.setStance(issue, stance);
        var newRating = player.rating;

        expect(priorRating).toBeGreaterThan(newRating);
    });

    it('should be able to create a competitor', function() {
        var competitor = Game.getCompetitor();

        expect(competitor.name).toBe('Barack Obama');
    });

    it('should be able to tell you if your ahead in the polls', function() {
        var results = Game.pollStatus();
        expect(results).toBe('tie');
    });

    it('should be able to ask a player how they feel about a given topic', function() {
        expect(typeof Game.askQuestion()).toBe('string');
    });

});