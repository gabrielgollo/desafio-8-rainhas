function createSVG(url) {
    const svgElement = document.createElement
}

function startAlgorithm() {
    const queenSvgUrl = "http://localhost:5500/static/svgs/queen.svg"
    const queenSvg = new SVGImageElement(queenSvgUrl)

    const queen1 = new ChessQueen(queenSvg, 'Rainha teste 1')
    board.addNewPiece(0, 0, queen1)

}
