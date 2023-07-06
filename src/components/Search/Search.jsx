import './search.css'
import SearchCard from '../SearchCard/SearchCard'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ministry_search_data_list } from "../../data/ministry_search_data.js";

export default function Search() {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    const ministry_data = ministry_search_data_list;

    const filteredData = ministry_data.filter((item) =>
        item.ministryTitle.toLowerCase().includes(searchText.toLowerCase()) || item.cnMinistryTitle.includes(searchText)
        || item.department.toLowerCase().includes(searchText.toLowerCase())
        || item.cnDepartment.includes(searchText)
    );

    const navigateBack = () => {
        navigate(-1);
    }

    return (
        <section style={{ backgroundColor: "#f5f5f8" }} className="flex flex-col">
            <div className="flex" style={{ height: "24px", marginTop: "70px" }}>
                <img src="/icons/left.svg" alt="Back Icon" style={{ margin: "0px 35px" }} onClick={navigateBack} />
                <input type="text" placeholder="Search" className="search-input" value={searchText}
                    onChange={(e) => setSearchText(e.target.value)} />
            </div>
            {
                filteredData.length === 0 ? (<div className="flex flex-col justify-center align-center" style={{ marginTop: "200px" }}>
                    <img src="/icons/search.png" alt="Search Icon" />
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
                                const imageFormat = ministry.ministryTitle === "Security" ? "png" : "jpg";
                                const imageName = ministry.ministryTitle.toLocaleLowerCase().replace(/\s/g, '_');
                                const img = `/images/${imageName}.${imageFormat}`;

                                return (
                                    <SearchCard
                                        key={index}
                                        img={img}
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