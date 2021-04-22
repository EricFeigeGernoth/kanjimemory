const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:ericfeigegernoth:bourne3@localhost/kanjimemory"
);

module.exports.addSignInData = function (first, last, email, password) {
    console.log("in addSignIndata");
    return db.query(
        `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id, first`,
        [first, last, email, password]
    );
};
module.exports.getUser = function (email) {
    console.log("in db.js");
    return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
};

module.exports.getProfile = function (id) {
    return db.query(`SELECT * FROM users WHERE id=$1`, [id]);
};

module.exports.postNewDeck = function (id, name) {
    return db.query(
        `INSERT INTO deck (deckuser, deckname) VALUES ($1, $2) RETURNING deckuser, deckname`,
        [id, name]
    );
};

module.exports.getDeckNames = function (id) {
    return db.query(`SELECT deckname FROM deck WHERE deckuser=$1`, [id]);
};
module.exports.getAllDecks = function (id) {
    return db.query(`SELECT * FROM deck WHERE deckuser=$1`, [id]);
};