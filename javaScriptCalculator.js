//* Global Variables

var b1_operations = ["^"];              // first priority binary operations
var b2_operations = ["*", "/"];             // second priority binary operations
var b3_operations = ["+", "-"];             // third priority binary operations
var u_operations = ["sin", "cos", "tan"];               // unary operations
var answer_steps_array = [];                // array to record the steps taken to get to answer
var variable_array = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];                // array for variable       //! Only example do not use
var variableExist = false;
var errorExist = false;


//* Running Calulator Code 

//* Main code
function calculator() {
    var equation = getString();             // gets user input
    dataTypeConvert(equation);              // converts data
    websitePrint(equation);             // prints step
    var recurse = 0;                // initialization
    expressionEvaluation(equation, recurse);                // finds answer
    websitePrint(equation);             // prints answer
    if (variableExist == true) {
        TESTER = document.getElementById('tester');
        Plotly.newPlot(TESTER, [{x: variable_array, y: equation[0]}], {margin: {t: 0}});
    }
}

//* Converts strings into proper data types
function dataTypeConvert(equation) {
    for (let i = 0; i < equation.length; i++) {
        if (isNaN(equation[i]) == false) {              // determines if object is not a number
            equation[i] = parseFloat(equation[i]);              // converts from object to float
        }
        if (isLetter(equation[i]) == true) {
            variableExist = true;
            equation[i] = variable_array;
        }
    }
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
            for (let i = 0; i < u_operations.length; i++) {
                try {
                    if (equation_x[item_num] == u_operations[i]) {
                        basicCalculator(equation_x, item_num);              // calculates using operator
                        items = equation_x.length;              // reinitialization
                        item_num = 0;
                        is_calc = true;
                        websitePrint(equation_x);               // prints step
                        break;
                    }
                } 
                catch (error) {
                    break;
                }
            }
        }
        if (calc_type == 1) {               // checks for first priority binary operators
            for (let i = 0; i < b1_operations.length; i++) {
                try {
                    if (equation_x[item_num] == b1_operations[i]) {
                        basicCalculator(equation_x, item_num);              // calculates using operator
                        items = equation_x.length;              // reinitialization
                        item_num = 0;
                        is_calc = true;
                        websitePrint(equation_x);               // prints step
                        break;
                    }
                }
                catch (error) {
                    break;
                }
            }
        }
        if (calc_type == 2) {               // checks for second priority binary operators
            for (let i = 0; i < b2_operations.length; i++) {
                try {
                    if (equation_x[item_num] == b2_operations[i]) {
                        basicCalculator(equation_x, item_num);              // calculates using operator
                        items = equation_x.length;              // reinitialization
                        item_num = 0;
                        is_calc = true;
                        websitePrint(equation_x);               // prints step
                        break;
                    }
                }
                catch (error) {
                    break;
                }
            }
        }
        if (calc_type == 3) {               // checks for third priority binary operators
            for (let i = 0; i < b3_operations.length; i++) {
                try {
                    if (equation_x[item_num] == b3_operations[i]) {
                        basicCalculator(equation_x, item_num);              // calculates using operator
                        items = equation_x.length;              // reinitialization
                        item_num = 0;
                        is_calc = true;
                        websitePrint(equation_x);               // prints setp
                        break;
                    }
                }
                catch (error) {
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
        if (calc_type > 3 && is_calc == false) {                // exits if there is a syntax error
            console.log("Syntax Error");
            //TODO Add the exit code
        }
    }
    return equation_x[0];               // returns answer
}

//* Prints steps and the answer onto html website
function websitePrint(equation_x) {
    if (variableExist == false) {
        console.log(equation_x);
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
        if (equation_x[item_num + 1] == 0) {
            console.log("Math Error");
            window.stop();
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