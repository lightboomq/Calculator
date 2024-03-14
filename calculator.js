const output = document.querySelector('.output');
const buttons = document.querySelector('.grid');
const plus = document.getElementById('plus');
const minus = document.getElementById('minus');
const multiply = document.getElementById('multiply');
const division = document.getElementById('division');
const equal = document.getElementById('equal');
const deleteAll = document.getElementById('clearAll');
const deleteLastNum = document.getElementById('clearLastNum');

let firstNum = '';
let secondNum = '';
let firstNumFlag = true;
let operator;

deleteAll.addEventListener('click', clearAll);
deleteLastNum.addEventListener('click',deleteLastNumber);
buttons.addEventListener('click',getNumber);
plus.addEventListener('click', useOperator);
minus.addEventListener('click', useOperator);
multiply.addEventListener('click', useOperator);
division.addEventListener('click', useOperator);
equal.addEventListener('click', useOperatorEqual);

function useOperator(e){
    deleteStyleActiveBtn();
    e.target.classList.add('active');   
    operator = e.target.textContent;
    if(!firstNum && !secondNum){
        firstNumFlag = true;
    }
    else{
        firstNumFlag = false;
    }
    return getResultInOutput();
}

function getResultInOutput(){
    if(firstNum && secondNum){
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
    if(['+','-','×','÷','=','÷','AC','C','%','%',].includes(target) || e.target.classList.contains('grid')) return;
    if (output.textContent[0] === '0') output.textContent = '';
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
function useOperatorEqual(){
    deleteStyleActiveBtn();
    getResultInOutput();
}

function deleteLastNumber(){
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