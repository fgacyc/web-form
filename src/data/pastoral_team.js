let pastoral_team = {
    "wonderkids": [
        "wonderkids"
    ],
    "young_warrior": [
        "heart",
        "move",
        "force",
        "voice",
        "mind"
    ],
    "general_service": [
        "yp_zone",
        "pro_family",
        "young_dreamer",
        "joshua_zone"
    ]
}

export function findPastoralTeam(name){
    name = name.toLowerCase();
    let team = "";
    let zone = "";

    for (let key in pastoral_team){
        if (pastoral_team[key].includes(name)){
            team = key;
            zone = name;
            break;
        }
    }
    return [team, zone];
}