export default function Complete() {
    return (
        <section className="flex flex-col align-center"
            style={{ backgroundImage: "url('src/assets/images/KV_white_bg.png')", padding: "0px 35px" }}
        >
            <h3 style={{
                color: "#21416d", fontSize: "1.125rem", fontFamily: "SF Pro Display",
                fontWeight: "600", marginTop: "60px"
            }}>
                Completed
            </h3>
            <div className="flex flex-col align-center" style={{ marginTop: "180px" }}>
                <img src="src/assets/images/completed.png" alt="Complete Icon" />
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
                    我们收到你的资料了！请查看你的邮件箱，
                    我们会再通知你面试的详情。
                </h2>
            </div>
        </section>
    )
}