import './leaderRegistrationSuccess.css'

export default function LeaderRegistrationSuccess() {
    return (
        <div className='flex flex-col align-center justify-between led-reg-success-con'>
            <h3 className='led-reg-success-con-h3'>Completed</h3>
            <img src='/images/completed.png' alt='Complete Icon' className='mt-10' />
            <div className='flex flex-col'>
                <label className='input-text'>Your CYC ID</label>
                <div className='div-text'>123456</div>
                <label className='input-text'>Your Default Password</label>
                <div className='div-text'>123456</div>
                <label className='input-text'>Member Registration</label>
                <div>
                    <a href="/member_registration" className='div-text break-all deco-none'>https://fgacyc.com/serve/member_registration</a>
                    <img src="src/assets/launch.png" alt="launch icon"/>
                </div>

            </div>
            <div className='flex flex-col align-center'>
                <img
                    className='mem-reg-qr'
                    src='/images/member_registration_qr.png'
                    alt='Member Registration QR Code'
                />
            </div>
            <div>
                <h4 className='complete-h4'>© 2023 FGACYC.</h4>
                <h4 className='complete-h4' style={{ marginBottom: '45px' }}>All Rights Reserved</h4>
            </div>
        </div>
    )
}