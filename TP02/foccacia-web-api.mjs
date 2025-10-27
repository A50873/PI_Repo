import services from "./foccacia-services.mjs"

function getCompetitions(req, resp) {
    console.log(req.query)
    resp.json(services.getCompetitions())
}

export const webapi = {
    getCompetitions
}

export default webapi