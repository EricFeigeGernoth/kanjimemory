import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import { getAllDecks, getAllCards } from "../actions";
export default function addCards() {
    const dispatch = useDispatch();

    const alldecks = useSelector((state) => state && state.allDecks);
    const allCards = useSelector((state) => state && state.allCards);
    const [values, setValues] = useState({});
    const [cardvalue, setCardValue] = useState({});
    const [deckvalue, setDeckValue] = useState({});
    const [status, setStatus] = useState({});
    console.log("deckvalue", deckvalue);
    // console.log("status report line 13", status);

    //use EFFECT for showing ALLCARDS
    useEffect(() => {
        console.log(" am in allcards too early");
        if (allCards == undefined || allCards.length == 0) {
            setStatus({
                ...status,
                noCards: true,
                yescards: false,
            });
        } else {
            console.log("allCards ind addcards.js", allCards);
            setStatus({
                ...status,
                noCards: false,
                yescards: true,
            });
        }
    }, [allCards]);

    //use EFFECT for showing ALLDECKS
    useEffect(() => {
        console.log("alldecks", alldecks);
        if (alldecks == undefined || alldecks.length == 0) {
            console.log("I am here no Decks in sight");
            setStatus({
                ...status,
                overview: false,
                firstCreateDeck: true,
                chosendeck: false,
                yescards: false,
            });
        } else {
            console.log("Decks have arrived");
            setStatus({
                ...status,
                overview: true,
                firstCreateDeck: false,
                chosendeck: false,
                yescards: false,
            });
        }
    }, [alldecks]);

    //use EFFECT for choosing a specific Deck
    useEffect(() => {
        console.log("Wow I am the chosen one");
        console.log("deckid", deckvalue.deckid);
        if (deckvalue && deckvalue.deckid) {
            console.log("inside the if clause");
            let deckid = deckvalue.deckid;
            axios.get(`/deckname/${deckid}`).then((result) => {
                console.log("deckname hello", result.data[0]);
                setDeckValue({
                    ...deckvalue,
                    deckname: result.data[0].deckname,
                });
                console.log("deckvalue", deckvalue);
                console.log("deckid still deckid?", deckid);
                dispatch(getAllCards(deckid));
            });
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
            clearText();
            dispatch(getAllCards(deckvalue.deckid));
        });
    };

    const newCard = () => {
        setStatus({
            ...status,
            showEditMode: true,
        });
    };

    const closeNewCard = () => {
        setStatus({
            ...status,
            showEditMode: false,
        });
    };

    const backToDecks = () => {
        setStatus({
            ...status,
            chosendeck: false,
            yescards: false,
            noCards: false,
            overview: true,
        });
        console.log("backtodeck");
        console.log("deckid", deckvalue.deckid);
        deckvalue.deckid = null;
        console.log("deckvalue", deckvalue);
    };

    function clearText() {
        document.getElementById("cardText1").value = "";
        document.getElementById("cardText2").value = "";
    }

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
                        <div>
                            {" "}
                            <div>
                                <p onClick={backToDecks}>
                                    Would like to go back to the Overview of
                                    Decks?
                                </p>
                            </div>
                            <p>
                                Your right now in Deck
                                {deckvalue.deckname}
                            </p>
                            <p>
                                Yes you have a card! Would you like to add a new
                                one?
                            </p>
                            <button onClick={newCard}>
                                Click here to start adding new card
                            </button>
                        </div>
                        {status.showEditMode && (
                            <div className="overlay">
                                <p onClick={closeNewCard}>X</p>
                                <div className="flashcard">
                                    <p>Front side</p>
                                    <textarea
                                        name="front"
                                        id="cardText1"
                                        className="editCard"
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <div className="flashcard">
                                    <p>Back side</p>
                                    <textarea
                                        name="back"
                                        id="cardText2"
                                        className="editCard"
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <button onClick={editCard}>
                                    Add Card to the Deck
                                </button>
                            </div>
                        )}
                        <div className="cardGrid">
                            {allCards &&
                                allCards.map((card) => {
                                    return (
                                        <section key={card.id}>
                                            {" "}
                                            <div className="CardBox">
                                                <div>
                                                    <p>{card.front}</p>
                                                </div>
                                                <div>
                                                    <p>{card.back}</p>
                                                </div>
                                            </div>
                                        </section>
                                    );
                                })}{" "}
                        </div>
                    </section>
                </div>
            )}
            {status.noCards && (
                // {status.noCards && (
                //     <div></div>
                // )}
                <section>
                    {" "}
                    <div>
                        <p onClick={backToDecks}>
                            Would like to go back to the Overview of Decks?
                        </p>
                    </div>
                    <p>Your right now in Deck {deckvalue.deckname}</p>
                    <p>
                        You have no Cards yet would you like to add a new card
                    </p>
                    <div className="flashcard">
                        <p>Front side</p>
                        <textarea
                            name="front"
                            id="cardText3"
                            className="editCard"
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="flashcard">
                        <p>Back side</p>
                        <textarea
                            name="back"
                            id="cardText4"
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
