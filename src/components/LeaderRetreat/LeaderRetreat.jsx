/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { faq_data } from "./leader_retreat_data";
import ReactFullpage from "@fullpage/react-fullpage";
import "./leaderRetreat.css";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

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
        <div className="btn-retreat-title-text">28 - 29 OCT 2023</div>
        <button className="btn-retreat relative" onClick={onClick}>
          SCROLL
        </button>
      </div>
    </section>
  );
};

const LeaderRetreat2 = () => {
  return (
    <section
      className="section flex flex-col items-center justify-between retreat-bg-2"
      // onTouchStart={handleTouchStart}
      // onTouchEnd={handleTouchEnd}
    >
      <div className="flex flex-col items-center">
        <div className="retreat-2-text-1 bg-blend-difference">
          BAYOU LAGOON PARK RESORT
        </div>
        <div className="retreat-2-text-2">MELAKA</div>
      </div>
    </section>
  );
};

const LeaderRetreat3 = ({
  openCollapse,
  handleToggle,
  // handleTouchStart,
  // handleTouchEnd,
  // handleSubmit,
  // isAuthenticated,
}) => {
  return (
    <section
      className="section relative flex flex-col items-center justify-between retreat-bg-3"
      // onTouchStart={handleTouchStart}
      // onTouchEnd={handleTouchEnd}
    >
      <div className="retreat-3-text-1">FAQ</div>

      <div
        style={{
          width: "100%",
          padding: "0 20px",
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
      <div className="align-center my-30 flex flex-col">
        <img src="/images/retreat_title.png" alt="Leader's Retreat Title" />

        <button
          style={{ marginTop: "25px" }}
          className="btn-retreat btn-disabled"
          disabled
        >
          Registrations closed.
        </button>

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
  const navigate = useNavigate();
  useEffect(() => {
    document.querySelector(".fp-watermark")?.classList.add("d-none");
    document
      .querySelector("section.retreat-bg-3 > .fp-overflow")
      ?.classList.add("no-between");
  }, []);

  const handleToggle = (index) => {
    setOpenCollapse((prevIndex) => (prevIndex === index ? undefined : index));
  };
  const { isAuthenticated, loginWithRedirect, isLoading, logout } = useAuth0();

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
          <LeaderRetreat2
          // handleTouchStart={handleTouchStart}
          // handleTouchEnd={handleTouchEnd(1)}
          />
          <LeaderRetreat3
            openCollapse={openCollapse}
            handleToggle={handleToggle}
            isAuthenticated={isAuthenticated}
            // handleTouchStart={handleTouchStart}
            // handleTouchEnd={handleTouchEnd(2)}
            handleSubmit={() => {
              if (isAuthenticated) navigate("/register");
              if (!isAuthenticated) loginWithRedirect();
            }}
          />
        </ReactFullpage.Wrapper>
      )}
    />
  );
}
