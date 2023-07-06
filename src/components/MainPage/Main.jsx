import '../../App.css'
import './main.css'
//import MinistryOption from '../MinistryOption/MinistryOption'
import MainCard from '../MainCard/MainCard'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper";
import { handlerSectionScroll } from '../../js/scroll';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Main() {
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

    const navigate = useNavigate();

    // useEffect(() => {
    //     document.body.classList.add('no-scroll');

    //     return () => {
    //         // document.body.classList.remove('no-scroll');
    //     };
    // }, []);

    let startY;

    const handleTouchStart = (event) => {
        const touch = event.touches[0];
        startY = touch.clientY;
    };

    const handleTouchEnd = (event) => {
        const touch = event.changedTouches[event.changedTouches.length - 1];
        const deltaY = touch.clientY - startY;

        if (deltaY > 50) {
            setTimeout(() => {
                handlerSectionScroll(1);
            }, 200);
        }
    };

    const navigateToSearch = () => {
        // console.log("navigate to search")
        navigate(`/search`)
    }

    return (
        <section id='main' className='flex flex-col' onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <div id='main-container'>
                {/* <MinistryOption /> */}
                <div id='container'>
                    <h1>一起建造</h1>
                    <h1>属于我们的家</h1>
                    <div id='txt' className='relative search-con' onClick={navigateToSearch}>
                        <img src="/icons/search.svg" alt="Search Icon" id='search-icon' />
                        <input type="text" name="search" id="txt-search" placeholder='Search' style={{ width: "75%" }} />
                    </div>
                    <h2 id="explore">Explore</h2>
                </div>
                <Swiper
                    // ref={swiperRef}
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
                            const imageFormat = team.team === "people" ? "png" : "jpg";
                            const imageName = team.team.toLocaleLowerCase().replace(/\s/g, '_');
                            const img = `/images/${imageName}_main.${imageFormat}`;

                            return (
                                <SwiperSlide key={index}>
                                    <MainCard
                                        img={img}
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