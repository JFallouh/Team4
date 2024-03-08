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



/*----------- Search input -----------*/
// Event listener for page reload

document.onload = function () {
  clearHighlight();
};
$(window).on('load', function () {
  clearHighlight();
});
// Event listener for page reload
  window.onload = function () {
    clearHighlight();
  };
$(document).ready(function () {
  // Check if there's a previous search term in local storage
  var previousSearchTerm = localStorage.getItem('searchTerm');
  if (previousSearchTerm) {
    highlightText(previousSearchTerm);
  }

  // Function to highlight text based on user input
  $('#NavSearch').on('keypress', function (event) {
    // Check if the Enter key was pressed (key code 13)
    if (event.which === 13) {
      var searchText = $(this).val().trim();

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
        var content = this.nodeValue;
        var regex = new RegExp('(' + searchText + ')', 'ig');
        var highlightedContent = content.replace(regex, '<span class="highlight">$1</span>');
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
