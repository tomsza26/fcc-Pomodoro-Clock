import React from 'react';
import '../App.scss';
import { ReactComponent as Reset } from './reset.svg';
import { ReactComponent as Play_pause } from './play_pause.svg';
import { ReactComponent as Up_arrow } from './up-arrow.svg';
import { ReactComponent as Down_arrow } from './down-arrow.svg';
import { ReactComponent as Next } from './next.svg';
import { ReactComponent as Leaf } from './leaf.svg';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class Clock extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			breakT: 300,
			breakTime: 300,
			sessionT: 1500,
			sessionTime: 1500,
			longBreak: 1800,
			cycles: 1,
			startStop: null,
			name: 'session',
			bullet: 0,
			skipFlag: 0,
			longBreakFlag: 0
		};
	}

	bd = () => {
		if (this.state.breakT > 60 && this.state.startStop == null && this.state.skipFlag === 0)
			this.setState({ breakT: this.state.breakT - 60, breakTime: this.state.breakT - 60 });
	};

	bi = () => {
		if (this.state.breakT < 3600 && this.state.startStop == null && this.state.skipFlag === 0)
			this.setState({ breakT: this.state.breakT + 60, breakTime: this.state.breakT + 60 });
	};

	sd = () => {
		if (this.state.sessionTime > 60 && this.state.startStop == null && this.state.skipFlag === 0)
			this.setState({ sessionTime: this.state.sessionTime - 60, sessionT: this.state.sessionTime - 60 });
	};

	si = () => {
		if (this.state.sessionTime < 3600 && this.state.startStop == null && this.state.skipFlag === 0)
			this.setState({ sessionTime: this.state.sessionTime + 60, sessionT: this.state.sessionTime + 60 });
	};

	reset = () => {
		clearInterval(this.state.startStop);
		document.querySelector('#dots span:nth-child(1)').style.animationName = '';
		this.setState({
			breakT: 300,
			breakTime: 300,
			sessionT: 1500,
			sessionTime: 1500,
			longBreak: 1800,
			cycles: 1,
			startStop: null,
			name: 'session',
			bullet: 0,
			skipFlag: 0,
			longBreakFlag: 0
		});
	};

	start_stop = () => {
		if (this.state.bullet === 0) {
			document.querySelector('#dots span:nth-child(1)').style.animationName = 'fade';
			this.setState({ bullet: 1 });
		}

		this.setState({
			skipFlag: 1
		});

		if (this.state.startStop !== null) {
			clearInterval(this.state.startStop);
			this.setState({ startStop: null });
		} else {
			var inter = setInterval(() => {
				if (this.state.longBreak === -1) {
					this.setState({
						breakTime: this.state.breakT,
						sessionT: this.state.sessionTime,
						longBreak: 1800,
						cycles: 1,
						name: 'session',
						bullet: 0,
						skipFlag: 0,
						longBreakFlag: 0
					});
					document.getElementById('time-left').innerHTML = `${this.setTime(this.state.sessionT)}`;
				} else if ((this.state.cycles === 4 && this.state.breakTime === -1) || this.state.longBreakFlag === 1) {
					for (let i = 1; i < 5; i++) {
						document.querySelector(`#dots span:nth-child(${i})`).style.animationName = '';
						document.querySelector(`#dots span:nth-child(${i})`).style.backgroundColor = '#00ff3c';
					}
					document.getElementById('time-left').innerHTML = `${this.setTime(this.state.longBreak)}`;
					this.setState({
						longBreak: this.state.longBreak - 1,
						name: 'long break'
					});
				} else if (this.state.breakTime === -1) {
					this.setState({
						breakTime: this.state.breakT,
						sessionT: this.state.sessionTime,
						cycles: this.state.cycles + 1,
						name: 'session'
					});
				} else if (this.state.sessionT === 0) {
					if (this.state.sessionT === this.state.sessionTime) {
					}
					document.getElementById('time-left').innerHTML = `${this.setTime(this.state.breakTime)}`;
					this.setState({
						breakTime: this.state.breakTime - 1,
						name: 'break'
					});
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
			Number((time / 60).toFixed(2).toString().split('.')[1]) > 0.2 &&
			time < 600
		) {
			return '0' + Math.floor(time / 60) + ':0' + Math.floor(time % 60);
		} else if (
			Number((time / 60).toFixed(2).toString().split('.')[1]) < 15.1 &&
			Number((time / 60).toFixed(2).toString().split('.')[1]) > 0.2
		) {
			return Math.floor(time / 60) + ':0' + Math.floor(time % 60);
		} else if (time === 0) {
			return '00:00';
		} else if (time < 600) {
			return '0' + Math.floor(time / 60) + ':' + Math.floor(time % 60);
		} else {
			return Math.floor(time / 60) + ':' + Math.floor(time % 60);
		}
	};

	componentDidUpdate(prevProps, prevState) {
		if (this.state.cycles === 1 && prevState.cycles !== this.state.cycles) {
			for (let i = 1; i < 5; i++) {
				document.querySelector(`#dots span:nth-child(${i})`).style.animationName = '';
				document.querySelector(`#dots span:nth-child(${i})`).style.backgroundColor = '#b5a647';
			}
		} else if (prevState.cycles !== this.state.cycles) {
			document.querySelector(`#dots span:nth-child(${this.state.cycles})`).style.animationName = 'fade';
			document.querySelector(`#dots span:nth-child(${this.state.cycles - 1})`).style.animationName = '';
			document.querySelector(`#dots span:nth-child(${this.state.cycles - 1})`).style.backgroundColor = '#00ff3c';
		}
	}

	skip = () => {
		if (this.state.longBreakFlag === 1) {
			this.setState({
				breakTime: this.state.breakT,
				sessionT: this.state.sessionTime,
				longBreak: 1800,
				cycles: 1,
				name: 'session',
				bullet: 0,
				skipFlag: 0,
				longBreakFlag: 0
			});
			document.getElementById('time-left').innerHTML = `${this.setTime(this.state.sessionT)}`;
		} else if (this.state.cycles === 4) {
			for (let i = 1; i < 5; i++) {
				document.querySelector(`#dots span:nth-child(${i})`).style.animationName = '';
				document.querySelector(`#dots span:nth-child(${i})`).style.backgroundColor = '#00ff3c';
			}
			document.getElementById('time-left').innerHTML = `${this.setTime(this.state.longBreak)}`;
			this.setState({
				name: 'long break',
				longBreakFlag: 1
			});
		} else if (this.state.bullet === 1) {
			clearInterval(this.state.startStop);
			this.setState({
				breakTime: this.state.breakT,
				sessionT: this.state.sessionTime,
				cycles: this.state.cycles + 1,
				startStop: null,
				skipFlag: 1,
				name: 'session'
			});
		}
	};

	render() {
		let width = window.innerWidth;
		if (width > 730) {
			return (
				<div className="flex">
					<Leaf />
					<CircularProgressbarWithChildren
						value={
							this.state.breakT === this.state.breakTime ? this.state.sessionT : this.state.breakTime + 1
						}
						maxValue={
							this.state.breakT === this.state.breakTime ? this.state.sessionTime : this.state.breakT - 1
						}
						strokeWidth={2}
						counterClockwise={true}
						styles={buildStyles({
							strokeLinecap: 'butt',
							pathColor: this.state.breakT === this.state.breakTime ? '#ff3333' : '#00ff3c',
							trailColor: '#b5a647'
						})}
					>
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
							<div id="dots">
								<span id="firstDot" className="innerDots" />
								<span className="innerDots" />
								<span className="innerDots" />
								<span className="innerDots" />
							</div>
							<header id="timer-label">{this.state.name}</header>
							<div id="time-left">{this.setTime(this.state.sessionT)}</div>
							<Play_pause onClick={this.start_stop} />
							<Reset onClick={this.reset} />
							<Next onClick={this.skip} />
						</section>
					</CircularProgressbarWithChildren>
				</div>
			);
		} else {
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
					<CircularProgressbarWithChildren
						value={
							this.state.breakT === this.state.breakTime ? this.state.sessionT : this.state.breakTime + 1
						}
						maxValue={
							this.state.breakT === this.state.breakTime ? this.state.sessionTime : this.state.breakT - 1
						}
						strokeWidth={2}
						counterClockwise={true}
						styles={buildStyles({
							strokeLinecap: 'butt',
							pathColor: this.state.breakT === this.state.breakTime ? '#ff3333' : '#00ff3c',
							trailColor: '#b5a647'
						})}
					>
						<section className="session-container">
							<div id="dots">
								<span id="firstDot" className="innerDots" />
								<span className="innerDots" />
								<span className="innerDots" />
								<span className="innerDots" />
							</div>
							<header id="timer-label">{this.state.name}</header>
							<div id="time-left">{this.setTime(this.state.sessionT)}</div>
							<Play_pause onClick={this.start_stop} />
							<Reset onClick={this.reset} />
							<Next onClick={this.skip} />
						</section>
					</CircularProgressbarWithChildren>
				</div>
			);
		}
	}
}

export default Clock;
