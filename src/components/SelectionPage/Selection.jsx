export default function Selection() {
    const color = ["#193A66", "#336397", "#00BB9E", "#E46E48"]

    return (
        <section style={{ backgroundImage: "url('../src/images/KV_white_bg.png')" }} className="flex flex-col justify-between">
            <div className="flex flex-col align-center relative" style={{ marginTop: "30px" }}>
                <img src="../src/icons/cross.png" alt="Cross Icon" style={{
                    position: "absolute", top: "0px", right: "0px",
                    backgroundColor: "#6c5c5c",
                    borderRadius: "100%", padding: "8px",
                    marginRight: "35px"
                }} />
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
                <div style={{width: "70%", overflow: "auto"}}>
                    <div style={{
                        height: "132px", backgroundColor: "#193A66", borderRadius: "20px",
                        boxShadow: "3px 4px 12px 0px rgba(0, 0, 0, 0.25)", padding: 20, margin: "10px 0px",
                    }}
                        className="flex flex-col justify-end"
                    >
                        <h4 style={{ color: "white", fontSize: "1rem", fontFamily: "FZChaoCuHei", fontWeight: "400" }}>摄影</h4>
                        <h2 style={{ color: "white", fontSize: "1.875rem", fontFamily: "SF Pro Display", fontWeight: "800" }}>Photography</h2>
                    </div>
                </div>
            </div>
            {/* <div style={{ margin: "0px 35px" }}>
                <h3 style={{
                    color: "#21416d", fontSize: "1.75rem", fontFamily: "SF Pro Display", fontWeight: "700",
                    textAlign: "center"
                }}>No selection</h3>
                <h4 style={{
                    color: "black", fontSize: "1rem", fontFamily: "SF Pro Display", fontWeight: "400",
                    opacity: "0.6", textAlign: "center"
                }}>
                    Try selecting a ministry
                    by tapping the top right corner
                    of the ministry tile.
                </h4>
            </div> */}
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