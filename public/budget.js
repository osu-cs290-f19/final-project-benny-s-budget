// INCOME TAX

// var incomeTaxData = require('./incomeTaxData');

// function getState() {
//     return 'Oregon';
// }

// function getIncome() {
//     return 120000;
// }

// function getFilingStatus() {
//     return 'single';
// }

// function calculateIncomeTax(state, initialIncome, filingStatus) {
//     console.log('');
//     var incomeTax = 0;
//     if (filingStatus == 'single') {
//         for (var i = 0; incomeTaxData[state].brackets.single[i] <= initialIncome; i++) {
//             var currentBracket = incomeTaxData[state].brackets.single[i];
//             console.log(' = currentBracket: $' + currentBracket);
            
//             var nextBracket = incomeTaxData[state].brackets.single[i + 1];
//             console.log('   nextBracket: $' + nextBracket);
            
//             var rate = incomeTaxData[state].rates[i] / 100;
//             console.log('   rate: ' + rate);
    
//             if (nextBracket && initialIncome > nextBracket) {
//                 incomeTax = incomeTax + ((nextBracket - currentBracket - 1) * rate);
//             } else {
//                 incomeTax = incomeTax + ((initialIncome - currentBracket) * rate);
//             }
//             console.log('   incomeTax: $' + incomeTax);
//         }
//     } else if (filingStatus == 'marriedJointly') {
//         for (var i = 0; incomeTaxData[state].brackets.marriedJointly[i] <= initialIncome; i++) {
//             var currentBracket = incomeTaxData[state].brackets.marriedJointly[i];
//             console.log(' = currentBracket: $' + currentBracket);
            
//             var nextBracket = incomeTaxData[state].brackets.marriedJointly[i + 1];
//             console.log('   nextBracket: $' + nextBracket);
            
//             var rate = incomeTaxData[state].rates[i] / 100;
//             console.log('   rate: ' + rate);
    
//             if (nextBracket && initialIncome > nextBracket) {
//                 incomeTax = incomeTax + ((nextBracket - currentBracket - 1) * rate);
//             } else {
//                 incomeTax = incomeTax + ((initialIncome - currentBracket) * rate);
//             }
//             console.log('   incomeTax: $' + incomeTax);
//         }
//     }
//     console.log('');
    
//     return incomeTax;
// }

// var state = getState();

// var initialIncome = getIncome();
// console.log('== Initial Income: ' + initialIncome);

// var filingStatus = getFilingStatus();

// var stateIncomeTax = calculateIncomeTax(state, initialIncome, filingStatus);
// console.log('== Total State Income Tax for ' + state + ': $' + stateIncomeTax);

// var federalIncomeTax = calculateIncomeTax('federal', initialIncome, filingStatus);
// console.log('== Total Federal Income Tax: $' + federalIncomeTax);

// var resultsSection = document.getElementById('results-section');



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


const numberOfPrompts = 6;
var url = window.location.href.toString().split(window.location.host)[1];
if (!Number(url.split('/')[2])) {
    url = '/' + url.split('/')[1];
}
var urlNumber = Number(url.split('/')[2]);

// MODAL

function isValidInput(input, inputValue, promptNum, iteration) {
    console.log(input, inputValue, promptNum, iteration);
    console.log(Number(inputValue));
    if (inputValue == '') {
        return false;
    }
    else if (promptNum == 1) {
        var dropDowns = document.getElementsByClassName('drop-down');
        for (var i = 0; i < dropDowns.length; i++) {
            if (dropDowns[i] == input) {
                return true;
            }
        }
    }
    if (!Number(inputValue) && inputValue != 0) {
        console.log("Oh no");
        return false;
    }

    return true;
}

if (urlNumber) {
    var promptInputs = document.getElementsByClassName('prompt-input');
    console.log(promptInputs);

    var continueArrow = document.getElementById('modal-continue-button-container');
    continueArrow.addEventListener('click', function() {
        for (var i = 0; i < promptInputs.length; i++) {
            if (isValidInput(promptInputs[i], promptInputs[i].value, urlNumber, i)) {
                if (i == promptInputs.length - 1) {
                    if (urlNumber != numberOfPrompts) {
                        window.location = '/budget/' + (urlNumber + 1);
                    }
                    else {
                        window.location = '/budget';
                    }
                }
            }
            else {
                alert("You must enter in all fields with a valid input. If a field doesn't apply to you, enter 0.");
                break;
            }
        }  
    });

    var previousArrow = document.getElementById('modal-previous-button');
    previousArrow.addEventListener('click', function() {
        if (urlNumber != 1) {
            window.location = '/budget/' + (urlNumber - 1);
        }
        else {
            window.location = '/';
        }
    });
}

// PIE CHART
else if (url == '/budget') {
    window.onload = function () {

        var chart = new CanvasJS.Chart("chartContainer", {
            exportEnabled: true,
            animationEnabled: true,
            title:{
                text: "Monthly Expenses"
            },
            legend:{
                cursor: "pointer",
                itemclick: explodePie
            },
            data: [{
                type: "pie",
                showInLegend: true,
                toolTipContent: "{name}: <strong>{y}%</strong>",
                indexLabel: "{name} - {y}%",
                dataPoints: [
                    { y: 26, name: "Housing", exploded: true },
                    { y: 20, name: "Food" },
                    { y: 5,  name: "Health Insurance" },
                    { y: 3,  name: "Utilities" },
                    { y: 7,  name: "Internet" },
                    { y: 17, name: "Phone" },
                    { y: 22, name: "Lifestyle"},
                    { y: 26, name: "Transportation"},
                    { y: 26, name: "Tuition"},
                    { y: 26, name: "Student Fees"},
                    { y: 26, name: "Student Loans"},
                    { y: 26, name: "Emergency Fund"},
                    { y: 26, name: "Savings"},
                    { y: 26, name: "Investments"},
                    { y: 26, name: "Other"}
                ]
            }]
        });
        chart.render();
    }
            
    function explodePie (e) {
        if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
            e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
        } else {
            e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
        }
        e.chart.render();

    }
}