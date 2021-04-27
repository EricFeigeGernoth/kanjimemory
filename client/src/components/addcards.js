import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import { getAllDecks, getAllCards, updateCard } from "../actions";
export default function addCards() {
    const dispatch = useDispatch();
    const alldecks = useSelector((state) => state && state.allDecks);
    const allCards = useSelector((state) => state && state.allCards);

    const [cardvalue, setCardValue] = useState({});
    const [deckvalue, setDeckValue] = useState({});
    const [status, setStatus] = useState({});
    // console.log("deckvalue", deckvalue);

    useEffect(() => {
        // console.log(" am in allcards too early");
        if (allCards == undefined || allCards.length == 0) {
            setStatus({
                ...status,
                noCards: true,
                yescards: false,
            });
        } else {
            // console.log("allCards ind addcards.js", allCards);
            setStatus({
                ...status,
                noCards: false,
                yescards: true,
            });
        }
    }, [allCards]);

    //use EFFECT for showing ALLDECKS
    useEffect(() => {
        // console.log("alldecks", alldecks);
        if (alldecks == undefined || alldecks.length == 0) {
            // console.log("I am here no Decks in sight");
            setStatus({
                ...status,
                overview: false,
                firstCreateDeck: true,
                chosendeck: false,
                yescards: false,
            });
        } else {
            // console.log("Decks have arrived");

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
        // console.log("Wow I am the chosen one");
        // console.log("deckid", deckvalue.deckid);
        if (deckvalue && deckvalue.deckid) {
            // console.log("inside the if clause");
            let deckid = deckvalue.deckid;
            axios.get(`/deckname/${deckid}`).then((result) => {
                // console.log("deckname hello", result.data[0]);
                setDeckValue({
                    ...deckvalue,
                    deckname: result.data[0].deckname,
                });
                // console.log("deckvalue", deckvalue);
                // console.log("deckid still deckid?", deckid);
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
        setStatus({
            ...status,
            [e.target.name]: e.target.value,
        });
        console.log(status);
        console.log(cardvalue);
    };

    const editCard = () => {
        console.log("hello");
        axios.post("/addcard", cardvalue).then((result) => {
            // console.log("editCard", result);
            // console.log("I am here having added a new card");
            setStatus({
                ...status,
                yescards: true,
                newAddedCard: true,
                noCards: false,
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
        // console.log("backtodeck");
        // console.log("deckid", deckvalue.deckid);
        deckvalue.deckid = null;
        // console.log("deckvalue", deckvalue);
    };

    function clearText() {
        document.getElementById("cardText1").value = "";
        document.getElementById("cardText2").value = "";
    }

    //////////////////EDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARD
    //////////////////EDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARD
    //////////////////EDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARD
    const clickCard = (card) => {
        console.log(" I am in clickCard");
        console.log("console log card", card);
        // console.log(e.target);
        // console.log(e.target.dataset.cardid);
        let cardid = card.id;
        console.log("this is cardid defined", cardid);
        setCardValue({
            ...cardvalue,
            editid: cardid,
        });
        console.log(cardvalue);
        console.log("cardvalue editid", cardvalue.editid);
        setStatus({
            ...status,
            editOld: true,
            front: card.front,
            back: card.back,
            editId: card.id,
        });
        console.log("status clickCard!!!!!!!!!!", status);
    };

    const updateOldCard = () => {
        // console.log("updtate old card");
        // console.log("update old card cardvalue", cardvalue);
        // console.log("cardvalue", cardvalue.editid);
        console.log("updateOldCard Object to pass", {
            editid: status.editId,
            front: status.front,
            back: status.back,
        });
        axios
            .post("/editcard", {
                editid: status.editId,
                front: status.front,
                back: status.back,
            })
            .then((result) => {
                console.log(
                    "editcard wow here is the information of the edited card",
                    result.data[0]
                );
                console.log("I am here having added a new card");
                clearText();
                dispatch(getAllCards(deckvalue.deckid));
            });
    };
    const closeOldEditCard = () => {
        setStatus({
            ...status,
            editOld: false,
        });
    };

    //////////////////EDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARD//////////////////EDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARD
    //////////////////EDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARD
    //////////////////EDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARD
    //////////////////EDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARDEDITOLDCARD
    return (
        <div className="addCardsjsRenderDiv">
            {status.overview && (
                <div>
                    <div className="titleContainer">
                        <p className="title1">
                            Please choose a deck by clicking on the deck
                        </p>
                    </div>

                    <div className="deckFlex">
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
                                            <p
                                                data-deckid={deck.id}
                                                className="deckTitle"
                                            >
                                                {deck.deckname}
                                            </p>
                                            <img
                                                src="open-book.png"
                                                className="deckIcon"
                                                onClick={handleClick}
                                                value={deck.id}
                                                data-deckid={deck.id}
                                            ></img>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
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
                        <div>
                            <div className="cardsOption">
                                <div className="backButtonDiv">
                                    <p
                                        onClick={backToDecks}
                                        className="backButton"
                                    >
                                        Back
                                    </p>
                                </div>
                                <div className="nameOfTheDeckDiv">
                                    <p className="nameOfTheDeck">
                                        {/* Deck:<br></br> */}
                                        {deckvalue.deckname}
                                    </p>
                                </div>
                            </div>

                            <div className="titleContainer">
                                <p className="title1">
                                    Yes you have a card! Would you like to add a
                                    new one?
                                </p>
                            </div>
                            <div className="newCardButtonDiv">
                                <button
                                    onClick={newCard}
                                    className="buttonPushable"
                                >
                                    <span className="buttonFront">
                                        Add new card
                                    </span>
                                </button>
                            </div>
                        </div>
                        {status.showEditMode && (
                            <div className="overlay">
                                <div className="whiteScreen">
                                    <div className="exitDiv">
                                        <p
                                            onClick={closeNewCard}
                                            className="exitCardEdit"
                                        >
                                            Exit
                                        </p>
                                    </div>
                                    <div className="rowFlashCards">
                                        <div className="flashcard">
                                            <p className="title1">Front side</p>
                                            <textarea
                                                name="front"
                                                id="cardText1"
                                                className="editCard"
                                                onChange={handleChange}
                                            ></textarea>
                                        </div>
                                        <div className="flashcard">
                                            <p className="title1">Back side</p>
                                            <textarea
                                                name="back"
                                                id="cardText2"
                                                className="editCard"
                                                onChange={handleChange}
                                            ></textarea>
                                        </div>
                                    </div>

                                    <button
                                        onClick={editCard}
                                        className="buttonPushable"
                                    >
                                        <span className="buttonFront">
                                            Add Card to the Deck
                                        </span>
                                    </button>
                                </div>
                            </div>
                        )}
                        <div className="cardFlex">
                            <div className="cardGrid">
                                {allCards &&
                                    allCards.map((card) => {
                                        return (
                                            <div
                                                key={card.id}
                                                // data-cardid={card.id}
                                            >
                                                <div
                                                    className="addCardBox"
                                                    data-cardid={card.id}
                                                    onClick={() =>
                                                        clickCard(card)
                                                    }
                                                >
                                                    <div className="cardFrontDiv">
                                                        <p className="cardFront">
                                                            {card.front}
                                                        </p>
                                                    </div>
                                                    <div className="cardBackDiv">
                                                        <p className="cardBack">
                                                            {card.back}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                {status.editOld && (
                                    <div>
                                        <div className="secondoverlay">
                                            <div>
                                                <p onClick={closeOldEditCard}>
                                                    X
                                                </p>
                                            </div>
                                            <div className="flashcard">
                                                <p>Front side</p>
                                                <textarea
                                                    name="front"
                                                    id="cardText1"
                                                    className="editCard"
                                                    defaultValue={status.front}
                                                    onChange={handleChange}
                                                ></textarea>
                                            </div>
                                            <div className="flashcard">
                                                <p>Back side</p>
                                                <textarea
                                                    name="back"
                                                    id="cardText2"
                                                    className="editCard"
                                                    defaultValue={status.back}
                                                    onChange={handleChange}
                                                ></textarea>
                                            </div>
                                            <button onClick={updateOldCard}>
                                                Update old card
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
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
                        <p>Your right now in Deck {deckvalue.deckname}</p>
                        <p>
                            You have no Cards yet would you like to add a new
                            card
                        </p>

                        <p>
                            Your right now in Deck
                            {deckvalue.deckname}
                        </p>

                        <button onClick={newCard}>
                            Click here to start adding new card
                        </button>
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
                    </div>
                </section>
            )}
        </div>
    );
}
