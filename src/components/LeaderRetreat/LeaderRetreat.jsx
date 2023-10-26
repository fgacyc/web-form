/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { roomArrangement } from "../../data/rooms";
import { faq_data } from "./leader_retreat_data";
import ReactFullpage from "@fullpage/react-fullpage";
import "./leaderRetreat.css";
import { useAuth0 } from "@auth0/auth0-react";
import { SiWaze, SiGooglemaps } from "react-icons/si";

const LeaderRetreat1 = ({ onClick }) => {
  return (
    <section
      className="section relative flex flex-col items-center justify-between retreat-bg-1"
      // onTouchStart={handleTouchStart}
      // onTouchEnd={handleTouchEnd}
    >
      {/* <div className='retreat-overlay'></div> */}
      <img
        src="/images/CYC_logo.png"
        alt="CYC Logo"
        id="cyc-logo"
        className="mt-45 relative"
      />
      <div className="relative flex flex-col items-center">
        <img src="/images/retreat_title.png" alt="Leader's Retreat Title" />
        <div className="retreat-date">&quot;CHOSEN 300&quot;</div>
      </div>
      <div className="mb-75">
        <button className="btn-retreat  relative" onClick={onClick}>
          28 - 29 OCT 2023
        </button>
      </div>
    </section>
  );
};

