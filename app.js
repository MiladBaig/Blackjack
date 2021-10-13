let cards = [];
let sum = 0;
let msg = '';
hasBlackJack = false;
isAlive = false;

const btns = document.querySelectorAll('.btn');
const messageEl = document.querySelector('#message-el');
let sumEl = document.querySelector('#sum-el');
let cardEl = document.querySelector('#card-el');

let player = {
    name: 'Milad',
    chips: 120
}
let playerEl = document.querySelector('#player-el');
playerEl.textContent = `${player.name}: ${player.chips}$`

btns.forEach(btn =>{

    btn.addEventListener('click', () =>{
        
        if (btn.classList.contains('start')){
            startGame();

        } else if(btn.classList.contains('new')){
            if(sum < 21){
                newCard();      
            }
        }
        
    })
})




function startGame(){
    isAlive = true;
    if (player.chips > 20){
        let firstNum = getRandomCard();
        let secondNum = getRandomCard();
        cards = [firstNum, secondNum]
        sum = firstNum + secondNum;
        renderGame();
    }else{
        messageEl.textContent = 'Sorry! Your credit is not enough to play another round 😢️'
    }
} 


function renderGame(){

    cardEl.textContent = 'Cards: '

    cards.forEach(card =>{
         cardEl.textContent += card + " ";
    })
    
    sumEl.textContent = `sum: ${sum}`;
    if( sum <= 20 ){
        msg = 'Do you want to draw a new card? 🤔️'
        player.chips -= 10;
    }else if( sum === 21 ){
        msg = "Wohooo! You've got blackjack 🤩️";  
        player.chips += 20;  
        hasBlackJack = true;
    }else{
        msg = 'You are out of game! 🙃️'; 
        player.chips -= 20;   
        isAlive = false;
    }
    playerEl.textContent = `${player.name}: ${player.chips}$`
    messageEl.textContent = msg;
}


function newCard(){
    hasBlackJack = false;
    if (isAlive && !hasBlackJack && player.chips > 20 ){
        let card = getRandomCard();
        sum += card;
        cards.push(card);
        renderGame();

    }

}

function getRandomCard(){
    let randomNum =  Math.floor(Math.random() * 13) + 1;
    if (randomNum > 10){
        return 10;
    } else if( randomNum === 1){
        return 11;
    }else{
        return randomNum;
    }
}

