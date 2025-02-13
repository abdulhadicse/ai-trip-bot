import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import {
    SelectTravelsList,
    SelectBudgetOptions,
    AI_PROMPT,
} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/services/AIModel";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
import { useNavigate } from "react-router"; 

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";

const CreateTrip = () => {
    const [place, setPlace] = useState();
    const [tripData, setTripData] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleTripData = (name, value) => {
        setTripData({
            ...tripData,
            [name]: value,
        });
    };

    const handleLogin = useGoogleLogin({
        onSuccess: (codeRes) => getUserProfile(codeRes),
        onError: (error) => console.log(error),
    });

    const saveAiTrip = async (TripData) => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem("trip-user"));
        const docId = Date.now().toString();

        await setDoc(doc(db, "AITrips", docId), {
            userSelection: tripData,
            tripData: JSON.parse(TripData),
            userEmail: user?.email,
            id: docId,
        });
        setLoading(false);

        navigate('/view-trip/'+docId);
    };

    const getUserProfile = (tokenInfo) => {
        axios
            .get("https://www.googleapis.com/oauth2/v1/userinfo", {
                headers: {
                    Authorization: `Bearer ${tokenInfo?.access_token}`,
                    Accept: "application/json",
                },
            })
            .then((resp) => {
                localStorage.setItem("trip-user", JSON.stringify(resp.data));
                setOpenDialog(false);
                handleGenerateTrip();
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    };

    const handleGenerateTrip = async () => {
        const user = localStorage.getItem("trip-user");

        if (!user) {
            return setOpenDialog(true);
        }

        if (
            !tripData?.traveler ||
            !tripData?.budget ||
            !tripData?.noOfDays ||
            !tripData?.location
        ) {
            toast("Please fill up all fields.", {
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            });

            return;
        }

        setLoading(true);
        await delay(2000);

        const FINAL_PROMPT = AI_PROMPT.replace(
            "{location}",
            tripData?.location?.label
        )
            .replace("{totalDays}", tripData?.noOfDays)
            .replace("{traveler}", tripData?.traveler)
            .replace("{budget}", tripData?.budget)
            .replace("{totalDays}", tripData?.noOfDays);

        const result = await chatSession.sendMessage(FINAL_PROMPT);
        saveAiTrip(result?.response?.text());
        console.log(result?.response?.text());

        setLoading(false);
    };

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 w-3/4 m-auto">
            <h2 className="font-bold text-3xl">
                Tell us your travel preferences 🏕️🌴
            </h2>
            <p className="mt-3 text-gray-500 text-xl">
                AI-powered travel planning made easy! Get personalized
                itineraries and explore stress-free. Your next adventure is just
                a click away!
            </p>

            <div className="mt-20 flex flex-col gap-9">
                <div>
                    <h2 className="text-xl my-3 font-medium">
                        What is destination of choice?
                    </h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            place,
                            onChange: (v) => {
                                setPlace(v);
                                handleTripData("location", v);
                            },
                        }}
                    />
                </div>
            </div>

            <div className="mt-20">
                <div>
                    <h2 className="text-xl my-3 font-medium">
                        How many days are you planning your trip?
                    </h2>
                    <Input
                        placeholder="Ex. 3"
                        min="1"
                        type="number"
                        onChange={(e) =>
                            handleTripData("noOfDays", e.target.value)
                        }
                    />
                </div>
            </div>

            <div className="mt-20">
                <div>
                    <h2 className="text-xl my-3 font-medium">
                        What is your budget?
                    </h2>
                    <div className="grid grid-cols-3 gap-5 mt-5">
                        {SelectBudgetOptions.map((item, index) => (
                            <div
                                key={index}
                                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                                    tripData?.budget == item.title &&
                                    "shadow-lg border-black"
                                }`}
                                onClick={() =>
                                    handleTripData("budget", item.title)
                                }
                            >
                                <h2 className="text-4xl">{item.icon}</h2>
                                <h2 className="font-bold text-lg">
                                    {item.title}
                                </h2>
                                <h2 className="text-sm text-gray-500">
                                    {item.desc}
                                </h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-20">
                <div>
                    <h2 className="text-xl my-3 font-medium">
                        Who do you plan on traveling with your next adventure?
                    </h2>
                    <div className="grid grid-cols-3 gap-5 mt-5">
                        {SelectTravelsList.map((item, index) => (
                            <div
                                key={index}
                                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                                    tripData?.traveler == item.title &&
                                    "shadow-lg border-black"
                                }`}
                                onClick={() =>
                                    handleTripData("traveler", item.title)
                                }
                            >
                                <h2 className="text-4xl">{item.icon}</h2>
                                <h2 className="font-bold text-lg">
                                    {item.title}
                                </h2>
                                <h2 className="text-sm text-gray-500">
                                    {item.desc}
                                </h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="my-20 flex justify-end">
                <Button onClick={handleGenerateTrip}>Generate Trip</Button>
            </div>

            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogDescription>
                            <img src="assets/img/logo.svg" />
                            <h2 className="mt-6 text-xl font-bold">
                                Sign in with Google
                            </h2>
                            <p className="mt-3 text-gray-500">
                                Sign in to the app with Google Authentication
                            </p>
                            <Button
                                onClick={handleLogin}
                                className="w-full mt-5"
                            >
                                Sign in with Google
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateTrip;
