import React, { useContext, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { SocketContext } from "../providers/socketProvider";
import { useNavigate } from "react-router-dom";
import { NameContext } from "../providers/nameProvider";

const Register = () => {
    const { setSocket, setUserId } = useContext(SocketContext);
    const { setName } = useContext(NameContext);
    const message = useRef(null);
    // const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    const Uname = useRef(null);
    const Uemail = useRef(null);
    const Upwd = useRef(null);

    const handleClick = async () => {
        if (Uemail.current.value && Uname.current.value && Upwd.current.value) {
            const name = Uname.current.value;
            const email = Uemail.current.value;
            const pwd = Upwd.current.value;

            const data = {
                "name": name,
                "email": email,
                "password": pwd,
                "age": 20
            }

            await axios.post(`${process.env.REACT_APP_SERVER_URL}/new-user`, data)
                .then(data => {
                    // console.log(data.data);
                    if (data.status === 200) {
                        const newSocket = io(process.env.REACT_APP_SERVER_URL, {
                            transports: ["websocket"], // Optional but helps force WebSocket
                        });

                        setSocket(newSocket);
                        setUserId(data.data.id);

                        newSocket.on('connect', () => {
                            // console.log('WebSocket connected!');
                            newSocket.emit('registerUser', {
                                userId: data.data.id,
                                username: data.data.name // Assuming your login response includes the username
                            });
                            setName(name);
                            navigate('/chat');
                        });
                    }


                })
                .catch(err => {
                    console.error(err);
                })

        } else {
            message.current.innerHTML = "All fields are required!"
        }
    }


    return (
        <div className="border p-5 flex flex-col min-w-[400px] rounded-[15px]">
            <h1 className="text-3xl font-bold text-center w-full">REGISTER</h1>
            <input className="p-3 py-2 w-full my-3 border border-black rounded" type="text" placeholder="full name" ref={Uname} />
            <input className="p-3 py-2 w-full my-3 border border-black rounded" type="text" placeholder="email" ref={Uemail} />
            <input className="p-3 py-2 w-full my-3 border border-black rounded" type="text" placeholder="password" ref={Upwd} />
            <button onClick={handleClick} className="p-3 py-2 w-full my-3 border border-black rounded-[30px] text-white text-xl bg-orange-500"> Se connecter </button>
            <span ref={message} className="text-red-500 text-xl my-2 block text-center p-2"></span>
        </div>
    )
}

export default Register;