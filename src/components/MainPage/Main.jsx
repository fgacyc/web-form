import '../../App.css'
import './main.css'
//import MinistryOption from '../MinistryOption/MinistryOption'
import MainCard from '../MainCard/MainCard'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper";
import "../HomePage/Home.css"
import { handleScrollUp } from '../../js/scroll';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';

export default function Main() {
    const swiperRef = useRef(null);

    const team_data = [{
        team: "people",
        cnTeamTitle: "贵宾体验团队",
        teamTile: "People Experience Team",

    }, {
        team: "communication",
        cnTeamTitle: "传媒团队",
        teamTile: "Communication Team",

    }, {
        team: "creative",
        cnTeamTitle: "创意团队",
        teamTile: "Creative Team",

    }, {
        team: "wonderkids",
        cnTeamTitle: "神奇王国",
        teamTile: "Wonderkids",
    }]

    //console.log(team_data[0].cnTeamTitle)
    const navigate = useNavigate();

    const [startX, setStartX] = useState(null);
    const [endX, setEndX] = useState(null);

    const handleTouchStart = (event) => {
        const touch = event.touches[0];
        setStartX(touch.clientX);
    };

    const handleTouchEnd = (event) => {
        if (swiperRef.current && swiperRef.current.contains(event.target)) {
            return;
        }

        const touch = event.changedTouches[0];
        setEndX(touch.clientX);

        const distance = endX - startX;

        if (distance > 50) {
            handleScrollUp();
        }
    };

    const navigateToSearch = () => {
        console.log("navigate to search")
        navigate(`/search`)
    }

    return (
        <section id='main' className='flex flex-col' onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <div id='main-container'>
                {/* <MinistryOption /> */}
                <div id='container'>
                    <h1>一起建造</h1>
                    <h1>属于我们的家</h1>
                    <div id='txt' className='relative'>
                        <img src="../src/icons/search.svg" alt="Search Icon" id='search-icon' />
                        <input type="text" name="search" id="txt-search" placeholder='Search' style={{width: "75%"}} />
                    </div>
                    <h2 id="explore">Explore</h2>
                </div>
                <Swiper
                    ref={swiperRef}
                    style={{ width: "100vw" }}
                    slidesPerView={1}
                    centeredSlides={true}
                    pagination={true}
                    modules={[Pagination]}
                    className="mySwiper mainSwiper"
                // onTouchEnd={() => handleTouchEnd(".mainSwiper")}
                >

                    {
                        team_data.map((team, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <MainCard
                                        img={`../src/images/${team.team}_main.png`}
                                        title1={team.cnTeamTitle}
                                        title2={team.teamTile}
                                        team={team.team}
                                    />
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </section>
    )
}