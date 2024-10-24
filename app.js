let gameSeq = [];
let userSeq = [];
let btns = ["yellow","red","purple","green"];
let started = false;
let level = 0;
let high = 0;
let max = document.querySelector("b");
let h2 = document.querySelector('h2');
document.addEventListener("keypress",function(){
    if(started == false){
        console.log("Game is started");
        started = true;

        levelup();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){btn.classList.remove("flash")},200);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){btn.classList.remove("userflash")},200);
}

function levelup(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randbtn);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelup,1000);
        }
    }else{
        document.querySelector("body").classList.add("bg");
        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br>Press Any Key to start`;
        setTimeout(function(){
            document.querySelector("body").classList.remove("bg");
        },200);
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    useColor = btn.getAttribute("id");
    userSeq.push(useColor);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    if(level > high){
        high = level;
    }
    max.innerText = high;
    gameSeq = [];
    userSeq = [];
    level = 0;
}