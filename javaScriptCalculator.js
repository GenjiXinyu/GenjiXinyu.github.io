//* Global Variables

var b1_operations = ["^"];              // first priority binary operations
var b2_operations = ["*", "/"];             // second priority binary operations
var b3_operations = ["+", "-"];             // third priority binary operations
var t_operations = ["sin", "cos", "tan"];               // unary operations
var log_operations = ["log", "ln"];
var answer_steps_array = [];                // array to record the steps taken to get to answer
var variableExist = false;


//* Running Calulator Code 

//* Main code
function calculator() {
    document.getElementById('result').innerHTML = '';
    document.getElementById('graph').innerHTML = '';
    var equation = getString();             // gets user input
    dataTypeConvert(equation);              // converts data
    websitePrint(equation);             // prints step
    var recurse = 0;                // initialization
    try {
        expressionEvaluation(equation, recurse);                // finds answer
        websitePrint(equation);             // prints answer
        if (variableExist == true) {
            let variable_array = [];
            for (let i = -10; i < 10.1; i = i + 0.1) {
                variable_array.push(i);
            }
            TESTER = document.getElementById('graph');
            Plotly.newPlot(TESTER, [{x: variable_array, y: equation[0]}], {margin: {t: 0}});
        }
    }
    catch (error) {
        websitePrint(error);
    }
    variableExist = false;
}

//* Converts strings into proper data types
function dataTypeConvert(equation) {
    let typeChange = false
    for (let i = equation.length - 1; i > -1; i--) {
        typeChange = false;
        if (isNaN(equation[i]) == false && typeChange == false) {              // determines if object is not a number
            equation[i] = parseFloat(equation[i]);              // converts from object to float
            typeChange = true;
        }
        if (typeChange == false) {
            for (let j = 0; j < t_operations.length; j++) {
                if (isOperator(equation, i, 3) == t_operations[j]) {
                    equation.splice(i, 1, isOperator(equation, i, 3));
                    equation.splice(i - 1, 1);
                    equation.splice(i - 2, 1);
                    i = i - 2;
                    typeChange = true;
                }
            }
        }
        if (typeChange == false) {
            if (isOperator(equation, i, 3) == "log") {
                equation.splice(i, 1, isOperator(equation, i, 3));
                equation.splice(i - 1, 1);
                equation.splice(i - 2, 1);
                i = i - 2;
                typeChange = true;
            }
            if (isOperator(equation, i, 2) == "ln") {
                equation.splice(i, 1, isOperator(equation, i, 2));
                equation.splice(i - 1, 1);
                i = i - 1;
                typeChange = true;
            }
        }
        if (typeChange == false) {
            if (isOperator(equation, i, 3) == "neg") {
                equation.splice(i, 1, "*");
                equation.splice(i - 1, 1, -1);
                equation.splice(i - 2, 1);
                i = i - 2;
                typeChange = true;
            }
        }
        if (typeChange == false) {
            if (isOperator(equation, i, 2) == "pi") {
                equation.splice(i, 1, Math.PI);
                equation.splice(i - 1, 1);
                i = i - 1;
                typeChange = true;
            }
        }
        if (equation[i] == "e" && typeChange == false) {
            equation.splice(i, 1, Math.E);
        }
        if (isLetter(equation[i]) == true && typeChange == false) {
            variableExist = true;
            let variable_array = [];
            for (let i = -10; i < 10.1; i = i + 0.1) {
                variable_array.push(i);
            }
            equation[i] = variable_array;
            typeChange = true;
        }
    }
    console.log(equation);
}

//* Evaluates the expression and finds answer
function expressionEvaluation(equation_x, recurse) {
    var parentheses = [];               // initialization
    var parentheses_num = 0;
    var is_parentheses = false;
    var is_parent = true;
    for (let i = 0; i < equation_x.length; i++) {               // counts total number of parentheses and finds the outer most ones
        if (equation_x[i] == ")") {
            parentheses_num--;
            if (parentheses_num == 0) {
                equation_x.splice(i, 1, "end");
            }
        }
        if (parentheses_num != 0) {
            parentheses.push(equation_x[i]);
        }
        if (equation_x[i] == "(") {
            if (parentheses_num == 0) {
                equation_x.splice(i, 1, "parentheses");
            }
            parentheses_num++;
            is_parentheses = true;
            is_parent = false;
        }
        if (parentheses_num == 0 && is_parent == false) {
            is_parentheses = false;
            break;
        }
    }
    for (let i = equation_x.length - 1; i > -1; i--) {              // splices the outermost parentheses into parentheses array
        if (equation_x[i] == "end") {
            is_parentheses = true;
        }
        if (equation_x[i] == "parentheses") {
            is_parentheses = false;
        }
        if (is_parentheses == true) {
            equation_x.splice(i, 1);
        }
    }
    if (parentheses.length != 0) {              // recurses expressionEvaluation function until there is no more parentheses
        for (let i = 0; i < equation_x.length; i++) {
            if (equation_x[i] == "parentheses") {
                recurse++;
                websitePrint(parentheses);
                parentheses_answer = expressionEvaluation(parentheses, recurse);
                equation_x.splice(i, 1, parentheses_answer);
                recurse--;
            }
        }
    }
    if (recurse != 0) {             // runs operationOrder function when found inner most parentheses
        var answer = operationOrder(equation_x);
        return answer;
    }
    for (let i = 0; i < equation_x.length; i++) {               // reruns expressionEvaluation function for other outer parentheses
        if (equation_x[i] == "(") {
            expressionEvaluation(equation_x, recurse);
        }
    }
    var answerFinal = operationOrder(equation_x);               // runs operationOrder when there are no more parentheses
    return answerFinal;             // returns the final answer
}


