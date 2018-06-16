---
title: Vote in the 2018 My LA2050 Activation Challenge
body_class: lime
---

{% if site.phase != 6 and site.test_voting_pages != true %}

# Oops!

<div class="introduction" markdown="1">
This page couldn’t be found.

You may want to visit our [home page](/) instead.
</div>

{% else %}

<div class="introduction" markdown="1">

<h2 style="max-width: none; text-align: center; font-size: inherit; color: var(--secondary-color); font-weight: 500;">Thanks for voting! <span style="font-weight: normal; color: rgb(41, 41, 41); /* @midnight */">Your votes have been received and will help us choose the winners.</span></h2>

<h2 style="text-align: center; margin-left: auto; margin-right: auto; max-width: 20em; font-size: 2em;">Help LA2050 determine how much of Los Angeles we’re reaching</h2>
<p style="font-size: inherit;"><small style="font-size: inherit;">Providing this information is optional. You can <a href="/vote/confirmation/">skip this step</a>.</small></p>

</div>

<form name="vote_survey" action="/vote/confirmation-survey/" method="post" data-netlify="true">

  <p>
    <label>
      Which of the following news sources do you view on a regular basis?<br />
      <select name="news_source">
        <option value="">Select</option>
        <option value="">-----------------</option>
        <option>Traditional print newspapers and magazines (e.g. LA Times)</option>
        <option>Traditional online media outlets (e.g. CNN)</option>
        <option>Online-only media outlets (e.g. Huffington Post)</option>
        <option>Social media platforms</option>
        <option>Online blogs/forums</option>
        <option>Television</option>
        <option>Radio</option>
        <option>Community groups or organizations</option>
      </select>
    </label>
  </p>


  <p>
    <label>
      How did you first find out about the My LA2050 Activation Challenge?<br />
      <select name="how_you_found_la2050">
        <option value="">Select</option>
        <option value="">-----------------</option>
        <option>LA2050 Newsletter</option>
        <option>Community group or organization</option>
        <option>Friends or family</option>
        <option>Professional network</option>
        <option>Social media</option>
        <option>News outlet</option>
        <option>Advertisements</option>
        <option>Events</option>
        <option value="Other">Other (please describe)</option>
      </select>
    </label>
    <br />
    <br />
    <label>
      Other <small>(please describe)</small><br />
      <input type="text" name="how_you_found_la2050_other" />
    </label>
  </p>



  <p>
    <label>
      What would you most like to hear about from LA2050?<br />
      <select name="what_you_want_from_la2050">
        <option value="">Select</option>
        <option value="">-----------------</option>
        <option>New funding opportunities</option>
        <option>Competition / competitor team updates</option>
        <option>Jobs and events</option>
        <option>Important news from the world of impact</option>
        <option value="Other">Other (please describe)</option>
      </select>
    </label>
    <br />
    <br />
    <label>
      Other <small>(please describe)</small><br />
      <input type="text" name="what_you_want_from_la2050_other" />
    </label>
  </p>

  <p>
    <label>
      How old are you?<br />
      <select name="age">
        <option value="">Select</option>
        <option value="">-----------------</option>
        <option>Under 18</option>
        <option>18-29</option>
        <option>30-39</option>
        <option>40-49</option>
        <option>50-64</option>
        <option>65 and above</option>
        <option>Prefer not to answer</option>
      </select>
    </label>
  </p>

  <p>
    <label>
      Are you …?<br />
      <select name="gender">
        <option value="">Select</option>
        <option value="">-----------------</option>
        <option>Female</option>
        <option>Male</option>
        <option>Non-binary, transgender, prefer to self-describe</option>
        <option>Prefer not to answer</option>
      </select>
    </label>
  </p>

  <p>
    <label>
      How would you describe yourself?<br />
      <select name="race">
        <option value="">Select</option>
        <option value="">-----------------</option>
        <option>American Indian or Alaska Native</option>
        <option>Asian</option>
        <option>Biracial / mixed race</option>
        <option>Black or African American</option>
        <option>Hawaiian Native or Other Pacific Islander</option>
        <option>Hispanic or Latino</option>
        <option>White</option>
        <option>Prefer not to answer</option>
      </select>
    </label>
  </p>

  <p>
    <label>
      What is the highest level of education you received?<br />
      <select name="education">
        <option value="">Select</option>
        <option value="">-----------------</option>
        <option>Some high school</option>
        <option>High school graduate or diploma equivalent (for example: GED)</option>
        <option>Some college credit, no degree</option>
        <option>Trade / technical / vocational training</option>
        <option>Associate degree</option>
        <option>Bachelor’s degree</option>
        <option>Master’s degree</option>
        <option>Professional degree</option>
        <option>Doctorate degree</option>
        <option>Prefer not to answer</option>
      </select>
    </label>
  </p>

  <p>
    <label name="income">
      Where does the total annual income of your household fall before taxes and including all sources?<br />
      <select name="income">
        <option value="">Select</option>
        <option value="">-----------------</option>
        <option>Less than $35,000</option>
        <option>$35,000 - $49,999</option>
        <option>$50,000 - $74,999</option>
        <option>$75,000-$99,999</option>
        <option>$100,000 - $149,999</option>
        <option>$150,000 - $199,999</option>
        <option>$200,000 or more</option>
        <option>Prefer not to answer</option>
      </select>
    </label>
  </p>

  <p>
    <label>
      What language to do you speak <em style="color: inherit;">most</em> when you’re at home? <br />
      <input type="text" name="language" />
    </label>
    <br />
    <small id="languages">हिन्दी, 日本語, English, Español, ไทย</small>
  </p>
  <script>
  (function() {
    //var languages = "हिन्दी, 中文, Français, 한국어, Deutsche, English, Español, ไทย, 日本語, فارسی, Tiếng Việt, ລາວ, Samala, עִברִית, አማርኛ, 中文".split(', ')
    var languages = document.getElementById('languages').textContent.split(', ')

    languages.sort(function(a, b) {
      var random = Math.floor(Math.random() * languages.length) + 1;
      if (random > (languages.length / 2)) return 1;
      else if (random < (languages.length / 2)) return -1;
      return 0;
    })
    document.getElementById('languages').textContent = languages.join(', ')
  })();
  </script>

  <p class="action">
    <button type="submit">Submit</button>
  </p>
