import {findMinistryColor, findMinistryName} from "../../data/organization_structure.js";
import  "./selectMinistry.css"

export default function SelectedMinistry({ministry}) {
    const bgColors = {
        backgroundColor : findMinistryColor(ministry)
    }

    return (
        <div
            className="flex flex-col justify-end selected-ministry-con"
            style={bgColors}
        >
            <h4 style={{ color: "white", fontSize: "1rem", fontFamily: "FZChaoCuHei", fontWeight: "400" }}>{findMinistryName(ministry).cn}</h4>
            <h2 style={{ color: "white", fontSize: "1.875rem", fontFamily: "SF Pro Display", fontWeight: "800" }}>
                {findMinistryName(ministry).en}
            </h2>
        </div>
    )
}