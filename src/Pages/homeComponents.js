import React from 'react';
import close from "../assets/close.png";
import edit from "../assets/edit.png";

export const UserMain = (props) => {
    return (
        <div className='flex align-center justify-between userMain'>
            <UserAvatar isV2 />
            <div className='counter'>2</div>
        </div>
    );
};

export const UserAvatar = (props) => {
    return (
        <div className={`userAvatar ${props.isV2 ? "version2":""}`}>
            <div className = 'imageCon' style={{backgroundImage: `url("https://cdn.pixabay.com/photo/2017/05/25/21/26/bird-feeder-2344414__340.jpg")`,}} />
            <div className='contents'>
                <div className='name'>Dhruv</div>
                {!props.noStatus && (<div className='subContent'>Random status</div>)}
            </div>
        </div>
    );
};

export const ChatBubble = (props) => {
    return (
        <div className={`chatbubbleCon ${props.bubbleType}`}>
            <div className='chatbubble'>
                <p>Random text message</p>
                <div className='time'>20:21</div>
            </div>
        </div>
    );
};

export const ProfileModal = (props) => {
    return (
      <div className={`modalContain ${props.visible ? "open" : ""}`}>
        <div className="content-inner">
          <div className="header">
            <div className="title">Update Profile</div>
            <img src={close} onClick={props.close} />
          </div>
          <div className="content">
            <div className="inner">
              <div className="leftHook">
                <div
                  className="imageCon"
                  style={{
                    backgroundImage: `url("https://cdn.pixabay.com/photo/2017/05/25/21/26/bird-feeder-2344414__340.jpg")`,
                  }}
                />
                <div className="point">
                  Change Picture
                  <img src={edit} />
                </div>
              </div>
              <div className="dataInput">
                <label>
                  <span>First name</span>
                  <input />
                </label>
                <label>
                  <span>Last name</span>
                  <input />
                </label>
                <label>
                  <span>Caption</span>
                  <input />
                </label>
                <label>
                  <span>About</span>
                  <textarea />
                </label>
              </div>
            </div>
            <button>Update</button>
          </div>
        </div>
      </div>
    );
  };
