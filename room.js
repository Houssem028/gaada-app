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



        const players = data.players || [];



        document.getElementById("playerCount").innerHTML =
        "👥 اللاعبين (" + players.length + ")";



        let html = "";



        players.forEach((p,index)=>{


            if(index === 0){

                html += "👑 " + p + " (المدير)<br>";

            }else{

                html += "👤 " + p + "<br>";

            }


        });



        document.getElementById("players").innerHTML =
        html || "لا يوجد لاعبين";


    });


});





// حذف اللاعب

async function removePlayer(){


    if(!roomId || !playerName){
        return;
    }



    try{


        await updateDoc(

            doc(db,"rooms",roomId),

            {

                players: arrayRemove(playerName)

            }

        );


    }catch(error){

        console.log(error);

    }


}





// زر الخروج

window.leaveRoom = async function(){


    await removePlayer();


    localStorage.removeItem("roomCode");

    localStorage.removeItem("playerName");


    window.location.href="index.html";


};




// محاولة حذف اللاعب عند إغلاق الصفحة

window.addEventListener("beforeunload",()=>{


    removePlayer();


});
