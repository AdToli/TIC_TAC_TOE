
const x = "./x.png";  //A picture of X
const o = "./o.png";  // A picture of O

const cellsArrPic = [];         //An arry for cells's imgs 
for (let i = 0; i < 9; i++) {     //Orgenaized cells img in arry by ID
    cellsArrPic[i] = document.getElementById(`cellPic${i + 1}`)
    // console.log(cellsArrPic[i]);
    // console.log(typeof (cellsArrPic[i]));
}
const cellsArrId = [];       //An arry for cells's value
for (let i = 0; i < 9; i++) {     //Orgenaized cells values in arry by ID
    cellsArrId[i] = document.getElementById(`cell${i + 1}`);
    // console.log(cellsArrId[i]);
    // console.log(typeof (cellsArrId[i]));
}
const previousValuesArr = []; ////An arry for saving the last user choice;

const borderTTT = {   // Border and img cells declaration
    lines: [[cellsArrPic[0], cellsArrPic[1], cellsArrPic[2]], [cellsArrPic[3], cellsArrPic[4], cellsArrPic[5]], [cellsArrPic[6], cellsArrPic[7], cellsArrPic[8]]],
    rows: [[cellsArrPic[0], cellsArrPic[3], cellsArrPic[6]], [cellsArrPic[1], cellsArrPic[4], cellsArrPic[7]], [cellsArrPic[2], cellsArrPic[5], cellsArrPic[8]]],
    angles: [[cellsArrPic[0], cellsArrPic[4], cellsArrPic[8]], [cellsArrPic[2], cellsArrPic[4], cellsArrPic[6]]]
};


function insertPic(td, Pic) {     //Filling a chosen td with x or o 
    td.src = Pic;
    return td.src
}


function winCheck(indexArrlines, indexArrRows, indexArrAngels, cellValue) {    //Check up winning by check up lines series, rows series , angles series
    for (let i = 0; i < indexArrlines.length; i++) {
        let isWin = true;
        for (let j = 0; j < indexArrlines[i].length; j++) {
            if (indexArrlines[i][j].src != cellValue.value) {
                isWin = false;
                break;
            }
        }
        if (isWin) {
            return true;
        }
    }
    for (let i = 0; i < indexArrRows.length; i++) {
        let isWin = true;
        for (let j = 0; j < indexArrRows[i].length; j++) {
            if (indexArrRows[i][j].src != cellValue.value) {
                isWin = false;
                break;
            }
        }
        if (isWin) {
            return true;
        }
    }
    for (let i = 0; i < indexArrAngels.length; i++) {
        let isWin = true;
        for (let j = 0; j < indexArrAngels[i].length; j++) {
            if (indexArrAngels[i][j].src != cellValue.value) {
                isWin = false;
                break;
            }
        }
        if (isWin) {
            return true;
        }
    }

    return false;
}


// // Number 2 : Erase last choice
// function previewStep() {
//     const LastStep = sessionStorage.getItem("table");

// }



flag = true;
function onUserClick(tdSrc, tdId) {   //Menage turns + Execute "insertPic(td, Pic)" for the user chosen cell and prevent double filling for td + Wining alert 
    if (tdSrc.src != "") return;      //If cell is already contain X or O;

    if (flag == true) {
        flag = false;
        tdId.value = insertPic(tdSrc, x);  //The value and the sorce of chosen td is now equal
        if (winCheck(borderTTT.lines, borderTTT.rows, borderTTT.angles, tdId)) {  //Check up if X wins
            alert("X you wins!")
            alert("click here to start a new game") + window.location.reload()
        }
        previousValuesArr.push(tdId);               //Insert the last user's value if X
        
           
        

    } else {
        flag = true;
        tdId.value = insertPic(tdSrc, o);    //The value and the sorce of chosen td is now equal
        if (winCheck(borderTTT.lines, borderTTT.rows, borderTTT.angles, tdId)) { //Check up if O wins
            alert("O you wins!")
            alert("click here to start a new game") + window.location.reload()
        }
        previousValuesArr.push(tdId);                //Insert the last user's value if O
    }   
        for (let i = 0; i < 0; i++) {
       
    }
}