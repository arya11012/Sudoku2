var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board=[];
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function Generate2(){
    
      
      // Create the random board
      
      
      // Generate random values for the board
      for (var i = 0; i < 9; i++) {
        board[i] = [];
        for (var j = 0; j < 9; j++) {
          board[i][j] = getRandomInt(0, 9);
        }
      }
      
      // Count the number of zeroes in the board
      var zeroCount = 0;
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          if (board[i][j] === 0) {
            zeroCount++;
          }
        }
      }
      
      // Define the minimum number of zeroes desired (replace with desired value)
      var n = 25;
      
      // Check if the minimum condition is met
      if (zeroCount < n) {
        // Generate additional zeroes until the condition is met
        var remainingZeroes = n - zeroCount;
        while (remainingZeroes > 0) {
          var i = getRandomInt(0, 8);
          var j = getRandomInt(0, 8);
          if (board[i][j] !== 0) {
            board[i][j] = 0;
            remainingZeroes--;
          }
        }
      }
}
function Generate(){
    board = [[0,0,7,1,0,0,0,6,0],
	[1,0,5,2,0,8,0,0,0],
	[6,0,0,0,0,7,1,2,0],
	[3,1,2,4,0,5,0,0,8],
	[0,0,6,0,9,0,2,0,0],
	[0,0,0,0,0,3,0,0,1],	
	[0,0,1,0,0,4,9,8,6],
	[8,0,3,9,0,6,0,0,0],
	[0,6,0,0,8,2,7,0,3],]  

 
}
    

	

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}
function ClearBoard(board) {
    board=[];
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')
let ClearPuzzle = document.getElementById('Clear')
//GetPuzzle.addEventListener('click',FillBoard(board));
GetPuzzle.onclick = () => {
    Generate();
	FillBoard(board);
    ClearPuzzle.innerHTML='Press Solve'
};
SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0, 9);
    if(SudokuSolver(board, 0, 0, 9)){
        ClearPuzzle.innerHTML='SolutionFound'
    }
    else{
        ClearPuzzle.innerHTML='No Solution '
    }
    
};



function is_valid( board, i, j, num, n){
    //Row and col check
    for(let x=0;x<n;x++){
        if(board[i][x]==num || board[x][j]==num){
            return false;
        }
    }
    //SubMatrix Check
    let rn=Math.sqrt(n);
    let si=i-(i%rn); 
    let sj=j-(j%n);

    for(let x=si;x<si;x++){
        for(let y=sj;y<sj+rn;y++){
            if(board[x][y]==num){
                return false;
            }
        }
    }
    return true;
}
function SudokuSolver2( board,  i, j,n)
{
    // Check if we have reached the 8th
    // i and 9th jumn (0
    // indexed matrix) , we are
    // returning true to avoid
    // further backtracking
    if (i == n - 1 && j == n)
        return true;
        FillBoard(board);
    // Check if jumn value  becomes 9 ,
    // we move to next i and
    //  jumn start from 0
    if (j == n) {
        i++;
        j = 0;
    }
   
    // Check if the current position of
    // the board already contains
    // value >0, we iterate for next jumn
    if (board[i][j] > 0)
        return SudokuSolver(board, i, j + 1,n);
 
    for (let num = 1; num <= n; num++)
    {
         
        // Check if it is safe to place
        // the num (1-9)  in the
        // given i ,j  ->we
        // move to next jumn
        if (is_valid(board, i, j, num,n))
        {
             
           /* Assigning the num in
              the current (i,j)
              position of the board
              and assuming our assigned
              num in the position
              is correct     */
            board[i][j] = num;
           
            //  Checking for next possibility with next
            //  jumn
            if (SudokuSolver(board, i, j + 1,n))
                return true;
        }
       
        // Removing the assigned num ,
        // since our assumption
        // was wrong , and we go for
        // next assumption with
        // diff num value
        board[i][j] = 0;
    }
    return false;
}

function SudokuSolver( board,i, j, n){
    //Base Case
    if(i==n){
        FillBoard(board);
        return true;
    }
    //if we are not inside the board
    if(j==n){
        return SudokuSolver(board,i+1,0,n);
    }
    //if cell is already filled-> move ahead
    if(board[i][j]!=0){
        return  SudokuSolver(board,i,j+1,n);
    }

    //try to fill the cell with an appropriate 
    for(let num=1;num<=9;num++){
        //check if number can be filled
        if(is_valid(board,i,j,num,n)){
            board[i][j]=num;
            let subAns=SudokuSolver(board,i,j+1,n);
            if(subAns){
                return true;
            }
            //Backtracking
            board[i][j]=0;
        }
    }
    return false;
}
