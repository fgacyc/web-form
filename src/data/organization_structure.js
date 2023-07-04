const organization_structure = {
    "people_experience": {
        "people": [
            "usher",
            "security"
        ],
        "general_affair": [
            "admin",
            "lounge",
            "shuttle"
        ],
        "technology": [
            "software development",
            "project management"
        ]
    },
    "communication": {
        "social_media": [
            "content creation",
            "editorial"
        ],
        "design": [
            "graphic design",
            "multimedia design"
        ],
        "photography": [
            "photography"
        ]
    },
    "creative": {
        "production": [
            "stage management",
            "multimedia",
            "sound",
            "lighting",
            "translation"
        ],
        "arts": [
            "dance",
            "fashion&image",
            "drama"
        ],
        "worship": [
            "vocal",
            "musician"
        ]
    },
    "wonderkids": {
        "wonderkids": [
            "children minister"
        ]
    }
}

export function findMinistry(name){
    // return team name, department name, ministry name
    if (name ==="Fashion & Image") return ["creative", "arts", "fashion&image"];
    name = name.toLowerCase();

    let ministry = "";
    let department = "";
    let team = "";
    for (let key in organization_structure) {
        for (let subkey in organization_structure[key]) {
            for (let subsubkey in organization_structure[key][subkey]) {
                if (organization_structure[key][subkey][subsubkey] === name) {
                    team= key;
                    department = subkey;
                    ministry = name;
                    break;
                }
            }
        }
    }
    return [team, department, ministry];
}