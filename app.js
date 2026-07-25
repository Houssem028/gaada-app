import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";


// زر إنشاء القعدة
function createRoom(){

    window.location.href = "create-room.html";

}


// زر دخول القعدة
function joinRoom(){

    window.location.href = "join-room.html";

}


// الألعاب
function games(){

    alert("🎮 الألعاب ستضاف قريبًا");

}



// إنشاء غرفة حقيقية في Firebase

window.createGameRoom = async function(){

    let player = document.getElementById("playerName").value;

    let roomName = document.getElementById("roomName").value;


    if(player === "" || roomName === ""){

        alert("اكتب اسمك واسم القعدة");

        return;

    }


    let code = Math.floor(100000 + Math.random() * 900000);


    try {

        await addDoc(collection(db, "rooms"), {

            playerName: player,

            roomName: roomName,

            code: code,

            createdAt: serverTimestamp()

        });


        document.getElementById("code").innerHTML =
        "🎉 تم إنشاء القعدة<br>" +
        "الكود: " + code;


    } catch(error){

        console.log(error);

        alert("حدث خطأ في إنشاء القعدة");

    }

}
