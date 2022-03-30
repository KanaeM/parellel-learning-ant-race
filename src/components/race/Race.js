import React, {useEffect, useState} from 'react'
import AntList from '../antList/AntList';
import Button from '@mui/material/Button';
import './Race.scss';

export function AntRace() {
  const [ants, setAnts] = useState([]);
  const [displayList, setDisplayList] = useState(false);
  const [startRace, setStartRace] = useState(false);
  let newAntData = [];
 
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
    const setPromise = () => {
      const calculator = generateAntWinLikelihoodCalculator();
      return new Promise((resolve, reject) => {
        calculator(function (val) {
          resolve(val);
        });
      });
    };

    const antPromises = ants.map(async (ant, i) => {
      const newAntData = ant;
      newAntData.winLikelihood = await setPromise();
      return newAntData;
    });

    await Promise.all(antPromises).then((data) => {
      console.log('data', data)
      newAntData = data;
    });
  }


  async function initRace() {
    await setWinLikelihood();

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

