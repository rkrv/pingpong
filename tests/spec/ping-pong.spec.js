describe("Ping-Pong", function() {
  var waitTime = 150;
  
  it("should be defined", function() {
    expect(PingPong).toBeDefined();
  });
  
  describe("instantiation", function() {
    beforeEach(function() {
      this.ping = new PingPong();
    });
    
    it("should be possible to instantiate", function() {
      expect(this.ping).not.toBeNull();
    });
    
    it("should contain default properties when instantiated", function() {
      expect(this.ping.src).toEqual('/ping.gif');
      expect(this.ping.random).toEqual(true);
      expect(typeof this.ping.success).toEqual('function');
      expect(typeof this.ping.error).toEqual('function');
    });
    
    it("should be possible to change properties after instantiation", function() {
      this.ping.src = 'src/another.gif';
      this.ping.random = false;
      this.ping.success = function() { return 'success'; };
      this.ping.error = function() { return 'error'; };
      
      expect(this.ping.src).toEqual('src/another.gif');
      expect(this.ping.random).toEqual(false);
      expect(this.ping.success()).toEqual('success');
      expect(this.ping.error()).toEqual('error');
    });
    
    it("should contain custom properties when instantiated", function() {
      var options = {
        src: 'src/another.gif',
        random: false,
        success: function() { return 'success'; },
        error: function() { return 'error'; }
      };
      
      this.ping = new PingPong(options);
      
      expect(this.ping.src).toEqual('src/another.gif');
      expect(this.ping.random).toEqual(false);
      expect(this.ping.success()).toEqual('success');
      expect(this.ping.error()).toEqual('error');
    });
  }); // Instantiation

  describe(".pong() method", function() {
    beforeEach(function() {
      var options = { src: 'src/ping.gif', random: true };
      this.ping = new PingPong(options);
    });

    it("should be defined after instantiation", function() {
      expect(this.ping.pong).toBeDefined();
    });

    it("should take src and random attributes and set them as new defaults", function() {
      var options = { src: 'src/another.gif', random: false };
      this.ping.pong(options);
      expect(this.ping.src).toEqual(options.src);
      expect(this.ping.random).toEqual(options.random);
    });
  }); // .pong() method
  
  describe("callbacks", function() {
    beforeEach(function() {
      this.options = {
        src: 'src/ping.gif',
        success: function() { return 'success'; },
        error: function() { return 'error'; }
      };
      
      spyOn(this.options, 'success');
      spyOn(this.options, 'error');
    });
    
    it("should call success callback, if the server is online", function() {
      var model = new PingPong(this.options);
      
      waits(waitTime);
      
      runs(function() {
        expect(this.options.success).toHaveBeenCalled();
      });
    });
    
    it("should call error callback, if the server is offline", function() {
      this.options.src = '/no_image_exists.png';
      var model = new PingPong(this.options);
      
      waits(waitTime);
      
      runs(function() {
        expect(this.options.error).toHaveBeenCalled();
      });
    });
  }); // callbacks
  
}); // Ping-Pong