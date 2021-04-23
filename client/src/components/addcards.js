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
    const [cardvalue, setCardValue] = useState({});
    const [deckvalue, setDeckValue] = useState({});
    const [status, setStatus] = useState({});
    // console.log("status report line 13", status);
    useEffect(() => {
        console.log("alldecks", alldecks);
        if (alldecks == undefined || alldecks.length == 0) {
            console.log("I am here no Decks in sight");
            setStatus({
                ...status,
                overview: false,
                firstCreateDeck: true,
                chosendeck: false,
            });
        } else {
            console.log("Decks have arrived");
            setStatus({
                ...status,
                overview: true,
                firstCreateDeck: false,
                chosendeck: false,
            });
        }
    }, [alldecks]);

    useEffect(() => {
        console.log(" am in allcards too early");
        if (allCards != undefined) {
            setStatus({
                ...status,
                noCards: false,
                yescards: true,
            });
        }
    }, [allCards]);

    useEffect(() => {
        console.log("Wow I am the chosen one");
        // setStatus({
        //     ...status,
        //     chosendeck: false,
        // });
        console.log("deckid", deckvalue.deckid);
        if (deckvalue && deckvalue.deckid) {
            console.log("inside the if clause");
            let deckid = deckvalue.deckid;
            dispatch(getAllCards(deckid));
            if (allCards == undefined || allCards.length == 0) {
                setStatus({
                    ...status,
                    noCards: true,
                });
            }
            // setStatus({
            //     ...status,
            //     justdispatched: true,
            // });
        }
    }, [status.chosendeck]);

    const handleClick = (e) => {
        if (e.target.dataset.deckid) {
            setDeckValue({
                ...deckvalue,
                deckid: e.target.dataset.deckid,
            });
            setCardValue({
                ...cardvalue,
                deckid: e.target.dataset.deckid,
            });
            setStatus({
                ...status,
                overview: false,
                chosendeck: true,
            });
        }
    };

    const handleChange = (e) => {
        // console.log("hello");
        setCardValue({
            ...cardvalue,
            [e.target.name]: e.target.value,
        });
        // console.log("cardvalue", cardvalue);
    };

    const editCard = () => {
        console.log("hello");
        axios.post("/addcard", cardvalue).then((result) => {
            console.log("editCard", result);
            console.log("I am here having added a new card");
            setStatus({
                ...status,
                yescards: true,
                newAddedCard: true,
            });
        });
        //    if (e.target.dataset.deckid) {
        //        setDeckValue({
        //            ...deckvalue,
        //            deckid: e.target.dataset.deckid,
        //        });
        //        setStatus({
        //            ...status,
        //            overview: false,
        //            chosendeck: true,
        //        });
        //    }
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

            {status.newAddedCard && (
                <div>
                    <p>Thanks for your newly added card</p>
                </div>
            )}

            {status.yescards && (
                <div>
                    <section>
                        {" "}
                        <p>Yes you have a card!</p>
                        <div className="flashcard">
                            <p>Front side</p>
                            <textarea
                                name="front"
                                className="editCard"
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="flashcard">
                            <p>Back side</p>
                            <textarea
                                name="back"
                                className="editCard"
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <button onClick={editCard}>
                            Confirm name of the deck
                        </button>
                    </section>
                </div>
            )}
            {status.noCards && (
                // {status.noCards && (
                //     <div></div>
                // )}
                <section>
                    {" "}
                    <p>
                        You have no Cards yet would you like to add a new card
                    </p>
                    <div className="flashcard">
                        <p>Front side</p>
                        <textarea
                            name="front"
                            className="editCard"
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="flashcard">
                        <p>Back side</p>
                        <textarea
                            name="back"
                            className="editCard"
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <button onClick={editCard}>Confirm name of the deck</button>
                </section>
            )}
        </div>
    );
}
