FB.getLoginStatus(function(response) {
    console.log('here')
    statusChangeCallback(response);
});
