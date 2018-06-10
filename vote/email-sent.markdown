---
title: Vote in the 2018 My LA2050 Activation Challenge
body_class: tangerine
---

{% if site.phase != 6 %}

# Oops!

<div class="introduction" markdown="1">
Public voting is complete.

You may want to visit our [home page](/) instead.
</div>

{% else %}

<div class="introduction" markdown="1">

<h2 style="max-width: none; text-align: center; font-size: 2.5em;">Please check your email</h2>

<p>We sent a message to your email address with a link you can press to <span style="display: inline-block">confirm your votes.</span></p>

<small>Didn’t get an email? It might be in your “spam” folder.</small>

<form action="/vote/email-sent/" method="get">

<input type="hidden" name="learn" />
<input type="hidden" name="create" />
<input type="hidden" name="play" />
<input type="hidden" name="connect" />
<input type="hidden" name="live" />

<input type="hidden" name="zip" />
<input type="hidden" name="email" />
<input type="hidden" name="subscribe_email_list" />

<p class="action"><button type="submit">Resend email</button></p>

</form>

<style>
.promotion {
	display: none;
}
</style>

</div>



<script>

  // http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript#answer-901144
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
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
  form.querySelector('input[name="email"]').value = getParameterByName('email');
  form.querySelector('input[name="subscribe_email_list"]').value = getParameterByName('subscribe_email_list');

</script>

<script src="{{ site.auth0_js_url }}"></script>
<script type="text/javascript">
  var webAuth = new auth0.WebAuth({
    domain:      'activation-la2050.auth0.com',
    clientID:    'INfJpr4dnNk2EN143utsZYz4Zeq9c7cd',
    // responseMode: 'form_post',
    responseType: 'token'
  });
</script>

<script>
  function sendEmail(form){
    console.log('sendEmail');

    var zip = document.querySelector('input[name="zip"]').value;
    var email = document.querySelector('input[name="email"]').value;
    var subscribe_email_list = document.querySelector('input[name="subscribe_email_list"]').value;

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

    votesData.push('subscribe_email_list=' + encodeURIComponent(subscribe_email_list));
    votesData.push('zip=' + encodeURIComponent(zip));
    votesData.push('email=' + encodeURIComponent(email));

    console.dir(votesData);

    var redirectUri = window.location.origin + '/vote/authenticated/?' + votesData.join('&');
    console.log('redirectUri: ' + redirectUri);

    webAuth.passwordlessStart({
      connection: 'email',
      send: 'link',
      email: email,
      redirectUri: redirectUri,
    }, function (err,res) {
      if (err) {
        // Handle error

        console.log('err');
        console.log(err)
        console.dir(err)
      } else {

        console.log('res');
        console.log(res)
        console.dir(res)

        form.action = form.action + '?' + votesData.join('&');

        form.submit();
        // document.querySelector('.introduction').style.display = 'block';
        // document.querySelector('form').style.display = 'none';
      }

    });
  }

  document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    sendEmail(e.target);

  })
</script>

{% endif %}
