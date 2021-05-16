const cards = document.querySelectorAll('.memory-card'); 
let isSecondFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
    
    if (lockBoard) return;
    // if this is a double click on same card, then exit function
    if (this === firstCard) return;
    
    this.classList.add('flip');
    
    if (!isSecondFlippedCard) {
        // first click
        isSecondFlippedCard = true;
        firstCard = this;
        
        return;
    }   
    // second click
    isSecondFlippedCard = false;
    secondCard = this;    
    // alert("Here");
    checkForMatch();
}

function checkForMatch() {
    
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework; 
     
    // Terinary block -- condition ? true : false
    isMatch ? disableCards() : unFlipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    resetBoard();
}

function unFlipCards() {
    //alert("No match!");
    
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip'); 
        //lockBoard = false;
        resetBoard();
        }, 1000); 
    
}

function resetBoard() {
    [isSecondFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null]; 
}

(function shuffleDeck() {
    // Generate a random number between 0-15
    cards.forEach(card => {
        let randomNum = Math.floor(Math.random() * 16);
        card.style.order = randomNum;   
    }); 
})(); // Invoke function immediately after definition - IIFD

/* add an Event Listener, if click then execute flipCard function */
cards.forEach(card => card.addEventListener('click', flipCard));




