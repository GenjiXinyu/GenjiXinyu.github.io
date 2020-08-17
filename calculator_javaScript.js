var b1_operations = ["^"];
var b2_operations = ["*", "/"];
var b3_operations = ["+", "-"];
var u_operations = ["sin", "cos", "tan"];
var answerStepsArray = [];

function consolePrint(equation_x) {
    let same = true;
    if (answerStepsArray.length != equation_x.length) {
        same = false;
    }
    else {
        for (let i = 0; i < answerStepsArray.length; i++) {
            if (answerStepsArray[i] != equation_x[i]) {
                same = false;
            }
        }
    }
    if (same == true) {
        return true;
    }
    else {
        answerStepsArray = [];
        for (let i = 0; i < equation_x.length; i++) {
            answerStepsArray.push(equation_x[i]);
        }
        let answerStepsPrint = answerStepsArray.join("");
        var text = document.createElement("p");
        text.innerHTML = answerStepsPrint;
        document.getElementById("result").appendChild(text);
    }
}

function calculator() {
    var equation = getString();
    dataTypeConvert(equation);
    console.log(equation);
    consolePrint(equation);
    var recurse = 0;
    expressionEvaluation(equation, recurse);
    console.log(equation);
    consolePrint(equation);
}

function getString() {
    var user = document.querySelector('#userInput').value;
    var user_equation = user.split("");
    for (let i = user_equation.length - 1; i > 0; i--) {
        if (isNaN(user_equation[i]) == false && isNaN(user_equation[i-1]) == false);
        else {
            user_equation.splice(i, 0, " ");
        }
    }
    var userString = user_equation.join("");
    user_equation = userString.split(" ");
    for (let i = user_equation.length - 1; i > -1; i--) {
        if (user_equation[i] == "") {
            user_equation.splice(i, 1);
        }
    }
    return user_equation;
}

function dataTypeConvert(equation) {
    for (let i = 0; i < equation.length; i++) {
        if (isNaN(equation[i]) == false) {
            equation[i] = parseFloat(equation[i]);
        }
    }
}

function basicCalculator(equation_x, item_num) {
    if (equation_x[item_num] == "^") {
        let answer = Math.pow(equation_x[item_num - 1], equation_x[item_num + 1]);
        equation_x.splice(item_num, 1, answer);
        equation_x.splice(item_num + 1, 1);
        equation_x.splice(item_num - 1, 1);
    }
    else if (equation_x[item_num] == "*") {
        let answer = equation_x[item_num - 1] * equation_x[item_num + 1];
        equation_x.splice(item_num, 1, answer);
        equation_x.splice(item_num + 1, 1);
        equation_x.splice(item_num - 1, 1);
    }
    else if (equation_x[item_num] == "/") {
        if (equation_x[item_num + 1] == 0) {
            console.log("Math Error");
            //! Add the exit code
        }
        let answer = equation_x[item_num - 1] / equation_x[item_num + 1];
        equation_x.splice(item_num, 1, answer);
        equation_x.splice(item_num + 1, 1);
        equation_x.splice(item_num - 1, 1);
    }
    else if (equation_x[item_num] == "+") {
        let answer = equation_x[item_num - 1] + equation_x[item_num + 1];
        equation_x.splice(item_num, 1, answer);
        equation_x.splice(item_num + 1, 1);
        equation_x.splice(item_num - 1, 1);
    }
    else if (equation_x[item_num] == "-") {
        let answer = equation_x[item_num - 1] - equation_x[item_num + 1];
        equation_x.splice(item_num, 1, answer);
        equation_x.splice(item_num + 1, 1);
        equation_x.splice(item_num - 1, 1);
    }
}

function operationOrder(equation_x) {
    console.log(equation_x);
    consolePrint(equation_x);
    var items = equation_x.length;
    var item_num = 0;
    var calc_type = 0;
    while (items != 1) {
        var is_calc = false;
        if (calc_type == 0) {
            for (let i = 0; i < u_operations.length; i++) {
                try {
                    if (equation_x[item_num] == u_operations[i]) {
                        basicCalculator(equation_x, item_num);
                        items = equation_x.length;
                        item_num = 0;
                        is_calc = true;
                        console.log(equation_x);
                        consolePrint(equation_x);
                        break;
                    }
                } 
                catch (error) {
                    break;
                }
            }
        }
        if (calc_type == 1) {
            for (let i = 0; i < b1_operations.length; i++) {
                try {
                    if (equation_x[item_num] == b1_operations[i]) {
                        basicCalculator(equation_x, item_num);
                        items = equation_x.length;
                        item_num = 0;
                        is_calc = true;
                        console.log(equation_x);
                        consolePrint(equation_x);
                        break;
                    }
                }
                catch (error) {
                    break;
                }
            }
        }
        if (calc_type == 2) {
            for (let i = 0; i < b2_operations.length; i++) {
                try {
                    if (equation_x[item_num] == b2_operations[i]) {
                        basicCalculator(equation_x, item_num);
                        items = equation_x.length;
                        item_num = 0;
                        is_calc = true;
                        console.log(equation_x);
                        consolePrint(equation_x);
                        break;
                    }
                }
                catch (error) {
                    break;
                }
            }
        }
        if (calc_type == 3) {
            for (let i = 0; i < b3_operations.length; i++) {
                try {
                    if (equation_x[item_num] == b3_operations[i]) {
                        basicCalculator(equation_x, item_num);
                        items = equation_x.length;
                        item_num = 0;
                        is_calc = true;
                        console.log(equation_x);
                        consolePrint(equation_x);
                        break;
                    }
                }
                catch (error) {
                    break;
                }
            }
        }
        if (is_calc == false) {
            item_num++;
        }
        if (item_num == items) {
            item_num = 0;
            calc_type++;
        }
        if (calc_type > 3 && is_calc == false) {
            console.log("Syntax Error");
            //! Add the exit code
        }
    }
    return equation_x[0];
}

function expressionEvaluation(equation_x, recurse) {
    var parentheses = [];
    var parentheses_num = 0;
    var is_parentheses = false;
    var is_parent = true;
    for (let i = 0; i < equation_x.length; i++) {
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
    for (let i = equation_x.length - 1; i > -1; i--) {
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
    if (parentheses.length != 0) {
        for (let i = 0; i < equation_x.length; i++) {
            if (equation_x[i] == "parentheses") {
                recurse++;
                console.log(parentheses);
                consolePrint(parentheses);
                parentheses_answer = expressionEvaluation(parentheses, recurse);
                equation_x.splice(i, 1, parentheses_answer);
                recurse--;
            }
        }
    }
    if (recurse != 0) {
        var answer = operationOrder(equation_x);
        return answer;
    }
    for (let i = 0; i < equation_x.length; i++) {
        if (equation_x[i] == "(") {
            expressionEvaluation(equation_x, recurse);
        }
    }
    var answerFinal = operationOrder(equation_x);
    return answerFinal;
}