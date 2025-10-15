import fs from "fs";  // import file system module for reading/writing files

function changeFetch(){
    fetch = function(url){
        const resp = {}
        resp.json = function(){
            return Promise.resolve(JSON.parse(data[url]))
        }
        return Promise.resolve(resp)
    }
}

changeFetch();

const data = {
    "http://api.football-data.org/v4/teams/1903": JSON.stringify({
        id: 1903,
        name: "Manchester United All Stars",
        squad: [
            { name: "Edwin van der Sar" },
            { name: "Rio Ferdinand " },
            { name: "Ryan Giggs" },
            { name: "Cristiano Ronaldo" }
        ]
    }),
    "http://api.football-data.org/v4/teams/496": JSON.stringify({
        id: 496,
        name: "Juventus FC",
        squad: [
            { name: "Wojciech Szczęsny" },
            { name: "Leonardo Bonucci" },
            { name: "Federico Chiesa" },
            { name: "Paulo Dybala" }
        ]
    }),
    "http://api.football-data.org/v4/teams/498": JSON.stringify({
        id: 498,
        name: "AS Roma",
        squad: [
            { name: "Rui Patrício" },
            { name: "Chris Smalling" },
            { name: "Lorenzo Pellegrini" },
            { name: "Tammy Abraham" }
        ]
    }),
    "http://api.football-data.org/v4/teams/503": JSON.stringify({
        id: 503,
        name: "Sporting Clube de Portugal",
        squad: [
            { name: "Rui Silva" },
            { name: "Sebastian Coates" },
            { name: "Francisco Trincão" },
            { name: "Viktor Gyokeres" }
        ]
    }),
    "teams_ids": ["1903", "496", "498", "503"]
}

const teamIds = data["teams_ids"];  // extract the array of team IDs

function printTeams( teamId ){
    const options = {
        headers: {
            "X-Auth-Token" : "a0d78bf1749b4e829b6c7cb16fb4ad9a"  // API authentication token
        }
    }

    return fetch(`http://api.football-data.org/v4/teams/${teamId}`,options)  // make API request for team data
                .then(resp=>resp.json())  // parse response as JSON
                .then(body=> {
                    
                    let playerNames;
                    if (body.squad) {
                        playerNames = body.squad.map(player => player.name);  // extract player names from squad
                    } else {
                        playerNames = [];  // empty array if no squad data
                    }
                    
                    return {
                        id: body.id,
                        name: body.name,
                        players: playerNames  // return team data with player names
                    };
                })
}


// Sequential processing (one team at a time)
async function mainSequential(){

    const teamsData = [];  // array to store teams with players
    
    for (const teamId of teamIds) {  // process each team ID one by one
        try {
            const teamData = await printTeams(teamId);  // fetch team data from API
            // Only include teams that have players
            if (teamData.players && teamData.players.length > 0) {
                teamsData.push(teamData);  // add team to results if it has players
            } else {
                console.log(`Team ${teamId}: No players found`);
            }
        } catch (error) {
            console.error(`Error fetching team ${teamId}:`, error);
        }
    }
    
    // Create output JSON structure
    const output = {
        method: "sequential",
        totalTeams: teamsData.length,
        teams: teamsData  // array of teams with their players
    };
    
    // Write to JSON file
    const fileName = 'teams_sequential.json';
    fs.writeFileSync(fileName, JSON.stringify(output, null, 2));  // write formatted JSON to file
    
    console.log(`Created ${fileName} with ${teamsData.length} teams`);
    
    return teamsData;
}

// Concurrent with Promise.all (wait for all to complete)
function mainPromiseAll(){
    
    const promises = teamIds.map(teamId =>  // create array of promises for all teams
        printTeams(teamId)  // fetch each team concurrently
            .then(teamData => {
                if (teamData.players && teamData.players.length > 0) {
                    return teamData;  // return team data if it has players
                } else {
                    console.log(`Team ${teamId}: No players found`);
                    return null;  // return null if no players
                }
            })
            .catch(error => {
                console.error(`Error fetching team ${teamId}:`, error);
                return null;  // return null on error
            })
    );
    
    Promise.all(promises)  // wait for all promises to complete
        .then(results => {
            // Filter out null results (teams without players or errors)
            const successfulTeams = results.filter(team => team !== null);  // keep only valid teams
            
            // Create output JSON structure
            const output = {
                method: "concurrent",
                totalTeams: successfulTeams.length,
                teams: successfulTeams  // array of successful teams
            };
            
            // Write to JSON file
            const fileName = 'teams_concurrent.json';
            fs.writeFileSync(fileName, JSON.stringify(output, null, 2));  // write formatted JSON to file
            
            console.log(`Created ${fileName} with ${successfulTeams.length} teams`);
        });
}


// Export functions and data for testing
export { printTeams, mainSequential, mainPromiseAll, data };

mainSequential();  // run sequential processing
mainPromiseAll();  // run concurrent processing
