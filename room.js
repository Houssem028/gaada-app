import { db } from "./firebase.js";

import {
    collection,
    query,
    where,
    onSnapshot,
    updateDoc,
    doc,
    arrayRemove,
    addDoc,
    orderBy,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";



const roomCode = Number(localStorage.getItem("roomCode"));
const playerName = localStorage.getItem("playerName");


let roomId = null;
let chatLoaded = false;



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



        // معلومات القعدة

        document.getElementById("roomTitle").innerHTML =
        "☕ " + data.roomName;



        document.getElementById("roomCode").innerHTML =
        "🔑 الكود: " + data.code;




        // اللاعبين

        const players = data.players || [];



        document.getElementById("playerCount").innerHTML =
        "👥 اللاعبين (" + players.length + ")";



        let html = "";



        players.forEach((p)=>{


            if(p === data.owner){

                html += "👑 " + p + " (المدير)<br>";

            }else{

                html += "👤 " + p + "<br>";

            }


        });



        document.getElementById("players").innerHTML =
        html || "لا يوجد لاعبين";






        // الهوست

        const hostControls =
        document.getElementById("hostControls");


        const waiting =
        document.getElementById("waitingMessage");



        if(playerName === data.owner){


            hostControls.style.display = "block";


            waiting.innerHTML =
            "👑 أنت مدير القعدة";


        }else{


            hostControls.style.display = "none";


            waiting.innerHTML =
            "⏳ بانتظار المدير";


        }







        // عرض اللعبة

        const gameInfo =
        document.getElementById("gameInfo");



        if(data.game){


            gameInfo.innerHTML =

            "🎮 اللعبة الحالية: <b>" 
            + data.game +
            "</b>";



        }else{


            gameInfo.innerHTML =
            "🎮 لم يتم اختيار لعبة بعد";


        }







        // زر بدء اللعبة للهوست

        const startBtn =
        document.getElementById("startGameBtn");



        if(data.game && playerName === data.owner){


            startBtn.style.display="block";


        }else{


            startBtn.style.display="none";


        }







        // الدردشة

        if(!chatLoaded){

            loadMessages(roomId);

            chatLoaded=true;

        }



    });


});









// فتح قائمة الألعاب

window.showGames=function(){


    document.getElementById("gameMenu").style.display="block";


};









// اختيار اللعبة

window.selectGame = async function(game){



    if(!roomId){

        return;

    }



    await updateDoc(

        doc(db,"rooms",roomId),

        {

            game:game,

            gameStatus:"waiting"

        }

    );



    document.getElementById("gameMenu").style.display="none";


};









// بدء اللعبة

window.startGame = async function(){



    await updateDoc(

        doc(db,"rooms",roomId),

        {

            gameStatus:"started"

        }

    );



    alert("🚀 بدأت اللعبة");


};









// تحميل الرسائل

function loadMessages(id){



    const messagesRef = collection(

        db,

        "rooms",

        id,

        "messages"

    );




    const q = query(

        messagesRef,

        orderBy("time","asc")

    );





    onSnapshot(q,(snapshot)=>{


        let html="";



        snapshot.forEach((msg)=>{


            const data = msg.data();



            html += `

            <div class="message">

            <b>👤 ${data.sender}</b><br>

            ${data.text}

            </div>

            `;


        });





        document.getElementById("messages").innerHTML =

        html || "لا توجد رسائل بعد";



    });



}









// إرسال رسالة

window.sendMessage = async function(){



    const input =
    document.getElementById("messageInput");



    const text =
    input.value.trim();



    if(!text || !roomId){

        return;

    }




    await addDoc(

        collection(

            db,

            "rooms",

            roomId,

            "messages"

        ),

        {

            sender:playerName,

            text:text,

            time:serverTimestamp()

        }

    );




    input.value="";



};









// الخروج

window.leaveRoom = async function(){



    if(!roomId){

        alert("الغرفة غير جاهزة");

        return;

    }



    await updateDoc(

        doc(db,"rooms",roomId),

        {

            players:arrayRemove(playerName)

        }

    );



    localStorage.removeItem("roomCode");

    localStorage.removeItem("playerName");



    window.location.href="index.html";


};
