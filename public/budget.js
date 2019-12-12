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


// PIE CHART w/ canvasJS

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

/*Passing Variables to other text boxes*/

/*Income*/
var plug_income = document.getElementById('income-input');
var plug_otIncome = document.getElementById('other-income');
/*Tax Information*/
var plug_state = document.getElementById('state-input');
var plug_status = document.getElementById('filling-status-input');
/*Living Expenses*/
var plug_housing = document.getElementById('housing-input');
var plug_food = document.getElementById('food-input');
var plug_medicine = document.getElementById('medicine-input');
var plug_health = document.getElementById('health-insurance-input');
var plug_utilities = document.getElementById('utilities-input');
var plug_internet = document.getElementById('internet-input');
var plug_phone = document.getElementById('phone-input');
/*LifeStyle*/
var plug_card = document.getElementById('credit-card-payments-input');
var plug_house = document.getElementById('house-supplies-input');
var plug_clothing = document.getElementById('clothing-input');
var plug_laundry = document.getElementById('laundry-input');
var plug_rec = document.getElementById('recreation-input');
var plug_subs = document.getElementById('subscriptions-input');
/*Transportation*/
var plug_cPay = document.getElementById('car-payment-input');
var plug_cInsure = document.getElementById('car-insurance-input');
var plug_cRep = document.getElementById('car-repairs-input');
var plug_gas = document.getElementById('gas-input');
var plug_pubTrans = document.getElementById('public-transportation-input');
var plug_vaK = document.getElementById('vacation-input');
/*Student*/
var plug_tuition = document.getElementById('tuition-input');
var plug_fees = document.getElementById('fees-input');
var plug_books = document.getElementById('text-books-input');
/*Other Expenses*/
var plug_sloan = document.getElementById('student-loan-input');
var plug_ccare = document.getElementById('child-care-input');
var plug_eFunds = document.getElementById('emergency-fund-input');
var plug_savings = document.getElementById('savings-input');
var plug_oExpen = document.getElementById('other-expenses-input');

/*  */
/*Income*/
var results_income = document.getElementById('');
var results_otIn = document.getElementById('');
/*Tax Information*/
var results_state = document.getElementById('');
var results_status = document.getElementById('');
/*Living Expenses*/
var results_housing = document.getElementById('');
var results_food = document.getElementById('');
var results_medicine = document.getElementById('');
var results_health= document.getElementById('');
var results_utilities = document.getElementById('');
var results_internet = document.getElementById('');
var results_phone = document.getElementById('');
/*LifeStyle*/
var results_card = document.getElementById('');
var results_house = document.getElementById('');
var results_clothing = document.getElementById('');
var results_laundry = document.getElementById('');
var results_rec = document.getElementById('');
var results_subs = document.getElementById('');
/*Transportation*/
var results_cPay = document.getElementById('');
var results_cInsure = document.getElementById('');
var results_cRep = document.getElementById('');
var results_gas = document.getElementById('');
var results_pubTrans = document.getElementById('');
var results_vaK = document.getElementById('');
/*Student*/
var results_tuition = document.getElementById('');
var results_fees = document.getElementById('');
var results_books = document.getElementById('');
/*Other Expenses*/
var results_sloan = document.getElementById('');
var results_ccare = document.getElementById('');
var results_eFunds = document.getElementById('');
var results_saving = document.getElementById('');
var results_oExpen = document.getElementById('');
/*
 * set_vaule function
 * When called will grab the user input and store it to the the interactable form 
 * at the end
 *
 */
function  set_value(){

	/*Other Expenses*/
/*Income*/
results_income	 	= plug_income.value
results_otIn	 	= plug_otIn.value 		
/*Tax Information*/       
results_state	 	= plug_state.value 	
results_status	 	= plug_status.value 	
/*Living Expenses*/      
results_housing	 	= plug_housing.value 	
results_food 	 	= plug_food.value 		
results_medicine 	= plug_medicine.value 	
results_health		= plug_health.value 	
results_utilities 	= plug_utilities.value 	
results_internet 	= plug_internet.value 	
results_phone 		= plug_phone.value 	
/*LifeStyle*/
results_card 		= plug_card.value 		
results_house 		= plug_house.value 	
results_clothing 	= plug_clothing.value 	
results_laundry 	= plug_laundry.value 	
results_rec 		= plug_rec.value 		
results_subs 		= plug_subs.value 		
/*Transportation*/
results_cPay 		= plug_cPay.value 		
results_cInsure 	= plug_cInsure.value 	
results_cRep 		= plug_cRep.value 		
results_gas 		= plug_gas.value
results_pubTrans 	= plug_pubTrans.value 
results_vaK 		= plug_vaK.value 
/*Student*/
results_tuition 	= plug_tuition.value
results_fees 		= plug_fees.value
results_books 		= plug_books.value
/*Other Expenses*/
results_sloan.value  = plug_sloan.value;
results_ccare.value  = plug_ccare.value;
results_eFunds.value = plug_eFunds.value;
results_saving.value = plug_saving.value;
results_oExpen.value = plug_oExpen.value;

}
