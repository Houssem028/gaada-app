import { db } from "./firebase.js";

import { randomPlayer } from "./players.js";

import {
    doc,
    getDoc,
    updateDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";



const roomCode = Number(localStorage.getItem("roomCode"));
const playerName = localStorage.getItem("playerName");


let roomId = null;
let myPlayer = null;
let hearts = 3;
let usedPlayers = [];




// البحث عن القعدة

async function loadGame(){


    const rooms = await getDocs(
        query(
            collection(db,"rooms"),
            where("code","==",roomCode)
        )
    );


    if(rooms.empty){

        document.getElementById("gameMessage").innerHTML =
        "❌ القعدة غير موجودة";

        return;

    }



    const room = rooms.docs[0];

    roomId = room.id;


    const data = room.data();



    if(!data.guessGame){


        startRound();


    }else{


        loadPlayer(data.guessGame);


    }


}






// بدء جولة جديدة

async function startRound(){



    const player = randomPlayer(usedPlayers);



    myPlayer = player;


    usedPlayers.push(player.name);



    await updateDoc(

        doc(db,"rooms",roomId),

        {


            guessGame:{


                playerName:player.name,

                playerImage:player.image,


                hearts:3,


                status:"playing"


            }


        }

    );



}







// عرض اللاعب

function loadPlayer(game){


    document.getElementById("secretPlayerImage").src =
    game.playerImage;



    hearts = game.hearts;



    showHearts();


}






function showHearts(){


    let text="";


    for(let i=0;i<hearts;i++){

        text+="❤️";

    }


    for(let i=hearts;i<3;i++){

        text+="🖤";

    }


    document.getElementById("hearts").innerHTML=text;


}








// التخمين

window.checkGuess = async function(){



    const input =
    document.getElementById("guessInput");



    const answer =
    input.value.trim();



    if(answer==="") return;



    const gameRef =
    doc(db,"rooms",roomId);



    const snap =
    await getDoc(gameRef);



    const data =
    snap.data();



    const correct =
    data.guessGame.playerName;



    if(answer.toLowerCase() === correct.toLowerCase()){



        document.getElementById("gameMessage").innerHTML =

        "🏆 إجابة صحيحة! أنت الفائز";



        await updateDoc(

            gameRef,

            {

                "guessGame.status":"finished",

                "guessGame.winner":playerName

            }

        );



    }else{


        hearts--;


        showHearts();



        document.getElementById("gameMessage").innerHTML =

        "❌ خطأ! بقي لديك " + hearts + " قلوب";




        await updateDoc(

            gameRef,

            {

                "guessGame.hearts":hearts

            }

        );



        if(hearts<=0){


            document.getElementById("gameMessage").innerHTML =

            "💔 انتهت قلوبك! الخصم فاز";



        }


    }



    input.value="";



};







// جولة جديدة

window.newRound = function(){


    startRound();


};




loadGame();
