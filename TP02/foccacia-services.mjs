import data from "./foccacia-data.mjs"

function getCompetitions(limit){
    //verificar se limite é valido (e.g. positivo) 
    return data.getCompetitions()
}

export const services = {
    getCompetitions
}

export default services