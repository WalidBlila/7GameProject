import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./UserInfo.css";

const UserInfo = (props) => {
  return (
    <div className="userInfo">

      <div className='edit'>
        <Link to="/auth/edit">
        <img src="https://res.cloudinary.com/dp1lq7mea/image/upload/v1628697956/pen_rccrso.png"></img>
            <a className="btn add">Edit</a>
          </Link>
      </div>
      <div className='block1'>
        <div className='mainInformation'>
          <div className='mainInformation1'>
            <img src="https://res.cloudinary.com/dp1lq7mea/image/upload/v1628695121/I-removebg-preview_sdrsoi.png"></img>
            <h1>Main Information</h1>

          </div>
          <div className='info'>
            <div className='block'>
              <h2>Favorite Playground</h2>
              <p>Ourcq</p>
            </div>
            <div className='block'>
              <h2>Avaibility</h2>
              <p>Saturday Morning</p>
            </div>
            <div className='block'>
              <h2>Mood</h2>
              <p>Competitive</p>
            </div>
            <div className='block'>
              <h2>Level</h2>
              <p>{props.userInSession.level}</p>
            </div>
          </div>
        </div>

        <div className='mainActivity'>
          <div className='mainActivity1'>
            <img src="https://res.cloudinary.com/dp1lq7mea/image/upload/v1628695121/A-removebg-preview_jcfn52.png"></img>          <h1>Main Activity</h1>
          </div>
          <div className='info'>

            <div className='block'>
              <h2>Play</h2>
              <p>1 time a week</p>
            </div>
            <div className='block'>
              <h2>Number of hours</h2>
              <p>2 hours a week</p>
            </div>
            <div className='block'>
              <h2>Team type</h2>
              <p>3vs3</p>
            </div>
          </div>
        </div>
      </div>



    </div>
  );
}

export default UserInfo;
