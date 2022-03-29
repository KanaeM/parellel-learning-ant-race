import React, {useEffect, useState} from 'react'
import AntList from '../antList/AntList';
import Button from '@mui/material/Button';
import './Race.scss';

export function AntRace() {
  const [ants, setAnts] = useState([]);
  const [displayList, setDisplayList] = useState(false);
  const [startRace, setStartRace] = useState(false);
 
  useEffect(() => {
    getAntData();
  }, []);

  async function getAntData() {
    await fetch('/data/antData.json')
      .then(function (response) {
          return response.json()
      })
      .then(function (antData) {
        setAnts(antData.ants);
      });
  };

  function generateAntWinLikelihoodCalculator() {
    const delay = 7000 + Math.random() * 7000;
    const likelihoodOfAntWinning = Math.random();

    return (callback) => {
      setTimeout(() => {
        callback(likelihoodOfAntWinning);
      }, delay);
    }
  }


  function initRace() {
  }

  return (
    <div className="ant-race">
      <div className='ant-race__button-wrapper'>
        <Button
          className="ant-race__button"
          variant="outlined"
          onClick={() => {
            setDisplayList(displayList ? false : true);
          }}
        >
          Get Ants
        </Button>
        <Button
          className="ant-race__button"
          variant="outlined"
          disabled={ants.length <= 0}
          onClick={() => {
            initRace();
          }}
        >
          Start Race
        </Button>
      </div>

      {displayList && <AntList ants={ants} />}
    </div>
  );
} 

