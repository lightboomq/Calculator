const output = document.querySelector('.output');
const numbers = document.querySelector('.grid');
const precent = document.getElementById('precent');
const plus = document.getElementById('plus');
const minus = document.getElementById('minus');
const multiply = document.getElementById('multiply');
const division = document.getElementById('division');
const equal = document.getElementById('equal');
const reset = document.getElementById('reset');
const resetLastNum = document.getElementById('resetLastNum');

reset.addEventListener('click', getResetInOutput);
resetLastNum.addEventListener('click',resetLastNumber);
precent.addEventListener('click',getPrecentOfNumber);
numbers.addEventListener('click',getNumber);
plus.addEventListener('click', useOperator);
minus.addEventListener('click', useOperator);
multiply.addEventListener('click', useOperator);
division.addEventListener('click', useOperator);
equal.addEventListener('click', useOperatorEqual);

let firstNum = '';
let secondNum = '';
let firstNumFlag = true;
let operator = '';

function getNumber(e){
    if(e.target.value === '' || e.target.classList.contains('grid')) return;
    if(output.textContent[0] === '0') output.textContent = '';
    toggleStyleActiveBtn();
    if(firstNumFlag){
        firstNum += e.target.value;
        getBeautifulOutput(firstNum);
    }
    else{
        secondNum += e.target.value;     
        getBeautifulOutput(secondNum);
    };
};

function getBeautifulOutput(number){
    const numberString = String(number);
    const numbers = [];
    let count = -1;
    for(let i = numberString.length-1; i >= 0; i--){
        count++ 
        if(numberString[i] === '.'){
            count = -1;
        }
        if(4 % count === 1){
            numbers.push(' ');
            count = 0;
        }
        numbers.push(numberString[i]); 
    };
    numbers.reverse();
    output.textContent = numbers.join('');
};

function getResultInOutput(){
    if(firstNum && secondNum){
        switch (operator) {
            case '+': 
                getBeautifulOutput(Number(firstNum) + Number(secondNum))
                break;
            case '-':
                getBeautifulOutput(Number(firstNum) - Number(secondNum))
                break;
            case '×':
                getBeautifulOutput(Number(firstNum) * Number(secondNum))
                break;
            case '÷':
                getBeautifulOutput(Number(firstNum) / Number(secondNum))
                break;
        };
        firstNum = Number(output.textContent.replaceAll(' ',''));
        secondNum = '';
    }  
};

function useOperator(e){
    toggleStyleActiveBtn();
    e.target.classList.add('active-operator');   
    operator = e.target.textContent;
    if(!firstNum && !secondNum){
        firstNumFlag = true;
    }
    else{
        firstNumFlag = false;
    }
    return getResultInOutput();
};

function getResetInOutput(){
    toggleStyleActiveBtn();
    output.textContent = 0;
    firstNum = '';
    secondNum = '';
    operator = '';
    firstNumFlag = true;
};

function getPrecentOfNumber(){
    if(!firstNumFlag){
        output.textContent = Number(firstNum) * Number(secondNum) / 100;
    }
};
function toggleStyleActiveBtn(){
    const activeClass = document.querySelector('.active-operator');
    if(activeClass){
        activeClass.classList.remove('active-operator');
    };
};
function useOperatorEqual(){
    toggleStyleActiveBtn();
    getResultInOutput();
};

function resetLastNumber(){
    toggleStyleActiveBtn();
    if(firstNum && !secondNum){
        firstNumFlag = true;
        output.textContent = '0';
        firstNum = '';
        secondNum = '';
    }
    else if(firstNum && secondNum){
        firstNumFlag = false;
        output.textContent = firstNum;
        secondNum = '';
    };
};