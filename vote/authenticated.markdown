---
title: Vote in the 2018 My LA2050 Activation Challenge
canonical_url: /
body_class: banana
---

{% if site.phase != 6 and site.voting_test_mode != true %}

# Oops!

<div class="introduction" markdown="1">
This page couldn’t be found.

You may want to visit our [home page](/) instead.
</div>

{% else %}

<div class="introduction">

<h2 style="max-width: none; text-align: center; font-size: 2.5em;" id="headline">It’s time to submit your votes</h2>

<p id="message" style="visibility: hidden">We couldn’t confirm your votes. <a href="{{ site.vote_url }}">Please try again</a>.</p>
<p><small id="message-details"></small></p>

<form name="vote_authenticated" action="/vote/survey/" method="post" data-netlify="true">

<input type="hidden" name="learn" />
<input type="hidden" name="create" />
<input type="hidden" name="play" />
<input type="hidden" name="connect" />
<input type="hidden" name="live" />

<input type="hidden" name="email" />
<input type="hidden" name="telephone" />
<input type="hidden" name="social_network" />

<input type="hidden" name="zip" />
<input type="hidden" name="subscribe_email_list" />

<input type="hidden" name="auth_sub" />

<input type="hidden" name="auth_error" />
<input type="hidden" name="auth_error_description" />

<input type="hidden" name="browser_unique_id" />
<input type="hidden" name="browser_user_agent" />

<p class="action"><button type="submit">Submit votes</button></p>

</form>

<style>
.promotion {
  display: none
}
</style>

</div>

{% if site.voting_strict_mode == false %}
<script>
  window.VOTING_SAVE_ON_ERROR = true
</script>
{% endif %}

<script>
  // http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript#answer-901144
  function getParameterByName(name, url) {
    if (!url) url = window.location.href
    name = name.replace(/[\[\]]/g, "\\$&")
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, " "))
  }

  var form = document.querySelector('form')
  var button = form.querySelector('button')

  var fieldNames = ['learn', 'create', 'play', 'connect', 'live']
  var nextValue
  for (var index = 0; index < fieldNames.length; index++) {
    nextValue = getParameterByName(fieldNames[index])
    if (nextValue) {
      form.querySelector('input[name="' + fieldNames[index] + '"]').value = nextValue
    }
  }
  form.querySelector('input[name="email"]').value = getParameterByName('email')
  form.querySelector('input[name="telephone"]').value = getParameterByName('telephone')
  form.querySelector('input[name="social_network"]').value = getParameterByName('social_network')

  form.querySelector('input[name="zip"]').value = getParameterByName('zip')
  form.querySelector('input[name="subscribe_email_list"]').value = getParameterByName('subscribe_email_list')

  form.querySelector('input[name="browser_user_agent"]').value = navigator.userAgent

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  function getUniqueID() {
    // https://stackoverflow.com/questions/1117584/generating-guids-in-ruby#answer-1126031
    // https://gist.github.com/emacip/b28ba7e9203a38d440e23c38586c303d
    // >> rand(36**8).to_s(36)
    // => "uur0cj2h"
    return getRandomInt(0, Math.pow(36, 8)).toString(36)
  }

  var uniqueID = 'unknown'
  try {
    if (!localStorage.getItem('browser_unique_id') || localStorage.getItem('browser_unique_id') === '') {
      uniqueID = getUniqueID()
      localStorage.setItem('browser_unique_id', uniqueID)
    }
    uniqueID = localStorage.getItem('browser_unique_id')
  } catch(e) {}

  form.querySelector('input[name="browser_unique_id"]').value = uniqueID
</script>


<script src="{{ site.auth0_js_url }}"></script>
<script>
  window.AUTH0_DOMAIN    = '{{ site.auth0_domain }}',
  window.AUTH0_CLIENT_ID = '{{ site.auth0_client_id }}'
</script>

<script>
  var webAuth = new auth0.WebAuth({
    domain: window.AUTH0_DOMAIN,
    clientID: window.AUTH0_CLIENT_ID,
  })
</script>

