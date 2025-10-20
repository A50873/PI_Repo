import fs from "fs";  // import file system module for reading/writing files

const data = JSON.parse(fs.readFileSync("liga.json", "utf8"));  // read and parse the JSON file

function main(){

    const teamsData = [];

    for( const team of data ) {
        if( team.goals > 10 ) {
            teamsData.push(team);
        }
    }

    const output = {
        totalTeams: teamsData.length,
        teams: teamsData
    };

    const fileName = 'teams_with_more_than_10_goals.json';
    fs.writeFileSync(fileName, JSON.stringify(output, null, 2));

    console.log(`Created ${fileName} with ${teamsData.length} teams`);
    
    return teamsData;
}

main();