
(function() {

  // Do we have the features we need?
  if (!window.auth0         ||
      !window.auth0.WebAuth ||
      !document.body.classList        ||
      !document.body.classList.remove ||
      !document.body.querySelector ||
      !document.body.addEventListener ||
      !window.encodeURIComponent ||
      !window.setTimeout ||
      !window.console ||
      !window.console.log ||
      !window.console.error ||
      !window.console.dir
      ) return;

  var updateProgress
  var scrollToElement
  var zipShowing = false;
  var finishShowing = false;
  var zipSeen = false;
  var finishSeen = false;
  var emailShowing = false;
  var phoneShowing = false;
  var usingMouse = false

  var zipButton
  function setUpZipButton() {
    if (zipButton) return
    console.log('setting up zip button')
    zipButton = document.querySelector('#zip button');
    console.log('zip button: ' + zipButton);
    zipButton.addEventListener('click', function(e) {
      // console.log('zipButton click')
      // e.preventDefault()
      // updateProgress()
      // console.log('updateProgress done')
      // scrollToElement('finish')
      // if (!usingMouse) {
      //   setTimeout(function() {
      //     document.querySelector('button[name="sign_in_by').focus()
      //   }, 1000)
      // }
      // console.log('scrollTo finish done')

      
      if (phoneShowing) {
        scrollToElement('sign-in-phone')
        setTimeout(function() {
          document.querySelector('input[name="telephone"]').focus()
        }, 1000)
      } else if (emailShowing) {
        scrollToElement('sign-in-email')
        setTimeout(function() {
          document.querySelector('input[name="email"]').focus()
        }, 1000)
      } else {
        scrollToElement('finish')
        if (!usingMouse) {
          setTimeout(function() {
            document.querySelector('button[name="sign_in_by').focus()
          }, 1000)
        }
      }

    })
  }

  var confirmButton
  function setUpConfirmButton() {
    if (confirmButton) return
    console.log('setting up confirm button')
    confirmButton = document.querySelector('#progress button');
    console.log('zip button: ' + zipButton);
    confirmButton.addEventListener('click', function(e) {
      // console.log('zipButton click')
      // e.preventDefault()
      // updateProgress()
      // console.log('updateProgress done')
      if (document.querySelector('input[name="zip"]').value && 
          document.querySelector('input[name="zip"]').value.length === 5) {
        if (phoneShowing) {
          scrollToElement('sign-in-phone')
          setTimeout(function() {
            document.querySelector('input[name="telephone"]').focus()
          }, 1000)
        } else if (emailShowing) {
          scrollToElement('sign-in-email')
          setTimeout(function() {
            document.querySelector('input[name="email"]').focus()
          }, 1000)
        } else {
          scrollToElement('finish')
          if (!usingMouse) {
            setTimeout(function() {
              document.querySelector('button[name="sign_in_by').focus()
            }, 1000)
          }
        }
      } else {
        scrollToElement('zip')
        setTimeout(function() {
          document.querySelector('input[name="zip"]').focus()
        }, 1000)
      }
      // console.log('scrollTo finish done')
    })
  }



  function sendEmail(form){
    console.log('sendEmail');

    var email = (form.querySelector('input[name="email"]')) ? form.querySelector('input[name="email"]').value : null;
    var telephone = (form.querySelector('input[name="telephone"]')) ? form.querySelector('input[name="telephone"]').value : null;

    var fieldNames = ['learn', 'create', 'play', 'connect', 'live'];
    var votesData = [];
    var nextField;
    for (var index = 0; index < fieldNames.length; index++) {
      nextField = document.querySelector('input[type="radio"][name="' + fieldNames[index] + '"]:checked');
      if (nextField) {
        votesData.push(fieldNames[index] + '=' + encodeURIComponent(nextField.value));
        // form.querySelector('input[type="hidden"][name="' + fieldNames[index] + '"]').value = nextField.value;
      } else {
        console.log('skipped: ' + fieldNames[index]);
      }
    }

    if ((votesData).length < 1) {
      console.error('No items were voted for');
      return;
    }

    var zip = document.querySelector('input[type="text"][name="zip"]').value;
    if (!zip || zip == '') {
      console.log('No zip code')
    } else {
      // form.querySelector('input[type="hidden"][name="zip"]').value = zip;
    }

    votesData.push('zip=' + encodeURIComponent(zip));

    var subscribe_email_list = document.querySelector('input[name="subscribe_email_list"]').value;
    if (subscribe_email_list === "1") {
      votesData.push("subscribe_email_list=1")
    }

    if (telephone && telephone.indexOf('+') !== 0) telephone = '+1 ' + telephone

    if (telephone) {
      votesData.push('telephone=' + encodeURIComponent(telephone));
      form.querySelector('input[name="telephone"]').value = telephone;
    } else if (email) {
      votesData.push('email=' + encodeURIComponent(email));
    } else {
      console.error('Couldn’t find an email or phone to add to the data');
    }

    console.dir(votesData);

    var redirectUri = window.location.origin + '/vote/authenticated/?' + votesData.join('&');
    console.log('redirectUri: ' + redirectUri);

    var options = {
      redirectUri: redirectUri,
    }

    // TODO: Validate phone number

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
      domain:      'activation-la2050.auth0.com',
      clientID:    'INfJpr4dnNk2EN143utsZYz4Zeq9c7cd',
      // responseMode: 'form_post',
      responseType: 'token',
      redirectUri: redirectUri
    });

    webAuth.passwordlessStart(options, function (err,res) {
      if (err) {
        // Handle error

        console.log('err');
        console.log(err)
        console.dir(err)
      } else {
        // form.action = form.action + '?' + votesData.join('&');

        // TODO: Switch back to a single form on this page
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
  }

  function signInSocial(socialNetwork) {

    var fieldNames = ['learn', 'create', 'play', 'connect', 'live'];
    var votesData = [];
    var nextField;
    for (var index = 0; index < fieldNames.length; index++) {
      nextField = document.querySelector('input[type="radio"][name="' + fieldNames[index] + '"]:checked');
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

    votesData.push('social_network=' + encodeURIComponent(socialNetwork))

    var subscribe_email_list = document.querySelector('input[name="subscribe_email_list"]').value;
    if (subscribe_email_list === "1") {
      votesData.push("subscribe_email_list=1")
    }

    console.dir(votesData);

    var redirectUri = window.location.origin + '/vote/authenticated/?' + votesData.join('&');
    console.log('redirectUri: ' + redirectUri);

    var options = {
      redirectUri: redirectUri,
    }

    options.connection = socialNetwork

    var webAuth = new auth0.WebAuth({
      domain:      'activation-la2050.auth0.com',
      clientID:    'INfJpr4dnNk2EN143utsZYz4Zeq9c7cd',
      responseType: 'token',
      redirectUri: redirectUri
    });

    webAuth.authorize(options, function (err,res) {
      if (err) {
        // Handle error
        console.dir(err)
      } else {
        console.dir(res)
      }
    });
  }

  (function() {

    var form = document.querySelector('form[name="vote"]')
    console.log('form: ' + form)
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (document.querySelectorAll('input[type="radio"]:checked').length >= 1) {
        if (!zipSeen) {
          zip.classList.remove('hidden')
          zipShowing = true
          scrollToElement('zip')
          setTimeout(function() {
            document.querySelector('input[name="zip"]').focus()
          }, 1000)
          zipSeen = true
          setUpConfirmButton()
        } else if (!finishSeen) {
          finish.classList.remove('hidden')
          finishShowing = true
          scrollToElement('finish')
          if (!usingMouse) {
            setTimeout(function() {
              document.querySelector('button[name="sign_in_by').focus()
            }, 1000)
          }
          finishSeen = true
          setUpZipButton()
        } else if (emailShowing || phoneShowing) {
          console.log('form submit');
          sendEmail(e.target);
        }
      }
    })
  })();


  (function() {
    function closest(element, tagName) {

      // If the element is the target
      if (element.nodeName.toLowerCase() === tagName) return element;

      var ancestor = element;
      while ((ancestor = ancestor.parentElement) && ancestor.nodeName && ancestor.nodeName.toLowerCase() !== tagName);
      if (ancestor && ancestor.nodeName && ancestor.nodeName.toLowerCase() === tagName) {
        return ancestor;
      }
    }

    //document.addEventListener("DOMContentLoaded", function(event) {
      var form = document.querySelector('form[name="vote"]');

      //console.dir(form);

      var delay = 500;
      var delayTimeout;
      scrollToElement = function(elementID) {
        console.log('scrollTo: ' + elementID)
        if (delayTimeout) clearTimeout(delayTimeout)
        delayTimeout = setTimeout(function() {
          __scrollTo(elementID)
        }, delay);
      }

      function __scrollTo(elementID) {
        console.log('__scrollTo: ' + elementID)
        var element = document.getElementById(elementID)
        if (element && element.scrollIntoView) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      function updateAndScroll(name) {
        switch(name) {
          case 'learn':
            updateProgress()
            scrollToElement('create')
            if (!usingMouse) {
              setTimeout(function() {
                document.querySelector('input[name="create"]').focus()
              }, 1000)
            }
            break;
          case 'create':
            updateProgress()
            scrollToElement('play')
            if (!usingMouse) {
              setTimeout(function() {
                document.querySelector('input[name="play"]').focus()
              }, 1000)
            }
            break;
          case 'play':
            updateProgress()
            scrollToElement('connect')
            if (!usingMouse) {
              setTimeout(function() {
                document.querySelector('input[name="connect"]').focus()
              }, 1000)
            }
            break;
          case 'connect':
            updateProgress()
            scrollToElement('live')
            if (!usingMouse) {
              setTimeout(function() {
                document.querySelector('input[name="live"]').focus()
              }, 1000)
            }
            break;
          case 'live':
            updateProgress()
            scrollToElement('zip')
            if (!usingMouse) {
              setTimeout(function() {
                document.querySelector('input[name="zip"]').focus()
              }, 1000)
            }
            zipSeen = true
            break;
          default:

        }
      }

      (function() {
        var keyPressedRecently = false
        window.addEventListener('mousemove', function(e) {
          console.log('mouse moved')
          if (keyPressedRecently) return
          usingMouse = true
        })
        var timer
        window.addEventListener('keyup', function(e) {
          console.log('key pressed')
          usingMouse = false
          keyPressedRecently = true
          if (timer) clearTimeout(timer)
          timer = setTimeout(function() {
            keyPressedRecently = false
          }, 1000)
        })
        form.addEventListener('click', function(e) {
          console.log('form click')
          if (e.target.nodeName.toLowerCase() === 'input' && e.target.type === 'radio' && e.target.checked) {
            console.log('e.target.name: ' + e.target.name)
            if (usingMouse) {
              updateAndScroll(e.target.name)
            } else {
              updateProgress()
            }
          }
        })
      })()
    //});

    // window.addEventListener('scroll', function(e) {
    //   if (delayTimeout) clearTimeout(delayTimeout)
    // })



    var counter = 0;
    var count;
    var progress;
    var finish = document.getElementById('finish');
    finish.classList.add('hidden');
    var zip = document.getElementById('zip');
    zip.classList.add('hidden');
    updateProgress = function() {
      if (!progress) progress = document.getElementById("progress");
      if (!count) count = document.getElementById("vote-count");

      progress.classList.remove('hidden');

      counter = document.querySelectorAll('input[type="radio"]:checked').length;

      count.innerText = counter;

      if (counter >= 1 && zipShowing && !finishShowing) {
        finish.classList.remove('hidden');
        finishShowing = true;

        window.addEventListener('scroll', function() {
          //if (isVisible(finish, getOffset(finish).top, window.scrollY)) {
          if ((window.scrollY + (window.innerHeight / 2)) >= getOffset(finish).top) {
            progress.classList.add('hidden-button');
          } else {
            progress.classList.remove('hidden-button');
          }
        })

      }

      if (counter >= 1 && !zipShowing) {
        zip.classList.remove('hidden');
        zipShowing = true;
        setUpConfirmButton()
      }
    }

    // KUDOS: http://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element#answer-442474
    function getOffset( el ) {
      var _x = 0;
      var _y = 0;
      while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
          _x += el.offsetLeft;
          _y += el.offsetTop;
          el = el.offsetParent;
      }
      return { top: _y, left: _x };
    }

    function isVisible(element, elementTop, windowTop) {
      var elementBottom = elementTop + element.offsetHeight;
      var windowBottom  = windowTop  + window.innerHeight;

      // If the top edge of the window is greater than the top edge of the target
      if ((elementTop >= windowTop && elementTop <= windowBottom) || (elementBottom >= windowTop && elementBottom <= windowBottom)) {
        return true;
      } else {
        return false;
      }
    }

  })();

  // document.querySelector('#zip button').addEventListener('click', function(e) {
  //   console.log('zip button click')
  //   updateProgress()
  //   scrollToElement('finish')
  // })
  document.querySelector('#zip button').classList.remove('hidden')

  document.querySelector('a[href="#questions"]').addEventListener('click', function(e) {
    scrollToElement('questions')
    if (!usingMouse) {
      setTimeout(function() {
        document.querySelector('input[name="learn"]').focus()
      }, 1000)
    }
    e.preventDefault();
  })

  var signInPhone = document.getElementById('sign-in-phone');
  signInPhone.classList.add('hidden');
  document.querySelector('button[value="phone"]').addEventListener('click', function(e) {
    signInPhone.classList.remove('hidden')
    scrollToElement('sign-in-phone')
    setTimeout(function() {
      document.querySelector('input[name="telephone"]').focus()
    }, 1000)
    e.preventDefault();
    phoneShowing = true
  })

  var signInEmail = document.getElementById('sign-in-email')
  signInEmail.classList.add('hidden');
  document.querySelector('button[value="email"]').addEventListener('click', function(e) {
    signInEmail.classList.remove('hidden')
    signInEmail.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(function() {
      document.querySelector('input[name="email"]').focus()
    }, 1000)
    e.preventDefault();
    emailShowing = true
  })

  document.querySelector('button[value="facebook"]').addEventListener('click', function(e) {
    signInSocial('facebook');
    e.preventDefault();
  })
  document.querySelector('.facebook.hidden').classList.remove('hidden')

})();
