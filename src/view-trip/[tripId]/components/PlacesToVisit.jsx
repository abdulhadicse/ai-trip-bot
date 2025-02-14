import React from "react";
import PlaceCardItem from "./PlaceCardItem";

const PlacesToVisit = ({ trip }) => {
    console.log(JSON.stringify(trip?.tripData?.itinerary, null, 2));

    return (
        <div>
            <h2 className="font-bold text-lg">Places to Visit</h2>
            {trip &&
                Object.entries(trip?.tripData?.itinerary)
                    .sort(([a], [b]) => a.localeCompare(b)) // Sorting days in order: day1, day2, day3...
                    .map(([day, places], index) => (
                        <div className="" key={index}>
                            <h2 className="font-medium text-lg my-3">
                                {day.toUpperCase()}
                            </h2>
                            <div className="grid grid-cols-2 gap-5">
                                {places.map((place, idx) => (
                                    <div key={idx}>
                                        <h2 className="font-medium text-orange-500">
                                        🕙 {place.travelTime}
                                        </h2>
                                        <PlaceCardItem place={place} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
        </div>
    );
};

export default PlacesToVisit;
