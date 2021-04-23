import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import { getAllDecks, getAllCards } from "../actions";
export default function addCards() {
    const dispatch = useDispatch();
    // const profiles = useSelector((state) => state && state.landingProfile);
    const alldecks = useSelector((state) => state && state.allDecks);
    const allCards = useSelector((state) => state && state.allCards);
    const [values, setValues] = useState({});
    const [deckvalue, setDeckValue] = useState({});
    const [status, setStatus] = useState({});

    useEffect(() => {
        if (alldecks == undefined || alldecks.length == 0) {
            console.log("I am here no Decks in sight");
            setStatus({
                ...status,
                overview: false,
                firstCreateDeck: true,
            });
        } else {
            setStatus({
                ...status,
                overview: true,
                firstCreateDeck: false,
            });
        }
    }, [alldecks]);

    useEffect(() => {
        console.log(" am in allcards too early");
        if (allCards == undefined || allCards.length == 0) {
            setStatus({
                ...status,
                noCards: true,
            });
        }
    }, [allCards]);

    useEffect(() => {
        console.log("Wow I am the chosen one");
        setStatus({
            ...status,
            chosendeck: false,
        });
        console.log("deckid", deckvalue.deckid);
        if (deckvalue && deckvalue.deckid) {
            let deckid = deckvalue.deckid;
            dispatch(getAllCards(deckid));
        }
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
            {status.noCards && (
                <div>
                    <p>
                        No Cards in the Deck would you like to enter a new one?
                    </p>
                </div>
            )}
        </div>
    );
}
