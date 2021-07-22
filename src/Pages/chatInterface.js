import React, { useState } from 'react';
import userDetail from '../assets/userdetail.png';
import favorite from '../assets/star.png';
import smiley from '../assets/smiley.png';
import send from '../assets/send.png';
import { ChatBubble } from './homeComponents';
import { sendTestSocket } from '../socketService';
import Loader from '../components/loader';

function ChatInterface(props) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [fetching, setFetching] = useState(false);

    const submitMessage = (e) => {
        e.preventDefault();
        let data = {
            sender: props.loggedUser.first_name,
            receiver: props.activeUser.user.id,
            message,
        };
        setMessages([...messages, data]);
        sendTestSocket(data);
        setMessage("");
    }

    return (
        <>
            <div className='flex align-center justify-between heading'>
                <UserAvatar name={`${props.activeUser.first_name || ""} ${props.activeUser.last_name || ""}`} profilePicture={props.activeUser.profile_picture} caption={props.activeUser.caption} />
                <div className = 'flex align-center rightItems'>
                    <img src={favorite} />
                    <img src={userDetail}/>
                </div>
            </div>
            <div className='chatArea'>
                {
                    fetching ? <center><Loader /></center> : messages.length < 1 ? <div className='noUser'>No messages yet</div> : messages.map((item, key) => <ChatBubble bubbleType={item.receiver === props.loggedUser.user.id ? "" : "sender"} key={key} message={item.message} time={item.time} />)
                }

            </div>
            <form className='messageZone' onSubmit={submitMessage}>
                <div className='flex align-center justify-between topPart'>
                    <img src={smiley} />
                    <button type='submit'><img src={send} /></button>
                </div>
                <input placeholder='Type a message here...' value={message} onChange={e => setMessage(e.target.value)} />
            </form>
        </>
    )
}

export default ChatInterface;