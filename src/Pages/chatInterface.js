import React, { useContext, useEffect, useState } from 'react';
import favorite from '../assets/star.png';
import favoriteActive from '../assets/favActive.png';
import smiley from '../assets/smiley.png';
import send from '../assets/send.png';
import settings from "../assets/settings.png";
import { ChatBubble, ProfileModal } from './homeComponents';
import Loader from '../components/loader';
import { axiosHandler, errorHandler, getToken } from '../helper';
import {CHECK_FAVORITE_URL, MESSAGE_URL, UPDATE_FAVORITE_URL} from "../urls";
import moment from 'moment;'
import { activeChatAction } from '../stateManagement/actions';
import { store } from '../stateManagement/store';

let goneNext = false;

function ChatInterface(props) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [nextPage, setNextPage] = useState(1);
    const [canGoNext, setCanGoNext] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const {state:{activeChat}, dispatch} = useContext(store);

    const checkIsFav =async () => {
        const token = await getToken();
        const result = await axiosHandler({method:"get", url:CHECK_FAVORITE_URL + props.activeUser.user.id, token:token}).catch(e => console.log(e));
        if (result) {
            setIsFavorite(result.data)
        }
    }

    const getMessages = async (append=false) => {
        const token = await getToken();
        setCanGoNext(false);

        const result = await axiosHandler({
            method: "get",
            url: MESSAGE_URL + `?user_id=${props.activeUser.user.id}&page=${nextPage}`,
            token
        }).catch(e => console.log(errorHandler(e)))

        if (result) {
            if (append) {
                setMessages([...result.data.results.reverse(), ...messages]);
                goneNext = false;
            }
            else {
                setMessages(result.data.results.reverse());
            }
            result.data.results.map(item => {
                if (item.is_read) return null;
                if (item.receiver.user.id === props.loggedUser.user.id) {
                    updateMessage(item.id);
                }
                return null;
            })

            if (result.data.next) {
                setCanGoNext(true);
                setNextPage(nextPage+1);
            }
            setFetching(false);
            if (!append) {
                scrollToBottom();
            }
        }
    }

    const updateMessage = async (message_id) => {
        const token = await getToken();
        axiosHandler({method:"patch", url:MESSAGE_URL + `/${message_id}`, token, data:{is_read: true}})
    }

    useEffect(() => {
        getMessages(),
        checkIsFav()
    }, [props.activeUser]);

    const updateFav = async () => {
        setIsFavorite(!isFavorite)
        const token = await getToken();
        const result = await axiosHandler({method:"post", url:UPDATE_FAVORITE_URL, data:{favorite_id:props.activeUser.user.id}, token}).catch(e => console.log(e));
        if (!result) {
            setIsFavorite(!isFavorite);
        }
    }

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
            scrollToBottom();
        }
    };

    const handleBubbleType = (item) => {
        if (item.sender_id) return "sender"

        if (item.sender.user.id === props.loggedUser.user.id) return "sender"
        return ""
    }

    const scrollToBottom = () => {
        setTimeout(() => {
            let chatArea = document.getElementById('chatArea');
            chatArea.scrollTop = chatArea.scrollHeight;
        }, 100)
    }

    const handleScroll = e => {
        if (e.target.scrollTop <= 100) {
            if (canGoNext && !goneNext) {
                goneNext = true;
                getMessages(true);
            }
        }
    }

    return (
        <>
            <ProfileModal {...props} close={() => setShowProfileModal(false)} userDetail={props.activeUser} visible={showProfileModal} closable={true} setClosable={() => null} view />
            <div className='flex align-center justify-between heading'>
                <UserAvatar name={`${props.activeUser.first_name || ""} ${props.activeUser.last_name || ""}`} profilePicture={props.activeUser.profile_picture && props.activeUser.profile_picture.file_upload} caption={props.activeUser.caption} />
                <div className = 'flex align-center rightItems'>
                    <img src={isFavorite ? favoriteActive : favorite} onClick={updateFav} />
                    <img src={settings} onClick={() => setShowProfileModal(true)}/>
                </div>
            </div>
            <div className='chatArea' id='chatArea' onScroll={handleScroll}>
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