'use strict';

//  #score--0, #score--1 , #current--1, .dice , .btn--new, .btn--roll , .btn--hold

const scoreEL0 = document.getElementById('score--0');
const scoreEL1 = document.getElementById('score--1');
const currentScoreEL0 = document.getElementById('current--0');
const currentScoreEL1 = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const wins = document.querySelector('.wins');
const btnw = document.querySelector('.btn--newwins');

// Initial values at starting new
let player0name = prompt('Enter player 1 name');
let player1name = prompt('Enter player 2 name');
scoreEL0.textContent = 0;
scoreEL1.textContent = 0;
diceEL.classList.add('hidden');
wins.classList.add('hidden');
btnw.classList.add('hidden');
let currentScore = 0;
let active = 0;
let scores = [0, 0];
let playing = true;

document.getElementById('name--0').textContent = player0name;
document.getElementById('name--1').textContent = player1name;
const newgame = function () {
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  scores = [0, 0];
  currentScoreEL0.textContent = 0;
  currentScoreEL1.textContent = 0;
  scoreEL0.textContent = 0;
  scoreEL1.textContent = 0;
  currentScore = 0;
  diceEL.classList.add('hidden');
  wins.classList.add('hidden');
  playing = true;
  btnw.classList.add('hidden');
  btnNew.classList.remove('hidden');
};

const switchpl = function () {
  document.getElementById(`current--${active}`).textContent = 0;
  currentScore = 0;
  active = active === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Btn ROll
btnRoll.addEventListener('click', function () {
  if (playing) {
    // random number print on current score & roll dice with that random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;
    // check for  rolled 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${active}`).textContent = currentScore;
    } else {
      switchpl();
    }
  }
});

// // Btn Hold
let winnername = '';

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[active] += currentScore;
    document.getElementById(`score--${active}`).textContent = scores[active];
    if (scores[active] >= 100) {
      playing = false;
      diceEL.classList.add('hidden');
      wins.classList.remove('hidden');
      btnw.classList.remove('hidden');
      btnNew.classList.add('hidden');
      winnername = document.getElementById(`name--${active}`).textContent;
      wins.textContent = `Congratulations ${winnername}! you won the game. 😃 `;
      document
        .querySelector(`.player--${active}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${active}`)
        .classList.remove('player--active');
    } else {
      switchpl();
    }
  }
});

// // Btn New
btnNew.addEventListener('click', newgame);

btnw.addEventListener('click', newgame);
