import { useState, useEffect } from "preact/hooks";

export default function Game() {
  // myArray[y][x]
  const myArray: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0],
  ];
  const [board, setBoard] = useState(myArray);
  const [emptyCell, setEmptyCell] = useState({ x: 2, y: 2 });

  useEffect(() => {
    const newEmptyCell = findEmptyCell();
    setEmptyCell(newEmptyCell);
  }, [board]);

  /* Randomize array in-place using Durstenfeld shuffle algorithm */
  // https://stackoverflow.com/a/12646864/114157
  // Game cannot be solved if the number of inversions is odd
  // Therefore we always set emptyCell to be in the center (1,1)
  function shuffleArray(array: number[][]) {
    for (var y = array.length - 1; y > 0; y--) {
      for (var x = array[0].length - 1; x > 0; x--) {
        var j = Math.floor(Math.random() * (y + 1));
        var k = Math.floor(Math.random() * (x + 1));
        var temp = array[j][k];
        array[j][k] = array[y][x];
        array[y][x] = temp;
      }
    }
    setBoard(array);
  }

  // Helper function to find the empty cell
  function findEmptyCell() {
    const array = board;
    for (var y = array.length - 1; y >= 0; y--) {
      for (var x = array[0].length - 1; x >= 0; x--) {
        if (array[y][x] === 0) {
          var emptyCell = { x: x, y: y };
          console.log(emptyCell);
          return emptyCell;
        }
      }
    }
    return { x: 2, y: 2 };
  }
  function checkWin() {
    for (var y = 0; y < board.length; y++) {
      for (var x = 0; x < board[0].length; x++) {
        if (board[y][x] !== myArray[y][x]) {
          return false;
        }
      }
    }
    return true;
  }
  function getKeyAndMove(e: { which: any; keyCode: any }) {
    var key_code = e.which || e.keyCode;
    switch (key_code) {
      case 37: //left arrow key
        moveLeft();
        if (checkWin()) {
          alert("You win!");
          return;
        }
        break;
      case 38: //Up arrow key
        moveUp();
        if (checkWin()) {
          alert("You win!");
          return;
        }
        break;
      case 39: //right arrow key
        moveRight();
        if (checkWin()) {
          alert("You win!");
          return;
        }
        break;
      case 40: //down arrow key
        moveDown();
        if (checkWin()) {
          alert("You win!");
          return;
        }
        break;
    }
  }
  function moveLeft() {
    if (emptyCell.x > 0) {
      // Copy the current board to avoid mutating the state directly
      const newBoard = [...board];

      // Swap the values between the empty cell and the cell to the left
      const targetValue = newBoard[emptyCell.y][emptyCell.x - 1];
      newBoard[emptyCell.y][emptyCell.x] = targetValue;
      newBoard[emptyCell.y][emptyCell.x - 1] = 0;

      // Update the state with the new board and empty cell position
      setBoard(newBoard);
      setEmptyCell((prevCell) => ({ ...prevCell, x: prevCell.x - 1 }));
    }
  }
  function moveUp() {
    if (emptyCell.y > 0) {
      const newBoard = [...board];

      const targetValue = newBoard[emptyCell.y - 1][emptyCell.x];
      newBoard[emptyCell.y][emptyCell.x] = targetValue;
      newBoard[emptyCell.y - 1][emptyCell.x] = 0;

      setBoard(newBoard);
      setEmptyCell((prevCell) => ({ ...prevCell, y: prevCell.y - 1 }));
    }
  }
  function moveRight() {
    if (emptyCell.x < 2) {
      const newBoard = [...board];

      const targetValue = newBoard[emptyCell.y][emptyCell.x + 1];
      newBoard[emptyCell.y][emptyCell.x] = targetValue;
      newBoard[emptyCell.y][emptyCell.x + 1] = 0;

      setBoard(newBoard);
      setEmptyCell((prevCell) => ({ ...prevCell, x: prevCell.x + 1 }));
    }
  }
  function moveDown() {
    if (emptyCell.y < 2) {
      const newBoard = [...board];

      const targetValue = newBoard[emptyCell.y + 1][emptyCell.x];
      newBoard[emptyCell.y][emptyCell.x] = targetValue;
      newBoard[emptyCell.y + 1][emptyCell.x] = 0;

      setBoard(newBoard);
      setEmptyCell((prevCell) => ({ ...prevCell, y: prevCell.y + 1 }));
    }
  }
  function findCenterCell() {
    console.log(board[1][1]);
  }
  function swapCenterAndEmpty() {
    const newBoard = [...board];
    const targetValue = newBoard[1][1];
    newBoard[1][1] = 0;
    newBoard[emptyCell.y][emptyCell.x] = targetValue;
    setBoard(newBoard);
    setEmptyCell((prevCell) => ({ ...prevCell, y: 1, x: 1 }));
  }

  return (
    <>
      <section
        class="bg-green-300 rounded-md  cursor-pointer hover:outline focus:outline outline-green-500"
        onKeyDown={getKeyAndMove}
        tabIndex={0}
      >
        {board.map((row: number[]) => (
          <div className=" font-bold text-8xl p-2 ">
            {row.map((cell: number) => (
              <button
                className={`p-2 m-2 ${
                  cell === 0 ? "bg-gray-200" : "bg-green-200"
                }`}
              >
                {cell}
              </button>
            ))}
          </div>
        ))}
      </section>
      <button onClick={findCenterCell}>Find Center Cell</button>
      <button onClick={findEmptyCell}>Find Empty Cell</button>
      <button onClick={swapCenterAndEmpty}>Swap Center and Empty</button>
      <button
        onClick={() => shuffleArray(myArray)}
        class="bg-green-400 text-xl m-4"
      >
        Restart
      </button>
    </>
  );
}
