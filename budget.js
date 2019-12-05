var incomeTaxData = require('./incomeTaxData');

function getState() {
    return 'Oregon';
}

function getIncome() {
    return 120000;
}

function getFilingStatus() {
    return "single";
}

function calculateIncomeTax(state, initialIncome, filingStatus) {
    console.log("");
    var incomeTax = 0;
    if (filingStatus == "single") {
        for (var i = 0; incomeTaxData[state].brackets.single[i] <= initialIncome; i++) {
            var currentBracket = incomeTaxData[state].brackets.single[i];
            console.log(" = currentBracket: $" + currentBracket);
            
            var nextBracket = incomeTaxData[state].brackets.single[i + 1];
            console.log("   nextBracket: $" + nextBracket);
            
            var rate = incomeTaxData[state].rates[i] / 100;
            console.log("   rate: " + rate);
    
            if (nextBracket && initialIncome > nextBracket) {
                incomeTax = incomeTax + ((nextBracket - currentBracket - 1) * rate);
            } else {
                incomeTax = incomeTax + ((initialIncome - currentBracket) * rate);
            }
            console.log("   incomeTax: $" + incomeTax);
        }
    } else {

    }
    console.log("");
    
    return incomeTax;
}

var state = getState();

var initialIncome = getIncome();
console.log("== Initial Income: " + initialIncome);

var filingStatus = getFilingStatus();

var stateIncomeTax = calculateIncomeTax(state, initialIncome, filingStatus);
console.log("== Total State Income Tax for " + state + ": $" + stateIncomeTax);

var federalIncomeTax = calculateIncomeTax("federal", initialIncome, filingStatus);
console.log("== Total Federal Income Tax: $" + federalIncomeTax);