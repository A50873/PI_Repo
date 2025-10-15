import {expect} from 'chai';
import { printTeams, mainSequential, mainPromiseAll, data } from '../node_application_for_tests.js';

describe('Node Application Tests', () => {

    it('Should fetch team data using printTeams function', async () => {
        const teamData = await printTeams('1903');
        const expectedTeamData = JSON.parse(data["http://api.football-data.org/v4/teams/1903"]);
        
        expect(teamData).to.have.property('id', 1903);
        expect(teamData).to.have.property('name', expectedTeamData.name);
        expect(teamData).to.have.property('players');
        expect(teamData.players).to.be.an('array');
        expect(teamData.players).to.have.length(4);
        
        // Check specific player names from Manchester United All Stars
        expect(teamData.players).to.include('Edwin van der Sar');
        expect(teamData.players).to.include('Cristiano Ronaldo');
    });

    it('Should process all teams using mainSequential function', async () => {
        const result = await mainSequential();
        
        expect(result).to.be.an('array');
        expect(result).to.have.length(4);
        
        // Check that player names from each team are processed correctly
        const teamById = {};
        result.forEach(team => {
            expect(team.players).to.have.length(4);
            expect(team).to.have.property('id');
            expect(team).to.have.property('name');
            teamById[team.id] = team;
        });
        
        // Verify specific players from each team
        expect(teamById[1903].players).to.include('Edwin van der Sar'); // Manchester United
        expect(teamById[496].players).to.include('Wojciech Szczęsny');  // Juventus
        expect(teamById[498].players).to.include('Rui Patrício');       // AS Roma
        expect(teamById[503].players).to.include('Viktor Gyokeres');     // Sporting CP
    });

    it('Should validate data structure has correct team IDs', () => {
        const teamIds = data["teams_ids"];
        expect(teamIds).to.deep.equal(["1903", "496", "498", "503"]);
        expect(teamIds).to.have.length(4);
    });

    it('Should fetch Juventus team correctly', async () => {
        const teamData = await printTeams('496');
        const expectedData = JSON.parse(data["http://api.football-data.org/v4/teams/496"]);
        
        expect(teamData.id).to.equal(496);
        expect(teamData.name).to.equal(expectedData.name);
        expect(teamData.players).to.include('Leonardo Bonucci');
        expect(teamData.players).to.include('Paulo Dybala');
    });

    it('Should verify all teams have valid structure', async () => {
        const allTeams = await mainSequential();
        
        allTeams.forEach(team => {
            expect(team).to.have.all.keys('id', 'name', 'players');
            expect(team.id).to.be.a('number');
            expect(team.name).to.be.a('string');
            expect(team.players).to.be.an('array').that.is.not.empty;
        });
    });
})