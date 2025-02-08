import React from "react";
import { Button } from "../ui/button";

const Header = () => {
    return (
        <div className="p-3 shadow-sm flex justify-between items-center px-5">
            <img src="/assets/img/logo.svg" alt="" />
            <div>
                <Button>Sign In</Button>
            </div>
        </div>
    );
};

export default Header;
