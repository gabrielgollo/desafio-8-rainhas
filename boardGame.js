const BOARD_HEIGHT_SIZE = 800;
const BOARD_WIDTH_SIZE = 800;
const BOARD_HEIGHT_AMOUNT = 8;
const BOARD_WIDTH_AMOUNT = 8;
const SQUARE_SIZE = 100;
let board = null;

class BoardGame{
    constructor(gameDiv, data){
        this.element=gameDiv;
        const hasElement = gameDiv.querySelector('canvas');
        if(hasElement) {
            this.board = hasElement;
        } else {
            this.board = document.createElement('canvas');
            gameDiv.appendChild(this.board);
            
            this.context = this.board.getContext('2d')
        }

        this.setBoardSize(BOARD_WIDTH_SIZE, BOARD_HEIGHT_SIZE)
        this.pieces = this.generateBoardArray()
    }

    addNewPiece(i, j, piece){
        this.pieces[i][j] = piece
        
        this.reRenderPosition(i, j)
    }
    
    generateBoardArray(){
        let pieces = []
        for(let i = 0; i< BOARD_HEIGHT_AMOUNT; i+=1) {
            pieces.push([])
            for(let j = 0; j < BOARD_WIDTH_AMOUNT; j+=1) {
                pieces[i].push(null)
            }
        }
        return pieces
    }

    setBoardSize(w, h) {
        this.board.width = w;
        this.board.height = h;
        this.renderBoard()
    }

    renderOneSquare(i, j, svg=null) {
        if(svg){
            this.context.drawImage(svg, i, j, 100, 100)
        } else {
            this.context.beginPath();
            this.context.fillRect(
                i*SQUARE_SIZE,
                j*SQUARE_SIZE,
                SQUARE_SIZE,
                SQUARE_SIZE
            )
            this.context.stroke()
        }
    }

    renderBoard() {
        for(let i=0; i <= BOARD_WIDTH_AMOUNT; i += 1) {
            for(let j=0; j <= BOARD_HEIGHT_AMOUNT; j += 1) {
                if((i%2 === 1 && j%2===0) || (i%2 ===0 && j%2 === 1)){
                    this.renderOneSquare(i, j);
                }
            }
        }
    }

    reRenderPosition(i, j) {
        const selectedPiece = this.pieces[i][j];
        this.renderOneSquare(i, j, selectedPiece.svg)
    }
}

function mountScripts() {
    const gameDiv = document.querySelector('#main-game');
    return new BoardGame(gameDiv);
}


window.onload = () => {
    board = mountScripts()
    startAlgorithm()
}