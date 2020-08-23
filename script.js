document.addEventListener('DOMContentLoaded' , () => {
    
    var gridArr = []; 
    var playerX = true;

    var $gridSizeInput = document.getElementById("gridSizeInput");
    var $mainGrid = document.getElementById('mainGrid');
    document.getElementById("initGameBtn").onclick = function() {InitBoard()};
    

    function InitBoard () {
        gridArr = [];
        let cellPos = 0;
        $mainGrid.innerHTML = ""; 

        for (let i = 0 ; i < $gridSizeInput.value ; i++)
        {
            gridArr[i] = [];
            
            for ( let j = 0 ; j < $gridSizeInput.value ; j++) {
                gridArr[i][j] = null;
                cellPos++;
               
                $mainGrid.insertAdjacentHTML('beforeend', RetrunUi(i , j , '-') );
                document.getElementById('square-'+ (cellPos-1)).addEventListener('click', PlayTurn);
            }
            $mainGrid.insertAdjacentHTML('beforeend', '</br>');
        } 
    }


    function PlayTurn(event) {
   
        let index = this.getAttribute('id').split("-")[1];  
        let row =  Math.floor(index / $gridSizeInput.value);
        let col = index % $gridSizeInput.value;

        if (gridArr[row][col] == null) {
            
            if (playerX == true) {
                gridArr[row][col] = 1;
                this.innerHTML = RetrunUi(row, col, 'X'); 
                if (CheckWinner(row, col , true) == true)  
                    AnnounceWinner('X'); 
            }
            else {
                    gridArr[row][col] = 0;              
                    this.innerHTML  = RetrunUi(row, col, 'O');
                    if (CheckWinner(row, col , true) == true)  
                    AnnounceWinner('O');  
            }

            playerX = !playerX;
        }

       
    }

    function RetrunUi(iRow , iCol , iChar) {
        return '<div id="square-'+ ((iRow * $gridSizeInput.value)  + iCol) + '" class="emptySquare square"><h1>' + iChar  + '</h1><span>' + iRow + '-' + iCol + '</span></div>';
    }


function CheckWinner(iRow, iCol , iIsX) {

    let colWinner  = true;
    let rowWinner  = true;
    let diagWinner = true;
    let revDiagWinner = true;

    let colTempSign = gridArr[0][iCol];
    let rowTempSign  = gridArr[iRow][0];
    let diagTempSign = gridArr[0][0];
    let revDiagTempSign = gridArr[(gridArr.length-1)][0];

  
    for (i = 1 ; i < gridArr.length ; i++) {   //check cols
       
        if (colWinner == true && gridArr[i][iCol] == iIsX && colTempSign == iIsX) { // check col win.
            colTempSign = gridArr[i][iCol];
        }
        else {
            colWinner = false; 
        }

        if (rowWinner == true && gridArr[iRow][i] == iIsX && rowTempSign == iIsX) {   // check row win
            rowTempSign = gridArr[iRow][i];
        }
        else {
            rowWinner = false; 
        }

        if (diagWinner == true && gridArr[i][i] == iIsX && diagTempSign == iIsX) {  // check diag win
            diagTempSign = gridArr[i][i];
        }
        else {
            diagWinner = false; 
        }

        if (revDiagWinner == true && gridArr[gridArr.length - i - 1][i] == iIsX && revDiagTempSign == iIsX) { // check reverse diag win
           
            revDiagTempSign =gridArr[gridArr.length - i - 1][i];
        }
        else {
           
            revDiagWinner = false; 
        }
    }

    return colWinner || rowWinner || diagWinner || revDiagWinner;


}

   function AnnounceWinner(iIsX){
    alert("winner is: " + iIsX);
   };

});

