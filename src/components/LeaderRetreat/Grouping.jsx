import { useState } from "react";
import { groupingList } from "./leader_retreat_data";

const GroupingPage = () => {
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
          <div className="retreat-4-text-1">GROUPS</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
            maxWidth: "290px",
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
            {Object.entries(groupingList)
              .filter(([, roomOccupants]) => {
                const matchingOccupants = roomOccupants.filter((occupant) =>
                  occupant.toLowerCase().includes(searchString.toLowerCase())
                );
                return matchingOccupants.length > 0;
              })
              .map(([roomName, roomOccupants]) => {
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
                      Group {roomName}
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

export default GroupingPage;
