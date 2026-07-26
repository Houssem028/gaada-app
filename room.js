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



if(!roomCode){

    alert("لا توجد قعدة");

}



// جلب الغرفة

const q = query(
    collection(db,"rooms"),
    where("code","==",roomCode)
);



onSnapshot(q,(snapshot)=>{


    if(snapshot.empty){

        return;

    }


    snapshot.forEach((item)=>{


        roomId = item.id;


        const data = item.data();



        document.getElementById("roomTitle").innerHTML =
        "☕ " + data.roomName;



        document.getElementById("roomCode").innerHTML =
        "🔑 الكود: " + data.code;



        let players = data.players || [];



        document.getElementById("playerCount").innerHTML =
        "👥 اللاعبين (" + players.length + ")";



        let html = "";



        players.forEach((player,index)=>{


            if(index === 0){

                html += "👑 " + player + "<br>";

            }else{

                html += "👤 " + player + "<br>";

            }


        });



        document.getElementById("players").innerHTML =
        html || "لا يوجد لاعبين";


    });


});




// زر الخروج

window.leaveRoom = async function(){


    console.log("خروج من القعدة");



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
