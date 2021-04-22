import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import { getAllDecks } from "../actions";
export default function addCards() {
    const dispatch = useDispatch();
    const profiles = useSelector((state) => state && state.landingProfile);
    const alldecks = useSelector((state) => state && state.allDecks);
    console.log("allDecks", alldecks);
    const [values, setValues] = useState({});
    const [status, setStatus] = useState({});
    useEffect(() => {
        dispatch(getAllDecks());
    }, []);

    return (
        <div>
            <p>Adding Cards</p>
            {alldecks &&
                alldecks.map((deck) => {
                    return (
                        <div className="deckPicture" key={deck.id}>
                            <p>{deck.deckname}</p>
                        </div>
                    );
                })}
        </div>
    );
}
