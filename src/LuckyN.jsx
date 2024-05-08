import React, { useState } from 'react';
import Dice from './Dice';
import { getTirades, sum } from './utils';


const LuckyN = ({ numDaus, suma }) => {
  const [dice, setDice] = useState(getTirades(numDaus));
  const isWinner = sum(dice) === suma;
  
};

export default LuckyN;
