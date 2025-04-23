import React, { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../providers/socketProvider";
import axios from "axios";
import getCurrentTimeFormatted from "../utils/dateFormat";
import messageFormat from "../utils/messageFormat";
import convertDate from "../utils/convertDate";
import { NameContext } from "../providers/nameProvider";
import { useNavigate } from "react-router-dom";

const ChatRoom = () => {
    const printMessage = useRef(null);
    const messagesArea = useRef(null);
    const [online, setOnline] = useState(["loading online users ..."]);
    const { socket, userId } = useContext(SocketContext);
    const { name } = useContext(NameContext);
    const navigate = useNavigate();
    const [message, setMessages] = useState([]);

    const scrollToBottom = () => {
        if (messagesArea.current) {
            messagesArea.current.scrollTop = messagesArea.current.scrollHeight;
        }
    };

    useEffect(() => {
        async function getMessages() {
            await axios.get(`${process.env.REACT_APP_SERVER_URL}/get-messages`)
                .then(data => {
                    const messages = data.data.message;
                    // console.log(messages);
                    // setMessages(messages)
                    messages.forEach(element => {
                        // console.log(element.message)
                        if (name === element.senderName) {
                            messageFormat(element.message, "Me ", convertDate(element.sentAt), messagesArea);
                        } else {
                            messageFormat(element.message, element.senderName, convertDate(element.sentAt), messagesArea);
                        }
                        
                    });
                    scrollToBottom();
                })
                .catch(err => {
                    console.error(err);
                })
        }
        getMessages();
    }, [message])

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.on("onlineUsers", (users) => {
            const names = Object.values(users).filter(user => user.id !== userId) // Filter out the user with the matching userId
                .map(user => user.name);
            // const user_name = Object.values(users).filter(user => user.id === userId).map(user => user.name);
            // setName(user_name[0]);

            if (!names.length) {
                setOnline(["No user is Online"]);
            } else {
                setOnline(names);
            }
            // console.log('Received onlineUsers event:', users);
            // console.log('Received onlineUsers Id:', userId);
            console.log('Names are', names);
        })

        socket.on("receiveMessage", (message) => {
            console.log("message received ", message);
            messageFormat(message.message, message.name, getCurrentTimeFormatted(), messagesArea);
            scrollToBottom();
        })



        return () => {
            socket.off("onlineUsers");
            socket.off("receiveMessage");
            // socket.disconnect();
        };
    }, [socket, userId])

    const handleMessage = async () => {
        if (messagesArea.current && printMessage.current) {
            const data = {
                senderId: userId,
                senderName: name,
                message: printMessage.current.value,
            };
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/new-chat`, data)
                .then(data => {
                    messageFormat(printMessage.current.value, 'Me ', getCurrentTimeFormatted(), messagesArea);

                    socket.emit('sendMessage', {
                        sender: userId,
                        name: name,
                        message: printMessage.current.value
                    })
                    printMessage.current.value = "";
                    scrollToBottom();
                    console.log(data.data.message);
                })
                .catch(err => {
                    console.error(err.response.data);
                })

        }
    }

    useEffect(() => {
        if (name === '') {
            navigate('/');
        }
    })

    return (
        <div className="mt-5 w-full flex justify-start items-center flex-col rounded-[15px]">
            <h2 className="text-xl font-bold mb-2">Room Chat</h2>
            <div className="w-[100%] lg:w-[80%] flex flex-col md:flex-row border p-2">
                <div className="basis-1/3 flex flex-col my-5">
                    <h2 className="text-xl font-bold mb-2 mx-2 flex "> <img className="mx-2" alt="" src="https://img.icons8.com/?size=30&id=HaHgoQgKyL89&format=png&color=000000" /> <span className="block">Users Online</span></h2>
                    {online && online.map((name, index) => (
                        <span className="mx-2 font-bold text-green-500" key={index}> {name} </span>
                    ))}
                </div>
                <div className="basis-2/3">
                    <div ref={messagesArea} className="w-full h-[300px] overflow-y border border-black overflow-scroll rounded-[15px] overflow-x-hidden"></div>
                    <textarea ref={printMessage} className="w-full overflow-y border border-black my-2 rounded-[15px] py-1 px-2"></textarea>
                    <button onClick={handleMessage} className="p-3 py-2 w-full my-3 border border-black rounded-[30px] text-white text-xl bg-orange-500"> Envoyer </button>
                </div>

            </div>
        </div>
    )
}

export default ChatRoom;