const young_warrior = {
    "people": 30,
    "general_affair": 10,
    "technology": 10,
    "social_media": 10,
    "design": 3,
    "photography": 6,
    "production": 48,
    "arts": 15,
    "worship": 8,
    "wonderkids": 30
}

const general_service = {
    "people": 50,
    "general_affair": 20,
    "technology": 20,
    "social_media": 20,
    "design": 6,
    "photography": 10,
    "production": 79,
    "arts": 15,
    "worship": 15,
    "wonderkids": 45
}

export function findMinistryNeeds(pastoral_team, department){
    // console.log(pastoral_team, department)
    let needs = {};
    if (pastoral_team === "young_warrior"){
        needs = young_warrior;
    }else if (pastoral_team === "general_service"){
        needs = general_service;
    }else{
        return  0;
    }
    return needs[department];
}