import React from "react";
import { Link } from "react-router";

const Hotels = ({ trip }) => {
    return (
        <div>
            <h2 className="font-bold text-xl mt-5 mb-5">
                Hotel Recommendation
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {trip?.tripData?.hotelOptions?.map((hotel, index) => (
                    <Link
                        to={
                            "https://www.google.com/maps/search/?api=1&query=" +
                            hotel.hotelName +", "+ hotel.hotelAddress
                        }
                        target="_blank"
                        key={index}
                    >
                        <div
                            className="hover:scale-105 transition-all cursor-pointer"
                           
                        >
                            <img
                                className="rounded-lg"
                                src="/assets/img/placeholder.avif"
                                alt=""
                            />
                            <div className="my-3">
                                <h2 className="font-medium">
                                    {hotel.hotelName}
                                </h2>
                                <h2 className="text-xs text-gray-500">
                                    📍 {hotel.hotelAddress}
                                </h2>
                                <h2 className="text-sm text-gray-500">
                                    💰 ${hotel.priceRange.min}-$
                                    {hotel.priceRange.max}
                                </h2>
                                <h2 className="text-sm text-gray-500">
                                    ⭐ {hotel.rating}
                                </h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Hotels;
