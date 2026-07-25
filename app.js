function createRoom(){

    window.location.href = "create-room.html";

}



function joinRoom(){

    window.location.href = "join-room.html";

}



function joinGameRoom(){

    let name = document.getElementById("joinName").value;

    let code = document.getElementById("roomCode").value;


    if(name === "" || code === ""){

        alert("اكتب اسمك وكود القعدة");

        return;

    }


    document.getElementById("joinResult").innerHTML =
    "✅ تم طلب الدخول للقعدة<br>" +
    "اللاعب: " + name +
    "<br>الكود: " + code;

}



function games(){

    alert("🎮 قائمة الألعاب قريبا!");

}



// إنشاء كود القعدة

function createGameRoom(){

    let player = document.getElementById("playerName").value;
    let room = document.getElementById("roomName").value;


    if(player === "" || room === ""){

        alert("اكتب اسمك واسم القعدة");

        return;

    }


    let code = Math.floor(100000 + Math.random() * 900000);


    document.getElementById("code").innerHTML =
    "كود القعدة: " + code +
    "<br>شارك الكود مع أصحابك 👥";


}
