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

let roomId = null;



const q = query(
    collection(db,"rooms"),
    where("code","==",roomCode)
);



onSnapshot(q,(snapshot)=>{


    snapshot.forEach((room)=>{


        roomId = room.id;

        const data = room.data();


        document.getElementById("roomTitle").innerHTML =
        "☕ " + data.roomName;


        document.getElementById("roomCode").innerHTML =
        "🔑 الكود: " + data.code;



        const players = data.players || [];



        document.getElementById("playerCount").innerHTML =
        "👥 اللاعبين (" + players.length + ")";



        let list = "";


        players.forEach((player,index)=>{


            if(index === 0){

                list += "👑 " + player + " (المدير)<br>";

            }else{

                list += "👤 " + player + "<br>";

            }


        });



        document.getElementById("players").innerHTML =
        list || "لا يوجد لاعبين";


    });


});





// خروج من القعدة

window.leaveRoom = async function(){


    if(!roomId){

        alert("لم يتم العثور على الغرفة");
        return;

    }


    if(!playerName){

        alert("اسم اللاعب غير موجود");
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
