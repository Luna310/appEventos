
function login() {
    // https://firebase.google.com/docs/auth/web/google-signin
    
    // Provider
    var provider = new firebase.auth.GoogleAuthProvider();

    // How to Log In
    firebase.auth().signInWithPopup(provider);

    console.log("login");

}


function writeNewPost() {

    // https://firebase.google.com/docs/database/web/read-and-write

    // Values
    var text = 
		//mensaje//
    var userName = 
		// funcion de firebase//

    // A post entry
    
    var post = {
        name: userName,
        text: text  
    };

    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('torneo1').push().key;

    //Write data
    var updates = {};
    updates[newPostKey] = post;
    
    return firebase.database().ref('torneo1').update(updates);
   
    
}


function getPosts() {

     firebase.database().ref('torneo1').on('value', function (data) {
         
         //div donde esta mi sala de chat
         var posts = document.getElementById("posts");
         
		 
         posts.innerHTML = "";

         var messages = data.val();

         for (var key in messages) {
             var text = document.createElement("div");
             var element = messages[key];

             text.append(element.text);
             posts.append(text);
         }

     })

    console.log("getting posts");

}