const LeaderRetreat2 = ({ onClick }) => {
  return (
    <section
      className="section flex flex-col items-center justify-between retreat-bg-2"
      // onTouchStart={handleTouchStart}
      // onTouchEnd={handleTouchEnd}
    >
      <div className="flex flex-col items-center mt-12rem">
        <div className="welcome-msg">Welcome to</div>
        <div className="retreat-2-text-1 bg-blend-difference">
          BAYOU LAGOON PARK RESORT
        </div>
        <div className="retreat-2-text-2">MELAKA</div>
      </div>

      <div
        className="mb-75"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <button
          className="btn-retreat maps relative"
          onClick={() =>
            window.open("https://maps.app.goo.gl/JkuXdEhYbSQSKTca8")
          }
        >
          <p
            style={{
              margin: "0",
              verticalAlign: "middle",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            Google Maps
            <SiGooglemaps style={{ marginLeft: "10px" }} />
          </p>
        </button>
        <button
          className="btn-retreat waze relative"
          onClick={() => window.open("https://waze.com/ul/hw22ub0314")}
        >
          <p
            style={{
              margin: "0",
              verticalAlign: "middle",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            WAZE
            <SiWaze style={{ marginLeft: "10px" }} />
          </p>
        </button>
        <button className="btn-retreat relative" onClick={onClick}>
          Scroll
        </button>
      </div>
    </section>
  );
};

const LeaderRetreat3 = () => {
  return (
    <section
      className="section section-3 relative flex flex-col items-center justify-between retreat-bg-3"
      // onTouchStart={handleTouchStart}
      // onTouchEnd={handleTouchEnd}
    >
      <div className="section-3-title">
        <div className="retreat-3-text-1">RETREAT</div>
        <div className="retreat-3-text-1">SCHEDULE</div>
      </div>

      <div className="schedule-box">
        <div className="schedule-main-title">28 OCT (SAT)</div>
        <div className="schedule-item">11.00AM — Doors Open</div>
        <div className="schedule-item">11.15AM — Pre-Show</div>
        <div className="schedule-item">11.30AM — Session 1</div>
        <div className="schedule-item">1.30PM — Lunch + Check In</div>
        <div className="schedule-item">3.00PM — Team Building</div>
        <div className="schedule-item">5.00PM — Break</div>
        <div className="schedule-item">6.30PM — Dinner</div>
        <div className="schedule-item">7.30PM — Doors Open</div>
        <div className="schedule-item">8.00PM — Session 2</div>
        <div className="h-17" />
        <div className="schedule-main-title">29 OCT (SUN)</div>
        <div className="schedule-item">7.00AM — Breakfast</div>
        <div className="schedule-item">9.00AM — Doors Open</div>
        <div className="schedule-item">9.30AM — Session 3 (Part 1)</div>
        <div className="schedule-item">11.00AM — Session 3 (Part 2)</div>
        <div className="schedule-item">12.00PM — Lunch + Check Out</div>
        <div className="schedule-item">1.00PM — Session 4</div>
        <div className="schedule-item">3.00PM — End</div>
        <div className="h-20" />
        <div className="schedule-main-title kids-title">KIDS PROGRAM</div>
        <div className="schedule-item">
          <span className="schedule-head">28 OCT — </span>11.00AM, 3.00PM,
          7.30PM
        </div>
        <div className="schedule-item">
          <span className="schedule-head">29 OCT — </span>9.00AM
        </div>
      </div>
      <div className="align-center my-30 flex flex-col">
        <img src="/images/retreat_title.png" alt="Leader's Retreat Title" />

        {/* <button
          style={{ marginTop: "25px" }}
          className="btn-retreat btn-disabled"
          disabled
        >
          Registrations closed.
        </button> */}

        {/* <button
          className={`btn-retreat ${isAuthenticated ? "activated" : ""}`}
          style={{ marginTop: "25px" }}
          onClick={handleSubmit}
        >
          {isAuthenticated ? "REGISTER" : "SIGN IN"}
        </button> */}
      </div>
    </section>
  );
};

const LeaderRetreat4 = ({ openCollapse, handleToggle }) => {
  return (
    <section
      className="section section-3 relative flex flex-col items-center retreat-bg-1"
      // onTouchStart={handleTouchStart}
      // onTouchEnd={handleTouchEnd}
    >
      <div className="wrapper">
        {/* <div className='retreat-overlay'></div> */}
        <div className="section-3-title">
          <div className="retreat-4-text-1">FAQ</div>
        </div>

        <div
          style={{
            width: "100%",
            // padding: "0 20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "390px",
          }}
        >
          {faq_data.map((data, index) => {
            return (
              <Collapse
                key={index}
                title={data.question}
                content={data.answer}
                isOpen={openCollapse === index}
                onToggle={() => handleToggle(index)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
const LeaderRetreat5 = () => {
  const [searchString, setSearchString] = useState("");
  return (
    <section
      className="section section-3 relative flex flex-col items-center retreat-bg-1"
      // onTouchStart={handleTouchStart}
      // onTouchEnd={handleTouchEnd}
    >
      <div className="wrapper">
        {/* <div className='retreat-overlay'></div> */}
        <div className="section-3-title">
          <div className="retreat-4-text-1">ROOM ARRANGEMENT</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              overflow: "hidden",
              background: "#b3b3b3",
            }}
          >
            <label
              style={{
                color: "white",
                padding: "0 0.5rem",
                textTransform: "uppercase",
              }}
            >
              Name
            </label>
            <input
              style={{
                outline: "none",
                padding: "0.75rem 1rem",
                width: "100%",
                fontFamily: "SF Pro Display",
                fontSize: "16px",
                letterSpacing: "0.025em",
                border: "none",
              }}
              onChange={(e) => setSearchString(e.currentTarget.value)}
            />
          </div>
          <div
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onScroll={(e) => e.stopPropagation()}
            onDrag={(e) => e.stopPropagation()}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              maxHeight: "80vh",
              overflow: "scroll",
              width: "100%",
            }}
          >
            {Object.entries(roomArrangement)
              .filter(([, roomOccupants]) => {
                const matchingOccupants = roomOccupants.filter((occupant) =>
                  occupant.toLowerCase().includes(searchString.toLowerCase())
                );
                return matchingOccupants.length > 0;
              })
              .map(([roomName, roomOccupants]) => {
                const name = roomName.split(" - ")[0];

                return (
                  <div
                    key={roomName}
                    style={{
                      borderRadius: "10px",
                      background: "#000",
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      padding: "1px",
                    }}
                  >
                    <label
                      style={{
                        color: "#fff",
                        fontFamily: "SF Pro Display",
                        fontSize: "18px",
                        paddingLeft: "10px",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                      }}
                    >
                      {name === "BR2"
                        ? "2 BEDROOMS"
                        : name === "BR3"
                        ? "3 BEDROOMS"
                        : name}
                    </label>
                    <div
                      style={{
                        borderRadius: "10px",
                        background: "rgba(255,255,255,0.5)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                        padding: "6px",
                      }}
                    >
                      {roomOccupants.map((d) => (
                        <div
                          style={{
                            fontFamily: "SF Pro Display",
                            fontSize: "18px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                          key={d}
                        >
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        {/* <div
          style={{
            width: "100%",
            // padding: "0 20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "390px",
          }}
        >
          {faq_data.map((data, index) => {
            return (
              <Collapse
                key={index}
                title={data.question}
                content={data.answer}
                isOpen={openCollapse === index}
                onToggle={() => handleToggle(index)}
              />
            );
          })}
        </div> */}
      </div>
    </section>
  );
};

const Collapse = ({ title, content, isOpen, onToggle }) => {
  return (
    <div className="collapse-container">
      <div className="collapse-header" onClick={onToggle}>
        {title}
        <img
          className={`arrow-icon ${isOpen ? "expanded" : ""}`}
          src="/icons/arrow-down.svg"
          alt="Down Arrow Icon"
        />
      </div>
      {isOpen && (
        <div className="collapse-content">
          {content.map((item, index) => {
            return (
              <div key={index}>
                <div>{item}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default function LeaderRetreat() {
  const [openCollapse, setOpenCollapse] = useState();
  useEffect(() => {
    document.querySelector(".fp-watermark")?.classList.add("d-none");
    document
      .querySelector("section.retreat-bg-3 > .fp-overflow")
      ?.classList.add("no-between");
  }, []);

  const handleToggle = (index) => {
    setOpenCollapse((prevIndex) => (prevIndex === index ? undefined : index));
  };
  const { isAuthenticated, isLoading, logout } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated || isLoading) return;
    logout();
  }, [isAuthenticated, isLoading, logout]);

  return (
    <ReactFullpage
      credits={{ enabled: false, label: "" }}
      render={({ fullpageApi }) => (
        <ReactFullpage.Wrapper>
          <LeaderRetreat1
            api={fullpageApi}
            onClick={() => fullpageApi.moveSectionDown()}
          />
          <LeaderRetreat2 onClick={() => fullpageApi.moveSectionDown()} />
          <LeaderRetreat3 />
          <LeaderRetreat4
            openCollapse={openCollapse}
            handleToggle={handleToggle}
          />
          <LeaderRetreat5 />
        </ReactFullpage.Wrapper>
      )}
    />
  );
}
