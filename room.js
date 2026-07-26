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



        // دخول اللعبة

        if(
            data.gameStatus === "started" &&
            data.currentGame === "guess"
        ){

            if(
                !window.location.pathname.includes("guess-game.html")
            ){

                window.location.href="guess-game.html";

            }

        }




        document.getElementById("roomTitle").innerHTML =
        "☕ " + data.roomName;



        document.getElementById("roomCode").innerHTML =
        "🔑 الكود: " + data.code;




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







        const hostControls =
        document.getElementById("hostControls");


        const waiting =
        document.getElementById("waitingMessage");



        if(playerName === data.owner){


            if(hostControls)
                hostControls.style.display="block";


            if(waiting)
                waiting.innerHTML="👑 أنت مدير القعدة";


        }else{


            if(hostControls)
                hostControls.style.display="none";


            if(waiting)
                waiting.innerHTML="⏳ بانتظار المدير";


        }








        const gameInfo =
        document.getElementById("gameInfo");



        if(gameInfo){


            if(data.game){

                gameInfo.innerHTML =
                "🎮 اللعبة الحالية: <b>" +
                data.game +
                "</b>";

            }else{

                gameInfo.innerHTML =
                "🎮 لم يتم اختيار لعبة بعد";

            }


        }








        const startBtn =
        document.getElementById("startGameBtn");



        if(startBtn){


            if(
                data.game &&
                playerName === data.owner
            ){

                startBtn.style.display="block";

            }else{

                startBtn.style.display="none";

            }


        }






        if(!chatLoaded){

            loadMessages(roomId);

            chatLoaded=true;

        }



    });


});









window.showGames=function(){


    const menu =
    document.getElementById("gameMenu");


    if(menu){

        menu.style.display="block";

    }


};









window.selectGame = async function(game){



    if(!roomId)
        return;



    await updateDoc(

        doc(db,"rooms",roomId),

        {

            game:game,

            gameStatus:"waiting"

        }

    );



    const menu =
    document.getElementById("gameMenu");



    if(menu)
        menu.style.display="none";


};









window.startGame = async function(){



    if(!roomId)
        return;



    await updateDoc(

        doc(db,"rooms",roomId),

        {

            gameStatus:"started",

            currentGame:"guess"

        }

    );



};









function loadMessages(id){



    const messagesRef =
    collection(
        db,
        "rooms",
        id,
        "messages"
    );



    const q =
    query(
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



        const box =
        document.getElementById("messages");



        if(box){

            box.innerHTML =
            html || "لا توجد رسائل بعد";

        }


    });


}









window.sendMessage = async function(){



    const input =
    document.getElementById("messageInput");



    const text =
    input.value.trim();



    if(!text || !roomId)
        return;



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









window.leaveRoom = async function(){



    if(!roomId)
        return;



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
