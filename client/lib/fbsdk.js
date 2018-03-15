function statusChangeCallback(response) {
  console.log("statusChangeCallback");
  console.log(response);
  if (response.status == "connected") {
    axios({
      method: 'post',
      url: 'http://localhost:3000/login',
      data: {
        access_token: response.authResponse.accessToken
      }
    }).then(function(response) {
      // if(response)
      console.log(response)
    })
    // testAPI(response);
  } else {
    document.getElementById("status").innerHTML =
      "Please log " + "into this app.";
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId: "2080527332166732",
    autoLogAppEvents: true,
    xfbml: true,
    version: "v2.12"
  });
};

(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src =
    "https://connect.facebook.net/id_ID/sdk.js#xfbml=1&version=v2.12&appId=2080527332166732&autoLogAppEvents=1";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

function testAPI(responsesuccess) {
  console.log("Welcome!  Fetching your information.... ");
  FB.api("/me", { fields: ["name", "email"] }, function(response) {
    console.log(responsesuccess)
    console.log(response)
    console.log("Successful login for: " + response.name);
    document.getElementById("status").innerHTML =
      "Thanks for logging in, " + response.name + "!";
  });
}
