import '../../App.css'
import { handleScroll } from '../../js/scroll';
import Department from '../Department/Department'
import './team.css'
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import MinistryOption from "../MinistryOption/MinistryOption.jsx";


export default function Team({ selected_team }) {
    const team = useParams().team || selected_team;
    const sectionNum = useParams().sectionNum;

    const team_data = {
        people: {
            cnTeamTitle: "贵宾体验团队",
            teamTile: "People Experience Team",
            combination: "People | General Affair | Tech",
            desc: ["贵宾体验团队的存在是为了提升每位来到教会的人的整体体验。通过提供良好的体验，相信人更愿意留下联系信息，以便牧养团队能够有效地让人融入我们教会的社群当中。",
                "我们的期待是将牧养过程数据化，以优质的服务态度和数据帮助教会和每个会友在健康的轨道上成长。"],
        },
        communication: {
            cnTeamTitle: "传媒团队",
            teamTile: "Communication Team",
            combination: "Social Media | Design| Photography",
            desc: ["传媒团队存在是为了把神在教会四栋墙内发生的事情带到教会以外的每个角落。我们通过媒体的力量，让那些需要神的人能够找到我们的教会，从网民最终转化为门徒。",
                "我们期待成为一个福音的渠道，让那些不认识耶稣或已经远离神的人回到神的同在里。"],
        },
        creative: {
            cnTeamTitle: "创意团队",
            teamTile: "Creative Team",
            combination: "Production | Arts | Worship",
            desc: ["创意团队存在是为了让每一场聚会都可以承载神的同在。无论是透过舞蹈也好，映像也好，歌曲也好，灯光也好，我们希望能够把神的心意以创意的方式表达出来。",
                "我们期待的不仅仅是让聚会具是有吸引力，更重要的是能够与神配搭，让每一个参与聚会的人都可以被神的爱触摸。"],
        },
        wonderkids: {
            cnTeamTitle: "神奇王国",
            teamTile: "Wonderkids",
            combination: "",
            desc: ["我们相信孩子是天国的宝贝，是上帝所看重的，他们也是下一代的领袖和栋梁！ ",
                "在这里，我们将帮助孩子们塑造品格，提升孩子们的沟通能力、体能建造、提供创意学习的环境，激发孩子的潜能，以及教导他们如何建立友好关系等。"],
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'auto';
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <MinistryOption />
            <section className='flex flex-col justify-end overflow-hidden'
                style={{ backgroundImage: `url('/images/${team}_team.png')` }}>
                <div className='overlay' style={{ marginTop: "50%" }}></div>
                <div className='relative' style={{ margin: "30px 50px" }}>
                    <h5>{team_data[team].cnTeamTitle}</h5>
                    <h2 style={{ fontFamily: "SF Pro Display", fontSize: "2.188rem", fontWeight: 900, color: "white" }}>
                        {team_data[team].teamTile}
                    </h2><br />
                    <h5 style={{ fontFamily: "SF Pro Display", fontSize: "1rem", fontWeight: 900 }}>{team_data[team].combination}</h5><br />
                    {
                        team_data[team].desc.map((desc, index) => {
                            return (
                                <div key={index}>
                                    <h6>{desc}</h6><br />
                                </div>
                            )
                        })
                    }
                    <div className='flex flex-col align-center'
                        style={{ marginBottom: "50px" }}
                        onClick={() => { handleScroll(team !== "wonderkids" ? 3 : 1) }}>
                        <h5 style={{ marginTop: "65px", marginBottom: "10px" }}>理解更多</h5>
                        <img src="/icons/down.png" alt="Down Arrow Icon" />
                    </div>
                </div>
            </section>
            <Department team={team} sectionNum={sectionNum} />
        </>
    )
}