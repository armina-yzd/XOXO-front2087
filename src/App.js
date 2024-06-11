import React, { useState, useEffect } from 'react'
import api from './api'

const App = () => {
  const [players, setPlayer] = useState([])

  const fetchPlayer = async () => {
    const response = await api.get('/player/');
    setPlayer(response.data)
  };


  useEffect(() => {
    fetchPlayer()
  }, []);
  

  const [player1, setPlayer1] = useState({
    name: '',
    status: "NONE"
  });

  const [player2, setPlayer2] = useState({
    name: '',
    status: "NONE"
  });

  

  const handleInputChange1 = (e) => {
    setPlayer1({
      ...player1,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChange2 = (e) => {
    setPlayer2({
      ...player2,
      [e.target.name]: e.target.value,
    });
    
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await api.post('/player/', player1);
    await api.post('/player/', player2);
    
    document.getElementById("blue").innerHTML = player1.name + " is : O";
    document.getElementById("red").innerHTML = player2.name + " is : X";
  };

  const updateScore = async () => {
    await api.put('/player/', player1);
    await api.put('/player/', player2);
  };




  let XOXO = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
  ];

  let turn = 1;
  let finish = false;


  function check() {
    for (let i = 0; i < 3; i++) {
      if (XOXO[i][0] == XOXO[i][1] && XOXO[i][1] == XOXO[i][2]) {
        if (XOXO[i][0] == 1) {

          win();
          return;
        } else if (XOXO[i][0] == 2) {
          win();
          return;
        }

      }
    }
    for (let i = 0; i < 3; i++) {
      if (XOXO[0][i] == XOXO[1][i] && XOXO[1][i] == XOXO[2][i]) {
        if (XOXO[0][i] == 1) {
          win();
          return;
        } else if (XOXO[0][i] == 2) {
          win();
          return;
        }

      }
    }
    if (XOXO[0][0] == XOXO[1][1] && XOXO[1][1] == XOXO[2][2]) {
      if (XOXO[0][0] == 1) {
        win();
        return;
      } else if (XOXO[0][0] == 2) {

        win();
        return;
      }
    }
    if (XOXO[2][0] == XOXO[1][1] && XOXO[1][1] == XOXO[0][2]) {
      if (XOXO[2][0] == 1) {
        win();
        return;
      } else if (XOXO[2][0] == 2) {
        win();
        return;
      }
    }

  }

  function Tie() {
    if (!finish) {

      let k = 0;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (XOXO[i][j] == 1 || XOXO[i][j] == 2)
            k++;
        }
      }
      if (k == 9) {
        document.getElementById("red").innerHTML = "";
        document.getElementById("blue").innerHTML = "";
        document.getElementById("winner").innerHTML = "DRAW";
      }
    }
  }

  function win() {
    finish = true;
    document.getElementById("0-0").disabled = true;
    document.getElementById("0-1").disabled = true;
    document.getElementById("0-2").disabled = true;
    document.getElementById("1-0").disabled = true;
    document.getElementById("1-1").disabled = true;
    document.getElementById("1-2").disabled = true;
    document.getElementById("2-0").disabled = true;
    document.getElementById("2-1").disabled = true;
    document.getElementById("2-2").disabled = true;
    document.getElementById("red").innerHTML = "";
    document.getElementById("blue").innerHTML = "";

    if (turn == 0) {
      document.getElementById("winner").innerHTML = player1.name + " WON";
      player1.status = "WIN";
      player2.status = "LOSE";
    } else {
      document.getElementById("winner").innerHTML = player2.name + " WON";
      player2.status = "WIN";
      player1.status = "LOSE";
    }
    updateScore();
  }

  function startGame() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("login").style.display = "block";
  }

  function list() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("list").style.display = "block";
  }

  function game() {
    document.getElementById("login").style.display = "none";
    document.getElementById("game").style.display = "block";
  }

  function gamePlay0_0() {
    if (turn == 1) {
      document.getElementById("0-0").innerHTML = "o";
      document.getElementById("0-0").style.color = "blue";
      document.getElementById("0-0").disabled = true;
      XOXO[0][0] = 1;
      turn = 0;
    } else {
      XOXO[0][0] = 2;
      document.getElementById("0-0").innerHTML = "x";
      document.getElementById("0-0").style.color = "red";
      document.getElementById("0-0").disabled = true;
      turn = 1;
    }
    check();
    Tie();


  }
  function gamePlay0_1() {
    if (turn == 1) {
      document.getElementById("0-1").innerHTML = "o";
      document.getElementById("0-1").style.color = "blue";
      document.getElementById("0-1").disabled = true;
      XOXO[0][1] = 1;
      turn = 0;
    } else {
      XOXO[0][1] = 2;
      document.getElementById("0-1").innerHTML = "x";
      document.getElementById("0-1").style.color = "red";
      document.getElementById("0-1").disabled = true;
      turn = 1;
    }
    check();
    Tie();
  }
  function gamePlay0_2() {
    if (turn == 1) {
      document.getElementById("0-2").innerHTML = "o";
      document.getElementById("0-2").style.color = "blue";
      document.getElementById("0-2").disabled = true;
      XOXO[0][2] = 1;
      turn = 0;
    } else {
      XOXO[0][2] = 2;
      document.getElementById("0-2").innerHTML = "x";
      document.getElementById("0-2").style.color = "red";
      document.getElementById("0-2").disabled = true;
      turn = 1;
    }
    check();
    Tie();
  }

  function gamePlay1_0() {
    if (turn == 1) {
      document.getElementById("1-0").innerHTML = "o";
      document.getElementById("1-0").style.color = "blue";
      document.getElementById("1-0").disabled = true;
      XOXO[1][0] = 1;
      turn = 0;
    } else {
      XOXO[1][0] = 2;
      document.getElementById("1-0").innerHTML = "x";
      document.getElementById("1-0").style.color = "red";
      document.getElementById("1-0").disabled = true;
      turn = 1;
    }
    check();
    Tie();
  }
  function gamePlay1_1() {
    if (turn == 1) {
      document.getElementById("1-1").innerHTML = "o";
      document.getElementById("1-1").style.color = "blue";
      document.getElementById("1-1").disabled = true;
      XOXO[1][1] = 1;
      turn = 0;
    } else {
      XOXO[1][1] = 2;
      document.getElementById("1-1").innerHTML = "x";
      document.getElementById("1-1").style.color = "red";
      document.getElementById("1-1").disabled = true;
      turn = 1;
    }
    check();
    Tie();
  }
  function gamePlay1_2() {
    if (turn == 1) {
      document.getElementById("1-2").innerHTML = "o";
      document.getElementById("1-2").style.color = "blue";
      document.getElementById("1-2").disabled = true;
      XOXO[1][2] = 1;
      turn = 0;
    } else {
      XOXO[1][2] = 2;
      document.getElementById("1-2").innerHTML = "x";
      document.getElementById("1-2").style.color = "red";
      document.getElementById("1-2").disabled = true;
      turn = 1;
    }
    check();
    Tie();
  }

  function gamePlay2_0() {
    if (turn == 1) {
      document.getElementById("2-0").innerHTML = "o";
      document.getElementById("2-0").style.color = "blue";
      document.getElementById("2-0").disabled = true;
      XOXO[2][0] = 1;
      turn = 0;
    } else {
      XOXO[2][0] = 2;
      document.getElementById("2-0").innerHTML = "x";
      document.getElementById("2-0").style.color = "red";
      document.getElementById("2-0").disabled = true;
      turn = 1;
    }
    check();
    Tie();
  }
  function gamePlay2_1() {
    if (turn == 1) {
      document.getElementById("2-1").innerHTML = "o";
      document.getElementById("2-1").style.color = "blue";
      document.getElementById("2-1").disabled = true;
      XOXO[2][1] = 1;
      turn = 0;
    } else {
      XOXO[2][1] = 2;
      document.getElementById("2-1").innerHTML = "x";
      document.getElementById("2-1").style.color = "red";
      document.getElementById("2-1").disabled = true;
      turn = 1;
    }
    check();
    Tie();
  }
  function gamePlay2_2() {
    if (turn == 1) {
      document.getElementById("2-2").innerHTML = "o";
      document.getElementById("2-2").style.color = "blue";
      document.getElementById("2-2").disabled = true;
      XOXO[2][2] = 1;
      turn = 0;
    } else {
      XOXO[2][2] = 2;
      document.getElementById("2-2").innerHTML = "x";
      document.getElementById("2-2").style.color = "red";
      document.getElementById("2-2").disabled = true;
      turn = 1;
    }
    check();
    Tie();
  }

  
  return (
    <div>

      {/* first page menu */}
      <div className='text-center container' id='menu'>
        <h1 className='text-white my-4'><b>Tic-Tac-Toe</b></h1>
        <button className='text-white' onClick={startGame}><h4>START</h4></button>
        <div>
          <button className='btn text-white mt-5' onClick={list}><h4>SCORES</h4></button>
        </div>
      </div>

      {/* login two player */}
      <div className='text-center container' id='login'>
        <h1 className='text-white my-4'><b>Tic-Tac-Toe</b></h1>
        <div className='container'>
          <form onSubmit={handleFormSubmit}>
            <h2 className='text-white mb-5'>fill the Form</h2>
            <div className='mb-3 mt-3'>
              <input type='text' placeholder="Enter Player one" name="name" onChange={handleInputChange1} value={player1.name} />
            </div>
            <div className=' mt-4'>
              <input type='text' placeholder="Enter Player Two" name="name" onChange={handleInputChange2} value={player2.name} />
            </div>
            <button type='submit' className='text-white mt-5' onClick={game}>
              START GAME
            </button>
          </form>
        </div>
      </div>


      {/* top 10 scores */}
      <div className='text-center container' id='list'>
        <h1 className='text-white my-4'><b>Tic-Tac-Toe</b></h1>
        <h1 className='text-white my-5'><b>SCORE TABLE(TOP 10)</b></h1>
        <table className='table table-borderless table-hover text-white fw-bold'>
          <thead>
            <tr>
              <th>ROW</th>
              <th>NAME</th>
              <th>SCORE</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player,i) => (
              <tr>
                <td>{i+1}</td>
                <td>{player.name}</td>
                <td>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* XOXO game */}
      <div className='text-center container' id='game'>
        <h1 className='text-white my-5'><b>Tic-Tac-Toe</b></h1>
        <div className='text-white row'>
          <h3 className='col-4' id="blue"><b>Blue is : O</b></h3>
          <div className='col-4' id="winner"></div>
          <h3 className='col-4' id="red"><b>Red is : X</b></h3>
        </div>

        <div className='container parent'>
          <div className='row justify-content-center child'>

            <button className='col-3 mx-3 my-2 b' onClick={gamePlay0_0} id="0-0"></button>
            <button className='col-3 mx-3 my-2 b' onClick={gamePlay0_1} id="0-1"></button>
            <button className='col-3 mx-3 my-2 b' onClick={gamePlay0_2} id="0-2"></button>
          </div>
          <div className='row justify-content-center child'>
            <button className='col-3 mx-3 my-2 b' onClick={gamePlay1_0} id="1-0"></button>
            <button className='col-3 mx-3 my-2 b' onClick={gamePlay1_1} id="1-1"></button>
            <button className='col-3 mx-3 my-2 b' onClick={gamePlay1_2} id="1-2"></button>
          </div>
          <div className='row justify-content-center child'>
            <button className='col-3 mx-3 my-2 b' onClick={gamePlay2_0} id="2-0"></button>
            <button className='col-3 mx-3 my-2 b' onClick={gamePlay2_1} id="2-1"></button>
            <button className='col-3 mx-3 my-2 b' onClick={gamePlay2_2} id="2-2"></button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default App;
