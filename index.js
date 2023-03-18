var _status;

function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
  _status =  response.status
  console.log(response)
  if (_status === 'connected') {   // Logged into your webpage and Facebook.
    testAPI();  
    setDisplay(true);
  } else {    
    setDisplay(false);
  }
}

function setDisplay(isSignedIn) {
  console.log(isSignedIn);

  var setNavLoginText = function() {
    var login         = document.querySelector('.login-logout')
    var loginText     = (isSignedIn) ? 'Sign Out' : 'Sign In';
    login.textContent = loginText;

  }

  var setProfileDisplay = function() {
    var profile    = document.getElementById('profile')
    var action     = (isSignedIn) ? 'remove' : 'add';
    profile.classList[action]('hidden')
  }

  var setFbLoginDisplay = function() {
      var fbLogin    = document.getElementById('facebook-login')
      var fbPrompt   = document.getElementById('sign-in-prompt')
      var action     = (isSignedIn) ? 'add' : 'remove';
      fbLogin.classList[action]('hidden')
      fbPrompt.classList[action]('hidden')
  }

  setNavLoginText();
  setProfileDisplay();
  setFbLoginDisplay();
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
  var fbFields = 'first_name,last_name,email,picture.type(large),location,link'
  FB.api('/me', {fields: fbFields}, function(response) {
    displayProfile(response);
  });
}

function displayProfile(data) {
  console.log(data)
  var profile         =  document.getElementById('profile');
  var profilePicture  = document.getElementById('profile-picture');
  var name            = document.getElementById('name');
  var email           = document.getElementById('email');
  var emailLink       = document.getElementById('email-link');
  var fbLink          = document.getElementById('fb-link');
  var location        = document.getElementById('location');

  profilePicture.src      = data.picture.data.url;
  name.innerHTML          = data.first_name + ' ' + data.last_name;
  location.innerHTML      = data.location.name;
  email.innerHTML         = data.email;
  email.href              = 'mailto:' + data.email;
  emailLink.href          = 'mailto:' + data.email;
  fbLink.href             = data.link
}
