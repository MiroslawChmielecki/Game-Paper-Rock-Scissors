'strict'   

let isFinished = false; //zmienna przechowuje info czy gra jest skonczona
let rounds;             //zmienna przechowuje liczbe rund
let text;               //zmienna przechowuje tekst

//zmienne zwiazane z wyswietlaniem komunikatow o stanie gry
let conditionsDiv = document.querySelector("#conditions"); //div z liczba rund potrzebnych by wygrac
let outputDiv = document.querySelector('#output');   //div z info o stanie rundy
let resultDiv = document.querySelector('#result');   //div  z liczba punktow 
let outputAllGame = document.querySelector('#outputAllGame'); //div z info o tym kto wygral cala gre
let computerPoints = 0;  //punkty komputera
let playerPoints = 0;    //punkty gracza

//zmienne zwiazane z buttonami
let buttonPaper = document.querySelector("#paper");
let buttonRock = document.querySelector("#rock");
let buttonScissor = document.querySelector("#scissor");
let buttonNewGame = document.querySelector("#newGame");

//funkcja jako argument przyjmuje nazwe ruchu gracza
function playerMove(ourMove){
  //funkcja random losuje liczbe 1,2 lub 3  
  function random() {
      return Math.floor(Math.random() * 3 + 1);       
      }
    let computerMove = random()   // przypisanie zmiennej computerMove do wylosowanej liczby
    if (computerMove == 1){       //zmiana z number na string
      computerMove = "paper";
    }else if (computerMove == 2) {
      computerMove = "rock";
    } else {
      computerMove = "scissor";
    }
    //sprawdzam kto wygral, do zmiennej text dodaje tekst oraz 1 punkt do gracza lub komputera
    if (computerMove == ourMove) {    
      text = "DRAW";
    } else if ((computerMove == "paper" && ourMove == "rock") 
            || (computerMove == "rock" && ourMove == "scissor") 
            || (computerMove == "scissor" && ourMove == "paper")) {
      text  = "You LOST this round: You played " + ourMove + ", Computer played " + computerMove;
      computerPoints++;
    } else {
      text = "You WIN this round: You played " + ourMove + ", Computer played " + computerMove;
      playerPoints++;
    } 
    //sprawdzam kto wygrał całość gry
    let win;                                
    if (computerPoints == rounds) {
      win = "COMPUTER WON THE ENTIRE GAME";
      isFinished = true;                      //to gra jest skończona
    } else if (playerPoints == rounds) {
      win = "YOU WON THE ENTIRE GAME";
      isFinished = true;                      //to gra jest skończona
    }
    //przekazanie do funkcji display tekstu z info kto wygral runde
    // przekazanie info czy ktos zakonczyl gre
    display(text, win);  
  }                     
  
  //funkcja display wyswietla tekst i wynik koncowy
  function display(text, win) {
    outputDiv.innerHTML = "";   //czysci po kazdej rundzie outputDiv
    outputDiv.append(text);    //append dodaje tekst do outputDiv
    if(win){
      outputAllGame.append(win);   //append dodaje wynik zmiennej win kto wygral cala gre
    }
    resultDiv.innerHTML =  playerPoints + " - " + computerPoints; //wyswietla punkty gracza i komputera
   }
   
   //buttonPAPER
  buttonPaper.addEventListener("click",function() {
    if (!isFinished) {                        //badanie czy gra jest skończona, !isFinished = nie jest skonczona
      let ourMove = this.getAttribute("id");  //zmienna przechowuje wartość atrybutu i w tym wypadku zawsze to bedzie paper
        playerMove(ourMove);
      } else {
       outputDiv.innerHTML = "Game over, please press the New Game button !"
      }
  })
  
  //buttonROCK   
  buttonRock.addEventListener("click",function() {
    if (!isFinished) {                        //badanie czy gra jest skończona
      let ourMove = this.getAttribute("id");  //zmienna przechowuje wartość atrybutu i w tym wypadku zawsze to bedzie rock
        playerMove(ourMove);
      } else {
       outputDiv.innerHTML = "Game over, please press the New Game button !"
      }
  })
  
  //buttonSCISSOR
  buttonScissor.addEventListener("click",function() {
    if (!isFinished) {                        //badanie czy gra jest skończona
      let ourMove = this.getAttribute("id");  //zmienna przechowuje wartość atrybutu i w tym wypadku zawsze to bedzie scissor
        playerMove(ourMove);
      } else {
       outputDiv.innerHTML = "Game over, please press the New Game button !"
      }
  })
  
  //buttonNewGame
  buttonNewGame.addEventListener("click", function() {
    rounds = prompt("How many rounds win ??");   //przypisanie do zmiennej rounds liczby wymaganych rund                              
    outputDiv.innerHTML = "" ;       //resetowanie zawartości diva
    resultDiv.innerHTML = "0 - 0" ;   //na nowo przyjcie 0 - 0
    outputAllGame.innerHTML = "";  //resetowanie zawartosci diva
    computerPoints = 0;         //zeruje punkty komputera
    playerPoints = 0;           // zeruje punkty gracza
    //jesli rounds nie jest liczba to gra jest skonczona i wyswietlam info w div
    if (isNaN(rounds)) {                    
      isFinished = true;
      conditionsDiv.innerHTML = " Click button New Game again and enter CORRECT number !!";
    }else{
      //jesli jest liczba to gra jest kontynuowana i wyswietlam ile rund wygrywa
      isFinished = false;
      conditionsDiv.innerHTML = rounds + " round(s) win !!";
    }
  });
  