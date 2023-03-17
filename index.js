var _status;

function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
  console.log('statusChangeCallback');
  _status =  response.status
  console.log(response)
  if (_status === 'connected') {   // Logged into your webpage and Facebook.
    testAPI();  
  } else {                                 // Not logged into your webpage or we are unable to tell.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this webpage.';
  }
}

function checkLoginState() {               // Called when a person is finished with the Login Button.
  FB.getLoginStatus(function(response) {   // See the onlogin handler
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '524842146472555',
    cookie     : true,                     // Enable cookies to allow the server to access the session.
    xfbml      : true,                     // Parse social plugins on this webpage.
    version    : 'v16.0'           // Use this Graph API version for this call.
  });

  FB.getLoginStatus(function(response) {   // Called after the JS SDK has been initialized.
    statusChangeCallback(response);        // Returns the login status.
  });
};

function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', {fields: 'first_name,last_name,email,picture,phone'}, function(response) {
    displayProfile(response);
    console.log('Successful login for: ' + response.name);
  });
}

function displayProfile(data) {
  console.log(data)
  var profilePicture  = document.getElementById('profile-picture');
  var name            = document.getElementById('name');
  var email           = document.getElementById('email');
  var fbLink          = document.getElementById('fb-link');
  profilePicture.src  = data.picture.data.url;
  name.innerHTML      = data.first_name + ' ' + data.last_name;
  email.innerHTML     = data.email;
  email.href          = 'mailto:' + data.email;

}
