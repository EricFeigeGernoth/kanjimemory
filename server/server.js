const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});
const csurf = require("csurf");
// const cryptoRandomString = require("crypto-random-string");
const cookieSession = require("cookie-session");
const { hash, compare } = require("./bc.js");
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});
const {
    addSignInData,
    getUser,
    getProfile,
    postNewDeck,
    getDeckNames,
    getAllDecks,
    getOneDeck,
    getAllCards,
    addNewCard,
    editOldCard,
} = require("./sql/db");
const { shuffleArray } = require("./functions");

//Middleware
app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(express.urlencoded({ extendend: false }));

app.use(express.json());
app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());
app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

//Middleware

//ROUTES
app.get("/welcome", (req, res) => {
    // if (req.session.userId) {
    //     res.redirect("/");
    // } else {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    // }
});

app.post("/register", (req, res) => {
    // console.log(req.body);
    const { first, last, email, password } = req.body;
    if (first == "" || last == "" || email == "" || password == "") {
        return res.json({ error: true });
    } else {
        // let hashedPassword = hash(password);
        // console.log(password);
        hash(password).then((hashedPassword) => {
            addSignInData(first, last, email, hashedPassword)
                .then((usersData) => {
                    console.log("after user data");
                    console.log(usersData);
                    req.session.userId = usersData.rows[0].id;
                    console.log("req.session.userId:   ", req.session.userId);
                    getProfile(req.session.userId).then((data) => {
                        console.log("data getProfile", data);
                        res.json({
                            success: true,
                        });
                    });
                })
                .catch((err) => {
                    console.log("error reg", err);
                    res.json({
                        error: true,
                    });
                });
        });
    }
});

app.post("/login", (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    if (email == "" || password == "") {
        return res.json({ error: true });
    } else {
        getUser(email).then((result) => {
            console.log("I am after email getting");
            let dbpassword = result.rows[0].password;
            console.log("dbpassword", dbpassword);
            compare(password, dbpassword).then((match) => {
                if (match === true) {
                    console.log("in match");
                    req.session.userId = result.rows[0].id;
                    res.json({
                        success: true,
                    });
                } else {
                    res.json({
                        error: true,
                        message: "Wrong Password",
                    });
                }
            });
        });
    }
});

app.get("/landingprofile", (req, res) => {
    console.log("I am in landingprofile");
    console.log("userId", req.session.userId);
    getProfile(req.session.userId)
        .then((data) => {
            console.log("data from getProfile", data.rows);
            res.json(data.rows);
        })
        .catch((err) => {
            console.log("data in landingProfile: ", err);
        });
});

app.post("/newdeck", (req, res) => {
    console.log("newDeck say hello");
    console.log("newDeck", req.body);
    console.log(req.body.deck);

    console.log("userId", req.session.userId);
    if (req.body.deck == null) {
        res.json({ noEntry: true });
    }
    getDeckNames(req.session.userId).then((data) => {
        // console.log("decknames", data.rows);
        // console.log("specific deck anme", data.rows[0].deckname);
        if (data.rows) {
            for (var i = 0; i < data.rows.length; i++) {
                if (req.body.deck == data.rows[i].deckname) {
                    res.json({ duplicateDeck: true });
                }
            }
        }

        postNewDeck(req.session.userId, req.body.deck).then((data) => {
            console.log("newDeck", data);
            res.json([data.rows, { newDeck: true }]);
        });
    });
});

app.get("/getdecks", (req, res) => {
    console.log("userId", req.session.userId);

    getAllDecks(req.session.userId).then((result) => {
        // console.log(result.rows);
        if (result.rows == null) {
            res.json({ noDeck: true });
        }
        res.json(result.rows);
    });
});

app.get("/deckname/:deckid", (req, res) => {
    console.log("I am in deckname");
    console.log("deckname", req.params.deckid);
    getOneDeck(req.params.deckid).then((result) => {
        console.log("deckname", result.rows);
        res.json(result.rows);
    });
});

app.get("/getcards/:deckid", (req, res) => {
    console.log("getCards", req.body);
    console.log("deckid for getcards", req.params.deckid);
    if (req.params.deckid == null) {
        res.json({ firstCreateDeck: true });
    }
    getAllCards(req.params.deckid).then((result) => {
        console.log("result getCards", result);
        var orderedlist = result.rows.sort(function (a, b) {
            return a.id - b.id;
        });
        res.json(orderedlist);
    });
});

app.post("/addcard", (req, res) => {
    console.log("req.body addcard", req.body);
    let { deckid, front, back } = req.body;
    console.log("front", front);
    addNewCard(deckid, front, back)
        .then((result) => {
            console.log("addcard", result);
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("data in addcard error: ", err);
        });
});

app.post("/editcard", (req, res) => {
    console.log("edicard req.body", req.body);
    const { deckid, editid, front, back } = req.body;

    editOldCard(editid, front, back).then((data) => {
        console.log(data.rows);
        res.json(data.rows);
    });
});

app.get("/getmemorycards/:deckid", (req, res) => {
    console.log("getMemoryCards", req.body);
    console.log("deckid for memorycards", req.params.deckid);
    if (req.params.deckid == null) {
        res.json({ firstCreateDeck: true });
    }
    getAllCards(req.params.deckid).then((result) => {
        var memorycards = result.rows;
        shuffleArray(memorycards);

        var slicedMemoryCards = memorycards.slice(0, 2);

        var splitMemoryCards = [];
        for (var i = 0; i < slicedMemoryCards.length; i++) {
            const { id, front, back } = slicedMemoryCards[i];
            let frontSide = { id, front, keyID: i };
            let backSide = { id, back, keyID: i + slicedMemoryCards.length };

            splitMemoryCards.push(frontSide, backSide);
        }
        // console.log("splitMemoryCards", splitMemoryCards);
        shuffleArray(splitMemoryCards);
        console.log("twicedShuffledCards", splitMemoryCards);
        res.json(splitMemoryCards);
    });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// app.listen(process.env.PORT || 3001, function () {
//     console.log("I'm listening.");
// });
server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
