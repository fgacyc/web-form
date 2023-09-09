/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { faq_data } from "./leader_retreat_data";
import ReactFullpage from "@fullpage/react-fullpage";
import { useAuth0 } from "@auth0/auth0-react";
import "./leaderRetreat.css";

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
        <div className="retreat-date">28 - 29 OCT 2023</div>
      </div>
      <button className="btn-retreat mb-75 relative" onClick={onClick}>
        SIGN UP
      </button>
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
      <div className="flex flex-col items-center">
        <div className="retreat-2-text-1 bg-blend-difference">
          BAYOU LAGOON PARK RESORT
        </div>
        <div className="retreat-2-text-2">MELAKA</div>
      </div>
      <button className="btn-retreat mb-75 relative" onClick={onClick}>
        SIGN UP
      </button>
    </section>
  );
};

const LeaderRetreat3 = ({
  openCollapse,
  handleToggle,
  // handleTouchStart,
  // handleTouchEnd,
  handleSubmit,
  user,
}) => {
  return (
    <section
      className="section relative flex flex-col items-center justify-between retreat-bg-3"
      // onTouchStart={handleTouchStart}
      // onTouchEnd={handleTouchEnd}
    >
      <div className="retreat-3-text-1">FAQ</div>

      <div>
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
      <div className="align-center mt-25 mb-75 flex flex-col">
        <img src="/images/retreat_title.png" alt="Leader's Retreat Title" />

        <button
          className="btn-retreat"
          style={{ marginTop: "25px" }}
          onClick={handleSubmit}
        >
          {user ? "REGISTER" : "SIGN IN"}
        </button>
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
                <br />
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
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  useEffect(() => {
    document.querySelector(".fp-watermark")?.classList.add("d-none");
  }, []);

  const handleToggle = (index) => {
    setOpenCollapse((prevIndex) => (prevIndex === index ? undefined : index));
  };

  return (
    <ReactFullpage
      credits={{ enabled: false, label: "" }}
      render={({ fullpageApi }) => (
        <ReactFullpage.Wrapper>
          <LeaderRetreat1 onClick={() => fullpageApi.moveSectionDown()} />
          <LeaderRetreat2
            // handleTouchStart={handleTouchStart}
            // handleTouchEnd={handleTouchEnd(1)}
            onClick={() => fullpageApi.moveSectionDown()}
          />
          <LeaderRetreat3
            openCollapse={openCollapse}
            handleToggle={handleToggle}
            // handleTouchStart={handleTouchStart}
            // handleTouchEnd={handleTouchEnd(2)}
            handleSubmit={!isAuthenticated ? loginWithRedirect : undefined}
            user={user}
          />
        </ReactFullpage.Wrapper>
      )}
    />
  );
}
