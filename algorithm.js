function createSVGAndReturnBlob(url) {
   return new Promise((resolve) => {
       fetch(url, {method: 'get'})
       .then(
            (response) => {
                return response.blob()
            }
        )
        .then(
            (blob) => {
                const blobURL = URL.createObjectURL(blob);
                let image = new Image();
                image.src = blobURL;
                image.onload = () => {
                    resolve(image)
                }
          }
        )
    })
}



async function startAlgorithm() {
    const queenSvgUrl = "http://localhost:5500/static/svgs/queen.svg"
    const queenSvg = await createSVGAndReturnBlob(queenSvgUrl)

    const queen1 = new ChessQueen(queenSvg, 'Rainha teste 1')
    board.addNewPiece(0, 0, queen1)

}
