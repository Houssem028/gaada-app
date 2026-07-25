import { db } from "./firebase.js";

import {
    collection,
    onSnapshot,
    query,
    where
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";


// نقرأ الكود المحفوظ مؤقتًا
const roomCode = localStorage.getItem("roomCode");


if(!roomCode){

    document.getElementById("roomTitle").innerHTML =
    "❌ لا توجد قعدة";

}



// البحث عن القعدة وعرضها

const roomsRef = collection(db,"rooms");


const q = query(

    roomsRef,

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



        document.getElementById("players").innerHTML =
        "👑 " + data.owner;



    });



});
