import React, { useState } from 'react';
import Dice from './Dice';
import { getTirades, sum } from './utils';

const LuckyN = ({ numDaus }) => {
  const [dice, setDice] = useState(getTirades(numDaus));

  const [guess, setGuess] = useState(1);

  const isWinner = sum(dice) === guess;

  const handleClick = () => {
    setDice(getTirades(numDaus));
  };

  const handleGuessChange = (event) => {
    setGuess(parseInt(event.target.value));
  };

  return (
    <main>
      <h1 className="text-x1 mt-3 text-center text-blue-500">
        Prova sort! La suma ha de donar {guess}
      </h1>
      <label for="guessInput">Número a encertar:</label>
      <input
        id="guessInput"
        type="number"
        onChange={handleGuessChange}
        value={guess}
        className="mt-3 text-center text-pink-500" />
      <Dice dice={dice} />
      {isWinner ? (
        <p className="text-center text-2xl text-green-500">Has guanyat!</p>
      ) : null}
      <button
        className="mx-auto mt-3 block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-800"
        onClick={handleClick}
      >
        Tira els daus
      </button>
    </main>
  );
};

export default LuckyN;
