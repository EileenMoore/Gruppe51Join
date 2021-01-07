/**
 * This function is used to upload a profile picture from the file-inputfield and display it in the sign-up window.
 */
window.addEventListener("load", function() {
    document
        .querySelector('input[type="file"]')
        .addEventListener("change", function() {
            if (this.files && this.files[0]) {
                image = document.getElementById("myImg"); // $('img')[0]
                image.src = URL.createObjectURL(this.files[0]); // set src to blob url
                getCanvas(image);
            } else {
                profilePictureAsDataURL = "img/profileimg/nutzer.svg";
            }
        });
});

/**
 * This function creates a canvas for the image and converts it to an URL.
 */
function getCanvas(image) {
    let imgCanvas = document.createElement("canvas"),
        imgContext = imgCanvas.getContext("2d");

    imgCanvas.width = image.width;
    imgCanvas.height = image.height;
    imgContext.drawImage(image, 0, 0, image.width, image.height);
    profilePictureAsDataURL = imgCanvas.toDataURL("image/png");
}