// TO DO:
//  - change 'Create Post' button to 'Edit Post'
//  - add 'Cancel Edit' button to display during editing
//  - create a post class for reusability


let form = document.getElementById("form");
let input = document.getElementById("input");
let postTitle = document.getElementById("postTitle");
let msg = document.getElementById("msg"); // error message next to the "Create Post" button
let posts = document.getElementById("posts");
let leftColTitle = document.getElementById("leftColTitle");
let postBtn = document.getElementById("postBtn");

let currentPost = null;

let editing = false;

// 'data' is an object which will store the user's input
let data = {};

// form submission event listener
form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log('button clicked.');

    formValidation();
});


// form input validation
function formValidation(){
    if (input.value === ""){
        msg.innerHTML = "Post cannot be blank";
        console.log("Form input approval failed...");
    }
    else {
        console.log("form input approved for posting...");
        msg.innerHTML = "";
        acceptData();
    }   
};

// 'acceptData() collects information from the input and stores them in the 'data' object
function acceptData(){
    data["text"] = input.value;
    data["postTitle"] = postTitle.value;
    console.log(`Data has been collected:`, data);
    createPost();
};

// creates a 'post' div element and appends it to the 'posts' div
function createPost(){

    const currentDateTime = new Date().toLocaleString();

    if(!editing){
        posts.innerHTML += `
        <div>
            <hr>
            <h3>${data.postTitle}<br>${currentDateTime}</h3>
            <p>${data.text}</p>
            <span class="options">
            <i onClick="editPost(this)" class="fas fa-edit"></i>
            <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
            </span>
            <br>
        </div>
        `;
    }
    else{
        currentPost.innerHTML = input.value;
        setPostFormatting(currentPost, normal)
    }
    // this is a shit show, fix it
    input.value = "";
    postTitle.value = "";
    currentPost = null;
    checkEditingStatus()
    editing = false;
    checkEditingStatus()
};

// 'e' is the trash can element, so we are accessing its parent element (aka, "the post")
function deletePost(e) {
    if(e === currentPost){
        editing = false;
        input.value = "";
        postTitle.value = "";
        currentPost = null;
        checkEditingStatus();
    }
    e.parentElement.parentElement.remove();
}

function editPost(e) {
    let postElement = e.parentElement.previousElementSibling; // get the post that is being edited
    leftColTitle.textContent = "Edit a Post";
    postBtn.textContent = "Edit Post";

    // user clicked edit on the post that is already being edited
    if(postElement === currentPost){
        editing = false;
        normal = true;
        console.log("Editing the same post...");
        setPostFormatting(currentPost, normal)
        input.value=""
        currentPost = null;
    }
    else{
        // if we're editing a new post, we want to revert the formating from old post that we were editing
        if(currentPost != null){
            normal = true;
            setPostFormatting(currentPost, normal)
        }
        editing = true;
        normal = false;
        console.log("Editing a new post...");
        currentPost = postElement; // establish the new 'currentPost'
        var text = postElement.innerHTML; // assign the text from the post

        input.value = text; // display the text in the 'create a post' box
        setPostFormatting(postElement, normal)
    }

    checkEditingStatus()
}

// formats a post to display as normal or in the 'edit' state
function setPostFormatting(_post, _normal){
    if(_normal){
        _post.style.color="#000";
        _post.style.fontStyle = "normal";
    }
    else{
        _post.style.color="#d9dadb";
        _post.style.fontStyle = "normal";
    }
}

function checkEditingStatus(){
    if(editing){
        leftColTitle.textContent = "Edit a Post";
        postBtn.textContent = "Edit Post";
    }
    else{
        leftColTitle.textContent = "Create a New Post";
        postBtn.textContent = "Create Post";
    }
}