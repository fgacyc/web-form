import '../../App.css'
import Department from '../Department/Department'
import './team.css'

export default function Team() {
    return (
        <>
            <section className='flex flex-col justify-end overflow-hidden'
                style={{ backgroundImage: "url('../src/images/people_team.png')" }}>
                <div className='overlay'></div>
                <div className='relative' style={{ margin: "30px 50px" }}>
                    <h5>贵宾体验团队</h5>
                    <h2 style={{ fontFamily: "SF Pro Display", fontSize: "2.5rem", fontWeight: 900 }}>People
                        Experience
                        Team
                    </h2><br />
                    <h5 style={{ fontFamily: "SF Pro Display", fontSize: "1rem", fontWeight: 900 }}>People | General Affair | Tech</h5><br />
                    <h6>
                        贵宾体验团队的存在是为了提升每位来到教会的人的整体体验。
                        通过提供良好的体验，相信人更愿意留下联系信息，
                        以便牧养团队能够有效地让人融入我们教会的社群当中。
                    </h6><br />
                    <h6>
                        我们的期待是将牧养过程数据化，
                        以优质的服务态度和数据帮助教会和每个会友在健康的轨道上成长。
                    </h6>
                    <div className='flex flex-col align-center'>
                        <h5 style={{ marginTop: "65px", marginBottom: "10px" }}>理解更多</h5>
                        <img src="../src/icons/down.png" alt="Down Arrow Icon" />
                    </div>
                </div>
            </section>
            <Department team={"people"}/>
        </>
    )
}