var scores, roundScore, activePlayer, gamePlaying;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;
gamePlaying = true;

//Initialization of the game
init();


//Add function to roll dice button
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        //1. Random number on dices
        var dice0 = Math.floor(Math.random() * 6) + 1;
        var dice1 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        document.querySelector('#dice-0').style.display = 'block';
        document.querySelector('#dice-1').style.display = 'block';
        document.querySelector('#dice-0').src = '../Pig_Game/img/dice-' + dice0 + '.png';
        document.querySelector('#dice-1').src = '../Pig_Game/img/dice-' + dice1 + '.png';

        //3.Delete global Score IF both dices are 6
        if (dice0 === 6 && dice1 === 6) {
            scores[activePlayer] = 0;
            roundScore = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            document.querySelector('#current-' + activePlayer).textContent = '0';
            nextPlayer();

            //4.Update the current score IF the number on dice was NOT 1
        } else if (dice0 !== 1 && dice1 !== 1) {
            //Add score
            roundScore += dice0 + dice1;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next Player
            nextPlayer();
        }
    }
});

//add function to button hold
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        //add roundScore to Global score
        scores[activePlayer] += roundScore;

        //display the global score
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Delete roundscore
        document.querySelector('#current-' + activePlayer).textContent = '0';

        //Input of winning score by the user
        var input = document.querySelector('#input').value;
        var winningScore = 100;
        if (input) {
            winningScore = input;
        } else {
            winningScore;
        }

        //Check IF the player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            document.querySelector('#dice-0').style.display = 'none';
            document.querySelector('#dice-1').style.display = 'none';
            gamePlaying = false;

        } else {
            //NextPlayers turn
            nextPlayer();
        }
    }
})

//Add function to button new game
document.querySelector('.btn-new').addEventListener('click', init);

//Functions
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function init() {
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('#dice-0').style.display = 'none';
    document.querySelector('#dice-1').style.display = 'none';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
}
