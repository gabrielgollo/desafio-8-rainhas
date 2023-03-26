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

function createQueens(svg, max){
    const queens = []

    for(let i=0; i<max; i+=1){
       queens.push(new ChessQueen(svg, `Rainha (${i})`))
    }

    return queens
}

function distributeQueen(queens = []){
    let i=0;
    let j =0;

    while(queens){
        const queen = queens.shift()

        board.addNewPiece(i, j, queen)
        
        if(j == board.sizes.widthSquares) {
            i+=1
            j=0;
        }

        j+=1
    }

    // for (i = 0; i < queens.length; i++) {
    //     for (j = 0; j < queens.length; j++) {
    //         board.addNewPiece(i, j, queens[i])
    //     } 
    // }
}



async function startAlgorithm() {
    const queenSvgUrl = "http://localhost:5500/static/svgs/queen.svg"
    const queenSvg = await createSVGAndReturnBlob(queenSvgUrl)
    const queens = createQueens(queenSvg, 12)

    distributeQueen(queens)

}
