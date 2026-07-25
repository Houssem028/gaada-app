import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";


// الصفحة الرئيسية

window.createRoom = function(){

    window.location.href = "create-room.html";

};


window.joinRoom = function(){

    window.location.href = "join-room.html";

};


window.games = function(){

    alert("🎮 الألعاب ستضاف قريبًا");

};



// إنشاء قعدة جديدة

window.createGameRoom = async function(){

    const player = document.getElementById("playerName").value;

    const roomName = document.getElementById("roomName").value;


    if(player === "" || roomName === ""){

        alert("اكتب اسمك واسم القعدة");

        return;

    }


    const code = Math.floor(100000 + Math.random() * 900000);


    try {


        await addDoc(collection(db, "rooms"), {

            owner: player,

            roomName: roomName,

            code: code,

            players: [
                player
            ],

            createdAt: serverTimestamp()

        });


        localStorage.setItem("roomCode", code);


document.getElementById("code").innerHTML =

"🎉 تم إنشاء القعدة<br><br>" +

"🔑 الكود: " + code +

"<br><br>سيتم دخول الغرفة...";


setTimeout(()=>{

    window.location.href = "room.html";

},2000);


    }


    catch(error){

        console.log(error);

        alert("حدث خطأ");

    }


};





// دخول قعدة بالكود

window.joinGameRoom = async function(){


    const name = document.getElementById("joinName").value;

    const code = document.getElementById("roomCode").value;



    if(name === "" || code === ""){

        alert("اكتب الاسم والكود");

        return;

    }



    const rooms = collection(db,"rooms");


    const q = query(

        rooms,

        where(
            "code",
            "==",
            Number(code)
        )

    );



    const result = await getDocs(q);



    if(result.empty){


        document.getElementById("joinResult").innerHTML =

        "❌ الكود غير صحيح";


        return;

    }



    document.getElementById("joinResult").innerHTML =

    "✅ تم العثور على القعدة<br>" +

    "أهلاً " + name + " 🎮";


};
