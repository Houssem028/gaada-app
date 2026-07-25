import { db } from "./firebase.js";

import {
    collection,
    onSnapshot,
    query,
    where
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";


const roomCode = localStorage.getItem("roomCode");


if(!roomCode){

    document.getElementById("roomTitle").innerHTML =
    "❌ لا توجد قعدة";

}



const q = query(

    collection(db,"rooms"),

    where(
        "code",
        "==",
        Number(roomCode)
    )

);



onSnapshot(q,(snapshot)=>{


    snapshot.forEach((doc)=>{


        const data = doc.data();


        document.getElementById("roomTitle").innerHTML =
        "☕ " + data.roomName;



        document.getElementById("roomCode").innerHTML =
        "🔑 الكود: " + data.code;



        let playersHTML = "";


        data.players.forEach((player,index)=>{


            if(index === 0){

                playersHTML += "👑 " + player + "<br>";

            } else {

                playersHTML += "👤 " + player + "<br>";

            }


        });



        document.getElementById("players").innerHTML =
        playersHTML;


    });


});
