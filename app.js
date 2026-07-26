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



// إنشاء قعدة

window.createGameRoom = async function(){


    const player = document.getElementById("playerName").value;
    const roomName = document.getElementById("roomName").value;



    if(player === "" || roomName === ""){

        alert("اكتب اسمك واسم القعدة");

        return;

    }



    const code = Math.floor(100000 + Math.random() * 900000);



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



        // حفظ بيانات اللاعب والقاعة

        localStorage.setItem("roomCode", code);

        localStorage.setItem("playerName", player);



        document.getElementById("code").innerHTML =

        "🎉 تم إنشاء القعدة<br><br>" +

        "🔑 الكود: " + code;



        setTimeout(()=>{

            window.location.href="room.html";

        },1500);



    }catch(error){


        console.log(error);

        alert("حدث خطأ في إنشاء القعدة");


    }



};






// دخول قعدة

window.joinGameRoom = async function(){



    const name = document.getElementById("joinName").value;

    const code = document.getElementById("roomCode").value;




    if(name === "" || code === ""){


        alert("اكتب الاسم والكود");

        return;

    }




    const q = query(

        collection(db,"rooms"),

        where(
            "code",
            "==",
            Number(code)
        )

    );



    const result = await getDocs(q);




    if(result.empty){


        document.getElementById("joinResult").innerHTML =

        "❌ الكود غير موجود";


        return;

    }




    const room = result.docs[0];



    await updateDoc(

        doc(db,"rooms",room.id),


        {


            players: arrayUnion(name)


        }


    );



    // حفظ بيانات اللاعب

    localStorage.setItem("roomCode", code);

    localStorage.setItem("playerName", name);




    document.getElementById("joinResult").innerHTML =

    "✅ تم الدخول للقعدة";



    setTimeout(()=>{


        window.location.href="room.html";


    },1000);



};
