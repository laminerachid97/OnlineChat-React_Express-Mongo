import React, { createContext, useState } from "react"

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [userId, setUserId] = useState(0);
    return (
        <SocketContext.Provider value={{ socket, setSocket, userId, setUserId }}>
            {children}
        </SocketContext.Provider>
    )
}