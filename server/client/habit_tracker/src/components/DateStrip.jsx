import './DateStrip.css';

const DateStrip = ({ currentDate, setCurrentDate }) => {
    const days = [...Array(6)].map((_, i) => {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() - 3 + i);
        return date;
    });
    return (
        <div className="date-strip" role="list">
            {days.map((date) => (
                <button
                    key={date.toDateString()}
                    className={date.toDateString() === currentDate.toDateString() ? "active" : ""}
                    onClick={() => setCurrentDate(date)}
                    aria-current={date.toDateString() === currentDate.toDateString() ? "date" : undefined}
                    role="listitem"
                >
                    {date.getDate()} {date.toLocaleDateString("en-US", { weekday: "short" })}
                </button>
            ))}
        </div>
    )
}

export default DateStrip