</form>

<style>
.promotion {
  display: none;
}
.introduction {
  margin-bottom: 0;
}
form {
  margin-top: 3em;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
  max-width: 40em;
  margin-bottom: 7.5em;
}
form p {
  text-align: left;
  /*margin-top: 1.5em;*/
  font-size: 1rem !important;
}
form p,
form p.action {
  margin-top: 1.5em;
  padding-top: 1.125em;
  border-top: 1px dashed rgba(141, 208, 59, 1); /* @lime */
  border-top: 1px dashed rgba(0, 0, 0, 0.25);
}
@media (min-width: 30em) {
  form p,
  form p.action {
    padding-left: 1.5em;
    padding-right: 1.5em;
  }
}
/*form p:first-child,
form p.action {
  border-top: 0.1875em solid rgba(0, 0, 0, 0.1);
}*/
form p.action {
  padding-top: 3em;
  text-align: center;
}
form input[type="text"],
form select {
  margin-top: 0.375em;
  font-size: inherit;
  max-width: 100%;
}
form button {
  width: 100%;
  max-width: 20em;
}
form input[type="text"],
form input[type="number"] {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  font-weight: 600;
  padding: 0.375em 0.75em;
  border-radius: 0;
  max-width: none;
  box-sizing: border-box;
  text-align: center;
  border: 1px solid rgb(237, 59, 136); /* @strawberry */
  border-color: rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 20em;

  /* Remove Safari’s default styles for search fields */
  -webkit-appearance: none;

  text-align: left;
}
</style>

{% endif %}
