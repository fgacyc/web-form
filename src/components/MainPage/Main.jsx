import './main.css'
import '../../App.css'

export default function Main() {
    return (
        <section id='main' className='flex flex-col'>
            <div className='my-30 mx-auto'>
                <div id='sticky-lego' className='flex justify-center align-center'>
                    <img src="../src/images/lego.png" alt="Ministry Option" />
                </div>
                <h1>一起建造</h1>
                <h1>属于我们的家</h1>
                <div className='relative my-40'>
                    <img src="../src/icons/search.svg" alt="Search Icon" id='search-icon' />
                    <input type="text" name="search" id="txt-search" placeholder='Search' />
                </div>
                <h2>Explore</h2>
            </div>
        </section>
    )
}