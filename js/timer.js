/**
 Задание

 Нужно усовершенствовать написанный таймер добавлением в него кнопок "Пауза", "Старт" и "Возобновить".
 **/

var Timer = React.createClass({
    getInitialState: function () {
        return {
            minutes: 0,
            seconds: 0,
            isClicked: false
        }
    },

    tick: function () {
        this.setState({seconds: this.state.seconds + 1});

        if (this.state.seconds === 60) {
            this.setState({
                minutes: this.state.minutes + 1,
                seconds: 0
            });
        }
    },

    switchButton: function () {
        this.setState({
            isClicked: !this.state.isClicked
        });
        this.countTime();
    },

    refreshButton: function () {
        this.setState({
            minutes: 0,
            seconds: 0
        });
    },

    countTime: function () {
        if (!this.state.isClicked) {
            this.timer = setInterval(this.tick, 1000);
        } else if (this.state.isClicked) {
            clearInterval(this.timer);
        }
    },

    render: function () {
        var btnClass = this.state.isClicked ? "timer__btn timer__btn--pause" : "timer__btn timer__btn--play";
        var spanClass = this.state.isClicked ? "glyphicon glyphicon-pause" : "glyphicon glyphicon-play";

        if (this.state.minutes >= 10 && this.state.seconds >= 10) {
            return (
                <div className="row">
                    <div className="col-xs-12 timer">
                        <button className={btnClass} onClick={this.switchButton}>
                            <span className={spanClass}></span>
                        </button>
                        <span className="timer__text">{this.state.minutes}:{this.state.seconds}</span>
                        <button className="timer__btn timer__btn--refresh" onClick={this.refreshButton}>
                            <span className="glyphicon glyphicon-refresh"></span>
                        </button>
                    </div>
                </div>
            )
        } else if (this.state.minutes >= 10 && this.state.seconds < 10) {
            return (
                <div className="row">
                    <div className="col-xs-12 timer">
                        <button className={btnClass} onClick={this.switchButton}>
                            <span className={spanClass}></span>
                        </button>
                        <span className="timer__text">{this.state.minutes}:0{this.state.seconds}</span>
                        <button className="timer__btn timer__btn--refresh" onClick={this.refreshButton}>
                            <span className="glyphicon glyphicon-refresh"></span>
                        </button>
                    </div>
                </div>
            )
        } else if (this.state.minutes < 10 && this.state.seconds >= 10) {
            return (
                <div className="row">
                    <div className="col-xs-12 timer">
                        <button className={btnClass} onClick={this.switchButton}>
                            <span className={spanClass}></span>
                        </button>
                        <span className="timer__text">0{this.state.minutes}:{this.state.seconds}</span>
                        <button className="timer__btn timer__btn--refresh" onClick={this.refreshButton}>
                            <span className="glyphicon glyphicon-refresh"></span>
                        </button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="row">
                    <div className="col-xs-12 timer">
                        <button className={btnClass} onClick={this.switchButton}>
                            <span className={spanClass}></span>
                        </button>
                        <span className="timer__text">0{this.state.minutes}:0{this.state.seconds}</span>
                        <button className="timer__btn timer__btn--refresh" onClick={this.refreshButton}>
                            <span className="glyphicon glyphicon-refresh"></span>
                        </button>
                    </div>
                </div>
            )
        }
    }
});

ReactDOM.render(
    <Timer/>,
    document.getElementById("content")
);