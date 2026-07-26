export const players = [

{
name:"Lionel Messi",
image:"https://upload.wikimedia.org/wikipedia/commons/8/89/Lionel_Messi_20180626.jpg"
},

{
name:"Cristiano Ronaldo",
image:"https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg"
},

{
name:"Kylian Mbappe",
image:"https://upload.wikimedia.org/wikipedia/commons/a/a8/Kylian_Mbappe_2022.jpg"
},

{
name:"Erling Haaland",
image:"https://upload.wikimedia.org/wikipedia/commons/1/1f/Erling_Haaland_2023.jpg"
},

{
name:"Mohamed Salah",
image:"https://upload.wikimedia.org/wikipedia/commons/8/8c/Mohamed_Salah_2021.jpg"
},

{
name:"Neymar",
image:"https://upload.wikimedia.org/wikipedia/commons/9/91/Neymar_2018.jpg"
},

{
name:"Vinicius Junior",
image:"https://upload.wikimedia.org/wikipedia/commons/7/7c/Vinicius_Junior_2022.jpg"
},

{
name:"Jude Bellingham",
image:"https://upload.wikimedia.org/wikipedia/commons/8/8f/Jude_Bellingham_2024.jpg"
},

{
name:"Kevin De Bruyne",
image:"https://upload.wikimedia.org/wikipedia/commons/6/6d/Kevin_De_Bruyne_2018.jpg"
},

{
name:"Harry Kane",
image:"https://upload.wikimedia.org/wikipedia/commons/9/9d/Harry_Kane_2023.jpg"
},

{
name:"Robert Lewandowski",
image:"https://upload.wikimedia.org/wikipedia/commons/8/8c/Robert_Lewandowski_2021.jpg"
},

{
name:"Luka Modric",
image:"https://upload.wikimedia.org/wikipedia/commons/3/32/Luka_Modric_2022.jpg"
},

{
name:"Karim Benzema",
image:"https://upload.wikimedia.org/wikipedia/commons/1/1c/Karim_Benzema_2021.jpg"
},

{
name:"Pele",
image:"https://upload.wikimedia.org/wikipedia/commons/5/5e/Pele_1970.jpg"
},

{
name:"Diego Maradona",
image:"https://upload.wikimedia.org/wikipedia/commons/6/6f/Diego_Maradona_2017.jpg"
},

{
name:"Zinedine Zidane",
image:"https://upload.wikimedia.org/wikipedia/commons/6/60/Zinedine_Zidane_2017.jpg"
},

{
name:"Ronaldinho",
image:"https://upload.wikimedia.org/wikipedia/commons/0/0e/Ronaldinho_2019.jpg"
},

{
name:"Ronaldo Nazario",
image:"https://upload.wikimedia.org/wikipedia/commons/3/3f/Ronaldo_2019.jpg"
},

{
name:"Kaka",
image:"https://upload.wikimedia.org/wikipedia/commons/7/7e/Kaka_2014.jpg"
},

{
name:"Andrea Pirlo",
image:"https://upload.wikimedia.org/wikipedia/commons/1/1d/Andrea_Pirlo_2015.jpg"
},

{
name:"Xavi Hernandez",
image:"https://upload.wikimedia.org/wikipedia/commons/6/6e/Xavi_Hernandez_2015.jpg"
},

{
name:"Andres Iniesta",
image:"https://upload.wikimedia.org/wikipedia/commons/1/1c/Andres_Iniesta_2018.jpg"
},

{
name:"Iker Casillas",
image:"https://upload.wikimedia.org/wikipedia/commons/7/77/Iker_Casillas_2015.jpg"
},

{
name:"Gianluigi Buffon",
image:"https://upload.wikimedia.org/wikipedia/commons/8/8d/Gianluigi_Buffon_2017.jpg"
},

{
name:"Sergio Ramos",
image:"https://upload.wikimedia.org/wikipedia/commons/1/1d/Sergio_Ramos_2021.jpg"
},

{
name:"Thierry Henry",
image:"https://upload.wikimedia.org/wikipedia/commons/8/8b/Thierry_Henry_2012.jpg"
},

{
name:"David Beckham",
image:"https://upload.wikimedia.org/wikipedia/commons/1/1e/David_Beckham_2014.jpg"
},

{
name:"Zlatan Ibrahimovic",
image:"https://upload.wikimedia.org/wikipedia/commons/b/b8/Zlatan_Ibrahimovic_2019.jpg"
},

{
name:"Luis Suarez",
image:"https://upload.wikimedia.org/wikipedia/commons/1/15/Luis_Suarez_2018.jpg"
},

{
name:"Riyad Mahrez",
image:"https://upload.wikimedia.org/wikipedia/commons/8/87/Riyad_Mahrez_2021.jpg"
},

{
name:"Achraf Hakimi",
image:"https://upload.wikimedia.org/wikipedia/commons/5/5f/Achraf_Hakimi_2022.jpg"
}

];



// اختيار لاعب عشوائي بدون تكرار

export function randomPlayer(usedPlayers = []){


    let availablePlayers = players.filter(

        player => !usedPlayers.includes(player.name)

    );



    if(availablePlayers.length === 0){

        availablePlayers = players;

    }



    return availablePlayers[
        Math.floor(Math.random() * availablePlayers.length)
    ];


}
