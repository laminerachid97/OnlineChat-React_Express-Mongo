import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {

    return (
        <div>
            <div className="w-full h-[70px] flex justify-center items-center bg-black/20">
                <Link className="px-3 mx-3" to='/'>HOME</Link>
                <Link className="px-3 mx-3" to='/about'>ABOUT</Link>
                <Link className="px-3 mx-3" to='/register'>REGISTER</Link>
            </div>
            <div className="h-[calc(100vh-70px)] w-full flex justify-center items-center">
                {children}
            </div>
        </div>
    )
}

export default Layout;