let bt=document.querySelectorAll('button')
let score_board=document.getElementById('score')
let music = new Audio('neon-gaming-128925.mp3')
let win_music = new Audio('mixkit-melodic-bonus-collect-1938.wav')
let win_area = document.getElementById('win_area')
let user = ''
var turn=true;
let count=0;
var gameover=false
music.play()

const draw_game = ()=>{
    if(count==9 && !gameover){
        score_board.innerHTML = 'GAME DRAW'
        score_board.style.fontSize = 'x-large'
        document.getElementById('draw').style.width='5cm'
        reset_btn()

    }
}

const forWin = ()=>{
    var win = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
        win.forEach((e)=>{
            if(bt[e[0]].innerHTML===bt[e[1]].innerHTML && bt[e[2]].innerHTML===bt[e[1]].innerHTML && bt[e[0]].innerHTML!==''){               
                win_scr()
                music.pause()
                gameover=true
            }
            
        })
    
}

const reset_btn=()=>{
    let reset = document.createElement('button')
    reset.innerHTML='RESET'
    reset.style.backgroundColor = "aliceblue"
    reset.style.color = "black"
    reset.style.fontFamily = "cursive"
    reset.onclick=()=>{
        location.reload();
        }
        win_area.append(reset)
}



for(var i=0; i<bt.length; i++){
    
    bt[i].onclick= (e) =>{
        user = (turn) ? 'O' : 'X'
        score_board.innerHTML=`${user} turn`
        if(turn){
            e.target.innerHTML="X"
            e.target.style.color= "red"
            count++
        }else {
            count++
            e.target.innerHTML='O'
            e.target.style.color= "green"
        }
        turn=!turn
        e.target.disabled=true
        forWin()      
        draw_game()
    }
}


const win_scr = ()=>{
    document.getElementById('bear').style.width='3cm'
    score_board.innerHTML = (turn) ? '"O" WON' : '"X" WON'
    score_board.style.fontSize = 'x-large'
    win_music.play()
    reset_btn()
    for(key of bt){
        key.disabled=true
    }
    
}



