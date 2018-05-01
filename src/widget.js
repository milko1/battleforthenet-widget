(function () {
  if (typeof _bftn_options == "undefined") _bftn_options = {};
  if (typeof _bftn_options.iframe_base_path == "undefined") _bftn_options.iframe_base_path = 'https://widget.battleforthenet.com/iframe';
  if (typeof _bftn_options.animation == "undefined") _bftn_options.animation = 'main';
  if (typeof _bftn_options.delay == "undefined") _bftn_options.delay = 1000;
  if (typeof _bftn_options.debug == "undefined") _bftn_options.debug = false;
  if (typeof _bftn_options.date == "undefined") _bftn_options.date = new Date(2017, 11 /* Zero-based month */, 14);
  if (typeof _bftn_options.viewCookieExpires == "undefined") _bftn_options.viewCookieExpires = 1;
  if (typeof _bftn_options.actionCookieExpires == "undefined") _bftn_options.actionCookieExpires = 7;
  if (typeof _bftn_options.always_show_widget == "undefined") _bftn_options.always_show_widget = false;
  if (typeof _bftn_options.theme == "undefined") _bftn_options.theme = 'take-action';

  var _bftn_animations = {
    main: {
      options: {
        modalAnimation: 'main'
      },
      init: function(options) {
        var keys = Object.keys(options);
        for (var k = 0; k < keys.length; k++) {
          this.options[keys[k]] = options[keys[k]];
        }

        return this;
      },
      start: function() {
        var iframe = _bftn_util.createIframe();
        _bftn_util.bindIframeCommunicator(document.getElementById('_bftn_iframe'), this);
      },
      stop: function() {
        _bftn_util.destroyIframe();
      }
    }
  }

  var _bftn_util = {
    injectCSS: function(id, css) {
      var style = document.createElement('style');
      style.type = 'text/css';
      style.id = id;
      if (style.styleSheet) style.styleSheet.cssText = css;
      else style.appendChild(document.createTextNode(css));
      document.head.appendChild(style);
    },

    createIframe: function() {
      var wrapper = document.createElement('div');
      wrapper.id = '_bftn_wrapper';
      var iframe = document.createElement('iframe');
      iframe.id = '_bftn_iframe';
      iframe.src = _bftn_options.iframe_base_path + '/iframe.html';
      iframe.frameBorder = 0;
      iframe.allowTransparency = true; 
      iframe.style.display = 'none';
      wrapper.appendChild(iframe);
      document.body.appendChild(wrapper);
      return wrapper;
    },

    destroyIframe: function() {
      var iframe = document.getElementById('_bftn_wrapper');
      iframe.parentNode.removeChild(iframe);
    },

    bindIframeCommunicator: function(iframe, animation) {
      function sendMessage(requestType, data) {
        data || (data = {});
        data.requestType = requestType;
        data.BFTN_WIDGET_MSG = true;
        iframe.contentWindow.postMessage(data, '*');
      }

      var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
      var eventer = window[eventMethod];
      var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

      eventer(messageEvent, function(e) {
        if (!e.data || !e.data.BFTN_IFRAME_MSG) return;

        delete e.data.BFTN_IFRAME_MSG;

        switch (e.data.requestType) {
          case 'getAnimation':
            iframe.style.display = 'block';
            sendMessage('putAnimation', animation.options);
            break;
          case 'stop':
            animation.stop();
            break;
          case 'cookie':
            _bftn_util.setCookie(e.data.name, e.data.val, e.data.expires);
            break;
        }
      }, false);
    },

    setCookie: function(name, val, exdays) {
      var d = new Date();
      d.setTime(d.getTime()+(exdays*24*60*60*1000));

      var expires = "expires="+d.toGMTString();
      document.cookie = name + "=" + val + "; " + expires + "; path=/";
    },

    getCookie: function(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      var c;

      for(var i = 0; i < ca.length; i++) {
        c = ca[i].trim();
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }

      return "";
    },

    log: function() {
      if (_bftn_options.debug) console.log.apply(console, arguments);
    }
  }

  function onDomContentLoaded() {
    var images = new Array();
    var preloaded = 0;

    function init() {
      setTimeout(function() {
        _bftn_animations[_bftn_options.animation].init(_bftn_options).start();
      }, _bftn_options.delay);
    }

    function preload() {
      for (i = 0; i < preload.arguments.length; i++) {
        images[i] = new Image()
        images[i].src = _bftn_options.iframe_base_path + '/images/' + preload.arguments[i]

        images[i].onload = function() {
          preloaded++;
          _bftn_util.log('Preloaded ' + preloaded + ' images.');

          if (preloaded == images.length) {
            _bftn_util.log('DONE PRELOADING IMAGES. Starting animation in ' + _bftn_options.delay + ' milliseconds.');
            init();
          }
        }
      }
    }

    // Should we show the widget, regardless?
    if (!_bftn_options.always_show_widget && window.location.href.indexOf('ALWAYS_SHOW_BFTN_WIDGET') === -1) {

      // Don't show widget if cookie has been set.
      if (
        _bftn_util.getCookie('_BFTN_WIDGET_VIEW') ||
        _bftn_util.getCookie('_BFTN_WIDGET_ACTION')
      ) {
        return;
      }
    }

    // BEGIN: Milko: country code filtering
    var init2 = function () {
      // Only show once per day.
      _bftn_util.setCookie('_BFTN_WIDGET_VIEW', 'true', _bftn_options.viewCookieExpires);
      _bftn_util.injectCSS('_bftn_iframe_css', '#_bftn_wrapper { position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 20000; -webkit-overflow-scrolling: touch; overflow-y: auto; } #_bftn_iframe { width: 100%; height: 100%;  }');

      // Preload images before showing the animation
      // preload();
      init();
    };

    // _bftn_options.country_code_show: 'US' or ['US','CU']
    if (_bftn_options.country_code_show && _bftn_options.country_code_show.length > 0) {
      var _BFTN_WIDGET_COUNTRY_CODE = '_BFTN_WIDGET_COUNTRY_CODE';
      _bftn_options_country_code_show = (_bftn_options.country_code_show.constructor === Array ? _bftn_options.country_code_show : [_bftn_options.country_code_show]);

      var _country_code_cache = _bftn_util.getCookie(_BFTN_WIDGET_COUNTRY_CODE);
      if (_country_code_cache && _country_code_cache.length > 0) {  // if country cached already
        _bftn_util.log("Country cached='" + _country_code_cache + "'");
        if (_bftn_options_country_code_show.indexOf(_country_code_cache) > -1)  // if country cached is in show array
          init2();

        return;
      }

      var request = new XMLHttpRequest();
      request.open('GET', 'https://api.ipdata.co/');
      request.setRequestHeader('Accept', 'application/json');

      request.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status !== 200) {
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            console.log('Body:', this.responseText);
            return;
          }  
          var json = JSON.parse(this.responseText);
          var country_code = json.country_code;
          _bftn_util.log("Country='" + country_code + "'");
          _bftn_util.setCookie(_BFTN_WIDGET_COUNTRY_CODE, country_code, 30);  // 30 days expiration

          _bftn_util.log("_bftn_options.country_code_show='" + _bftn_options.country_code_show + "'");
          if (_bftn_options_country_code_show.indexOf(country_code) === -1)
            return;

          init2();
        }
      };
    
      request.send();
    }
    else {
      init2();
    }
    // END: Milko: country code filtering

  }

  // Wait for DOM content to load.
  switch(document.readyState) {
    case 'complete':
    case 'loaded':
    case 'interactive':
      onDomContentLoaded();
      break;
    default:
      if (typeof document.addEventListener === 'function') {
        document.addEventListener('DOMContentLoaded', onDomContentLoaded, false);
      }
  }
})();
