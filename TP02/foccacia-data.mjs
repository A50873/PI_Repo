const options = {
        headers: {
            "X-Auth-Token" : "a0d78bf1749b4e829b6c7cb16fb4ad9a"  // API authentication token
        }
    }

function getCompetitions() {
    return fetch(`http://api.football-data.org/v4/competitions`, options)
        .then(resp => resp.json())
        .then(body => {
            return {
                code: body.code,
                name: body.name
            }
        }) 
}

export const data = {
    getCompetitions
}

export default data