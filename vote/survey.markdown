---
title: Vote in the 2018 My LA2050 Activation Challenge
body_class: lime
---

{% if site.phase != 6 %}

# Oops!

<div class="introduction" markdown="1">
This page couldn’t be found.

You may want to visit our [home page](/) instead.
</div>

{% else %}

<div class="introduction" markdown="1">

<h2 style="max-width: none; text-align: center; font-size: inherit; color: var(--secondary-color); font-weight: 500;">Thanks for voting! <span style="font-weight: normal; color: rgb(41, 41, 41); /* @midnight */">Your votes have been confirmed and will help us choose the winners.</span></h2>

<h2 style="text-align: center; margin-left: auto; margin-right: auto; max-width: 20em; font-size: 2em;">Help LA2050 determine how much of Los Angeles we’re reaching</h2>
<p style="font-size: inherit;"><small style="font-size: inherit;">Providing this information is optional. You can <a href="/vote/confirmation/">skip this step</a>.</small></p>

<form name="vote_survey" action="/vote/confirmation/" method="post" data-netlify="true">

  <p>
    <label>
      What is your age?<br />
      <select name="age">
        <option value="">Choose one</option>
        <option>14-17</option>
        <option>18-25</option>
        <option>26-34</option>
        <option>35-44</option>
        <option>45-54</option>
        <option>55-64</option>
        <option>65 and up</option>
      </select>
    </label>
  </p>

  <p>
    <label>
      Which gender do you most strongly identify with?<br />
      <select name="gender">
        <option value="">Choose one</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other / I’d rather not say</option>
      </select>
    </label>
  </p>

  <p>
    <label>
      Which ethnic or racial group do you most strongly identify with?<br />
      <select name="race">
        <option value="">Choose one</option>
        <option>Native American or Alaskan Native</option>
        <option>Asian</option>
        <option>Black or African-American</option>
        <option>Hispanic or Latino</option>
        <option>Middle Eastern or North African</option>
        <option>Native Hawaiian or Pacific Islander</option>
        <option>White</option>
        <option>Other</option>
      </select>
    </label>
  </p>

  <p>
    <label>
      What language do you speak at home?<br />
      <input type="text" name="language" placeholder="" />
    </label>
  </p>
  <script>
  (function() {
    //var languages = "हिन्दी, 中文, Français, 한국어, Deutsche, English, Español, ไทย, 日本語, فارسی, Tiếng Việt, ລາວ, Samala, עִברִית, አማርኛ, 中文".split(', ')
    var languages = "हिन्दी, 日本語, English, Español, ไทย".split(', ')

    languages.sort(function(a, b) {
      var random = Math.floor(Math.random() * languages.length) + 1;
      if (random > (languages.length / 2)) return 1;
      else if (random < (languages.length / 2)) return -1;
      return 0;
    })
    document.querySelector('input[name="language"]').placeholder = languages.join(', ')
  })();
  </script>

  <p>
    <label>
      What is the highest education level you have attained?<br />
      <select>
        <option value="">Choose one</option>
        <option>Grade school</option>
        <option>High school</option>
        <option>Associates</option>
        <option>Bachelors</option>
        <option>Advanced Degree</option>
      </select>
    </label>
  </p>

  <p>
    <label>
      What is your approximate annual income?<br />
      <select>
        <option value="">Choose one</option>
        <option>Less than $25,000</option>
        <option>$25,000 to $34,999</option>
        <option>$35,000 to $49,999</option>
        <option>$50,000 to $74,999</option>
        <option>$75,000 to $99,999</option>
        <option>$100,000 to $149,999</option>
        <option>$150,000 to $199,999</option>
        <option>$200,000 or more</option>
      </select>
    </label>
  </p>

  <p>
    <label>
      Where do you get the majority of your news?<br />
      <select>
        <option value="">Choose one</option>
        <option>Traditional print newspapers and magazines (e.g. LA Times)</option>
        <option>Traditional online media outlets (e.g. CNN)</option>
        <option>Online-only media outlets</option>
        <option>Social media platforms</option>
        <option>Online blogs/forums</option>
        <option>Television</option>
        <option>Radio</option>
        <option>Information shared by friends or family</option>
        <option>Community groups or organizations</option>
      </select>
    </label>
  </p>

  <p>
    <label>
      How did you find out about LA2050?<br />
      <select>
        <option value="">Choose one</option>
        <option>LA2050 Newsletter</option>
        <option>Community group or organization</option>
        <option>Friends or family</option>
        <option>Professional network</option>
        <option>Social media</option>
        <option>News outlet</option>
        <option>Advertisements</option>
        <option>Other</option>
      </select>
    </label>
  </p>

  <p class="action">
    <button type="submit">Submit</button>
  </p>
</form>

</div>

<style>
.promotion {
  display: none;
}
.introduction form {
  margin-top: 3em;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
  max-width: 30em;
}
.introduction form p {
  text-align: left;
  /*margin-top: 1.5em;*/
  font-size: 1rem !important;
}
.introduction form select {
  display: block;
  font-size: inherit;
}
.introduction form button {
  width: 100%;
  max-width: 20em;
}
form p {
  margin-top: 3em;
}
form input[type="text"],
form input[type="number"] {
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
  width: 100%;
  max-width: 20em;

  /* Remove Safari’s default styles for search fields */
  -webkit-appearance: none;

  text-align: left;
}
</style>

{% endif %}
