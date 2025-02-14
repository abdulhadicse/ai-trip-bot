import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router";

const PlaceCardItem = ({ place }) => {
    return (
        <Link
            to={
                "https://www.google.com/maps/search/?api=1&query=" +
                place.placeName
            }
            target="_blank"
        >
            <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all cursor-pointer">
                <img
                    className="w-[100px] h-[100px] rounded-xl"
                    src="/assets/img/placeholder.avif"
                    alt=""
                />

                <div>
                    <h2 className="font-bold text-lg">{place.placeName}</h2>
                    <p className="text-sm text-gray-500 mb-3">
                        {place.PlaceDetails}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default PlaceCardItem;
