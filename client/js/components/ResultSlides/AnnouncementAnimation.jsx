import React from 'react';

const AnnouncementAnimation = function(props) {
	const addtionalLinks = props.links.map((link) => {
		return (
			<a href={link.href} key={link.href}>
				{link.title}
			</a>
		);
	});

	let winnerNames = props.winnerNames.map((name) => {
		return <h2 key={name}>{name}</h2>;
	});

	return (
		<div className="slides">
			<section data-transition="zoom-in zoom-out"  data-autoslide="2000">
				<h1>The winner</h1>
			</section>
			<section data-transition="zoom-in zoom-out">
				<h1>
					<span  className="fragment">goes&nbsp;</span>
					<span className="fragment" data-autoslide="500">to</span>
					<span className="fragment" data-autoslide="500">.</span>
					<span className="fragment" data-autoslide="500">.</span>
					<span className="fragment">.</span>
				</h1>
			</section>
			<section data-autoslide="2000">
				<section data-transition="zoom-in slide-out"> 
					<header className="fragment" data-autoslide="1000">{winnerNames}</header>
					<p className="fragment fragment--last">{addtionalLinks}</p>
				</section>
				{props.children}
			</section>
		</div>
	);
};

export default AnnouncementAnimation;