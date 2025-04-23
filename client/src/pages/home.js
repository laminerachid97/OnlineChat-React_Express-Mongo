import React, { useContext, useRef } from "react";
import { io } from "socket.io-client";
import { SocketContext } from "../providers/socketProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NameContext } from "../providers/nameProvider";

const Home = () => {
    const username = useRef(null);
    const password = useRef(null);
    const message = useRef(null);
    const { setSocket, setUserId } = useContext(SocketContext);
    const { setName } = useContext(NameContext);
    const navigate = useNavigate();

    const handleClick = async () => {
        if (username.current.value && password.current.value) {
            const usern = username.current.value;
            const userpwd = password.current.value;
            const data = {
                "email": usern,
                "password": userpwd
            }

            await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, data)
                .then(data => {

                    const newSocket = io("http://localhost:1000", {
                        transports: ["websocket"],
                    });

                    setSocket(newSocket);
                    setUserId(data.data.message._id);
                    setName(data.data.message.name);

                    newSocket.on('connect', () => {
                        newSocket.emit('registerUser', {
                            userId: data.data.message._id,
                            username: data.data.message.name // Assuming your login response includes the username
                        });
                        navigate('/chat');
                    });

                })
                .catch(err => {
                    // console.error(err);
                    message.current.innerHTML = "email or password is incorrect!"
                })
        } else {
            message.current.innerHTML = "username and password are required!"
        }
    }

    return (
        <div className="border p-5 flex flex-col w-full max-w-[400px] rounded-[15px]">
            <h1 className="text-2xl font-bold text-center w-full text-red-500">Hello Welcome to the chat app</h1>
            <div className="w-full">
                <input className="p-3 py-2 w-full my-3 border border-black rounded" type="text" placeholder="username" ref={username} />
                <input className="p-3 py-2 w-full my-3 border border-black rounded" type="text" placeholder="password" ref={password} />
                <button onClick={handleClick} className="p-3 py-2 w-full my-3 border border-black rounded-[30px] text-white text-xl bg-orange-500"> Login </button>
                <span ref={message} className="text-red-500 text-xl my-2 block text-center p-2"></span>
            </div>
        </div>

    )
}

export default Home;