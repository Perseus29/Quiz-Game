const Timer = ({time}) => {
    return (
        <div className="timer">
            <center>
            <span className="time">{(time.m >= 10) ? time.m : "0" + time.m}</span>&nbsp;:&nbsp;
            <span className="time">{(time.s >= 10) ? time.s : "0" + time.s}</span>
            {/* <span className="time">{(time.ms >= 10) ? time.ms : "0" + time.ms}</span> */}
            </center>
        </div>
    );
}

export default Timer;