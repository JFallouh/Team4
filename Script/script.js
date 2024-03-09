/* 

Class: User Interface
Assignment: Final Project

Team 4
    Craig Collins (1038789)
    James Fallouh (6171620)
    SeyedehFatemeh Fekribaygi (6284424)

    Current Date: TBD
    Filename: script.js

    Purpose: This is the script.js code.
*/


'use strict';
/*----------- Search input -----------*/
// Event listener for page reload

/*document.onload = function () {
  clearHighlight();
};
$(window).on('load', function () {
  clearHighlight();
});
// Event listener for page reload
window.onload = function () {
  clearHighlight();
};*/
$(document).ready(function () {
  // Check if there's a previous search term in local storage
  let previousSearchTerm = localStorage.getItem('searchTerm');
  if (previousSearchTerm) {
    highlightText(previousSearchTerm);
  }

  // Function to highlight text based on user input
  $('#NavSearch').on('keypress', function (event) {
    // Check if the Enter key was pressed (key code 13)
    if (event.which === 13) {
      let searchText = $(this).val().trim();

      // Highlight matching text (excluding HTML tags and attributes)
      highlightText(searchText);

      // Save the search term in local storage
      localStorage.setItem('searchTerm', searchText);
    }
  });

  // Event listener for the Escape key
  $(document).on('keydown', function (event) {
    if (event.which === 27) { // 27 is the key code for the Escape key
      clearHighlight();
    }
  });

  function highlightText(searchText) {
    // Remove existing highlights
    $('body').find('.highlight').contents().unwrap();

    // Highlight matching text (excluding HTML tags and attributes)
    if (searchText !== '') {
      $('body').find(':not(iframe, script, style, textarea)').contents().filter(function () {
        return this.nodeType === 3 && this.nodeValue.match(new RegExp('(' + searchText + ')', 'ig'));
      }).each(function () {
        let content = this.nodeValue;
        let regex = new RegExp('(' + searchText + ')', 'ig');
        let highlightedContent = content.replace(regex, '<span class="highlight">$1</span>');
        $(this).replaceWith(highlightedContent);
      });
    }
  }

  function clearHighlight() {
    // Remove existing highlights
    $('body').find('.highlight').contents().unwrap();
    // Clear the search term in local storage
    localStorage.removeItem(`searchTerm`);
  }
});

/*----------- End of Search input -----------*/

/*----------- form message counter -----------*/
const MAX_REVIEW = 1000;
document.getElementById("limit").innerHTML = MAX_REVIEW;

// Reference to elemets in the web page
let wordCountBox = document.getElementById("countValue");
let warningBox = document.getElementById("warningBox");


// Event listener for typing into the comment box
document.getElementById("Message").addEventListener("keyup", updateCount);

// Function to update the count with each keyup event
function updateCount() {
  // Set the warning box to an empty text string 
  warningBox.innerHTML = "";

  // Count the number of characters in the comment box
  let commentText = document.getElementById("Message").value;
  let charCount = countCharacters(commentText);

  try {
    // Check if the character count exceeds the limit
    if (charCount > MAX_REVIEW) {
      // Throw an exception if the limit is exceeded
      throw new Error("You have exceeded the character count limit");
    }
    // Display the character count
    wordCountBox.innerHTML = charCount;
  } catch (error) {
    // Display the error message within the innerHTML of the warningBox
    warningBox.innerHTML = error.message;
  } finally {
    // Whether the exception is thrown or not, change the innerHTML of the wordCountBox
    // object to the value of the charCount variable.
    wordCountBox.innerHTML = charCount;
  }

}


/*=================================================================*/
// Function to count the number of characters in a text string
function countCharacters(textStr) {
  let commentregx = /\s/g;
  let chars = textStr.replace(commentregx, "");
  return chars.length;
}

/*----------- End of form message counter -----------*/

/*----------- validate form -----------*/
let Name;
let Email;
let Phone;
let Message;
function validateForm() {
  Name = document.getElementById("Name");
  Email = document.getElementById("Email");
  Phone = document.getElementById("Phone");
  Message = document.getElementById("Message");

  // Validate the form data
  if (!isValidName(Name.value)) {
    alert("Please enter a valid name (no numbers allowed).");
    Name.focus();
    /*setTimeout(function() {
      Name.focus(); // Set focus to the Name field
    }, 0);*/
    return false; // Stop form submission
    
  }

  if (Email.value.trim() === "") {
    alert("Please enter a valid Email.");
    return false; // Stop form submission
  }

  // Validate the phone number
  if (!isValidPhoneNumber(Phone.value)) {
    alert("Please enter a valid phone number in the format 123-456-7890");
    Phone.focus();
    return false; // Stop form submission
  }

  if (Message.value.trim() === "") {
    alert("Please enter your message ");
    Message.focus();
    return false; // Stop form submission
  }

  // If all validations pass, allow the form to be submitted
  return true;
}

function isValidPhoneNumber(phone) {
  // Check if the phone number matches the pattern "123-456-7890"
  const phonePattern = /^\d{3}-\d{3}-\d{4}$/;

  if (!phone.match(phonePattern)) {
    // If not, try to format and validate
    const formattedPhone = formatPhoneNumber(phone);
    
    if (!formattedPhone || !formattedPhone.match(phonePattern)) {
      return false;
    }
    
    // Update the phone input value with the formatted version
    document.getElementById("Phone").value = formattedPhone;
  }

  return true;
}

function formatPhoneNumber(phone) {
  // Remove non-numeric characters
  const numericPhone = phone.replace(/\D/g, "");

  // Check if the numericPhone has 10 digits
  if (numericPhone.length === 10) {
    // Format the phone number as "123-456-7890"
    return `${numericPhone.substr(0, 3)}-${numericPhone.substr(3, 3)}-${numericPhone.substr(6)}`;
  }

  return null;
}
function isValidName(name) {
  // Check if the name contains only letters (no numbers allowed)
  //const namePattern = /^[A-Za-z]+$/;

  // Allow white spaces in the name
  const namePattern = /^[A-Za-z\s]+$/;
  
  return namePattern.test(name);
}
/*----------- End of form validation -----------*/