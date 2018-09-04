// generate a board
export const generate = (rows = 9, percententageOfZeros) => {
  let grid = [];
  const percentage = percententageOfZeros / 100;

  for (let i = 0; i < rows; i++) {
    let numbersAvailable = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    grid.push([]);
    for (let j = 0; j < rows; j++) {
      const zeroRandom = Math.random();
      
      const randomNumber = zeroRandom > percentage ? 
        numbersAvailable[Math.floor(Math.random() * numbersAvailable.length)] 
        : 0;
      const indexRandomNumber = numbersAvailable.findIndex(number => number === randomNumber)
      grid[i][j] = randomNumber;

      numbersAvailable.splice(indexRandomNumber, 1);
    }
  }
  return grid;
}

// generate an empty board
export const generateEmpty = (rows = 9) => {
  let grid = [];

  for (let i = 0; i < rows; i++) {
    grid.push([]);
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }
  return grid;
}