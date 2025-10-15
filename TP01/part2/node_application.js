import fs from "fs";

const data = JSON.parse(fs.readFileSync("teams_ids.json", "utf8"));
const teamIds = data["teams_ids"];

function printTeams( teamId ){
    const options = {
        headers: {
            "X-Auth-Token" : "a0d78bf1749b4e829b6c7cb16fb4ad9a"
        }
    }

    return fetch(`http://api.football-data.org/v4/teams/${teamId}`,options)
                .then(resp=>resp.json())
                .then(body=> {
                    
                    let playerNames;
                    if (body.squad) {
                        playerNames = body.squad.map(player => player.name);
                    } else {
                        playerNames = [];
                    }
                    
                    return {
                        id: body.id,
                        name: body.name,
                        players: playerNames
                    };
                })
}


// Sequential processing (one team at a time)
async function mainSequential(){

    const teamsData = [];
    
    for (const teamId of teamIds) {
        try {
            const teamData = await printTeams(teamId);
            // Only include teams that have players
            if (teamData.players && teamData.players.length > 0) {
                teamsData.push(teamData);
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
        teams: teamsData
    };
    
    // Write to JSON file
    const fileName = 'teams_sequential.json';
    fs.writeFileSync(fileName, JSON.stringify(output, null, 2));
    
    console.log(`Created ${fileName} with ${teamsData.length} teams`);
    
    return teamsData;
}

// Concurrent with Promise.all (wait for all to complete)
function mainPromiseAll(){
    
    const promises = teamIds.map(teamId => 
        printTeams(teamId)
            .then(teamData => {
                if (teamData.players && teamData.players.length > 0) {
                    return teamData;
                } else {
                    console.log(`Team ${teamId}: No players found`);
                    return null;
                }
            })
            .catch(error => {
                console.error(`Error fetching team ${teamId}:`, error);
                return null;
            })
    );
    
    Promise.all(promises)
        .then(results => {
            // Filter out null results (teams without players or errors)
            const successfulTeams = results.filter(team => team !== null);
            
            // Create output JSON structure
            const output = {
                method: "concurrent",
                totalTeams: successfulTeams.length,
                teams: successfulTeams
            };
            
            // Write to JSON file
            const fileName = 'teams_concurrent.json';
            fs.writeFileSync(fileName, JSON.stringify(output, null, 2));
            
            console.log(`Created ${fileName} with ${successfulTeams.length} teams`);
        });
}


mainSequential();
mainPromiseAll();
