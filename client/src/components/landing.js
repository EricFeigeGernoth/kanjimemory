import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import { profile, getAllDecks } from "../actions";
export default function Landing() {
    const dispatch = useDispatch();
    const alldecks = useSelector((state) => state && state.allDecks);
    const profiles = useSelector((state) => state && state.landingProfile);
    console.log("Profile", profiles);

    console.log(alldecks);
    useEffect(() => {
        dispatch(profile());
        dispatch(getAllDecks());
    }, []);
    return (
        <div>
            <p>We are in the landing Page</p>
            {profiles && (
                <p>
                    Welcome Back {profiles.first} {profiles.last}
                </p>
            )}
        </div>
    );
}
