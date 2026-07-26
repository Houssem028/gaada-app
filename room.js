import { db } from "./firebase.js";

import {
    collection,
    query,
    where,
    onSnapshot,
    updateDoc,
    doc,
    arrayRemove
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";


const roomCode = Number(localStorage.getItem("roomCode"));
const playerName = localStorage.getItem("playerName");


const q = query(
    collection(db, "rooms"),
    where("code", "==", roomCode)
);



let roomId = null;



onSnapshot(q, (snapshot)=>{


    snapshot.forEach((room)=>{


        roomId = room.id;

        const data = room.data();



        document.getElementById("roomTitle").innerHTML =
        "☕ " + data.roomName;



        document.getElementById("roomCode").innerHTML =
        "🔑 الكود: " + data.code;



        let list = "";



        data.players.forEach((player,index)=>{


            if(index === 0){

                list += "👑 " + player + "<br>";

            }else{

                list += "👤 " + player + "<br>";

            }


        });



        document.getElementById("players").innerHTML = list;



    });


});





// خروج من القعدة

window.leaveRoom = async function(){


    if(!roomId || !playerName){

        return;

    }


    await updateDoc(

        doc(db,"rooms",roomId),

        {

            players: arrayRemove(playerName)

        }

    );


    localStorage.removeItem("roomCode");

    localStorage.removeItem("playerName");


    window.location.href="index.html";


};
