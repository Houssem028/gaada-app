import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    serverTimestamp,
    updateDoc,
    doc,
    arrayUnion
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




// إنشاء قعدة

window.createGameRoom = async function(){


    const player =
    document.getElementById("playerName").value.trim();


    const roomName =
    document.getElementById("roomName").value.trim();



    if(!player || !roomName){

        alert("اكتب اسمك واسم القعدة");
        return;

    }



    const code =
    Math.floor(100000 + Math.random() * 900000);



    try{


        await addDoc(collection(db,"rooms"),{

            owner: player,

            roomName: roomName,

            code: code,

            players:[
                player
            ],

            createdAt: serverTimestamp()

        });



        localStorage.setItem("roomCode", code);
        localStorage.setItem("playerName", player);



        document.getElementById("code").innerHTML =
        "🎉 تم إنشاء القعدة<br><br>🔑 الكود: " + code;



        setTimeout(()=>{

            window.location.href="room.html";

        },1500);



    }catch(error){

        alert(error.message);

    }


};







// دخول القعدة

window.joinGameRoom = async function(){


    const name =
    document.getElementById("joinName").value.trim();


    const code =
    Number(document.getElementById("roomCode").value);



    if(!name || !code){

        alert("اكتب الاسم والكود");

        return;

    }



    try{


        const q = query(

            collection(db,"rooms"),

            where("code","==",code)

        );



        const result = await getDocs(q);



        if(result.empty){

            document.getElementById("joinResult").innerHTML =
            "❌ الكود غير موجود";

            return;

        }



        const roomDoc = result.docs[0];



        await updateDoc(

            doc(db,"rooms",roomDoc.id),

            {

                players: arrayUnion(name)

            }

        );



        localStorage.setItem("roomCode",code);

        localStorage.setItem("playerName",name);



        document.getElementById("joinResult").innerHTML =
        "✅ تم الدخول للقعدة<br>🚀 جاري فتح الغرفة...";



        setTimeout(()=>{

            window.location.href="room.html";

        },1000);



    }catch(error){

        alert("خطأ: " + error.message);

    }


};
