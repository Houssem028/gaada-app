import { db } from "./firebase.js";

import { randomPlayer } from "./players.js";

import {
    collection,
    query,
    where,
    getDocs,
    doc,
    updateDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";



const roomCode = Number(localStorage.getItem("roomCode"));
const playerName = localStorage.getItem("playerName");


let roomId = null;
let myPlayer = null;
let hearts = 3;



// اختيار لاعبين مختلفين
function getTwoDifferentPlayers() {

    const first = randomPlayer([]);
    let second = randomPlayer([first.name]);

    while (second.name === first.name) {
        second = randomPlayer([first.name]);
    }

    return {
        first,
        second
    };
}

// جلب الغرفة

async function loadGame(){


    const rooms = await getDocs(

        query(
            collection(db,"rooms"),
            where("code","==",roomCode)
        )

    );


    if(rooms.empty){

        document.getElementById("gameMessage").innerHTML =
        "❌ الغرفة غير موجودة";

        return;

    }


    const room = rooms.docs[0];

    roomId = room.id;



    const data = room.data();



    if(!data.guessGame){


        await createGame();


    }


}






// إنشاء اللعبة

async function createGame(){


    const player = randomPlayer([]);



    await updateDoc(

        doc(db,"rooms",roomId),

        {


            [`guessGame.players.${playerName}`]:{


                name:player.name,

                image:player.image,

                hearts:3


            },


            "guessGame.status":"playing"


        }

    );


}








// متابعة اللعبة

function listenGame(){


    onSnapshot(

        doc(db,"rooms",roomId),

        (snap)=>{


            const data = snap.data();


            if(!data.guessGame){

                return;

            }



            const me =
            data.guessGame.players[playerName];



            if(me){


                myPlayer = me;


                hearts = me.hearts;



                document.getElementById("secretPlayerImage").src =
                me.image;



                showHearts();


            }



        }

    );


}









// عرض القلوب

function showHearts(){


    let html="";


    for(let i=0;i<hearts;i++){

        html+="❤️";

    }


    for(let i=hearts;i<3;i++){

        html+="🖤";

    }


    document.getElementById("hearts").innerHTML = html;


}









// التخمين

window.checkGuess = async function(){



    const input =
    document.getElementById("guessInput");



    const answer =
    input.value.trim();



    if(!answer){

        return;

    }



    const snap =
    await getDocs(

        query(
            collection(db,"rooms"),
            where("code","==",roomCode)
        )

    );



    const data =
    snap.docs[0].data();



    const players =
    data.guessGame.players;



    let enemy = null;



    for(let p in players){


        if(p !== playerName){

            enemy = players[p];

        }


    }



    if(!enemy){

        alert("لا يوجد خصم بعد");

        return;

    }





    if(
        answer.toLowerCase()
        ===
        enemy.name.toLowerCase()

    ){


        document.getElementById("gameMessage").innerHTML =
        "🏆 إجابة صحيحة! فزت";


    }else{


        hearts--;



        await updateDoc(

            doc(db,"rooms",roomId),

            {


                [`guessGame.players.${playerName}.hearts`]:
                hearts


            }

        );



        document.getElementById("gameMessage").innerHTML =
        "❌ خطأ! خسرت قلب";


        showHearts();



        if(hearts <= 0){


            document.getElementById("gameMessage").innerHTML =
            "💔 انتهت قلوبك! خسرت";


        }


    }



    input.value="";


};








// جولة جديدة

window.newRound = async function(){


    const player =
    randomPlayer([]);



    await updateDoc(

        doc(db,"rooms",roomId),

        {


            [`guessGame.players.${playerName}`]:{


                name:player.name,

                image:player.image,

                hearts:3


            }


        }

    );


};






loadGame().then(()=>{


    listenGame();


});
