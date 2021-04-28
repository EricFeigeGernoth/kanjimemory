import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import { getAllDecks, getAllCards, getMemoryCards } from "../actions";

export default function Memory() {
    const dispatch = useDispatch();
    // const profiles = useSelector((state) => state && state.landingProfile);
    const alldecks = useSelector((state) => state && state.allDecks);
    const allCards = useSelector((state) => state && state.allCards);
    const memoryCards = useSelector((state) => state && state.memoryCards);
    const [deckvalue, setDeckValue] = useState({});
    const [cardvalue, setCardValue] = useState({});
    const [status, setStatus] = useState({});
    const [value, setValue] = useState({});
    const [memory, setMemory] = useState({});
    var divArray = [];
    var matchArray = [];
    var matchedDivs = [];
    var highlightedDecks = [];
    var matchedCounter = 0;
    var clickCounter = 0;
    // console.log("memory", alldecks);
    // console.log("allCards Memory Lane", allCards);
    console.log("memoryCards", memoryCards);
    console.log("matchedDivs", matchedDivs);
    console.log("value", clickCounter);

    useEffect(() => {
        console.log(" am in allcards too early");
        if (memoryCards == undefined || memoryCards.length == 0) {
            console.log("Wow no memoryCards here yet");
        } else {
            if (status && status.chosendeck) {
                console.log("memoryCards ind addcards.js", memoryCards);
                setStatus({
                    ...status,
                    memorySet: true,
                });
            }
        }
    }, [memoryCards]);

    useEffect(() => {
        setStatus({
            ...status,
            overview: true,
            chosendeck: false,
            yescards: false,
        });
    }, []);

    useEffect(() => {
        console.log("Wow I am the chosen one");
        // console.log("deckid", deckvalue.deckid);
        if (deckvalue && deckvalue.deckid) {
            console.log("inside the if clause");
            let deckid = deckvalue.deckid;
            axios.get(`/deckname/${deckid}`).then((result) => {
                // console.log("deckname hello", result.data[0]);
                setDeckValue({
                    ...deckvalue,
                    deckname: result.data[0].deckname,
                });
                // console.log("deckvalue", deckvalue);
                // console.log("memory memory memory deckid?", deckid);
                dispatch(getMemoryCards(deckid));
            });
        }
    }, [status.chosendeck]);

    const handleClick = (e) => {
        console.log("Am I in the handleclick?");

        var highlightedElements = document.getElementsByClassName(
            "deckPicture"
        );
        // console.log("highlightedElements", highlightedElements);
        for (var i = 0; i < highlightedElements.length; i++) {
            if (
                highlightedElements[i].dataset.deckid != e.target.dataset.deckid
            ) {
                highlightedElements[i].classList.remove("deckHighlight");
            }
        }
        // console.log("highlightedElements", highlightedElements);
        // console.log("deck dataset", e.target.dataset);
        if (e.target.dataset.deckid) {
            setDeckValue({
                ...deckvalue,
                deckid: e.target.dataset.deckid,
            });
            setCardValue({
                ...cardvalue,
                deckid: e.target.dataset.deckid,
            });
            e.target.classList.add("deckHighlight");
            // setStatus({
            //     ...status,
            //     overview: false,
            //     chosendeck: true,
            // });
        }
    };

    const startGame = () => {
        setStatus({
            ...status,
            overview: false,
            chosendeck: true,
        });
    };

    const clickCard = (e) => {
        // console.log("e.target", e.target.dataset.cardid);
        if (divArray.length == 2) {
            // console.log("you shouldn't do anything");
        } else {
            e.target.classList.add("open");
            e.target.classList.add("disabled");
            matchArray.push(e.target.dataset.cardid);
            console.log("matchArray", matchArray);
            divArray.push(e.target);

            if (divArray.length == 2) {
                if (matchArray[0] == matchArray[1]) {
                    matched();
                } else {
                    unmatched();
                }
            }
        }
    };

    const matched = () => {
        console.log("We have matched something");

        for (var i = 0; i < divArray.length; i++) {
            matchedDivs.push(divArray[i]);
            divArray[i].classList.add("greenHighlight");
        }

        console.log("matchedDivs", matchedDivs);
        setTimeout(() => {
            for (var i = 0; i < divArray.length; i++) {
                divArray[i].classList.remove("greenHighlight");
                divArray[i].classList.remove("open");
                divArray[i].classList.add("solved");
            }
            divArray = [];
            matchArray = [];
            matchedCounter += 1;
            if (matchedCounter == 6) {
                setMemory({
                    ...memory,
                    allMatches: [...matchedDivs],
                });
                console.log("memory.allMatches", memory.allMatches);
                winning();
            }
        }, 1500);
    };

    const unmatched = () => {
        console.log("we have two divs");
        for (var i = 0; i < divArray.length; i++) {
            divArray[i].classList.add("redHighlight");
        }
        setTimeout(() => {
            for (var i = 0; i < divArray.length; i++) {
                divArray[i].classList.remove("redHighlight");
                divArray[i].classList.remove("open");
                divArray[i].classList.remove("disabled");
            }
            divArray = [];
            matchArray = [];
        }, 1500);
    };

    const winning = () => {
        console.log("Wow you've won");
        console.log("memory.allMatches", memory.allMatches);
        setStatus({
            ...status,
            won: true,
        });
    };
    const rematch = () => {
        setStatus({
            ...status,
            won: false,
        });
        console.log("memory.allMatches rematch", memory.allMatches);
        console.log("matchedDivs rematch", matchedDivs);
        for (var i = 0; i < memory.allMatches.length; i++) {
            memory.allMatches[i].classList.remove("solved");

            memory.allMatches[i].classList.remove("disabled");
            console.log("memory.allMatches", memory.allMatches[i]);
        }
        memory.allMatches = [];
        dispatch(getMemoryCards(deckvalue.deckid));
    };

    const back = () => {
        console.log("memory.allMatches rematch", memory.allMatches);
        console.log("matchedDivs rematch", matchedDivs);
        for (var i = 0; i < memory.allMatches.length; i++) {
            memory.allMatches[i].classList.remove("solved");

            memory.allMatches[i].classList.remove("disabled");
            console.log("memory.allMatches", memory.allMatches[i]);
        }
        memory.allMatches = [];
        // dispatch(getMemoryCards(deckvalue.deckid));
        setStatus({
            ...status,
            won: false,
            memorySet: false,
            chosendeck: false,
            overview: true,
        });
    };

    return (
        <div>
            {status.overview && (
                <div>
                    <div className="titleContainer">
                        <p className="title1">Wow I am in the memory</p>
                    </div>
                    <div className="newCardButtonDiv">
                        <button onClick={startGame} className="buttonPushable2">
                            <span className="buttonFront2">Start Game</span>
                        </button>
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
            {status.memorySet && (
                <div>
                    <div className="memoryTitleDiv">
                        <h1 className="memoryTitle">
                            Match the vocabel to its english translation
                        </h1>
                    </div>
                    <div className="cardFlex">
                        {" "}
                        <div className="cardGrid2">
                            {memoryCards &&
                                memoryCards.map((card) => {
                                    return (
                                        <div
                                            className="CardBox"
                                            key={card.keyID}
                                            onClick={clickCard}
                                            data-keyid={card.keyID}
                                            data-cardid={card.id}
                                        >
                                            <p className="textInsideCardBox">
                                                {card.front}
                                            </p>
                                            <p className="textInsideCardBox">
                                                {card.back}
                                            </p>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            )}
            {status.won && (
                <div className="overlay">
                    <div className="WinnerCard">
                        {" "}
                        <div className="winningDiv">
                            <p className="winningMessage">SO MUCH WIN!!!</p>
                        </div>
                        <div className="winningDiv">
                            <img
                                src="tenor.gif"
                                alt="happy crocodile"
                                className="winningGif"
                            />
                        </div>
                        <div className="cardsOption2">
                            <button onClick={back} className="backButtonDiv2">
                                <div>
                                    <span className="backButton">
                                        Back to Decks
                                    </span>
                                </div>
                            </button>
                            <button
                                onClick={rematch}
                                className="backButtonDiv2"
                            >
                                <div>
                                    <span className="backButton">Rematch</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
