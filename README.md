# JavaScript Calculator

## Links

**Website Link:** [file:///Users/Kenji/GenjiXinyu.github.io/index.html]

**Graphing Tool Link:** [Website](https://plotly.com) and [JS Script](https://cdn.plot.ly/plotly-latest.min.js)

## How to use calculator

Type in an expression in the text bar and submit to get an answer or a graph there is a variable used. 
Use the mouse to hover over the graph to see the precise coordinates.
The calculator will show each steps in the process to finding an answer, it will also break down each step within the parentheses individualy.

### Usable Operands

1. **Trigonometry:** sin, cos, tan, pie
2. **Logorithm:** log, ln, e
3. **Binary Operations:** ^, +, -, *, /
4. **Negative:** neg

### Errors

If the website freezes try reloading it and if not close the browser and reopen it again.
The calculator will not compute **Syntax Errors** and **Math Errors** such as divions by 0 or square rooting by a negative value. 
Graphs with undefined value are inaccurate because of the calculator's inability to compute undefined numbers. 

## Code

### Main Code

function calculator() {
    document.getElementById('result').innerHTML = '';
    document.getElementById('graph').innerHTML = '';
    var equation = getString();
    dataTypeConvert(equation);
    websitePrint(equation);
    var recurse = 0;
    expressionEvaluation(equation, recurse);
    websitePrint(equation);
    if (variableExist == true) {
        let variable_array = [];
        for (let i = -10; i < 10.1; i = i + 0.1) {
            variable_array.push(i);
        }
        TESTER = document.getElementById('graph');
        Plotly.newPlot(TESTER, [{x: variable_array, y: equation[0]}], {margin: {t: 0}});
    }
    variableExist = false;
    errorExist = false;
}