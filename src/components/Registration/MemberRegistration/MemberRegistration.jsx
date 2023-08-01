import './memberRegistration.css'
import { useEffect, useState } from 'react';
import PubSub from 'pubsub-js';
import { BrowserRouter as Router } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import LeaderRegistration from '../LeaderRegistration/LeaderRegistration';
import { get } from 'idb-keyval'

function MemberCard({ name, onDelete, color }) {
    const handleDelete = () => {
        onDelete();
    };

    return (
        <div className='mem-card-con'>
            <div
                className='flex flex-col justify-end selection-card'
                style={{ backgroundColor: color }}
            >
                <div className='selection-card-upper'>
                    <h4 className='mem-card-h4'>Member</h4>
                    <div
                        className='selection-card-delete-con'
                        onClick={handleDelete}
                    >
                        <img src='/icons/delete.svg' alt='delete' className='selection-card-delete' />
                    </div>
                </div>
                <h2 className='mem-card-h2'>{name}</h2>
            </div>
        </div>
    )
}

export default function MemberRegistration() {
    const [memberlist, setMemberlist] = useState([
        { full_name: 'innis', phone: '123456789', email: 'innis@gmail.com', id: '123456789', role: '' },
        { full_name: 'innis', phone: '123456789', email: 'innis@gmail.com', id: '123456789', role: '' },
        { full_name: 'innis', phone: '123456789', email: 'innis@gmail.com', id: '123456789', role: '' },
        { full_name: 'innis', phone: '123456789', email: 'innis@gmail.com', id: '123456789', role: '' }
    ])

    const colors = ['#336397', '#00bb9e', '#e46e48']

    const [leaderData, setLeaderData] = useState({})

    useEffect(() => {
        const fetchLeaderData = async () => {
            let leader_data = await get('leader_data');
            setLeaderData(leader_data);
            // console.log(leader_data);
        };

        fetchLeaderData();

        PubSub.subscribe('memberlist', (_, member_data) => {
            setMemberlist([...memberlist, member_data])

            return () => PubSub.unsubscribe('memberlist')
        })
    }, [memberlist])

    const addMember = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <Router>
                        <LeaderRegistration onClose={onClose} leader={leaderData.full_name}/>
                    </Router>
                );
            }
        });
    }

    const handleDeleteMember = (index) => {
        const updatedList = [...memberlist];
        updatedList.splice(index, 1);
        setMemberlist(updatedList);
    };

    return (
        <div className='flex flex-col align-center mem-reg-con'>
            <h3 className='h3-mem-reg-con'>Member Registration</h3>

            <button className='square-add-button' onClick={addMember}>+</button>

            {
                memberlist.map((member, index) => {
                    const colorIndex = index % colors.length;

                    return <MemberCard
                        key={index}
                        name={member.full_name}
                        onDelete={() => handleDeleteMember(index)}
                        color={colors[colorIndex]}
                    />
                })
            }
        </div>
    )
}