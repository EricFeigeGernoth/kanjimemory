import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import { addDeck, getAllDecks } from "../actions";
import { BrowserRouter, Link, Route } from "react-router-dom";
import addCards from "./addcards";
export default function DeckCreator() {
    const dispatch = useDispatch();
    const [values, setValues] = useState({});
    const [status, setStatus] = useState({});
    useEffect(() => {
        setStatus({
            ...status,
            noDeck: true,
        });
    }, []);

    const handleChange = (e) => {
        console.log("keyCheck value before Enter", e.target.value);
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
        console.log("values", values);
        return values;
    };

    const handleClick = () => {
        console.log("stauts", status.noDeck);
        console.log("values handleClick", values);
        axios.post("newdeck", values).then((result) => {
            console.log("result from Deck", result.data);

            if (result.data[1] && result.data[1].newDeck) {
                console.log(result.data[0]);
                let deck = result.data[0];
                console.log("deck", deck[0]);
                dispatch(addDeck(deck[0]));
                console.log("I have a new Deck");
                setStatus({
                    ...status,
                    noDeck: false,
                    newDeck: true,
                });
                dispatch(getAllDecks());
            }
            if (result.data && result.data.duplicateDeck) {
                setStatus({
                    ...status,
                    duplicateDeck: true,
                    noEntry: false,
                });
            }
            if (result.data && result.data.noEntry) {
                setStatus({
                    ...status,
                    noEntry: true,
                    duplicateDeck: false,
                });
            }
        });
    };

    return (
        <div>
            {status.noDeck && (
                <section>
                    {" "}
                    <p>You dont have a Deck yet, would you like to add one?</p>
                    <div className="input">
                        <input
                            type="text"
                            name="deck"
                            placeholder="deck"
                            // onChange={(e) => this.handleChange(e)}
                            onChange={handleChange}
                        ></input>
                        <button onClick={handleClick}>
                            Confirm name of the deck
                        </button>
                    </div>
                </section>
            )}
            {status.noEntry && (
                <div>
                    <p>Please fill in a deck to continue</p>
                </div>
            )}
            {status.duplicateDeck && (
                <div>
                    <p>
                        Sorry there is already a deck with this name please
                        choose another one
                    </p>
                </div>
            )}
            {status.newDeck && (
                <section>
                    {" "}
                    <p>
                        Thanks for creating a deck. Would you like to see your
                        new Deck?
                    </p>
                    <div className="input">
                        <input
                            type="text"
                            name="deck"
                            placeholder="deck"
                            // onChange={(e) => this.handleChange(e)}
                            onChange={handleChange}
                        ></input>
                        <button onClick={handleClick}>
                            Confirm name of the deck
                        </button>
                    </div>
                </section>
            )}

            <p>We are in the Deck Creator Page</p>
        </div>
    );
}
