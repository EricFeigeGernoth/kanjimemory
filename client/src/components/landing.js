import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import { profile } from "../actions";
export default function Landing() {
    const dispatch = useDispatch();

    const profiles = useSelector((state) => state && state.landingProfile);
    console.log("Profile", profiles);

    useEffect(() => {
        dispatch(profile());
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
