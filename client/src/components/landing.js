import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import { profile } from "../actions";
export default function Landing() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(profile());
    }, []);
    return (
        <div>
            <p>We are in the landing Page</p>
        </div>
    );
}
