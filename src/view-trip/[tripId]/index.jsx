import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
import { toast } from "sonner";
import InfoSection from "./components/InfoSection";
import Hotels from "./components/Hotels";

const ViewTrip = () => {
    const { tripId } = useParams();
    const [trip, setTrip] = useState();

    /**
     * Used to get Trip Information from Firebase
     */
    const getTripData = async () => {
        const docRef = doc(db, "AITrips", tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Dodcument:", docSnap.data());
            setTrip(docSnap.data());
        } else {
            console.log("No Such Document");
            toast("No trip Found!");
        }
    };

    useEffect(() => {
        tripId && getTripData();
    }, [tripId]);

    return (
        <div className="p-10 md:px-20 lg:px-44 xl:px-56">
            <InfoSection trip={trip} />
            <Hotels trip={trip}/>
        </div>
    );
};

export default ViewTrip;
