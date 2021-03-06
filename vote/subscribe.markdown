---
title: Sign up for the LA2050 email newsletter
canonical_url: /
body_class: lime
stylesheets:
  - "/assets/css/vote-process.css"
---

{% if site.phase != 6 and site.voting_test_mode != true %}

# Oops!

<div class="introduction" markdown="1">
This page couldn’t be found.

You may want to visit our [home page](/) instead.
</div>

{% else %}

<script>
  try {
    if (localStorage.getItem('subscribe_email_list_asked') === "yes") {
      window.location.href = "/vote/survey/"
    }
  } catch(e) {}
</script>

<div class="introduction" markdown="1">

<h2 style="max-width: none; text-align: center; font-size: inherit; color: var(--secondary-color); font-weight: 500;">Thanks for voting! <span style="font-weight: normal; color: rgb(41, 41, 41); /* @midnight */">Your votes have been received and will help us choose the winners.</span></h2>

<h1>We’d love to keep in touch</h1>
<p style="max-width: 36em; font-size: 1.25em;">Sign up for the <strong style="color: inherit; font-weight: 500;">LA2050 email newsletter</strong> and twice a month, you'll receive updates on awesome organizations in Los Angeles, activations, opportunities, and jobs that are shaping the future of our region. <em style="color: inherit; font; font-weight: inherit;">Join the movement!</em></p>

<form name="vote_subscribe" action="/vote/survey-subscribed/" method="post" data-netlify="true" style="margin-top: 1.5em;">
<p style="font-size: 1em">
  <label>
    <span class="label-text">Email address</span>
    <input type="email" name="email" placeholder="Email address" required="required" />
  </label>
  <button type="submit">Subscribe</button>
</p>
</form>

<p style="font-size: inherit; margin-top: 2.8em;"><small style="font-size: inherit;">This is optional. You can <a href="/vote/survey/">skip this step</a>.</small></p>

</div>

{% endif %}
