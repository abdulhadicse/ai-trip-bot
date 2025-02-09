import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router";

const Hero = () => {
    return (
        <div className="flex flex-col items-center mx-56 gap-9">
            <h1 className="font-extrabold text-[50px] text-center mt-16">
                <span className="text-[#f56551]">
                    Discover Your Next Trip with AI:
                </span>
                Your Perfect Trip Awaits!
            </h1>
            <p className="text-xl text-gray-500 text-center">
                AI-powered travel planning made easy! Get personalized
                itineraries and explore stress-free. Your next adventure is just
                a click away!
            </p>
            <Link to="/create-trip">
                <Button>Get Started, It's Free</Button>
            </Link>
        </div>
    );
};

export default Hero;
