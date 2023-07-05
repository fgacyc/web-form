import './search.css'
import SearchCard from '../SearchCard/SearchCard'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    const ministry_data = [{
        img: "../src/images/usher.png",
        cnMinistryTitle: "招待",
        ministryTitle: "Usher",
        desc: ["“WELCOME HOME!” 不是一句可有可无的口号，一句温暖的欢迎加上亲切的笑容，是人们对于 FGACYC 这个 “家” 的第一印象。他们背负着维持聚会秩序的重任、提供指导和帮助，小事细至帮助会众找到座位都由他们一手包办。"],
        rate: [2, 3],
    }, {
        img: "../src/images/security.png",
        cnMinistryTitle: "保安",
        ministryTitle: "Security",
        desc: ["他们的眼神是专注，不是凶狠；他们的姿态是专业，绝非冷漠，他们的衣着很整齐，却无关黑手党。",
            "他们不只是外表富有安全感，他们也是真材实料的能抗能打，他们是接受过紧急响应、解决冲突、急救或人群管理等领域的专门培训！有了他们，少了凌乱，多了安全感。"],
        rate: [2, 2],
    },
    {
        img: "../src/images/admin.png",
        cnMinistryTitle: "行政",
        ministryTitle: "Admin",
        desc: ["“台上三分钟，台下十年工”。这一群或许连三分钟台都未上过的人，日夜用他们精明能干的头脑、牺牲的心肠，在台下应付和整理 FGACYC 大量的资料流量，可说是 FGACYC的支柱！没有了他们的统计，我们可能都没办法透过见证神应许给 FGACYC 爆炸性复兴的时刻！"],
        rate: [3, 2],
    }, {
        img: "../src/images/lounge.png",
        cnMinistryTitle: "膳食",
        ministryTitle: "Lounge",
        desc: ["他们每个星期掌握了几千人的胃！他们不只需要想破脑袋安排每个星期的膳食菜单，还需组织、统筹 FGACYC 聚会每个年龄层的膳食量。如果你是美食达人，对食物有高度的要求，欢迎加入我们！"],
        rate: [2, 3]
    }, {
        img: "../src/images/shuttle.png",
        cnMinistryTitle: "运送",
        ministryTitle: "Shuttle",
        desc: ["由于教会的迅速发展，停车问题日益严重，导致会友和新朋友们有时不得不将车辆停放在较远的地方，然后步行到聚会地点。为了改善每个人来教会的体验，他们提供贴心的运送服务，确保每个人都能享受到愉快的教会体验。 FGACYC 聚会每个年龄层的膳食量。如果你是美食达人，对食物有高度的要求，欢迎加入我们！"],
        rate: [3, 2]
    }, {
        img: "../src/images/software_development.png",
        cnMinistryTitle: "软件开发",
        ministryTitle: "Software Development",
        desc: ["软件开发人员负责将软件项目的需求转化为实际可用的软件应用。他们在软件的设计、编码、测试和维护过程中发挥关键作用，确保软件的功能性、可靠性和可扩展性。透过各种科技的应用，让教会有更完善的管理系统和拓展潜能。FGACYC 大量的资料流量，可说是 FGACYC的支柱！没有了他们的统计，我们可能都没办法透过见证神应许给 FGACYC 爆炸性复兴的时刻！"],
        rate: [5, 2]
    }, {
        img: "../src/images/project_management.png",
        cnMinistryTitle: "项目管理",
        ministryTitle: "Project Management",
        desc: ["项目管理人员负责规划、组织、监督和控制项目的全过程，确保项目按时、按预算和按质量要求完成。他们是技术和需求的桥梁，让教会的需求透过适当的技术和科技能够完善的结合。 FGACYC 聚会每个年龄层的膳食量。如果你是美食达人，对食物有高度的要求，欢迎加入我们！"],
        rate: [4, 2],
    }, {
        img: "../src/images/content_creator.png",
        cnMinistryTitle: "内容创作",
        ministryTitle: "Content Creation",
        desc: ["从内容策划到内容创作、多媒体制作到社交媒体管理，他们的目标是通过创作有吸引力和有价值的属灵内容来吸引和保持受众的关注，并让神家里的故事能够被看见和听见。"],
        rate: [3, 3]
    }, {
        img: "../src/images/editorial.png",
        cnMinistryTitle: "文字编辑",
        ministryTitle: "Editorial",
        desc: ["文字能够传递信息、影响思想、引发情感共鸣、激发行动和改变的力量。他们透过文字的力量，以及精心编辑的文案，把教会里发生的大小事物赋予重大的意义。"],
        rate: [3, 2],
    }, {
        img: "../src/images/graphic_design.png",
        cnMinistryTitle: "平面设计",
        ministryTitle: "Graphic Design",
        desc: ["好的视觉设计能够抓住眼球，开启观众对神和教会的好奇心和兴趣。他们能够让让平平无奇的资讯活过来，透过颜色的运用，巧妙的排版和舒服的视觉效果，让人对神感兴趣。"],
        rate: [5, 2]
    }, {
        img: "../src/images/multimedia_design.png",
        cnMinistryTitle: "多媒体设计",
        ministryTitle: "Multimedia Design",
        desc: ["在这个数码的时代，设计不再只局限于印刷的应用。数码世界的需求也早已超越了静态的设计。多媒体设计师涉及的范围有网页设计、动画和3D制作。让一片黑漆漆的数码屏幕生动起来。"],
        rate: [4, 2],
    }, {
        img: "../src/images/stage_management.png",
        cnMinistryTitle: "舞台监督",
        ministryTitle: "Stage Management",
        desc: ["每场活动幕后的心脏，努力将每一次聚会或演出的创意实现。通过细致入微打磨每个环节，精心处理、管理舞台的各个方面，包括活动的策划与执行、时间管理、与台前幕后工作人员的协调和配搭等，为的就是创造一个身临其境的沉浸式体验给会众。"],
        rate: [2, 2],
    },
    {
        img: "../src/images/multimedia.png",
        cnMinistryTitle: "多媒体",
        ministryTitle: "Multimedia",
        desc: ["多媒体影像画面不但能带来霞撼的视觉效果，同时传递了圣灵的工作，也让网络上的体验到现场的震撼，让聚会更完全地被呈献。也同时透过故事、镜头、光影、音效、特效，来呈现美好的故事，用心的制作来传达内容。"],
        rate: [3, 2],
    },
    {
        img: "../src/images/sound.png",
        cnMinistryTitle: "音响",
        ministryTitle: "Sound",
        desc: ["若每周信息是我们的粮食，讲员就同等于厨师，那音响就如同餐具，少了他们，山珍海味都没办法送进我们的口中！音响组绝非仅仅调节音量，要让会众听到高音准、中音甜、低音稳，那可是一辈子的学习！"],
        rate: [3, 2],
    },
    {
        img: "../src/images/lighting.png",
        cnMinistryTitle: "灯光",
        ministryTitle: "Lighting",
        desc: ["灯光组专为冰冷的舞台涂上层层色彩，是一门不可或缺的艺术。在舞台灯光四射的氛围底下，人们能够更专注投入敬拜神。灯光组员从灯种、色彩温度、亮度到电路，可谓样样精通！"],
        rate: [4, 2],
    },
    {
        img: "../src/images/translation.png",
        cnMinistryTitle: "语言翻译",
        ministryTitle: "Translation",
        desc: ["这里是一个语文专才的集聚地，结众人的力量写出强而有力的字句，高度还原并精准表达原文中的含义。这不仅仅是将某一种语文翻译成另一种语文，它还需要考验你的临场反应，大脑里的词汇量等等。"],
        rate: [2, 2],
    }, {
        img: "../src/images/photography.png",
        cnMinistryTitle: "摄影",
        ministryTitle: "Photography",
        desc: ["属灵的摄影师拥有敏锐圣灵的能力，并能够即时的捕抓神运行的画面。从构图到拍摄，修图到调色，他们透过摄影的创作传递情绪，让神家里发生的大小事物都能被记录和被传播。"],
        rate: [3, 3]
    }, {
        img: "../src/images/dance.png",
        cnMinistryTitle: "舞蹈",
        ministryTitle: "Dance",
        desc: ["赞美神，除了言语歌声外，绝对少不了跳舞！激发你内在的潜能，用肢体语言为主发光吧！以超炫的舞蹈结合强劲的音乐，使舞台散发出吸引年轻人来到教会的魅力！"],
        rate: [3, 2],
    }, {
        img: "../src/images/fashion_and_image.png",
        cnMinistryTitle: "形象设计",
        ministryTitle: "Fashion & Image",
        desc: ["他们负责设计人物造型、化妆以及发型，以一双巧手让路人瞬间变成闪亮明星！自认拥有走在时代尖端的时装品味与妆容嗅觉的你，还等什么？这里就是你发挥所长的好地方！"],
        rate: [3, 3]
    }, {
        img: "../src/images/drama.png",
        cnMinistryTitle: "戏剧",
        ministryTitle: "Drama",
        desc: ["总觉得自己里面住了一个梁朝伟、吴君如？帅过李现、美过刘亦菲？厉害过陈可辛、红过吴宇森？无论是实力派还是偶像派，高颜值也好、谐星也罢，只要爱演的就过来！"],
        rate: [3, 2]
    }, {
        img: "../src/images/vocal.png",
        cnMinistryTitle: "歌手",
        ministryTitle: "Vocal",
        desc: ["如果将歌曲视为我们对神敬拜的一种表达方式，那么歌声就成为了我们不可或缺的工具。一个真正拥有敬拜生命的歌手，不仅仅是能够演唱一首诗歌，更重要的是能够引领神的子民进入神的同在。"],
        rate: [4, 3]
    }, {
        img: "../src/images/musician.png",
        cnMinistryTitle: "乐手",
        ministryTitle: "Musician",
        desc: ["一个敏锐圣灵运行的乐队，能够转化属灵的气氛，让一个聚会从开始到结束都充满着敬拜的氛围。如果你擅长键盘，吉他，贝斯或者是鼓欢迎加入我们！"],
        rate: [5, 3],
    }, {
        img: "../src/images/wonderkids.png",
        cnMinistryTitle: "神奇王国同工",
        ministryTitle: "Children Minister",
        desc: ["“WELCOME HOME!他们充满童真但绝不幼稚，他们善良、友爱、和蔼可亲又温柔，他们肩负培养下一代伟大的使命，喜欢小朋友且愿意耐心教导？来吧！我们需要你！ 不是一句可有可无的口号，一句温暖的欢迎加上亲切的笑容，是人们对于 FGACYC 这个 “家” 的第一印象。他们背负着维持聚会秩序的重任、提供指导和帮助，小事细至帮助会众找到座位都由他们一手包办。"],
        rate: [2, 4],
    }]

    const filteredData = ministry_data.filter((item) =>
        item.ministryTitle.toLowerCase().includes(searchText.toLowerCase()) || item.cnMinistryTitle.includes(searchText)
    );

    const navigateBack = () => {
        navigate(-1);
    }

    return (
        <section style={{ backgroundColor: "#f5f5f8" }} className="flex flex-col">
            <div className="flex" style={{ height: "24px", marginTop: "70px" }}>
                <img src="../src/icons/left.svg" alt="Back Icon" style={{ margin: "0px 35px" }} onClick={navigateBack}/>
                <input type="text" placeholder="Search" className="search-input" value={searchText}
                    onChange={(e) => setSearchText(e.target.value)} />
            </div>
            {
                filteredData.length === 0 ? (<div className="flex flex-col justify-center align-center" style={{ marginTop: "200px" }}>
                    <img src="../src/icons/search.png" alt="Search Icon" />
                    <h3 style={{ color: "black", fontSize: "1.75rem", fontFamily: "SF Pro Display", fontWeight: "700" }}>Item not found</h3>
                    <h4 style={{ color: "black", fontSize: "1rem", fontFamily: "SF Pro Display", fontWeight: "400", opacity: "0.6", textAlign: "center" }}>
                        Try searching the ministry with a different keyword.
                    </h4>
                </div>) : (<div style={{ backgroundColor: "#f9f9f9", marginTop: "30px", borderRadius: "30px 30px 0px 0px" }}>
                    <h1 style={{
                        color: "black", fontSize: "1.75rem", fontFamily: "SF Pro Display",
                        fontWeight: "800", textAlign: "center", margin: "35px 0px"
                    }}>
                        {`Found ${filteredData.length} results`}
                    </h1>
                    <div className='flex justify-between' style={{ flexWrap: "wrap", margin: "0px 25px" }}>
                        {
                            filteredData.map((ministry, index) => {
                                return (
                                    <SearchCard
                                        key={ministry.ministryTitle.toLocaleLowerCase()}
                                        img={`../src/images/${ministry.ministryTitle.toLocaleLowerCase().replace(/\s/g, '_')}.png`}
                                        title1={ministry.cnMinistryTitle}
                                        title2={ministry.ministryTitle} />
                                )
                            })
                        }
                    </div>
                </div>)
            }
        </section>
    )
}