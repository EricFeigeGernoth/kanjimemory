import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import { addDeck } from "../actions";
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
        // useDispatch(postDeck());
        //  console.log("keyCheck value before Enter", e.target.value);
        // if (e.key === "Enter") {
        //     e.preventDefault(); // this will prevent going to the next line
        //     socket.emit("My amazing chat message", e.target.value);
        //     e.target.value = ""; // clears input field after we click enter
        // }
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
                        You already have a deck would you like to input a new
                        card?
                    </p>
                    <div className="flashcard">
                        <p>Front side</p>
                        <textarea name="front" className="editCard"></textarea>
                    </div>
                    <div className="flashcard">
                        <p>Back side</p>
                        <textarea name="back" className="editCard"></textarea>
                    </div>
                    <button onClick={handleClick}>
                        Confirm name of the deck
                    </button>
                </section>
            )}

            <p>We are in the Deck Creator Page</p>
        </div>
    );
}
