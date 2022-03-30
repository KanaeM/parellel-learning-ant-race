import React, {useEffect, useState} from 'react'
import AntList from '../antList/AntList';
import RaceStatus from '../raceStatus/RaceStatus';
import Button from '@mui/material/Button';
import './Race.scss';

export function AntRace() {
  const [ants, setAnts] = useState([]);
  const [displayList, setDisplayList] = useState(false);
  const [startRace, setStartRace] = useState(false);
  const [status, setStatus] = useState('default');
 
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

  async function setWinLikelihood() {
    const newRaceData = [...ants]; 

    const setPromise = (ant) => {
      const calculator = generateAntWinLikelihoodCalculator();
      return new Promise((resolve, reject) => {
        calculator(function (val) {
          resolve(val);
        });
      });
    };

    const antPromises = ants.map(async (ant, i) => {
      let race = ant
      race.winLikelihood = await setPromise(ant);
      newRaceData[i].winLikelihood = race.winLikelihood;
      setAnts(newRaceData);
      return race;
    });

    await Promise.all(antPromises).then((data) => {
      setStatus('end')
    });
  }

  async function initRace() {
    setStartRace(true);
    setStatus('start');
    await setWinLikelihood();
  }

  return (
    <div className="ant-race">
      <div className="ant-race__button-wrapper">
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
          disabled={ants.length <= 0 || status === 'start'}
          onClick={() => {
            initRace();
          }}
        >
          Start Race
        </Button>
      </div>

      <RaceStatus status={status} />

      {(displayList || startRace) && (
        <AntList ants={ants} />
      )}
    </div>
  );
} 

