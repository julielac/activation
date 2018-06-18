---
title: Vote in the 2018 My LA2050 Activation Challenge
canonical_url: /
body_class: tangerine
---

{% if site.phase != 6 and site.voting_test_mode != true %}

# Oops!

<div class="introduction" markdown="1">
This page couldn’t be found.

You may want to visit our [home page](/) instead.
</div>

{% else %}

<div class="introduction" markdown="1">

<h2 style="max-width: none; text-align: center; font-size: 2.5em;">Please check your phone</h2>

We sent a text message to your phone number with a verification code. <span style="display: inline-block;">Please enter it here.</span>

<form action="/vote/sms-sent/" method="get">
<input type="hidden" name="learn" />
<input type="hidden" name="create" />
<input type="hidden" name="play" />
<input type="hidden" name="connect" />
<input type="hidden" name="live" />
<input type="hidden" name="telephone" />
<input type="hidden" name="zip" />

<p style="font-size: 1em">
  <label>
    <span class="label-text">Verification Code</span>
    <input type="text" pattern="[0-9]*" inputmode="number" placeholder="Verification Code" name="verification_code" required="required" autofocus="autofocus" />
  </label>
  <button type="submit">Submit</button>
</p>
</form>

<h3 style="max-width: none; text-align: center; margin-bottom: 0;" id="headline"></h3>
<p style="margin-top: 0"><small><span id="message-details"></span> <span id="resend" style="display: none"><a href="#resend">get a new verification code</a>.</span></small></p>

<style>
.promotion {
	display: none;
}
form input[type="text"] {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  font-weight: 600;
  padding: 0.75em;
  border-radius: 0;
  max-width: none;
  box-sizing: border-box;
  text-align: center;
  border: 0.1875em solid rgb(237, 59, 136); /* @strawberry */
  border-color: rgba(0, 0, 0, 0.25);

  /* Remove Safari’s default styles for search fields */
  -webkit-appearance: none;
}
@media (max-width: 25em) {
  form button,
  form input[type="text"] {
    width: 100%;
    max-width: none;
  }
}

/* OPTIONAL: Hide redundant label text */
form .label-text {
  position: absolute;
  left: -9999px;
}
</style>

</div>



<script>

  // http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript#answer-901144
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }


  var form = document.querySelector('form');

  var fieldNames = ['learn', 'create', 'play', 'connect', 'live'];
  var nextValue;
  for (var index = 0; index < fieldNames.length; index++) {
    nextValue = getParameterByName(fieldNames[index]);
    if (nextValue) {
      form.querySelector('input[name="' + fieldNames[index] + '"]').value = nextValue;
    }
  }

  form.querySelector('input[name="zip"]').value = getParameterByName('zip');
  form.querySelector('input[name="telephone"]').value = getParameterByName('telephone');

</script>

<script src="{{ site.auth0_js_url }}"></script>
<script>
  window.AUTH0_DOMAIN    = '{{ site.auth0_domain }}',
  window.AUTH0_CLIENT_ID = '{{ site.auth0_client_id }}'
</script>

<script>
  function showSaveMessage(err) {
    document.getElementById('headline').textContent = 'Saving your votes…'
    button.style.visibility = 'hidden'
  }

  function showErrorMessage(message) {
    console.log('showErrorMessage: ' + message)

    if (message === "Wrong phone number or verification code.") {
      message = "That verification code isn’t correct or may have expired. Please try entering it again or"    
      document.getElementById('resend').style.display = 'inline'
    }

    if (message === "Invalid request body. All and only of client_id, credential_type, username, otp, realm are required.") message = "Please enter the verification code that we sent you."

    document.getElementById('headline').textContent      = 'Oops! Something went wrong'
    document.getElementById('message-details').textContent = message

    // form.action = '/vote/form/'
    // form.method = 'get'
    // button.style.visibility = 'visible'
    // button.textContent = 'Start over'

    // if (saveTimeout) clearTimeout(saveTimeout)
  }

  // var saveTimeout
  // function refreshTimeout() {
  //   if (saveTimeout) clearTimeout(saveTimeout)
  //   saveTimeout = setTimeout(function() {
  //     showErrorMessage('The sign in process timed out.')
  //   }, 5000)
  // }

  function submit(form, options){
    console.log('submit form');

    var telephone = document.querySelector('input[name="telephone"]').value;
    var verificationCode = document.querySelector('input[name="verification_code"]').value;

    if (!telephone) {
      showErrorMessage("Please try voting again.");
      return; 
    }

    var fieldNames = ['learn', 'create', 'play', 'connect', 'live'];
    var votesData = [];
    var nextField;
    for (var index = 0; index < fieldNames.length; index++) {
      nextField = form.querySelector('input[name="' + fieldNames[index] + '"]');
      if (nextField) {
        votesData.push(fieldNames[index] + '=' + encodeURIComponent(nextField.value));
      } else {
        console.log('skipped: ' + fieldNames[index]);
      }
    }

    if (votesData.length < 1) {
      console.error('No items were voted for');
      showErrorMessage("Please try voting again.");
      return;
    }

    var zip = document.querySelector('input[name="zip"]').value;
    if (!zip || zip == '') {
      console.log('No zip code')
    }

    votesData.push('zip=' + encodeURIComponent(zip));

    votesData.push('telephone=' + encodeURIComponent(telephone));

    console.dir(votesData);

    var redirectUri = window.location.origin + '/vote/authenticated/?' + votesData.join('&');
    console.log('redirectUri: ' + redirectUri);

    console.log("telephone: " + telephone.replace(/\-/g, '').replace(/\s/g, ''))
    console.log("verificationCode: " + verificationCode)

    var webAuth = new auth0.WebAuth({
      domain: window.AUTH0_DOMAIN,
      clientID: window.AUTH0_CLIENT_ID,
      // responseMode: 'form_post',
      responseType: 'token'
    });

    if (options && options.resend) {
      webAuth.passwordlessStart({
        connection: 'sms',
        send: 'code',
        phoneNumber: telephone.replace(/\-/g, '').replace(/\s/g, ''),
        redirectUri: redirectUri
      }, function (err,res) {
        if (err) {
          // Handle error
          showErrorMessage(err.errorDescription || err.description)

          console.log('err');
          console.log(err)
          console.dir(err)
        } else {
          // form.action = '/vote/sms-sent/';
          // form.method = 'get';

          console.log('res');
          console.log(res)
          console.dir(res)

          form.submit();
        }

      });
    } else {

      webAuth.passwordlessLogin({
          connection: 'sms',
          phoneNumber: telephone.replace(/\-/g, '').replace(/\s/g, ''),
          verificationCode: verificationCode,
          redirectUri: redirectUri
        }, function (err,res) {
          if (err) {
            // Handle error
            showErrorMessage(err.errorDescription || err.description)

            console.log('err');
            console.log(err)
            console.dir(err)
          } else {

            console.log('res');
            console.log(res)
            console.dir(res)

            // form.action = form.action + '?' + votesData.join('&');
            // form.submit();
            // document.querySelector('.introduction').style.display = 'block';
            // document.querySelector('form').style.display = 'none';
          }


        }
      );
    }
  }

  document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    submit(e.target);
  })

  document.querySelector('a[href="#resend"]').addEventListener('click', function(e) {
    e.preventDefault();
    submit(form, { resend: true });
  })

</script>

{% endif %}
