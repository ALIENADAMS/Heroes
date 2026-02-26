import { GameState } from '../src/core/GameState.js';
import resourcesData from '../src/data/resources.json';
import heroData from '../src/data/hero.json';
import { Hero } from './Hero.js';

const game = new GameState();
const hero = new Hero();

const weekElement = document.getElementById('week_number');
const dayElement = document.getElementById('day_number');
const nextTurnButton = document.getElementById('next_turn-button');
function renderTurn()
{
    weekElement.textContent = game.getWeek();
    dayElement.textContent = game.getDay();
}

nextTurnButton.addEventListener('click', () => {
    game.nextTurn();
    renderTurn();
    resources.render();

    nextTurnButton.classList.add('rotate');

    nextTurnButton.addEventListener('animationend', () => {
        nextTurnButton.classList.remove('rotate');
    }, { once: true });
});

renderTurn();