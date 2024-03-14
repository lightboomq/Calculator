const output = document.querySelector('.output');
const numbers = document.querySelector('.grid');
const btnPlus = document.getElementById('plus');
const btnMinus = document.getElementById('minus');
const btnMultiply = document.getElementById('multiply');
const btnDivision = document.getElementById('division');
const btnEqual = document.getElementById('equal');
const btnClearAll = document.getElementById('clearAll');
const btnDeleteLastNum = document.getElementById('clearLastNum');

let firstNum = '';
let secondNum = '';
let firstNumFlag = true;
let operator;

numbers.addEventListener('click',getNumber);
btnPlus.addEventListener('click', useOperator);
btnMinus.addEventListener('click', useOperator);
btnMultiply.addEventListener('click', useOperator);
btnDivision.addEventListener('click', useOperator);
btnClearAll.addEventListener('click', clearAll);
btnDeleteLastNum.addEventListener('click',deleteLastNum)
btnEqual.addEventListener('click', ()=>{
    deleteStyleActiveBtn();
    getResultInOutput();
});

function deleteLastNum(){
    deleteStyleActiveBtn();
    if(firstNum && !secondNum){
        firstNumFlag = true;
        output.textContent='0';
        firstNum = '';
        secondNum = '';
    }
    else if(firstNum && secondNum){
        firstNumFlag = false;
        output.textContent=firstNum;
        secondNum = '';
    }
}
function useOperator(e){
    deleteStyleActiveBtn();
    e.target.classList.add('active');   
    operator = e.target.textContent;
    if(!firstNum&&!secondNum){
        firstNumFlag = true;
    }
    else{
        firstNumFlag = false;
    }
    return getResultInOutput();
}

function getResultInOutput(){
    if(firstNum&&secondNum){
        switch (operator) {
            case '+':
                output.textContent = firstNum + secondNum;
                break;
            case '-':
                output.textContent = firstNum - secondNum;
                break;
            case '×':
                output.textContent = firstNum * secondNum;
                break;
            case '÷':
                output.textContent = firstNum / secondNum;
                break;
            default:
                break;
        };
        firstNum = Number(output.textContent);
        secondNum = '';
    }  
}

function getNumber(e){
    const target = e.target.textContent;
    if ( target==='+' || target==='-' || target==='×' || target==='÷' || target ==='=' || target ==='AC' || target ==='C' || target==='%' || e.target.classList.contains('grid')) return;
    if ( output.textContent[0]==='0' ) output.textContent = '';
    output.textContent += target;
    deleteStyleActiveBtn();
    
    if(firstNumFlag){
        firstNum += target;
        firstNum = Number( firstNum );
    }
    else{
        secondNum += target;
        output.textContent = '';
        output.textContent = secondNum;
        secondNum = Number( secondNum );
    };
};


function clearAll(){
    deleteStyleActiveBtn();
    output.textContent = '0'
    firstNum = '';
    secondNum = '';
    firstNumFlag = true;
    operator = '';
}
function deleteStyleActiveBtn(){
    const activeClass = document.querySelector('.active');
    if(activeClass){
        activeClass.classList.remove('active');
    };
};