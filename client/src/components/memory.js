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
    // console.log("memory", alldecks);
    // console.log("allCards Memory Lane", allCards);
    console.log("memoryCards", memoryCards);

    useEffect(() => {
        console.log(" am in allcards too early");
        if (memoryCards == undefined || memoryCards.length == 0) {
            console.log("Wow no memoryCards here yet");
        } else {
            console.log("memoryCards ind addcards.js", memoryCards);
            setStatus({
                ...status,
                memorySet: true,
            });
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
                console.log("memory memory memory deckid?", deckid);
                dispatch(getMemoryCards(deckid));
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
    return (
        <div>
            <p>Wow I am in the memory</p>
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
            {status.memorySet && (
                <div>
                    <div className="cardGrid">
                        {memoryCards &&
                            memoryCards.map((card) => {
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
                            })}
                    </div>
                </div>
            )}
        </div>
    );
}
