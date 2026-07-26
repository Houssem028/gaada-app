import { db } from "./firebase.js";

import { randomPlayer } from "./players.js";

import {
    collection,
    query,
    where,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";



const roomCode = Number(localStorage.getItem("roomCode"));
const playerName = localStorage.getItem("playerName");


let roomId = null;
let myPlayer = null;
let hearts = 3;



// البحث عن القعدة

async function loadGame(){


    const rooms = await getDocs(

        query(
            collection(db,"rooms"),
            where("code","==",roomCode)
        )

    );


    if(rooms.empty){

        document.getElementById("gameMessage").innerHTML =
        "❌ القعدة غير موجودة";

        return;

    }



    const room = rooms.docs[0];

    roomId = room.id;


    const data = room.data();



    if(!data.guessGame || !data.guessGame.players){


        await startRound();


    }else{


        loadMyPlayer(data.guessGame);


    }


}








// بدء الجولة

async function startRound(){



    const player1 = randomPlayer([]);

    const player2 = randomPlayer([
        player1.name
    ]);



    let players = {};


    players[playerName] = {


        name:player1.name,

        image:player1.image,

        hearts:3


    };



    await updateDoc(

        doc(db,"rooms",roomId),

        {

            guessGame:{

                players:players,

                status:"playing"

            }

        }

    );



}









// تحميل بيانات اللاعب

function loadMyPlayer(game){



    const me = game.players[playerName];



    if(!me){

        return;

    }



    myPlayer = me;



    hearts = me.hearts;



    document.getElementById("secretPlayerImage").src =
    me.image;



    showHearts();


}









// القلوب

function showHearts(){



    let html="";


    for(let i=0;i<hearts;i++){

        html+="❤️";

    }


    for(let i=hearts;i<3;i++){

        html+="🖤";

    }



    document.getElementById("hearts").innerHTML=html;


}









// التخمين

window.checkGuess = async function(){



    const input =
    document.getElementById("guessInput");



    const answer =
    input.value.trim();



    if(!answer){

        return;

    }



    const ref =
    doc(db,"rooms",roomId);



    const snap =
    await getDoc(ref);



    const data =
    snap.data();



    const players =
    data.guessGame.players;



    let opponent;



    for(let p in players){

        if(p !== playerName){

           