<script>
  function showSaveMessage(err) {
    document.getElementById('headline').textContent = 'Saving your votes…'
    button.style.visibility = 'hidden'
  }

  function showErrorMessage(message) {
    console.log('showErrorMessage')

    document.getElementById('headline').textContent      = 'Oops! Something went wrong'
    document.getElementById('message').style.visibility = 'visible'

    if (message === "`state` does not match.") message = "This error may happen if you switch to a different phone, computer, or web browser during the sign in process."

    if (message === "Wrong email or verification code.") message = "This email link has expired."

    if (message === "No verifier returned from client.") {
      message = "This error may happen if your web browser blocks third party cookies."
    }

    var emailPresent = (document.querySelector('input[name="email"]').value &&
                        document.querySelector('input[name="email"]').value != "")
    var phonePresent = (document.querySelector('input[name="telephone"]').value &&
                        document.querySelector('input[name="telephone"]').value != "")

    if (emailPresent || phonePresent) {
      document.querySelector("#message a").addEventListener('click', function(e) {
        if (window.retrySignIn) {
          window.retrySignIn(e)
        }
      })
    }

    document.getElementById('message-details').textContent = message

    // form.action = '/vote/form/'
    // form.method = 'get'
    // button.style.visibility = 'visible'
    // button.textContent = 'Start over'

    if (saveTimeout) clearTimeout(saveTimeout)
  }

  var saveTimeout
  function refreshTimeout() {
    if (saveTimeout) clearTimeout(saveTimeout)
    saveTimeout = setTimeout(function() {
      showErrorMessage('The sign in process timed out.')
    }, 5000)
  }

  function authenticate(authResult) {
    webAuth.client.userInfo(authResult.accessToken, function(err, user) {
      console.log('userInfo')

      if (err) {
        if (window.VOTING_SAVE_ON_ERROR === true) {
          form.querySelector('input[name="auth_error"]').value             = err.error
          form.querySelector('input[name="auth_error_description"]').value = err.errorDescription

          form.submit()
        } else {
          showErrorMessage(err.errorDescription)
        }

        console.log('err')
        console.log(err)
        console.dir(err)

      } else {

        console.log('user')
        console.log(user)
        console.dir(user)

        form.querySelector('input[name="auth_sub"]').value = user.sub

        form.submit()
      }

    })
  }

  showSaveMessage()
  refreshTimeout()

  if (window.location.hash && window.location.hash != '') {
    console.log('window has a hash')

    webAuth.parseHash(window.location.hash, function(err, authResult) {
      console.log('parseHash completed')

      if (err) {
        console.log('an error occurred')

        if (window.VOTING_SAVE_ON_ERROR === true) {
          form.querySelector('input[name="auth_error"]').value             = err.error
          form.querySelector('input[name="auth_error_description"]').value = err.errorDescription

          form.submit()
        } else {
          showErrorMessage(err.errorDescription)
        }

        console.log('err')
        console.log(err)
        console.dir(err)
  
        return
      } else {
        console.log('authResult')
        console.log(authResult)
        console.dir(authResult)

        authenticate(authResult)
      }
    })
  } else {
    showErrorMessage('The sign in process couldn’t start.')
  }
</script>

<script>
  function retrySignIn(e){
    console.log('retrySignIn form');

    var email = (form.querySelector('input[name="email"]')) ? 
      form.querySelector('input[name="email"]').value     : null;
    var telephone = (form.querySelector('input[name="telephone"]')) ? 
      form.querySelector('input[name="telephone"]').value : null;

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

    if ((votesData).length < 1) {
      console.error('No items were voted for');
      return;
    }

    var zip = document.querySelector('input[name="zip"]').value;
    if (!zip || zip == '') {
      console.log('No zip code')
    }

    votesData.push('zip=' + encodeURIComponent(zip));

    var subscribe_email_list = document.querySelector('input[name="subscribe_email_list"]').value;

    votesData.push('subscribe_email_list=' + encodeURIComponent(subscribe_email_list));

    if (telephone) {
      votesData.push('telephone=' + encodeURIComponent(telephone));
    } else if (email) {
      votesData.push('email=' + encodeURIComponent(email));
    } else {
      console.error('Couldn’t find an email or phone to add to the data');
      return;
    }

    console.dir(votesData);

    var redirectUri = window.location.origin + '/vote/authenticated/?' + votesData.join('&');
    console.log('redirectUri: ' + redirectUri);

    var options = {
      redirectUri: redirectUri,
    }

    console.log("telephone: " + telephone.replace(/\-/g, '').replace(/\s/g, ''))

    if (telephone) {
      options.connection = 'sms'
      options.send = 'code'
      options.phoneNumber = telephone.replace(/\-/g, '').replace(/\s/g, '')
    } else if (email) {
      options.connection = 'email'
      options.send = 'link'
      options.email = email
    } else {
      console.error('Couldn’t find an email or phone to authenticate');
    }

    var webAuth = new auth0.WebAuth({
      domain: window.AUTH0_DOMAIN,
      clientID: window.AUTH0_CLIENT_ID,
      // responseMode: 'form_post',
      responseType: 'token',
      redirectUri: redirectUri
    });

    webAuth.passwordlessStart(options, function (err,res) {
      if (err) {
        // Handle error
        showErrorMessage(err.errorDescription || err.description)

        console.log('err');
        console.log(err)
        console.dir(err)
      } else {

        if (telephone) {
          form.action = '/vote/sms-sent/';
          form.method = 'get';
        } else if (email) {
          form.action = '/vote/email-sent/';
          form.method = 'get';
        }

        console.log('res');
        console.log(res)
        console.dir(res)

        form.submit();
      }

    });

    e.preventDefault()
  }
</script>

{% endif %}
