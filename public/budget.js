// INCOME TAX
var incomeTaxData = require('./incomeTaxData');

function getState() {
    return 'Oregon';
}

function getIncome() {
    return 120000;
}

function getFilingStatus() {
    return 'single';
}

function calculateIncomeTax(state, initialIncome, filingStatus) {
    console.log('');
    var incomeTax = 0;
    if (filingStatus == 'single') {
        for (var i = 0; incomeTaxData[state].brackets.single[i] <= initialIncome; i++) {
            var currentBracket = incomeTaxData[state].brackets.single[i];
            console.log(' = currentBracket: $' + currentBracket);
            
            var nextBracket = incomeTaxData[state].brackets.single[i + 1];
            console.log('   nextBracket: $' + nextBracket);
            
            var rate = incomeTaxData[state].rates[i] / 100;
            console.log('   rate: ' + rate);
    
            if (nextBracket && initialIncome > nextBracket) {
                incomeTax = incomeTax + ((nextBracket - currentBracket - 1) * rate);
            } else {
                incomeTax = incomeTax + ((initialIncome - currentBracket) * rate);
            }
            console.log('   incomeTax: $' + incomeTax);
        }
    } else if (filingStatus == 'marriedJointly') {
        for (var i = 0; incomeTaxData[state].brackets.marriedJointly[i] <= initialIncome; i++) {
            var currentBracket = incomeTaxData[state].brackets.marriedJointly[i];
            console.log(' = currentBracket: $' + currentBracket);
            
            var nextBracket = incomeTaxData[state].brackets.marriedJointly[i + 1];
            console.log('   nextBracket: $' + nextBracket);
            
            var rate = incomeTaxData[state].rates[i] / 100;
            console.log('   rate: ' + rate);
    
            if (nextBracket && initialIncome > nextBracket) {
                incomeTax = incomeTax + ((nextBracket - currentBracket - 1) * rate);
            } else {
                incomeTax = incomeTax + ((initialIncome - currentBracket) * rate);
            }
            console.log('   incomeTax: $' + incomeTax);
        }
    }
    console.log('');
    
    return incomeTax;
}

var state = getState();

var initialIncome = getIncome();
console.log('== Initial Income: ' + initialIncome);

var filingStatus = getFilingStatus();

var stateIncomeTax = calculateIncomeTax(state, initialIncome, filingStatus);
console.log('== Total State Income Tax for ' + state + ': $' + stateIncomeTax);

var federalIncomeTax = calculateIncomeTax('federal', initialIncome, filingStatus);
console.log('== Total Federal Income Tax: $' + federalIncomeTax);


// INCOME
var salaryOrHourly
var paySchedule;            // bi monthly, monthly, bi weekly, weekly

var initialIncome;

// MODIFIERS
var filingStatus;           // for taxes
var state;                  // for taxes

// MONTHLY EXPENSES
var housing;                // or var rent;
var food;                   // groceries or eating out
var medicine;
var healthInsurance;

var houseSupplies;          // cleaning, kitchen, etc.
var clothing
var laundry;

var hasChild;
var childCare;

var electricity;            // could just lump as var utilities;
var water;                  // or var sewage;
var garbageDisposal;        // or var trash;
var internet;
var phone;
var creditCardPayments

var carPayment;
var carInsurance;
var carRepairs;             // estimate $.50 per mile driven
var fuel;
var transportation;         // busses or bike maintenance
var travel;

var entertainment;          // e.g. videogames
var subscriptions = [];     // gym membership, video streaming, etc.

var isStudent;
var hasStudnetLoans;
var studentLoanTotal
var studentLoanInterestRate; 
var studentLoanRepaymentPeriod;     // desired payment deadline
var studentLoanMonthlyRepayment;    // planned/desired monthly payments
var tuition;
var schoolFees;
var textBooks;              // approximate $100 per class if you don't know

var emergenyFund;
var savings;
var other;

var monthlyExpenses = housing + food + medicine + healthInsurance + 
                      houseSupplies + clothing + laundry +
                      electricity + water + garbageDisposal + internet + phone + creditCardPayments + 
                      carPayment + carInsurance + carRepairs + fuel + transportation + travel +
                      entertainment + emergenyFund + savings + other;

if (hasChild) {
    monthlyExpenses = monthlyExpenses + childCare;
}

if (isStudent) {
    monthlyExpenses = monthlyExpenses + tuition + schoolFees + textBooks;
}

if (hasStudnetLoans) {
    monthlyExpenses = monthlyExpenses + studentLoanMonthlyRepayment;
}

for (var i = 0; i < subscriptions.length; i++) {
    monthlyExpenses = monthlyExpenses + subscriptions[i];
}

var annualExpenses = monthlyExpenses * 12;