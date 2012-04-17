//
//     Ping-Pong.js 0.1.0
//
//     (c) 2012 Mindaugas Bujanauskas, Apollo Music Aps
//     Ping-Pong.js may be freely distributed under the MIT license.
//

// **Ping-Pong** is a dependency-less pseudo-ping utility written in JavaScript, that allows
// you to easily find out if a certain HTTP server is online.
//
// Sometimes you need to know if your server is alive, before making an AJAX request.
// Or perhaps you're like us in Apollo Music and you need to be able to quickly recover from the
// Internet connection loss without actually having to make faulty JSON requests?
// Then Ping-Pong is the right tool for you. It allows you to know if the server is
// online by downloading a small image from it.
//
// At Apollo IT, we use it in Audionse.com - our online music solution for businesses. What happens,
// is that sometimes, user's Internet connection goes down and they are not around to manually refresh
// the page. **Ping-Pong** helps us determine if the user is back online so we can continue music playback.
//
// Read more on our [GitHub page](https://github.com/rkrv/pingpong).
//
// Downloads:
// 
// * [Minified](https://raw.github.com/rkrv/pingpong/master/ping-pong.min.js)
// * [Commented](https://raw.github.com/rkrv/pingpong/master/ping-pong.js)
// * [Full package](https://github.com/downloads/rkrv/pingpong/Ping-Pong.js.zip)
//

;(function(window) {
  
  // Usage
  // -----
  //
  // Using Ping-Pong is as simple as creating a new instance of PingPong object and passing
  // `success` and `error` callbacks.
  //
  //     var ping = new PingPong({
  //       success: function() { alert("We're online!"); },
  //       error: function() { alert('Dead server is dead.'); }
  //     });
  //
  // PingPong constructor takes one argument - `options` hash.
  
  window.PingPong = function(options) {
    
    // The **options** hash will usually contain only two properties: `success` and `error`.
    // However, it is also possible to pass properties for a different image `src` and a
    // boolean value for `random`, which will (or not) attach a random query in the end of
    // image's **src**.
    var options = (options || null);
    
    // Default options are:
    //
    //     success: function() {},
    //     error:   function() {},
    //     src:     '/ping.gif',
    //     random:  true
    this.success = function() {};
    this.error = function() {};
    this.src = '/ping.gif';
    this.random = true;
    
    if (options) {
      
      // Generally, `success` and `error` callbacks should be _functions_. Other types of objects are
      // not accepted and will not be used.
      if (options.success && typeof options.success === 'function')
        this.success = options.success;
      if (options.error && typeof options.error === 'function')
        this.error = options.error;
      
      // You can also pass in a different URL for the image's source. It is defined with
      // the `src` value and it should be a _string_. The default value for `src` is **/ping.gif**.
      // This was chosen because, according to Photoshop, 1x1px GIF image takes only 43 bytes of space,
      // whereas similar 1x1px PNG8 and PNG24 take 124 and 109 bytes accordingly.
      if (options.src && typeof options.src === 'string')
        this.src = options.src;
        
      // The last property that can be set is the `random` of type _boolean_. It defaults to `true` to ensure
      // that the script always makes a call. However, sometimes you might serve your content with no-cache headers,
      // and then you might want to set this property to `false`. Still, recommended value is `true`.
      if (typeof options.random === 'boolean' && options.random === false)
        this.random = false;
      
      // This concludes the `options` hash and the instantiation is done.
      
    }
    
    // The `onEvent()` function is used internally as an abstract between IE and other browsers.
    // It takes three arguments: `element`, `event name` and a `callback` function.
    var onEvent = function(el, eventName, callback) {
      if (el.addEventListener) {
        el.addEventListener(eventName, callback, false);
      }
      else if (el.attachEvent) {
        el.attachEvent('on' + eventName, callback);
      }
    };
    
    // The `makeUrl()` function is used internally and returns a string containing image source url
    var makeUrl = function(src, random) {
      return (random ? src + '?r=' + Math.random() : src);
    };
    
    // Time to create a variable that will hold our Image instance.
    var img;
    
    // The following function is used internally and may be used externally as well, so
    // that if you feel like it, you could do more pings with the same PingPong object instance.
    // Simply call `pong` method on you instance like so:
    //
    //     var ping = new PingPong(options);
    //     ping.pong();
    //
    // This method accepts optional arguments for image's `src` and `random` values via hash object.
    // Beware, that if you pass new values for these attributes, they will be set as new defaults and
    // will be used when you call this method next time without any options.
    //
    //     ping.pong({ random: true });
    //
    // These values default to:
    //
    //     src: this.src,
    //     random: this.random
    //
    this.pong = function(options) {
      if (typeof options !== 'undefined') {
        if (options.src && typeof options.src === 'string')
          this.src = options.src;
        if (typeof options.random === 'boolean' && this.random != options.random)
          this.random = options.random;
      }
      
      img = null;
      img = new Image();
      
      onEvent(img, 'load', this.success);
      onEvent(img, 'error', this.error);
      
      img.src = makeUrl(this.src, this.random);
    };
    
    // This is it! At this point we'll simply call `this.pong()` and start all the magic.
    // So long and thanks for all the fish!
    this.pong();
    
  };
  
})(window);
