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


const numberOfPrompts = 6;
var url = window.location.href.toString().split(window.location.host)[1];
if (!Number(url.split('/')[2])) {
    url = '/' + url.split('/')[1];
}
var urlNumber = Number(url.split('/')[2]);

// MODAL

function isValidInput(input, inputValue, promptNum) {
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
        return false;
    }

    return true;
}

if (urlNumber) {
    var promptInputs = document.getElementsByClassName('prompt-input');

    var continueArrow = document.getElementById('modal-continue-button-container');
    continueArrow.addEventListener('click', function() {
        for (var i = 0; i < promptInputs.length; i++) {
            if (isValidInput(promptInputs[i], promptInputs[i].value, urlNumber)) {
                sessionStorage.setItem([promptInputs[i].id], promptInputs[i].value);

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
    console.log(sessionStorage);
    console.log(sessionStorage.length);
    var monthlyExpenses = Number(sessionStorage["housing-input"])           + Number(sessionStorage["food-input"])                  + Number(sessionStorage["medicine-input"])      + Number(sessionStorage["health-insurance-input"]) +
                          Number(sessionStorage["house-supplies-input"])    + Number(sessionStorage["clothing-input"])              + Number(sessionStorage["laundry-input"])       +
                          Number(sessionStorage["utilities-input"])         + Number(sessionStorage["internet-input"])              + Number(sessionStorage["phone-input"])         + Number(sessionStorage["credit-card-input"]) +
                          Number(sessionStorage["car-payment-input"])       + Number(sessionStorage["car-insurance-input"])         + Number(sessionStorage["car-repairs-input"])   + 
                          Number(sessionStorage["gas-input"])               + Number(sessionStorage["public-transportation-input"]) + Number(sessionStorage["vacation-fund-input"]) + 
                          Number(sessionStorage["student-tuition-input"])   + Number(sessionStorage["student-fees-input"])          + Number(sessionStorage["student-loan-input"]) +
                          Number(sessionStorage["emergency-fund-input"])    + Number(sessionStorage["savings-input"])               + Number(sessionStorage["investments-input"])   + Number(sessionStorage["other-expenses-input"]);
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
                    { y: Math.round(Number(this.sessionStorage["housing-input"]) / monthlyExpenses * 100),          name: "Housing", exploded: true },
                    { y: Math.round(Number(this.sessionStorage["food-input"]) / monthlyExpenses * 100),             name: "Food" },
                    { y: Math.round(Number(this.sessionStorage["health-insurance-input"]) / monthlyExpenses * 100), name: "Health Insurance" },
                    { y: Math.round(Number(this.sessionStorage["utilities-input"]) / monthlyExpenses * 100),        name: "Utilities" },
                    { y: Math.round(Number(this.sessionStorage["internet-input"]) / monthlyExpenses * 100),         name: "Internet" },
                    { y: Math.round(Number(this.sessionStorage["phone-input"]) / monthlyExpenses * 100),            name: "Phone" },
                    { y: Math.round(Number(this.sessionStorage["housing-input"]) / monthlyExpenses * 100),          name: "Lifestyle"},
                    { y: Math.round(Number(this.sessionStorage["housing-input"]) / monthlyExpenses * 100),          name: "Transportation"},
                    { y: Math.round(Number(this.sessionStorage["student-tuition-input"]) / monthlyExpenses * 100),  name: "Tuition"},
                    { y: Math.round(Number(this.sessionStorage["student-fees-input"]) / monthlyExpenses * 100),     name: "Student Fees"},
                    { y: Math.round(Number(this.sessionStorage["student-loan-input"]) / monthlyExpenses * 100),     name: "Student Loans"},
                    { y: Math.round(Number(this.sessionStorage["emergency-fund-input"]) / monthlyExpenses * 100),   name: "Emergency Fund"},
                    { y: Math.round(Number(this.sessionStorage["savings-input"]) / monthlyExpenses * 100),          name: "Savings"},
                    { y: Math.round(Number(this.sessionStorage["investments-input"]) / monthlyExpenses * 100),      name: "Investments"},
                    { y: Math.round(Number(this.sessionStorage["other-expenses-input"]) / monthlyExpenses * 100),   name: "Other"}
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