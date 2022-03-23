const instaTouch = require('instatouch');
require('dotenv').config();
const fs = require('fs');

(async() => {
    try {
        const options = {
            count: 30,
            session: process.env.IG_SESSION_ID
        };
        const comments = await instaTouch.comments(process.env.YOUR_PHOTO_URL, options);
        pickWinner(comments.collector);
    } catch (e) {
        console.error(e);
    }
})();

function pickWinner(participants) {
    const allParticipants = participants.length;
    const pickedTicket = Math.floor(Math.random() * allParticipants);
    const pickedWinner = participants[pickedTicket].owner.username;
    writeGoldenTicket(pickedWinner.toString());
}

function writeGoldenTicket(winner) {
    fs.writeFile('goldenTicket.txt', winner, (err) => {
        console.log(err);
    })
}