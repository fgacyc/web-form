export default function LeaderRegistrationSuccess() {
    return (
        <div className="flex flex-col align-center justify-between"
            style={{ backgroundImage: "url('/images/KV_white_bg.png')", padding: "0px 35px", minHeight: "100vh" }}
        >
            <h3 style={{
                color: "#21416d", fontSize: "1.125rem", fontFamily: "SF Pro Display",
                fontWeight: "600", marginTop: "60px"
            }}>
                Completed
            </h3>
            <img src="/images/completed.png" alt="Complete Icon"
                style={{ marginTop: "10px" }} />
            <div className="flex flex-col">
                <label className="input-text">Your CYC ID</label>
                <div className="div-text">123456</div>
                <label className="input-text">Your Default Password</label>
                <div className="div-text">123456</div>
                <label className="input-text">Member Registration</label>
                <div className="div-text">https://fgacyc.com/serve/attendance</div>
            </div>
            <div className="flex flex-col align-center">
                <img
                    style={{ width: "250px", height: "250px", padding: "15px 0px" }}
                    src="/images/member_registration_qr.png"
                    alt="Member Registration QR Code"
                />
            </div>
            <div>
                <h4 className="complete-h4">© 2023 FGACYC.</h4>
                <h4 className="complete-h4" style={{ marginBottom: "45px" }}>All Rights Reserved</h4>
            </div>
        </div>
    )
}