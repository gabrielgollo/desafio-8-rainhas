const BOARD_HEIGHT_AMOUNT = 8;
const BOARD_WIDTH_AMOUNT = 8;

let pieces = []
for(let i = 0; i< BOARD_HEIGHT_AMOUNT; i+=1) {
    pieces.push([])
    for(let j = 0; j < BOARD_WIDTH_AMOUNT; j+=1) {
        pieces[i].push(null)
    }
}

console.log(pieces)