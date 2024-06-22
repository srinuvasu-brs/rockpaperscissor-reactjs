import React, { useState } from "react";
import "./RockPaperScissor.css";

const RockPaperScissor = () => {
  const [playerName, setPlayerName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [playerChoice, setPlayerChoice] = useState("");
  // eslint-disable-next-line
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const choices = [
    { url: "./assets/images/rock.jpg" },
    { url: "./assets/images/paper.jpg" },
    { url: "./assets/images/scissors.jpg" },
  ];

  const startGame = () => {
    if (playerName) {
      setGameStarted(true);
      const computerRandomChoice =
        choices[Math.floor(Math.random() * choices.length)].url;
      setComputerChoice(computerRandomChoice);
    } else {
      alert("Please enter your name.");
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setPlayerChoice("");
    setComputerChoice("");
    setResult("");
    setPlayerScore(0);
    setComputerScore(0);
    setPlayerName("");
  };

  const handleChoice = (choice) => {
    setPlayerChoice(choice);
    const computerRandomChoice =
      choices[Math.floor(Math.random() * choices.length)].url;
    setComputerChoice(computerRandomChoice);
    calculateResult(choice, computerRandomChoice);
  };

  const calculateResult = (playerChoice, computerChoice) => {
    if (playerChoice === computerChoice) {
      setResult("It's a tie!");
    } else if (
      (playerChoice === choices[0].url && computerChoice === choices[2].url) ||
      (playerChoice === choices[1].url && computerChoice === choices[0].url) ||
      (playerChoice === choices[2].url && computerChoice === choices[1].url)
    ) {
      setResult(`${playerName} wins!`);
      setPlayerScore((prevScore) => prevScore + 1);
    } else {
      setResult("Computer wins!");
      setComputerScore((prevScore) => prevScore + 1);
    }
  };

  return (
    <div className="container">
      <h1>Rock-Paper-Scissor</h1>
      {!gameStarted ? (
        <div className="start-game">
          <input
            class="form-control"
            type="text"
            placeholder="Enter player name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button onClick={startGame}>Start Game</button>
        </div>
      ) : (
        <div className="game">
          <div className="choices">
            {choices.map((choice, index) => (
              <img
                key={index}
                src={choice.url}
                alt={`Choice ${index}`}
                className={playerChoice === choice.url ? "selected" : ""}
                onClick={() => handleChoice(choice.url)}
              />
            ))}
          </div>
          <div className="result">{result}</div>
          <div className="scoreboard">
            <div className="player-score">
              {playerName}: {playerScore}
            </div>
            <div className="computer-score">Computer: {computerScore}</div>
          </div>
          <button onClick={resetGame}>Reset Game</button>
        </div>
      )}
    </div>
  );
};

export default RockPaperScissor;
