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
			breakT: 5,
			sessionT: 25
		};
	}

	render() {
		return (
			<div className="flex">
				<header id="pomodoro-name">pomodoro clock</header>
				<section className="break-session">
					<article className="bcontrol">
						<header id="break-label">break length</header>
						<button id="break-decrement">
							<Down_arrow />
						</button>
						<div id="break-length">{this.state.breakT}</div>
						<button id="break-increment">
							<Up_arrow />
						</button>
					</article>
					<article className="scontrol">
						<header id="session-label">session length</header>
						<button id="session-decrement">
							<Down_arrow />
						</button>
						<div id="session-length">{this.state.sessionT}</div>
						<button id="session-increment">
							<Up_arrow />
						</button>
					</article>
				</section>
				<section className="session-container">
					<header id="timer-label">session</header>
					<div id="time-left">{this.state.sessionT}:00</div>
					<Play_pause />
					<Reset />
				</section>
			</div>
		);
	}
}

export default Clock;