//* Functions used throughout the code

//* Determines order of operations
function operationOrder(equation_x) {
    websitePrint(equation_x);               // prints step
    var items = equation_x.length;              // initialization
    var item_num = 0;
    var calc_type = 0;
    while (items != 1) {                // repeats until answer found
        var is_calc = false;
        if (calc_type == 0) {               // checks for unary operators
            for (let i = 0; i < t_operations.length; i++) {
                if (item_num != items - 1) {
                    if (equation_x[item_num] == t_operations[i]) {
                        basicCalculator(equation_x, item_num);              // calculates using operator
                        items = equation_x.length;              // reinitialization
                        item_num = 0;
                        is_calc = true;
                        websitePrint(equation_x);               // prints step
                        break;
                    }
                }
                else {
                    break;
                }
            }
        }
        if (calc_type == 1) {               // checks for unary operators
            for (let i = 0; i < log_operations.length; i++) {
                if (item_num != items - 1) {
                    if (equation_x[item_num] == log_operations[i]) {
                        basicCalculator(equation_x, item_num);              // calculates using operator
                        items = equation_x.length;              // reinitialization
                        item_num = 0;
                        is_calc = true;
                        websitePrint(equation_x);               // prints step
                        break;
                    }
                }
                else {
                    break;
                }
            }
        }
        if (calc_type == 2) {               // checks for first priority binary operators
            for (let i = 0; i < b1_operations.length; i++) {
                if (item_num != 0 && item_num != items - 1) {
                    if (equation_x[item_num] == b1_operations[i]) {
                        basicCalculator(equation_x, item_num);              // calculates using operator
                        items = equation_x.length;              // reinitialization
                        item_num = 0;
                        is_calc = true;
                        websitePrint(equation_x);               // prints step
                        break;
                    }
                }
                else {
                    break;
                }
            }
        }
        if (calc_type == 3) {               // checks for second priority binary operators
            for (let i = 0; i < b2_operations.length; i++) {
                if (item_num != 0 && item_num != items - 1) {
                    if (equation_x[item_num] == b2_operations[i]) {
                        basicCalculator(equation_x, item_num);              // calculates using operator
                        items = equation_x.length;              // reinitialization
                        item_num = 0;
                        is_calc = true;
                        websitePrint(equation_x);               // prints step
                        break;
                    }
                }
                else {
                    break;
                }
            }
        }
        if (calc_type == 4) {               // checks for third priority binary operators
            for (let i = 0; i < b3_operations.length; i++) {
                if (item_num != 0 && item_num != items - 1) {
                    if (equation_x[item_num] == b3_operations[i]) {
                        basicCalculator(equation_x, item_num);              // calculates using operator
                        items = equation_x.length;              // reinitialization
                        item_num = 0;
                        is_calc = true;
                        websitePrint(equation_x);               // prints setp
                        break;
                    }
                }
                else {
                    break;
                }
            }
        }
        if (is_calc == false) {             // goes to next item if current item does not fit into current operators
            item_num++;
        }
        if (item_num == items) {                // goes to next calculation type if not calculated for current operation
            item_num = 0;
            calc_type++;
        }
        if (calc_type > 4 && is_calc == false) {                // exits if there is a syntax error
            throw "Syntax Error";
        }
    }
    return equation_x[0];               // returns answer
}

//* Prints steps and the answer onto html website
function websitePrint(equation_x) {
    if (variableExist == false) {
        let same = true;                // initialization
        if (answer_steps_array.length != equation_x.length) {               // checks for any repitition in steps
            same = false;
        }
        else {
            for (let i = 0; i < answer_steps_array.length; i++) {
                if (answer_steps_array[i] != equation_x[i]) {
                    same = false;
                }
            }
        }
        if (same == true) {
            return true;
        }
        else {              // makes a new array for the new step
            answer_steps_array = [];
            for (let i = 0; i < equation_x.length; i++) {
                answer_steps_array.push(equation_x[i]);
            }
            let answer_steps_print = answer_steps_array.join("");
            var text = document.createElement("p");
            text.innerHTML = answer_steps_print;
            document.getElementById("result").appendChild(text);                // prints onto the html website
        }
    }
}

