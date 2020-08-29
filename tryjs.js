//! this code does not work yet!

function calculator() {
    binaryOperator(1, 2, add);
}

function binaryOperator(a, b, operation) {

    if (a.length > 1) {

    }
    return operation(a, b);
}

function unaryOperator(a, operation) {
    
}

function add(x, y) {
    return x + y;
} 

function subtract(x, y) {
    return x - y;
}