const output = document.querySelector('.text');
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
resetLastNum.addEventListener('click', resetLastNumber);
precent.addEventListener('click', getPrecentOfNumber);
numbers.addEventListener('click', getNumber);
plus.addEventListener('click', useOperator);
minus.addEventListener('click', useOperator);
multiply.addEventListener('click', useOperator);
division.addEventListener('click', useOperator);
equal.addEventListener('click', useOperatorEqual);

let firstNum = '';
let secondNum = '';
let operator = '';
let theFirstNumHasNoValue = true;

function getNumber(e){
    if(e.target.value === '' || e.target.classList.contains('grid')) return;
    if(output.textContent[0] === '0' && e.target.value === '0' && theFirstNumHasNoValue) return; 
    
    if(e.target.value === '.' && firstNum.includes('.') && theFirstNumHasNoValue) return;
    if(e.target.value === '.' && secondNum.includes('.') && !theFirstNumHasNoValue) return;

    if(output.textContent[0] === '0' && e.target.value === '.' && theFirstNumHasNoValue){
        firstNum = '0';
    }
    else if(output.textContent[0] === '0' && e.target.value === '.' && !theFirstNumHasNoValue){
        secondNum = '0'
    }
    toggleStyleActiveBtn();
    if(theFirstNumHasNoValue){
        firstNum += e.target.value;
        addSpacesToNumberInOutput(firstNum);
    }
    else{
        output.style.fontSize = '60px';
        secondNum += e.target.value;     
        addSpacesToNumberInOutput(secondNum);
    };
};

function useOperator(e){
    toggleStyleActiveBtn();
    e.target.classList.add('active-operator');   
    operator = e.target.textContent;
    if(!firstNum && !secondNum){
        theFirstNumHasNoValue = true;
    }
    else{
        theFirstNumHasNoValue = false;
    };
    return getResultInOutput();
};

function getResultInOutput(){
    if(firstNum && secondNum){
        switch (operator) {
            case '+': 
                addSpacesToNumberInOutput(Number(firstNum) + Number(secondNum))
                break;
            case '-':
                addSpacesToNumberInOutput(Number(firstNum) - Number(secondNum))
                break;
            case '×':
                addSpacesToNumberInOutput(Number(firstNum) * Number(secondNum))
                break;
            case '÷':
                addSpacesToNumberInOutput(Number(firstNum) / Number(secondNum))
                break;
        };
        firstNum = Number(output.textContent.replaceAll(' ',''));
        secondNum = '';
    }  
};

function addSpacesToNumberInOutput(number){
    const numberString = String(number);
    if(numberString === 'Infinity'){
        output.textContent = 0;
        return;
    } 
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
    getReducedSizeOfNumber();
};

function getReducedSizeOfNumber(){
    let currentWidthOfNumber = Number.parseInt(getComputedStyle(output).width);
    let currentFontSizeOfNubmer = Number.parseInt(getComputedStyle(output).fontSize);
    while(currentWidthOfNumber > 270){
        currentWidthOfNumber = Number.parseInt(getComputedStyle(output).width);
        output.style.fontSize = `${currentFontSizeOfNubmer--}px`;
    }; 
};

function getPrecentOfNumber(){
    if (theFirstNumHasNoValue) return;
    output.textContent = Number(firstNum) * Number(secondNum) / 100;
};
function toggleStyleActiveBtn(){
    const activeClass = document.querySelector('.active-operator');
    if(activeClass) activeClass.classList.remove('active-operator');
};
function useOperatorEqual(){
    toggleStyleActiveBtn();
    getResultInOutput();
};

function getResetInOutput(){
    toggleStyleActiveBtn();
    output.textContent = 0;
    firstNum = '';
    secondNum = '';
    operator = '';
    theFirstNumHasNoValue = true;
    output.style.fontSize = '60px';
};

function resetLastNumber(){
    toggleStyleActiveBtn();
    if(firstNum && !secondNum){
        theFirstNumHasNoValue = true;
        output.textContent = '0';
        firstNum = '';
        secondNum = '';
    }
    else if(firstNum && secondNum){
        theFirstNumHasNoValue = false;
        addSpacesToNumberInOutput(firstNum);
        secondNum = '';
    };
};