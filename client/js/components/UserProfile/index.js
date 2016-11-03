import React from 'react';
import { Link } from 'react-router';
import Dropzone from 'react-dropzone';
import './style.scss';
import settingsIcon from '../../../img/icons/settings.svg';

const UserProfile = function(props) {
	function onDrop() {}

	return (
		<div className="user-profile">
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-3 col-sm-4">
						<div className="user-profile__avatar">
		        	<img src={`/img/user/${props.profile.id}/256.jpg`} alt=""/>
		      	</div>
					</div>
					<div className="col-md-9 col-sm-8 col-xs-12">
						<section className="user-profile__basic">
							<div className="row">
								<div className="col-sm-8 col-xs-8">
									<p className="user-profile__name">{props.profile.name}</p>
									<p className="user-profile__username">@{props.profile.username}</p>
								</div>
								<div className="col-sm-4 col-xs-4 user-profile__account-settings">
									<Link to="/settings"><img src={settingsIcon} alt=""/></Link>
								</div>
							</div>
						</section>
						<section className="user-profile__social">
							<div className="row">
								<p className="col-xs-4">
									<header>Followers</header>
									<p>13</p>
								</p>
								<p className="col-xs-4">
									<header>Followed</header>
									<p>22</p>
								</p>
								<p className="col-xs-4">
									<header>Starred</header>
									<p>3</p>
								</p>
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserProfile