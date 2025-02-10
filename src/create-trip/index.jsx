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

const CreateTrip = () => {
    const [place, setPlace] = useState();
    const [tripData, setTripData] = useState([]);

    const handleTripData = (name, value) => {
        setTripData({
            ...tripData,
            [name]: value,
        });
    };

    const handleGenerateTrip = async () => {
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

        const FINAL_PROMPT = AI_PROMPT.replace(
            "{location}",
            tripData?.location?.label
        )
            .replace("{totalDays}", tripData?.noOfDays)
            .replace("{traveler}", tripData?.traveler)
            .replace("{budget}", tripData?.budget)
            .replace("{totalDays}", tripData?.noOfDays);

        const result = await chatSession.sendMessage(FINAL_PROMPT);

        console.log(result?.response?.text());
    };

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
        </div>
    );
};

export default CreateTrip;
