import { useEffect, useState } from "react";
import "./complete.css"
import { useNavigate } from "react-router-dom";

export default function Complete() {
    const navigate = useNavigate();
    const [isFull, setIsFull] = useState(false);

    // useEffect(() => {
    //     // add condition to check if the ministry is full
    //     setIsFull(true)
    // }, []);

    return (
        <section className="flex flex-col align-center justify-between"
            style={{ backgroundImage: "url('/images/KV_white_bg.png')", padding: "0px 35px" }}
        >
            <h3 style={{
                color: "#21416d", fontSize: "1.125rem", fontFamily: "SF Pro Display",
                fontWeight: "600", marginTop: "60px"
            }}>
                Completed
            </h3>
            <div className="flex flex-col align-center">
                <img src={!isFull ? "/images/completed.png" : "/images/full_completed.png"} alt="Complete Icon"
                    style={{ marginTop: "10px" }} />
                <h4 style={{
                    color: "#173965", fontSize: "2.188rem", fontFamily: "FZChaoCuHei",
                    fontWeight: "400", textAlign: "center", marginTop: "20px"
                }}>
                    谢谢你愿意参与服事
                </h4>
                <h2 style={{
                    color: "black", fontSize: "0.938rem", fontFamily: "Microsoft JhengHei", fontWeight: "700",
                    textAlign: "center", marginTop: "8px", opacity: "0.57"
                }}>
                    {!isFull ? "我们收到你的资料了！请查看你的邮件箱，我们会再通知你面试的详情。" :
                        "我们收到你的资料了。但服事团队的名额已经满了！若有多余的名额，我们会通过邮件另行通知。"}
                </h2>
            </div>
            <button className="btn-finish" onClick={() => navigate("/")} >
                Finish
            </button>
            <div>
                <h4 className="complete-h4">© 2023 FGACYC.</h4>
                <h4 className="complete-h4" style={{ marginBottom: "45px" }}>All Rights Reserved</h4>
            </div>
        </section>
    )
}