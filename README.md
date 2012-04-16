Ping-Pong.js - Dependency Free Pseudo-Ping utility for JS
---------------------------------------------------------

**Ping-Pong** is a dependency free pseudo-ping utility written in JavaScript, that allows you to easily find out if a certain HTTP server is online.

Sometimes you need to know if your server is alive, before making an AJAX request. Or perhaps you're like us in Apollo Music and you need to be able to quickly recover from the Internet connection loss without actually having to make faulty JSON requests? Then Ping-Pong is the right tool for you. It allows you to know if the server is online by downloading a small image from it.

At Apollo IT, we use it in Audionse.com - our online music solution for businesses. What happens, is that sometimes, the user's Internet connection goes down and they are not around to manually refresh the page. **Ping-Pong** helps us determine if the user is back online and continue music playback.



Why & how
---------

This project was born when we were doing a lot of error-proofing for [one of our projects](http://www.audionse.com/) in [Apollo IT](http://www.apollodev.it/). We needed something that would call a certain callback after the Internet came back online. This tool solved our problem and hopefully, it will solve yours.

What happens behind the scenes when you instantiate a new PingPong object is that the script creates a new DOM HTML Image object and assigns it a `src` attribute as well as `onload` and `onerror` callbacks (you can read more about it in the [annotated source code page](http://rkrv.github.com/pingpong/)). After assigning Image object with a source file, the appropriate callback is fired depending on whether the image was loaded successfully or not.



Setup & usage examples
----------------------

You will need the following to get started:

* A minified or a full version of Ping-Pong.js
* A URL to an image on a server you want to ping (defaults to `/ping.gif`)

When you have the above, you can put this in your page:

	var ping = new PingPong({
		success: function() { alert('Server is online!'); }
	});

The following script will trigger a browser alert box if the image is found at `/ping.gif`.

PingPong constructor takes an object which can contain `success` and `error` callbacks, a different image `src` and a boolean value to append a `random` query to the `src`, so that the image would not be cached.

Default options are (feel free to override them):

	success: function() {},
	error:   function() {},
	src:     '/ping.gif',
	random:  true

There's also a `.pong()` method, which can be used to try and download the image once more.
	
	var myErrorCallback = function() {
		displayErrorBox();
	};
	
	// Will trigger myErrorCallback if image is not accessible
	var ping = new PingPong({
		error: myErrorCallback,
		src: 'http://server1.mycompany.com/assets/images/img.png'
	});
	
	// Later in the code
	setTimeout(ping.pong, 200);

Or you could do it the way we do it in Audionse.com:

	$.ajax('/tracks/'+this.id+'.json')
	 .fail(function() {
          var ping = new PingPong({
            success: function() { successCallback(); },
            error:   function() {
            	// Will try to check health status in 500ms
            	setTimeout(function() { ping.pong(); }, 500);
            }
          });
        }
      });

You can set different properties after initialization:

	var ping = new PingPong();
	ping.success = successCallback;
	ping.src = '/images/ping.png'
	ping.pong();



Contribute
----------

Contributions are welcome in the form of feature suggestions and development, bug reporting and fixing, testing, documentation writing and, giving high-fives to the creator [Mindaugas Bujanauskas](http://www.twitter.com/rkrv).

If you develop new code or fix current issues, remember to write tests and documentation. We use [Jasmine](http://pivotal.github.com/jasmine/) for testing and document code with [Docco](http://jashkenas.github.com/docco/).
