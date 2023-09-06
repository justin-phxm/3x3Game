import { useState, useEffect } from "preact/hooks";

export default function Game() {
  const myArray: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0],
  ];
  const [board, setBoard] = useState(myArray);
  const [emptyCell, setEmptyCell] = useState({ x: 2, y: 2 });

  useEffect(() => {
    const newEmptyCell = findEmptyCell(board);
    setEmptyCell(newEmptyCell);
  }, [board]);

  /* Randomize array in-place using Durstenfeld shuffle algorithm */
  // https://stackoverflow.com/a/12646864/114157
  // Game cannot be solved if the number of inversions is odd
  function shuffleArray(array: number[][]) {
    const newBoard = [...array];
    for (var y = array.length - 1; y > 0; y--) {
      for (var x = array[0].length - 1; x > 0; x--) {
        var j = Math.floor(Math.random() * (y + 1));
        var k = Math.floor(Math.random() * (x + 1));
        var temp = array[j][k];
        newBoard[j][k] = array[y][x];
        newBoard[y][x] = temp;
      }
    }
    const emptyCell = findEmptyCell(newBoard);
    newBoard[emptyCell.y][emptyCell.x] = newBoard[1][1];
    newBoard[1][1] = 0;
    setEmptyCell({ x: 1, y: 1 });
    setBoard(newBoard);
  }

  // Helper function to find the empty cell
  function findEmptyCell(array: number[][]) {
    for (var y = array.length - 1; y >= 0; y--) {
      for (var x = array[0].length - 1; x >= 0; x--) {
        if (array[y][x] === 0) {
          var emptyCell = { x: x, y: y };
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
      const newEmptyCell = { x: emptyCell.x - 1, y: emptyCell.y };

      // Create a new board state by swapping the values
      const newBoard = [...board];
      newBoard[emptyCell.y][emptyCell.x] =
        newBoard[newEmptyCell.y][newEmptyCell.x];
      newBoard[newEmptyCell.y][newEmptyCell.x] = 0;

      // Update both the board and emptyCell states together
      setBoard(newBoard);
      setEmptyCell(newEmptyCell);
    }
  }
  function moveUp() {
    if (emptyCell.y > 0) {
      // Calculate the new coordinates for the empty cell
      const newEmptyCell = { x: emptyCell.x, y: emptyCell.y - 1 };

      // Create a new board state by swapping the values
      const newBoard = [...board];
      newBoard[emptyCell.y][emptyCell.x] =
        newBoard[newEmptyCell.y][newEmptyCell.x];
      newBoard[newEmptyCell.y][newEmptyCell.x] = 0;

      // Update both the board and emptyCell states together
      setBoard(newBoard);
      setEmptyCell(newEmptyCell);
    }
  }

  function moveRight() {
    if (emptyCell.x < 2) {
      const newEmptyCell = { x: emptyCell.x + 1, y: emptyCell.y };

      // Create a new board state by swapping the values
      const newBoard = [...board];
      newBoard[emptyCell.y][emptyCell.x] =
        newBoard[newEmptyCell.y][newEmptyCell.x];
      newBoard[newEmptyCell.y][newEmptyCell.x] = 0;

      // Update both the board and emptyCell states together
      setBoard(newBoard);
      setEmptyCell(newEmptyCell);
    }
  }
  function moveDown() {
    if (emptyCell.y < 2) {
      // Calculate the new coordinates for the empty cell
      const newEmptyCell = { x: emptyCell.x, y: emptyCell.y + 1 };

      // Create a new board state by swapping the values
      const newBoard = [...board];
      newBoard[emptyCell.y][emptyCell.x] =
        newBoard[newEmptyCell.y][newEmptyCell.x];
      newBoard[newEmptyCell.y][newEmptyCell.x] = 0;

      // Update both the board and emptyCell states together
      setBoard(newBoard);
      setEmptyCell(newEmptyCell);
    }
  }
  // Must have an even number of inversions to be solvable

  function isSo() {
    let puzzle = squishArray(board);
    let invCount = getInvCount(puzzle);
    let isSolvable = invCount % 2 === 0;
    console.log(isSolvable);
    return isSolvable;
  }
  function squishArray(arr: number[][]) {
    let newArr: number[] = [];
    for (let i = 0; i < arr.length; i++) {
      newArr = newArr.concat(arr[i]);
    }
    return newArr;
  }
  function getInvCount(arr: number[]) {
    let inv_count = 0;
    for (let i = 0; i < 9 - 1; i++)
      for (let j = i + 1; j < 9; j++)
        if (arr[j] && arr[i] && arr[i] > arr[j]) inv_count++;
    return inv_count;
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
      <button onClick={isSo}>CHeck if Solvable</button>
      <button
        onClick={() => shuffleArray(myArray)}
        class="bg-green-400 text-xl m-4 hover:-translate-y-1 hover:bg-green-300 rounded-md outline-none transition-all duration-300"
      >
        Restart
      </button>
    </>
  );
}
