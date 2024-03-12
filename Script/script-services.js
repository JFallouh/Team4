/* 
Class: User Interface
Assignment: Final Project

Team 4
    Craig Collins (1038789)
    James Fallouh (6171620)
    SeyedehFatemeh Fekribaygi (6284424)

    Current Date: TBD
    Filename: index.html

    Purpose: This is the script file for the sevices page
*/

"use strict";
document.getElementById('quoteForm').addEventListener('submit', function(event){
    event.preventDefault();

    //get form data
    var serviceType = document.getElementById('serviceType').value;
    var estimateHours = parseInt(document.getElementById('estimateHours').value);


    //validate estimate  hours to be more than 0 and a non negative number
    if (estimateHours <= 0 || isNaN(estimateHours)){
        document.getElementById('hoursError').classList.remove('d-none');
        return;
    }
    document.getElementById ('hoursError').classList.add('d-none');

    //set the prices 

    var basePrice;
    switch (serviceType){
        case 'Database':
        case 'programming':
            basePrice = 25;
            break;
            case 'website-design':
            case 'web-development':
                basePrice = 35;
                break;
                

    }


    //CALCULATE THE ESTIMATED QUOTE
    var estimatedQuote = basePrice * estimateHours;

    //display the quote in a table
    var quoteTableBody = document.getElementById('quoteTableBody')
    quoteTableBody.innerHTML = ` <tr>
                                  <td>${serviceType}</td>
                                  <td>${estimateHours}</td>
                                  <td>$${estimatedQuote}</td>
                                </tr>`;
    
    // show the quote table
    document.getElementById('quoteTable').classList.remove('d-none');
});


