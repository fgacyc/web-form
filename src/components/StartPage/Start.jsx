import './start.css'
import { useNavigate } from 'react-router-dom'

export default function Start() {
    const navigate = useNavigate()

    function navigateToLanding() {
        navigate('/landing')
    }

    return (
        <section id='landing' className='flex flex-col justify-between align-center'>
            <img src="../src/images/CYC_logo.png" alt="CYC Logo" id='cyc-logo' className='mt-45' />
            <img src="../src/images/KV_title.png" alt="Landing Title" />
            <button className='mb-45' onClick={navigateToLanding}>开启你的服事旅程</button>
        </section>
    )
}