//* Gets the user input from the submit query
function getString() {
    var user = document.querySelector('#userInput').value;              // takes input from the userInput id
    var user_equation = user.split("");
    for (let i = user_equation.length - 1; i > 0; i--) {                // adds spaces to split string properly
        if (isNaN(user_equation[i]) == false && isNaN(user_equation[i-1]) == false);
        else {
            user_equation.splice(i, 0, " ");
        }
    }
    var userString = user_equation.join("");
    user_equation = userString.split(" ");
    for (let i = user_equation.length - 1; i > -1; i--) {               // creates expression as an array
        if (user_equation[i] == "") {
            user_equation.splice(i, 1);
        }
    }
    return user_equation;               // returns the final array
}

function isLetter(char) {
    return (/[a-zA-Z]/).test(char)
}

//* Calculator for both variables and constants
function basicCalculator(equation_x, item_num) {
    if (equation_x[item_num] == "^") {
        let answer = binaryCalculator(equation_x[item_num - 1], equation_x[item_num + 1], power);
        equation_x.splice(item_num, 1, answer);
        equation_x.splice(item_num + 1, 1);
        equation_x.splice(item_num - 1, 1);
    }
    else if (equation_x[item_num] == "*") {
        let answer = binaryCalculator(equation_x[item_num - 1], equation_x[item_num + 1], multiply);
        equation_x.splice(item_num, 1, answer);
        equation_x.splice(item_num + 1, 1);
        equation_x.splice(item_num - 1, 1);
    }
    else if (equation_x[item_num] == "/") {
        if (Math.abs(equation_x[item_num + 1]) < 1e-9) {
            throw "Divide by Zero Error";
        }
        else {
            let answer = binaryCalculator(equation_x[item_num - 1], equation_x[item_num + 1], divide);
            equation_x.splice(item_num, 1, answer);
            equation_x.splice(item_num + 1, 1);
            equation_x.splice(item_num - 1, 1);
        }
    }
    else if (equation_x[item_num] == "+") {
        let answer = binaryCalculator(equation_x[item_num - 1], equation_x[item_num + 1], add);
        equation_x.splice(item_num, 1, answer);
        equation_x.splice(item_num + 1, 1);
        equation_x.splice(item_num - 1, 1);
    }
    else if (equation_x[item_num] == "-") {
        let answer = binaryCalculator(equation_x[item_num - 1], equation_x[item_num + 1], subtract);
        equation_x.splice(item_num, 1, answer);
        equation_x.splice(item_num + 1, 1);
        equation_x.splice(item_num - 1, 1);
    }
    else if (equation_x[item_num] == "sin") {
        let answer = unaryCalculator(equation_x[item_num + 1], sin);
        equation_x.splice(item_num, 1, answer);
        equation_x.splice(item_num + 1, 1);
    }
    else if (equation_x[item_num] == "cos") {
        let answer = unaryCalculator(equation_x[item_num + 1], cos);
        equation_x.splice(item_num, 1, answer);
        equation_x.splice(item_num + 1, 1);
    }
    else if (equation_x[item_num] == "tan") {
        let answer = unaryCalculator(equation_x[item_num + 1], tan);
        equation_x.splice(item_num, 1, answer);
        equation_x.splice(item_num + 1, 1);
    }
    else if (equation_x[item_num] == "log") {
        let answer = unaryCalculator(equation_x[item_num + 1], log);
        equation_x.splice(item_num, 1, answer);
        equation_x.splice(item_num + 1, 1);
    }
    else if (equation_x[item_num] == "ln") {
        let answer = unaryCalculator(equation_x[item_num + 1], ln);
        equation_x.splice(item_num, 1, answer);
        equation_x.splice(item_num + 1, 1);
    }
}


function binaryCalculator(a, b, operator) {
    let result = [];
    if (a.length > 1 && b.length > 1) {
        for (let i = 0; i < a.length; i++) {
            result.push(operator(a[i], b[i]));
        }
    }
    else if (a.length > 1) {
        for (let i = 0; i < a.length; i++) {
            result.push(operator(a[i], b));
        }
    }
    else if (b.length > 1) {
        for (let i = 0; i < b.length; i++) {
            result.push(operator(a, b[i]));
        }
    }
    else {
        let nonVariable_result = operator(a, b);
        return nonVariable_result;
    }
    return result;
}

function power(x, y) {return Math.pow(x, y);}
function multiply(x, y) {return x * y;}
function divide(x, y) {return x / y;}
function add(x, y) {return x + y;}
function subtract(x, y) {return x - y;}

function unaryCalculator(a, operator) {
    let result = [];
    if (a.length > 1) {
        for (let i = 0; i < a.length; i++) {
            result.push(operator(a[i]));
        }
    }
    else {
        let nonVariable_result = operator(a);
        return nonVariable_result;
    }
    return result;
}

function sin(x) {return Math.sin(x);}
function cos(x) {return Math.cos(x);}
function tan(x) {return Math.tan(x);}
function log(x) {return Math.log10(x);}
function ln(x) {return Math.log(x);}

function isOperator(equation_x, item_num, num) {
    let operator_array = [];
    for (let i = num - 1; i > -1; i--) {
        operator_array.push(equation_x[item_num - i]);
    }
    let operator = operator_array.join("");
    return operator;
}