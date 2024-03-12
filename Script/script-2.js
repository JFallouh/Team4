/********** Case Study 2: Two Functions **********/

//like validation
let interacted = false;


//likes incrementation function

    //selects and adds event listeners to every like button
    document.querySelectorAll('.like-button').forEach(function(button) {
        button.addEventListener('click', function() {
    
        //detects span element containing likes counter that is closest to the likes button event being activated, i.e. when the button is clicked (click event), the parent node (div) is searched for the number/character in the likes class, allowing likespan to reference the counter variable 
        if (!interacted) {
        let likesSpan = this.parentNode.querySelector('.likes');
    
        //likespan then holds the textContent (counter), parses it and increments it
        likesSpan.textContent = parseInt(likesSpan.textContent) + 1;
        
        //interaction update
        interacted = true;
        } else {
            alert('You can only like or dislike once.');
        }

        });
    }); //end function
    
    // same as above but for dislikes
    document.querySelectorAll('.dislike-button').forEach(function(button) {
        button.addEventListener('click', function() {
        
        if (!interacted) {
        let dislikesSpan = this.parentNode.querySelector('.dislikes');
        dislikesSpan.textContent = parseInt(dislikesSpan.textContent) + 1;
        interacted = true;
        } else {
            alert('You can only like or dislike once.');

        }
        });
    }); //end function
    
    
        /********** Case Study 3: Array + Loop **********/
    
    //initializes an array with existing comments
    let comments = [
        { name: "John Doe", date: "2024-03-08", comment: "What a great article." },
        { name: "Jane Smith", date: "2024-03-08", comment: "I've read better" },
        { name: "Thunderman", date: "2024-03-08", comment: "UwU" },
        { name: "Bobby Hill", date: "2024-03-08", comment: "This is a placeholder." },
        { name: "Hank Hill", date: "2024-03-08", comment: "beep boop beep." }
    ];
    
    //adds comment and date to the to the array
    function addComment(name, comment) {
        let currentDate = new Date().toISOString().slice(0, 10); // gets current date
    
        // pushes elements to the end of the array
        comments.push({ name: name, date: currentDate, comment: comment });
    
        //updates the array
        updateComments(); 
    } //end function
    
    //comment update function, essentially updates what the user sees in the box
    function updateComments() {
        let commentList = document.getElementById('commentList');
    
        //flushes html content
        let html = '';
    
        //for-loop that iterates through the array adding comments + formatting and concatenated content
        for (var counter = 0; counter < comments.length; counter++) {
    
            //instantiation of comment id, names, text, posted date and all of them concatenated
            let comment = comments[counter];
            let nameElement = '<strong style="color: #277DFD;">' + comment.name + '</strong>'; // styling to match website theme
            let commentText = '<div>' + comment.comment + '</div>'; // comment property of comment object
            let postedOn = '<span class="text-muted float-end">Posted on ' + comment.date + '</span>'; //styling to make the posted on + date grey/less intrusive
            let listItem = '<li class="list-group-item">' + nameElement + '<br>' + commentText + postedOn + '</li>';
            //attaches listItem to HTML variable
            html += listItem;
    
        }//end for loop
    
        //sets commentlist innerhtml to the new content
        commentList.innerHTML = html;
    
    }//end function
    
    //calls the updatecomments function independently when the page loads so that the array will actually appear
    updateComments();
    
    
    
    //warning pop up if one of the fields is empty
    function displayMissingFieldsWarning() {
        alert("Please fill in all fields before submitting your comment.");
    }
    
    //event listener
    document.getElementById('commentForm').addEventListener('submit', function(event) {
        //prevents form from being submitted
        event.preventDefault(); 
        // intatiates nameinput value and removes trailing whitespace
        let nameInput = document.getElementById('nameInput').value.trim();
        // intatiates commentinput value and removes trailing whitespace
        let commentInput = document.getElementById('commentInput').value.trim();
    
        //if else statement that calls displayMissingFieldsWarning
        if (nameInput !== '' && commentInput !== '') {
            //adds comment to array
            addComment(nameInput, commentInput); 
    
            //clears fields
            document.getElementById('nameInput').value = '';
            document.getElementById('commentInput').value = '';
        } else {
            //calls warning
            displayMissingFieldsWarning();
        } //end if else
    }); //end event listenere

// character limit validation

/*----------- Character limit validation -----------*/
/* stolen from James' code */

const MAX_REVIEW = 1000;
document.getElementById("charCount").innerHTML = `0 / ${MAX_REVIEW}`;

let wordCountBox = document.getElementById("charCount");
let warningBox = document.createElement("div");
warningBox.className = "text-danger";

document.getElementById("commentForm").appendChild(warningBox);

document.getElementById("commentInput").addEventListener("input", updateCount);

function updateCount() {

  warningBox.innerHTML = "";


  let commentText = document.getElementById("commentInput").value;
  let charCount = countCharacters(commentText);


  wordCountBox.innerHTML = `${charCount} / ${MAX_REVIEW}`;

  if (charCount > MAX_REVIEW) {

    warningBox.innerHTML = "You have exceeded the character count limit";
  }
}


function countCharacters(textStr) {
  let commentregx = /\s/g;
  let chars = textStr.replace(commentregx, "");
  return chars.length;
}