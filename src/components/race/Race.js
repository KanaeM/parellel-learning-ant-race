import React, {useEffect, useState} from 'react'
import AntList from '../antList/AntList';
import RaceStatus from '../raceStatus/RaceStatus';
import Stack from '@mui/material/Stack';
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

  /**
   * Fetches all ant data from JSON file
   */
  async function getAntData() {
    await fetch('/data/antData.json')
      .then(function (response) {
        return response.json();
      })
      .then(function (antData) {
        setAnts(antData.ants);
      });
  }

  /**
   * Preset ant win likelihood algorith
   * @returns {function} callback
   */
  function generateAntWinLikelihoodCalculator() {
    const delay = 7000 + Math.random() * 7000;
    const likelihoodOfAntWinning = Math.random();

    return (callback) => {
      setTimeout(() => {
        callback(likelihoodOfAntWinning);
      }, delay);
    };
  }

  /**
   * Set win likelihood on all ants
   */
  async function setWinLikelihood() {
    const newRaceData = [...ants];

    const setPromise = (ant, i) => {
      const calculator = generateAntWinLikelihoodCalculator();
      return new Promise((resolve, reject) => {
        calculator(function (val) {
          resolve(val);
        });
      });
    };

    const antPromises = ants.map(async (ant, i) => {
      let race = ant;
      race.winLikelihood = await setPromise(ant);
      newRaceData[i] = {
        ...newRaceData[i],
        winLikelihood: race.winLikelihood,
        status: 'end'
      };

      setAnts(newRaceData);
      return race;
    });

    await Promise.all(antPromises).then((data) => {
      setStatus('end');
    });
  }

  /**
   * Initialize the race
   */
  async function initRace() {
    setStartRace(true);
    setStatus('start');
    await setWinLikelihood();
  }

  return (
    <div className="ant-race">
      <div className="ant-race__button-wrapper">
        <Stack spacing={2} direction="row">
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
        </Stack>
      </div>

      <RaceStatus status={status} />

      {(displayList || startRace) && <AntList ants={ants} />}
    </div>
  );
} 
