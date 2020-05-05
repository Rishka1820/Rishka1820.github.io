let card4 = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
let card5 = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
let card6 = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56];
var sound= new Audio();
  sound.src="button.mp3";
  var sound1=new Audio();
  sound1.src="countdown.mp3"
  var sound3=new Audio();
  sound3.src="end.mp3";

var boxes = document.querySelectorAll('.grid-item');
let shuffle = function (arr) {
    let newposition, temp;
    for (let i = arr.length - 1; i > 0; i--) {
        newposition = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[newposition];
        arr[newposition] = temp;
    }
    return arr;

}
let shuffled4 = shuffle(card4)
let shuffled5 = shuffle(card5)
let shuffled6 = shuffle(card6)





    let mytime;
    let object=document.getElementById('stopwatch')
    function starttime(){
        const start = new Date()
        mytime = setInterval(() => {
        let now = new Date()
        let dt = now.getTime() - start.getTime()
        object.innerHTML = dt / 1000;
    }, 100)}


   
    function stoptimer(){
        
        clearInterval(mytime);
        mytime = null;
        console.log(mytime)
    }

function timer(r) {

    if(r==4){
        let scores=document.getElementById('highscores');
        score=JSON.parse(localStorage.getItem("highscores1"));
        for(let i=0;i<score.length;i++){

          scores.innerHTML= scores.innerHTML + ' ' +[i]+ ' ' ;
        }

        console.log(scores.innerHTML);
    }
      else if(r==5){
        let scores=document.getElementById('highscores');
        score=JSON.parse(localStorage.getItem("highscores2"));
        for(let i=0;i<score.length;i++)
        { 
          scores.innerHTML= scores.innerHTML + '  ' + score[i]+ ' ' ;
        }
        console.log(scores.innerHTML);
    }
    else{
        let scores=document.getElementById('highscores');
        score=JSON.parse(localStorage.getItem("highscores3"));
        for(let i=0;i<score.length;i++)
        {
          scores.innerHTML= scores.innerHTML + '  '+ score[i]+ ' ' ;
        }
        console.log(scores.innerHTML);
    }
    document.getElementById("k").style.visibility = "visible";


    console.log(r)
    
    let levels = document.querySelectorAll('.level')
    for (var i = 0; i < levels.length; i++)
        levels[i].onclick = function () {
            return false;
        }
    
    var counter = 4;
    
    var s = setInterval(function () {
        --counter
        sound1.play();
        if (counter > 0) {
            span = document.getElementById("k");
            span.innerHTML = counter;
            console.log(counter);
        }
        if (counter == 0) {
            game(r)
            sound1.pause();
            sound1.currentTime=0;

        }


    }, 1000)

    function game(r) {
        clearInterval(s);
        document.getElementById("k").innerHTML = "";
        document.getElementById("k").style.visibility = "collapse";
        makeRows(r)

    }
    let count = 0;

    let shuffled;
    function makeRows(r) {
        let a = r;
        console.log(a)
        if (a == 4) { shuffled = shuffled4; }
        else if (a == 5) { shuffled = shuffled5; }
        else { shuffled = shuffled6; }
        console.log(shuffled)
        gameBoard.setAttribute('style', 'grid-template-columns: repeat(' + a + ', 0.5fr)');

        for (c = 0; c < (r * r); c++) {

            let cell = document.createElement("div");

            cell.innerText = shuffled[c];
            gameBoard.appendChild(cell).className = "box";
            cell.id = c;
            var n=60-cell.innerHTML;
            var color ="rgb("+n*4+','+n*4+','+n*4+")";
            cell.style.backgroundColor=color;

            cell.addEventListener("click", function () { change(this.id, this.innerHTML, a,r) ,sound.play()})


            
        };
        let scores=localStorage.getItem('highscores1');
         document.getElementsByClassName('highscores').innerHTML=scores[0];
         console.log(scores);
        starttime();
        sound1.pause();

    }
   
    if (r == 4) { var y = Math.min.apply(Math, card4); i = 16, m = 53, d = 32 }
    else if (r == 5) { var y = Math.min.apply(Math, card5); i = 25, m = 71, d = 50 }
    else { var y = Math.min.apply(Math, card6); i = 36, m = 93, d = 72 }
   

    function change(id, x,r) {

        if (x == y) {
            x = parseInt(x) + i;
            count++;
            y = y + 1;
            console.log(y);
           



            if (parseInt(x) < m) {
                document.getElementById(id).innerHTML = x;
                console.log(document.getElementById(id).innerHTML)
                var n=60-x;
                var color ="rgb("+n*4+','+n*4+','+n*4+")";
                document.getElementById(id).style.backgroundColor=color;

            }
            else {
                document.getElementById(id).style.visibility = 'collapse';
            }
            if (count == d) {
                while (gameBoard.firstChild) {
                    gameBoard.removeChild(gameBoard.firstChild)
                }
                end(r);
            }

        }
        else {
            while (gameBoard.firstChild) {
                gameBoard.removeChild(gameBoard.firstChild)
            }

            gameover();
        }
    }
   
    }

    function gameover() {
        
        let timetaken= object.innerHTML
        console.log(timetaken)
       

        stoptimer();
        let gameBoard = document.getElementById('gameBoard')
        document.getElementById('stopwatch').innerHTML = "00:00";
        while (gameBoard.firstChild) {
            gameBoard.removeChild(gameBoard.firstChild)
        }
        
        
        document.getElementById("gameBoard").style.visibility = "none";
        let over = document.createElement("div");
        
        let newGame = document.getElementById('newGame')
        
        newGame.style.visibility = "visible";
        newGame.innerHTML = "Play Again";
        newGame.addEventListener('click', newgame);
        newGame.appendChild(over);
        over.className = 'end';
        over.innerHTML = "YOU LOST";
        let scores=document.getElementById('highscores');
        scores.innerHTML="";


    }

 
  let timetaken;
  var highScores1 = JSON.parse(localStorage.getItem("highScores1")) || [];
  var highScores2 = JSON.parse(localStorage.getItem("highScores2")) || [];
  var highScores3 = JSON.parse(localStorage.getItem("highScores3")) || [];
  localStorage.setItem("highscores1", JSON.stringify(highScores1))
  localStorage.setItem("highscores2", JSON.stringify(highScores2))
  localStorage.setItem("highscores3", JSON.stringify(highScores3))
    
  function end(r) {
       
        timetaken= object.innerHTML
        sound3.play();
        stoptimer();
        let newGame = document.getElementById('newGame')
        newGame.style.visibility = "visible";
        newGame.innerHTML = "Play Again";
        newGame.addEventListener('click', newgame);
        document.getElementById('stopwatch').innerHTML = "00:00";
        document.getElementById("gameBoard").style.visibility = "collapse";
        let timetake = document.createElement("div");
        newGame.appendChild(timetake);
        timetake.className = 'end';
        timetake.innerHTML = 'Time Taken:'+timetaken;
        let over = document.createElement("div");
        newGame.appendChild(over);
        over.className= 'end'
        over.innerHTML = "END";
        console.log(over.innerHTML)
        let scores=document.getElementById('highscores');
        scores.innerHTML="";
        // localStorage.setItem("score", timetaken);
        // var highScores= new Array();
        if(r==4){
        highScores1.push(timetaken);
        highScores1.sort((a, b) => a - b);
        highScores1.splice(5);  
        localStorage.setItem("highscores1", JSON.stringify(highScores1))
       }
        else if(r==5){
            highScores2.push(timetaken);
            highScores2.sort((a, b) => a - b);
            highScores2.splice(5); 
            localStorage.setItem("highscores2", JSON.stringify(highScores2))
         }
            
        
        else{
            highScores3.push(timetaken);
            highScores3.sort((a, b) => a - b);
            highScores3.splice(5);
             localStorage.setItem("highscores3", JSON.stringify(highScores3))
        }

        // let f=r;
        // if(f==4) {highScores1=highScores;}
        //  else  if(f==5) {highScores2=highScores;}
        // else {highScores3=highScores};;
       
        // localStorage.setItem("highscores2", JSON.stringify(highScores2))
        // localStorage.setItem("highscores3", JSON.stringify(highScores3))
    }
   
   

    function newgame() {
       let end=document.querySelectorAll('.end')
       
       for(i=0;i<end.length;i++)
       {
           end[i].style.display="none";
        }
        
        let newGame = document.getElementById('newGame')
        newGame.style.visibility="collapse"
     let levels=document.querySelectorAll('.level')
        for (var i = 0; i < levels.length; i++){
        
        let e=i+4
        levels[i].onclick = function () {
           timer(e),sound1.play()}
    }
}  
    clearInterval(localStorage)

