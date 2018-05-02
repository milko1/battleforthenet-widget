[![CircleCI](https://circleci.com/gh/fightforthefuture/battleforthenet-widget/tree/master.svg?style=svg)](https://circleci.com/gh/fightforthefuture/battleforthenet-widget/tree/master)

# How to install the widget

Add this to any page, and you're golden: ([**See the demo!**](https://widget.battleforthenet.com/demos/modal.html))

```html
<script src="https://widget.battleforthenet.com/widget.js" async></script>
```

Or, follow these [easy instructions for Tumblr](http://tumblr.fightforthefuture.org/post/162878793988/how-to-stand-up-for-netneutrality-on-tumblr).

The goal of this project is to allow anyone with a web site to run their own campaign to save net neutrality. Simply add one line of JavaScript and you're good to go! The modal animation will show up front-and-center on your page, prompting
visitors to contact Congress and the FCC.

If you have any problems or questions regarding the widget, please [submit an issue](https://github.com/fightforthefuture/battleforthenet-widget/issues).


# How it works

The widget is designed to appear once per user, per device, per day, but can be configured to display at a different interval. If you'd like to force it to show up on your page for testing, reload the page with `#ALWAYS_SHOW_BFTN_WIDGET` at the end of the URL.

Please take a look at [**widget.js**](https://github.com/fightforthefuture/battleforthenet-widget/blob/master/widget.js) if you want to see exactly what you'll
be embedding on your page.

* Compatible with Firefox, Chrome, Safari and Internet Explorer 11+.
* Embed the widget JavaScript code on your page.
* Optionally pass in customization parameters (see below), or defaults are used.
* Widget checks to make sure it should be shown (hasn't been shown to this user recently and user hasn't initiated a call or clicked a donate link recently, via cookie). You can override this check for testing purposes.
* Widget preloads any images required for the chosen animation.
* Widget injects a floating `iframe` onto your page. All but the most trivial styles and interactions take place in the `iframe` so as not to interfere with your CSS and JavaScript.
* Animation displays in floating `iframe`.
* The user can dismiss the `iframe` and a cookie is written so it won't show again until cookie expires (unless you override).


#### Modal customization options:

If you define an object called `_bftn_options` before including the widget code,
you can pass some properties in to customize the default behavior.

```html
<script type="text/javascript">
  var _bftn_options = {
    country_code_show: 'US',  // or ['US','CU'] @type {string/Array}
    bots_exclude: true,       // @type {boolean}
    bots_ua: "(Pingdom\.com\_bot|AdsBot\-|googlebot\/|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)",  // @type {string}, defaults to these values if `bots_ua` omitted

    /*
     * Choose from 'take-action', 'capitol', 'onemorevote', 'countdown', 'glitch', 'money', 'stop', 'slow', 'without'.
     * Default is 'take-action'.
     */
    theme: 'onemorevote', // @type {string}
    
    /*
     * Or, if you want your own custom theme, specify its properties here.
     * Unspecified options will fall back to the default values.
     */
    theme: {
      className: 'money', // @type {string} will be applied to iframe body tag
      logos: ['images/money.png', 'images/stop.png'], // @type {Array} img src values
      headline: 'Your headline here.', // @type {string} modal headline text
      body: 'Your body here.' // @type {string} modal body text
    },
    
    /*
     * Choose from 'fp' for Free Press, 'dp' for Demand Progress or
     * 'fftf' for Fight for the Future. Omit this property to randomly split
     * form submissions between all organizations in the Battle for the Net 
     * coalition.
     */
    org: 'fftf', // @type {string}
    
    /*
     * Specify a delay (in milliseconds) before showing the widget. Defaults to one 
     * second.
     */
    delay: 1000, // @type {number}
    
    /*
     * Specify a date for the countdown theme. Defaults to November 23rd, 2017
     * (when the FCC is expected to announce a vote) if omitted. ISO-8601 dates are
     * UTC time, three-argument dates (with a zero-based month) are local time.
     */
    date: new Date(2017, 10, 23), // @type {Date}

    /*
     * Specify view cookie expiration. After initial view, modal will not be
     * displayed to a user again until after this cookie expires. Defaults to one
     * day.
     */
    viewCookieExpires: 1, // @type {number}

    /*
     * Specify action cookie expiration. After initiating a call or clicking a
     * donate link, modal will not be displayed to a user again until after this
     * cookie expires. Defaults to one week.
     */
    actionCookieExpires: 7, // @type {number}
    
    /*
     * If you show the modal on your homepage, you should let users close it to
     * access your site. However, if you launch a new tab to open the modal, closing
     * the modal just leaves the user staring at a blank page. Set this to true to
     * prevent closing the modal - the user can close the tab to dismiss it. Defaults
     * to false.
     */
    uncloseable: false, // @type {boolean}

    /*
     * Prevents the widget iframe from loading Google Analytics. Defaults to false.
     */
    disableGoogleAnalytics: false, // @type {boolean}
    
    /*
     * Always show the widget. Useful for testing.
     */
    always_show_widget: true // @type {boolean}
  };
</script>
<script src="https://widget.battleforthenet.com/widget.js" async></script>
```

