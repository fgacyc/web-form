let pastoral_team = {
    "wonder kids": [
        "wonder kids"
    ],
    "young warrior": [
        "heart",
        "move",
        "force",
        "voice",
        "mind"
    ],
    "general service": [
        "yp zone",
        "pro family",
        "young dreamer",
        "joshua zone"
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