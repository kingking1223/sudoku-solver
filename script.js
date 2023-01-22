let numSelected = null;
let tileSelected = null;
let isError = false;

const board = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
]

const inp = {
    "0-0": "-",
    "0-1": "-",
    "0-2": "-",
    "0-3": "-",
    "0-4": "-",
    "0-5": "-",
    "0-6": "-",
    "0-7": "-",
    "0-8": "-",
    "1-0": "-",
    "1-1": "-",
    "1-2": "-",
    "1-3": "-",
    "1-4": "-",
    "1-5": "-",
    "1-6": "-",
    "1-7": "-",
    "1-8": "-",
    "2-0": "-",
    "2-1": "-",
    "2-2": "-",  
    "2-3": "-",
    "2-4": "-",
    "2-5": "-",
    "2-6": "-",
    "2-7": "-",
    "2-8": "-",
    "3-0": "-",
    "3-1": "-",
    "3-2": "-",
    "3-3": "-",
    "3-4": "-",
    "3-5": "-",
    "3-6": "-",
    "3-7": "-",
    "3-8": "-",
    "4-0": "-",
    "4-1": "-",
    "4-2": "-",
    "4-3": "-",
    "4-4": "-",
    "4-5": "-",
    "4-6": "-",
    "4-7": "-",
    "4-8": "-",
    "5-0": "-",
    "5-1": "-",
    "5-2": "-",
    "5-3": "-",
    "5-4": "-",
    "5-5": "-",
    "5-6": "-",
    "5-7": "-",
    "5-8": "-",
    "6-0": "-",
    "6-1": "-",
    "6-2": "-",
    "6-3": "-",
    "6-4": "-",
    "6-5": "-",
    "6-6": "-",
    "6-7": "-",
    "6-8": "-",
    "7-0": "-",
    "7-1": "-",
    "7-2": "-",
    "7-3": "-",
    "7-4": "-",
    "7-5": "-",
    "7-6": "-",
    "7-7": "-",
    "7-8": "-",
    "8-0": "-",
    "8-1": "-",
    "8-2": "-",
    "8-3": "-",
    "8-4": "-",
    "8-5": "-",
    "8-6": "-",
    "8-7": "-",
    "8-8": "-",
}

const initGame = () => {
    for (let i = 1; i <= 9; i++) {
        const number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNum)
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    const number = document.createElement("div");
    number.id = "";
    number.innerText = "CL";
    number.addEventListener("click", selectNum)
    number.classList.add("number");
    document.getElementById("digits").appendChild(number);

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const tile = document.createElement("div");
            tile.id = `${i.toString()}-${j.toString()}`;
            if (i == 2 || i == 5) {
                tile.classList.add("h-line")
            }
            if (j == 2 || j == 5) {
                tile.classList.add("v-line")
            }
            tile.addEventListener("click", selectTile)
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNum () {
    if (numSelected != null) {
        numSelected.classList.remove("number-sel")
    }
    numSelected = this;
    numSelected.classList.add("number-sel")
}

function selectTile () {
    if (numSelected) {
        if (numSelected.id != "") {
            this.innerText = numSelected.id
            this.classList.add("tile-filled")
        } else {
            this.innerText = " "
            this.classList.remove("tile-filled")
        }
        const coord = this.id.split("-")
        const x = coord[0]
        const y = coord[1]
        inp[`${x}-${y}`] = this.innerText
    }
}

const solve = () => {
    const input = Object.values(inp)
    while (index < 81 && board[index]) ++index; // skip non-empty cells
    if (index == 81) return true;               // we filled'em all, success!
    let moves = getChoices(board, index);
    for (let m of moves) {
        board[index] = m;              // try one choice
        if (solve(index + 1))          // if we can solve for the next cell
            return true;               // then return true, success!
    }
    board[index] = 0;  // no move worked; we failed, clear the cell
    return false;      // and backtrack
}

window.onload = function () {
    initGame();
    document.getElementById("submit").addEventListener("click", solve)
}


