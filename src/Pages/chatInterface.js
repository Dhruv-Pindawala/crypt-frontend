import React, { useContext, useEffect, useState } from 'react';
import userDetail from '../assets/userdetail.png';
import favorite from '../assets/star.png';
import smiley from '../assets/smiley.png';
import send from '../assets/send.png';
import { ChatBubble } from './homeComponents';
import Loader from '../components/loader';
import { axiosHandler, errorHandler, getToken } from '../helper';
import {MESSAGE_URL} from "../urls";
import moment from 'moment;'
import { activeChatAction } from '../stateManagement/actions';
import { store } from '../stateManagement/store';

function ChatInterface(props) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [nextPage, setNextPage] = useState(1);
    const [canGoNext, setCanGoNext] = useState(false);

    const {state:{activeChat}, dispatch} = useContext(store);

    const getMessages = async () => {
        const token = await getToken();
        setCanGoNext(false);

        const result = await axiosHandler({
            method: "get",
            url: MESSAGE_URL + `?user_id=${props.activeUser.user.id}`,
            token
        }).catch(e => console.log(errorHandler(e)))

        if (result) {
            setMessages(result.data.results, reverse());
            if (result.data.next) {
                setCanGoNext(true)
                setNextPage(nextPage+1)
            }
            setFetching(false);
        }
    }

    useEffect(() => {
        getMessages()
    }, []);

    useEffect(() => {
        if (activeChat) {
            getMessages();
            dispatch({type:activeChatAction, payload:null})
        }
    }, [activeChat]);

    const submitMessage = (e) => {
        e.preventDefault();
        let data = {
            sender_id: props.loggedUser.user.id,
            receiver_id: props.activeUser.user.id,
            message,
        };
        const lastIndex = messages.length;
        setMessages([...messages, data]);
        setMessage("");

        const token = await getToken();
        const result = await axiosHandler({
            method: "post",
            url: MESSAGE_URL,
            token, data
        }).catch(e => console.log(errorHandler(e)))

        if (result) {
            messages[lastIndex] = result.data;
            setMessages(messages);
        }
    };

    const handleBubbleType = (item) => {
        if (item.sender_id) return "sender"

        if (item.sender.user.id === props.loggedUser.user.id) return "sender"
        return ""
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
                    fetching ? <center><Loader /></center> : messages.length < 1 ? <div className='noUser'>No messages yet</div> : messages.map((item, key) => <ChatBubble bubbleType={handleBubbleType(item)} key={key} message={item.message} time={item.created_at ? moment(item.created_at).format("DD-MM-YYYY hh:mm a") : ""} />)
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