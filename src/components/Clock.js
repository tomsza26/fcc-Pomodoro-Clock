import React from 'react';
import '../App.scss';
import { ReactComponent as Reset } from './reset.svg';
import { ReactComponent as Play_pause } from './play_pause.svg';
import { ReactComponent as Up_arrow } from './up-arrow.svg';
import { ReactComponent as Down_arrow } from './down-arrow.svg';

class Clock extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			breakT: 300,
			breakTime: 300,
			sessionT: 1500,
			sessionTime: 1500,
			cycles: 1,
			startStop: null,
			name: 'session'
		};
	}

	bd = () => {
		if (this.state.breakT > 60 && this.state.startStop == null)
			this.setState({ breakT: this.state.breakT - 60, breakTime: this.state.breakT - 60 });
	};

	bi = () => {
		if (this.state.breakT < 3600 && this.state.startStop == null)
			this.setState({ breakT: this.state.breakT + 60, breakTime: this.state.breakT + 60 });
	};

	sd = () => {
		if (this.state.sessionTime > 60 && this.state.startStop == null)
			this.setState({ sessionTime: this.state.sessionTime - 60, sessionT: this.state.sessionTime - 60 });
	};

	si = () => {
		if (this.state.sessionTime < 3600 && this.state.startStop == null)
			this.setState({ sessionTime: this.state.sessionTime + 60, sessionT: this.state.sessionTime + 60 });
	};

	reset = () => {
		clearInterval(this.state.startStop);
		this.setState({
			breakT: 300,
			breakTime: 300,
			sessionT: 1500,
			sessionTime: 1500,
			cycles: 1,
			startStop: null,
			name: 'session'
		});
	};

	start_stop = () => {
		if (this.state.startStop !== null) {
			clearInterval(this.state.startStop);
			this.setState({ startStop: null });
		} else {
			var inter = setInterval(() => {
				if (this.state.breakTime === -1) {
					this.setState({
						breakTime: this.state.breakT,
						sessionT: this.state.sessionTime,
						cycles: this.state.cycles + 1,
						name: 'session'
					});
				} else if (this.state.sessionT === 0 && this.state.cycles !== 4) {
					document.getElementById('time-left').innerHTML = `${this.setTime(this.state.breakTime)}`;
					this.setState({
						breakTime: this.state.breakTime - 1,
						name: 'break'
					});
				} else if (this.state.sessionT === 0 && this.state.cycles === 4) {
				} else {
					this.setState({
						name: 'session',
						sessionT: this.state.sessionT - 1
					});
				}
			}, 1000);
			this.setState({ startStop: inter });
		}
	};

	setTime = (time) => {
		if (time < 600 && time % 60 === 0) {
			return '0' + Math.floor(time / 60) + ':00';
		} else if (time < 10) {
			return '00:0' + Math.floor(time % 60);
		} else if (time < 60) {
			return '00:' + Math.floor(time % 60);
		} else if (time % 60 === 0) {
			return Math.floor(time / 60) + ':00';
		} else if (
			Number((time / 60).toFixed(2).toString().split('.')[1]) < 15.1 &&
			Number((time / 60).toFixed(2).toString().split('.')[1]) > 0.2
		) {
			return Math.floor(time / 60) + ':0' + Math.floor(time % 60);
		} else if (time === 0) {
			return '00:00';
		} else {
			return Math.floor(time / 60) + ':' + Math.floor(time % 60);
		}
	};

	render() {
		return (
			<div className="flex">
				<header id="pomodoro-name">pomodoro clock</header>
				<section className="break-session">
					<article className="bcontrol">
						<header id="break-label">break length</header>
						<button id="break-decrement" onClick={this.bd}>
							<Down_arrow />
						</button>
						<div id="break-length">{this.state.breakT / 60}</div>
						<button id="break-increment" onClick={this.bi}>
							<Up_arrow />
						</button>
					</article>
					<article className="scontrol">
						<header id="session-label">session length</header>
						<button id="session-decrement" onClick={this.sd}>
							<Down_arrow />
						</button>
						<div id="session-length">{this.state.sessionTime / 60}</div>
						<button id="session-increment" onClick={this.si}>
							<Up_arrow />
						</button>
					</article>
				</section>
				<section className="session-container">
					{this.state.cycles}
					<header id="timer-label">{this.state.name}</header>
					<div id="time-left">{this.setTime(this.state.sessionT)}</div>
					<Play_pause onClick={this.start_stop} />
					<Reset onClick={this.reset} />
				</section>
			</div>
		);
	}
}

export default Clock;
