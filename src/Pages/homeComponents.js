import React from 'react';

const UserMain = (props) => {
    return (
        <div className='flex align-center justify-between userMain'>
            <UserAvatar isV2 />
            <div className='counter'>2</div>
        </div>
    );
};

const UserAvatar = (props) => {
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

const ChatBubble = (props) => {
    return (
        <div className={`chatbubbleCon ${props.bubbleType}`}>
            <div className='chatbubble'>
                <p>Random text message</p>
                <div className='time'>20:21</div>
            </div>
        </div>
    );
};
