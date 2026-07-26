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


            hostControls.style.display = "block";


            waiting.innerHTML =
            "👑 أنت مدير القعدة";


        }else{


            hostControls.style.display = "none";


            waiting.innerHTML =
            "⏳ بانتظار المدير لاختيار اللعبة";


        }



        // تشغيل الدردشة

        if(!chatLoaded){

            loadMessages(roomId);

            chatLoaded = true;

        }



    });


});








// عرض الرسائل

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


        let html = "";



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


    const input = document.getElementById("messageInput");


    const text = input.value.trim();



    if(text === ""){

        return;

    }



    if(!roomId){

        alert("لم يتم العثور على الغرفة");

        return;

    }



    try{


        await addDoc(

            collection(
                db,
                "rooms",
                roomId,
                "messages"
            ),

            {

                sender: playerName,

                text: text,

                time: serverTimestamp()

            }

        );



        input.value = "";



    }catch(error){


        console.log(error);

        alert(error.message);


    }


};









// خروج من القعدة

window.leaveRoom = async function(){



    if(!roomId){

        alert("الغرفة غير جاهزة");

        return;

    }



    try{


        await updateDoc(

            doc(db,"rooms",roomId),

            {

                players: arrayRemove(playerName)

            }

        );



        localStorage.removeItem("roomCode");

        localStorage.removeItem("playerName");



        window.location.href="index.html";



    }catch(error){


        console.log(error);

        alert("حدث خطأ في الخروج");


    }


};
