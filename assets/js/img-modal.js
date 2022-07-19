"use strict";

(function() {
    // Get the modal
    let modal = document.getElementById("resumeModal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    let img = document.getElementById("resumeImg");
    let modalImg = document.getElementById("img0");
    let captionText = document.getElementById("resumeCaption");
    img.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    }

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    if (modal.style.display != "none") {
        document.keydown(function(e) {
            var code = e.keyCode || e.which;
            if (code == 27) 
                modal.style.display = "none";
        });
    }

});