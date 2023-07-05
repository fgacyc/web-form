import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {findMinistryColor, findMinistryName} from "../../data/organization_structure.js";
import "./selection.css"

function SelectionCard({ministry}){


    const backgroundColor = {
        backgroundColor : findMinistryColor(ministry)
    }
    console.log(ministry)
    findMinistryColor(ministry)
    return(
        <div style={{width: "100%", overflow: "auto"}}>
            <div className="flex flex-col justify-end selection-card" style={backgroundColor}>
                <h4 style={{ color: "white", fontSize: "1rem", fontFamily: "FZChaoCuHei", fontWeight: "400" }}>
                    {findMinistryName(ministry).cn}</h4>
                <h2 style={{ color: "white", fontSize: "1.875rem", fontFamily: "SF Pro Display", fontWeight: "800" }}>
                    {findMinistryName(ministry).en}</h2>
            </div>
        </div>
    )
}


export default function Selection() {
    const color = ["#193A66", "#336397", "#00BB9E", "#E46E48"]
    const [ministries, setMinistries] = useState([])

    useEffect(() => {
        setMinistries(JSON.parse(localStorage.getItem('cyc-department-selected')))
    }, [])

    const navigation = useNavigate()

    return (
        <section style={{ backgroundImage: "url('../src/images/KV_white_bg.png')" }} className="flex flex-col justify-between">
            <div className="flex flex-col align-center relative" style={{ marginTop: "30px" }}>
                <img src="../src/icons/cross.png" alt="Cross Icon" style={{
                    position: "absolute", top: "0px", right: "0px",
                    backgroundColor: "#6c5c5c",
                    borderRadius: "100%", padding: "8px",
                    marginRight: "35px"
                }}
                    onClick={() => navigation(-1)}
                />
                <h3 style={{
                    color: "#21416D", fontSize: "1.125rem", fontFamily: "SF Pro Display", fontWeight: "600",
                    textAlign: "center", width: "100%", marginTop: "30px"
                }}>Selection</h3>
                <div className="flex align-center">
                    <img src="../src/icons/swipe.png" alt="Swipe Icon" />
                    <h6 style={{
                        color: "black", fontSize: "0.625rem",
                        fontFamily: "SF Pro Display", fontWeight: "400", marginLeft: "5px"
                    }}>
                        swipe on an item to delete
                    </h6>
                </div>
                <div className="selection-card-con">
                    { ministries && ministries.length > 0 &&
                        ministries.map((ministry, index) => {
                            return (
                                <div key={index} style={{ marginTop: "10px" }}>
                                    <SelectionCard ministry={ministry} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div>

            </div>
            <div style={{ margin: "0px 35px 50px 35px" }}>
                <h6 style={{
                    color: "black", fontSize: "1rem", fontFamily: "SF Pro Display", fontWeight: "400",
                    opacity: "0.57", textAlign: "center"
                }}>Maximum 1 choice</h6>
                <button style={{
                    background: "#173965", color: "white", fontFamily: "SF Pro Display", fontWeight: "900", marginTop: "15px",
                    width: "100%"
                }} >
                    Confirm
                </button>
            </div>
            {/* {
                true ? () : (<div style={{ backgroundColor: "#f9f9f9", marginTop: "30px", borderRadius: "30px 30px 0px 0px" }}>
                    Something here
                </div>)
            } */}
        </section>
    )
}