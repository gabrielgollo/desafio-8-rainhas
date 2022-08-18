const BOARD_HEIGHT_SIZE = 800;
const BOARD_WIDTH_SIZE = 800;
const BOARD_HEIGHT_AMOUNT = 8;
const BOARD_WIDTH_AMOUNT = 8;
const SQUARE_SIZE = 100;
const PIECE_SIZE = 70;
const CENTER_FACTOR = (SQUARE_SIZE-PIECE_SIZE)/2

let board = null;

const DEFAULT_FILTER = 'invert(0) drop-shadow(3px 2px 2px grey)'
const INVERTED_FILTER = 'invert(1) drop-shadow(2px 2px 1px whitesmoke)'

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
        this.blockedPositions =[]
    }

    addNewPiece(i, j, piece){
        if(this.pieces[i][j] !== null) throw new Error("There is already another piece in this position")
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

    invertColor(i, j){
        ctx.globalCompositeOperation='difference';
        ctx.fillStyle='white';
        ctx.fillRect(i, j, SQUARE_SIZE, SQUARE_SIZE);
    }

    renderOneSquare(i, j, svg=null) {
        const ctx = this.context
        if(svg){
            if (i%2 == 0){
                
                if(j%2 == 0){
                    ctx.filter = DEFAULT_FILTER
                } else {
                    ctx.filter = INVERTED_FILTER
                }
            } else {
                
                if(j%2 == 0){
                    ctx.filter = INVERTED_FILTER
                } else {
                    ctx.filter = DEFAULT_FILTER
                }
                
            }
            
            // Reset Global composite Operation
            ctx.globalCompositeOperation = "source-over"
            ctx.drawImage(svg, i*SQUARE_SIZE+CENTER_FACTOR, j*SQUARE_SIZE+CENTER_FACTOR, PIECE_SIZE, PIECE_SIZE)
            
        } else {
            ctx.beginPath();
            ctx.fillStyle = 'black'
            ctx.fillRect(
                i*SQUARE_SIZE,
                j*SQUARE_SIZE,
                SQUARE_SIZE,
                SQUARE_SIZE
            )
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