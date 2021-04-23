import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import { getAllDecks, getAllCards } from "../actions";
export default function addCards() {
    const dispatch = useDispatch();
    // const profiles = useSelector((state) => state && state.landingProfile);
    const alldecks = useSelector((state) => state && state.allDecks);
    const [values, setValues] = useState({});
    const [deckvalue, setDeckValue] = useState({});
    const [status, setStatus] = useState({});

    useEffect(() => {
        if (alldecks == null) {
            setStatus({
                ...status,
                overview: false,
                firstCreateDeck: true,
            });
        }
    }, []);
    console.log("allDecks", alldecks);
    useEffect(() => {
        dispatch(getAllDecks());
        setStatus({
            ...status,
            overview: true,
            firstCreateDeck: false,
        });
    }, []);

    useEffect(() => {
        console.log("Wow I am the chosen one");
        console.log("deckid", deckvalue.deckid);
        let deckid = deckvalue.deckid;
        dispatch(getAllCards(deckid));
    }, [status.chosendeck]);

    const handleClick = (e) => {
        if (e.target.dataset.deckid) {
            setDeckValue({
                ...deckvalue,
                deckid: e.target.dataset.deckid,
            });
            setStatus({
                ...status,
                overview: false,
                chosendeck: true,
            });
        }
    };

    return (
        <div>
            <p>Adding Cards</p>
            {status.overview && (
                <div className="deckGrid">
                    {alldecks &&
                        alldecks.map((deck) => {
                            return (
                                <div
                                    className="deckPicture"
                                    key={deck.id}
                                    onClick={handleClick}
                                    value={deck.id}
                                    data-deckid={deck.id}
                                >
                                    <p data-deckid={deck.id}>{deck.deckname}</p>
                                </div>
                            );
                        })}
                </div>
            )}
            {status.firstCreateDeck && (
                <div>
                    <p>Please create first a deck</p>
                </div>
            )}
        </div>
    );
}
