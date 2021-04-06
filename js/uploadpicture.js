/**
 * This function is used to upload a profile picture and display it on a canvas.
 * 
 * 
 * @param {string} input - The profile picture.
 */
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.addEventListener("load",function() {
        let profileImg = new Image();
        let src = reader.result;
        profileImg.src = src;
        profilePictureAsDataURL = src;
        profileImg.onload = function() {
          let c = document.getElementById("newProfilePicture");
          let ctx = c.getContext("2d");
          ctx.canvas.width = profileImg.width;
          ctx.canvas.height = profileImg.height;
          
          ctx.drawImage(profileImg, 0, 0);
        };
      },
      false
    );

    reader.readAsDataURL(input.files[0]);
    showNewProfilePicture();
    hideOldProfilePicture();
  }
}

/**
 * This function displays the new profile picture in the signup box.
 */
function showNewProfilePicture() {
    document.getElementById('newProfilePicture').classList.remove('d-none');
}

/**
 * This function hides the standard profile picture in the signup box.
 */
function hideOldProfilePicture() {
    document.getElementById('standardProfilePicture').classList.add('d-none');
}
