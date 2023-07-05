import './department.css'
import Card from '../Card/Card'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState, useEffect } from 'react';
import {handlerSectionScroll} from "../../js/scroll.js";
import {team_data_dict} from "../../data/team_data_dict.js";

export default function Department({ team,sectionNum }) {
    const [isHeightLessThan843, setIsHeightLessThan843] = useState(false);
    // console.log(sectionNum)


    useEffect(() => {
        setIsHeightLessThan843(window.innerHeight < 844);
        setTimeout(() => {
            if (!sectionNum) return;
            handlerSectionScroll(sectionNum);
        }, 500);
    }, []);

    const team_data = team_data_dict;

    // console.log(isHeightLessThan843)

    return (
        <div className='team-bg'>
            {team_data[team].department.individual.map((dep, index) => {
                return (
                    <section key={index} className='flex flex-col justify-center align-center' style={{ margin: "0px 35px" }}>
                        <h5 style={{ fontSize: "1.5rem", fontWeight: "400" }}>{dep.cnDepTitle}</h5>
                        <h2 style={{
                            fontSize: "3rem", fontFamily: "SF Pro Display",
                            fontWeight: "900", color: "#21416D", textAlign: "center"
                        }}>{dep.depTitle}</h2>
                        <h6 style={{ margin: "20px 0px", fontWeight: "700", textAlign: "center" }}>{dep.desc}</h6>
                        <Swiper
                            className='w-full mySwiper depSwiper'
                            // loop={true}
                            style={{ paddingLeft: `${isHeightLessThan843 ? "25px" : "15px"}` }}
                            slidesPerView={2}
                            spaceBetween={isHeightLessThan843 ? 258 : 300}
                        // centeredSlides={true}
                        // onTouchEnd={() => {handleTouchEnd("dep")}}
                        >
                            {
                                dep.ministry.map((ministry, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <Card
                                                img={ministry.img}
                                                title1={ministry.cnMinistryTitle}
                                                title2={ministry.ministryTitle}
                                                description={ministry.desc}
                                                rate1={ministry.rate[0]}
                                                rate2={ministry.rate[1]}
                                            />
                                        </SwiperSlide>
                                    )
                                })
                            }
                            <SwiperSlide></SwiperSlide>
                        </Swiper>
                    </section>
                )
            })}
        </div>
    )
}