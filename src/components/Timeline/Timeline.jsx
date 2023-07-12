import './timeline.css'

export default function Timeline({ events }) {
    return (
        <div className="timeline">
            {events.map((event, index) => (
                event.date && (
                    <div key={index} className="timeline-event">
                        <div className="flex flex-col relative">
                            <div className="bullet"></div>
                            {index !== events.length - 1 && <div className="line"></div>}
                        </div>
                        <div className="event-content">
                            <h3 className="timeline-h3">{event.title}</h3>
                            <p className="timeline-p">
                                {`${new Date(event.date * 1000).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })} 
                                ${new Date(event.date * 1000).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}`}
                            </p>
                        </div>
                    </div>
                )
            ))}
        </div>
    )
}