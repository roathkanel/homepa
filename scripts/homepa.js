 $(document).ready(function() {
    // When user press mouse down event, add the class to change CSS appearance.
    var objButtons = $("#PrevBut, #NextBut, #ToggleSlideBut, #PrintButton, #LinkButton");

    // Set variable of auto play status to false as the default status.
    let isAutoPlay = false;
    // Define the variable to hold the number of interval ID return by
    // setInterval function.
    let intervalID = 0;
    // Set variable of image to the beginning of an index.
    // Check HTML file for img id PhotoPreview src value and set an 
    // index value match with pre-define image source..
    let currentImageIndex = 2;
    // Get the total amount of in image collection.
    const totalImages = $('#PhotoCollection img').length;
    // Array of text description for each image.
    var arrPhotoDescriptions = [
        // First photo.
        'Eagle view from the second floor, front house to an internal living area ' + 
        'of Borey Vimean Phnom Penh (BVPP) Project No 9.',
        // Second photo.
        'Located at the corner of the street, easy for you do business or ' + 
        'has some plenty of space for parking.',
        // Third photo.
        'Corner, wide parking space, wide street and located in the ' +
        'center of an area, provide comfortable situation for you to live ' +
        'and doing business.',
        // Fourth photo.
        'View from back to the front house along the road. Locate at the ' +
        'corner of the street.',
        // Fifth photo.
        'View from the side of the house. Additional space available at ' + 
        'the back of the house.',
        // Sixth photo.
        'Ten meters wide of the road along the house which is ease of ' +
        'transportation within the living area.',
        // Seven photo.
        'Wide porch on the first floor is the place for you to relax ' +
        'when you stay at home.',
        // Eight photo.
        'Located in the center of living area and has many services provided ' +
        'near your location.',
        // Nine photo.
        'A blocked of shop house has many type of small business waiting ' +
        'to provided a services for you.',
        // Ten photo.
        'Looking at the back direction of the house, the road is very ' +
        'wide and has difference type of shops.',
        // Elevent photo.
        'Eight meters wide of the road in front of the house.',
        // Twelve photo.
        'Security service provided 24 by 7 (with a small amount of monthly ' +
        'payment with Borey).',
        // Thirdteen photo.
        'Wide guest room at the ground floor, provide a comfortable living condition.',
        // Fourteen photo.
        'Curtain setup at the family room (first floor), provide a comfortable ' +
        'living condition and personal privacy.',
        // Fifteen photo.
        'Wide space of rest room. Water and electricity is provided 24 by 7.',
        // Sixteen photo.
        'Entertaining room at the 2nd floor.',
        // Seventeen photo.
        'Two rooms are available on the 2nd floor.',
        // Eighteen photo.
        'Beautiful ladder and sturdy handrail provide as a secure tool to protect ' +
        'your family members when move up or down to a difference floor.',
        // Nineteen photo.
        'One large area of kitchen and additional space behind the house.'
    ];
    // Load the default photo description.
    $('#PhotoDesText').text(arrPhotoDescriptions[currentImageIndex]);

    // Load text description for each photo when user print to printer
    // friendly version.
    $('.PCAllFlexItems').each(function(currentImageIndex) {
        $(this).find('.TextDesForPrint').text(arrPhotoDescriptions[currentImageIndex]);
    }); // end of looping each function.
        
    objButtons.mousedown(function(){
        $(this).addClass('ButtonDown');
    }); // end of mouse down event.

    objButtons.mouseup(function() {
        $(this).removeClass('ButtonDown');
    }); // end of mouse up event.

    objButtons.mouseout(function() {
        $(this).removeClass('ButtonDown');
    }); // end of mouse out event.

    // Change preview photo based on user clicked. 
    $('#PhotoCollection img').click(function(evt) {
        evt.preventDefault();
        // Get the selected image path when user click on the photos thumbnail.
        var selectedImage = $(this).attr('src');
        // Show selected image to the preview area.
        $('#PhotoPreview').attr('src', selectedImage);
        // Get index of the click image.
        currentImageIndex = $('#PhotoCollection img').index(this);
        // Load the text description of the relevant photo.
        $('#PhotoDesText').text(arrPhotoDescriptions[currentImageIndex]);
    }); // end of image selection clicking event.

    // Toggle event for slide show automatically and manual navigation.
    $('#ToggleSlideBut').click(function() {
        // Switch auto play status based on the current status.
        isAutoPlay = !isAutoPlay; // If true, then become false, if false then become true.
        if (isAutoPlay) {
            // Remove the class of button apperance and change the label of the button.
            $('#ToggleSlideBut').addClass('ToggleSlideButActive');
            $('#ToggleSlideBut').val("Stop Slide Show");
            // Disable previous and next button.
            $('#PrevBut').attr('disabled', true);
            $('#NextBut').attr('disabled', true);

            // If auto play is true, then start the slide show.
            intervalID = setInterval(function() {
                // Call function of moving to next image.
                showNextImage();
            }, 3000); // Adjust the slide show to 3 second only.
        } else {
            // If auto play is false, Stop automatic slide show.
            setTimeout(function() { clearInterval(intervalID); }, 0); // Fixed.
            // clearInterval(intervalId); // This is original code that is not working.       
            
            // Remove the class of button apperance and change the label of the button.
            $('#ToggleSlideBut').removeClass('ToggleSlideButActive');
            $('#ToggleSlideBut').val("Run Slide Show");
            // Enable previous and next button.
            $('#PrevBut').attr('disabled', false);
            $('#NextBut').attr('disabled', false);
        }
    }); // end of toggle click event.

    // Move to next photo when user manually click on the next button.
    $('#NextBut').click(function() {
        // Call the show next image function.
        showNextImage();
    }); // end of move next click button.

    // Move to previous button when user manually click on the previous button.
    $('#PrevBut').click(function() {
        // Move the current index to the previous position.
        currentImageIndex = (currentImageIndex - 1) % totalImages;
        // Define variable to get the full path of image source.
        const imageUrl = $('#PhotoCollection img').eq(currentImageIndex).attr('src');
        // Load the previous image on the webpage.
        $('#PhotoPreview').attr('src', imageUrl);
        // Load the text description of the relevant photo.
        $('#PhotoDesText').text(arrPhotoDescriptions[currentImageIndex]);
    }); // end of move previous click button.

    // Function to move to next image.
    function showNextImage() {
        // Move the current indext to the next position.
        currentImageIndex = (currentImageIndex + 1) % totalImages;
        // Define variable to get the full path of image source.
        const imageUrl = $('#PhotoCollection img').eq(currentImageIndex).attr('src');
        // Load the next image on the webpage.
        $('#PhotoPreview').attr('src', imageUrl);
        // Load the text description of the relevant photo.
        $('#PhotoDesText').text(arrPhotoDescriptions[currentImageIndex]);
    } // end of function showNextImage.

    // Show the print dialog box.
    $('#PrintButton').click(function() {
        window.print();
    }); // end of print button clicking event.

    // Copy the link of the website to the clip board.
    $('#LinkButton').click(function() {
        var sURL = "https://roathkanel.github.io/homepa";
                            
        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(sURL)
                .then(function() {
                    alert(sURL + " has been copied to clipboard. Open any web browser and paste this URL to access to the website.");
                })
                .catch(function(err) {
                    alert('Failed to copy text with Clipboard API', err);
                    copyLinkButtonFallBackMethod(sURL);
                });
        } else {
                copyLinkButtonFallBackMethod(sURL);
        }
    }); // end of link button clicking event.

    function copyLinkButtonFallBackMethod(text) {
        var textArea = document.createElement("textarea");
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert("This website URL (" + text + ") has been copied to clipboard. Use the PASTE function to share this URL with other people.");
    }

 }); // end of document ready.