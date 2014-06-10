/*!
 * TickTock 0.1
 * http://tobias.sandeli.us/
 * MIT licensed
 *
 * Copyright (C) 2014 Tobias Sandelius, http://tobias.sandeli.us/
 */

function TickTock(selector, opts) {

    /**
     * TickTock options.
     */
    this.options = {
        onStart: function() {},
        onStop:  function() {},
        onReset: function() {}
    };

    opts = opts || {}
    for (key in opts) {
        if (this.options.hasOwnProperty(key)) {
            this.options[key] = opts[key];
        };
    }

    /**
     * Main selector object.
     */
    this.el = document.querySelector(selector);

    /**
     * Original seconds.
     */
    this.original = parseInt(this.el.getAttribute('data-seconds') || 0);

    /**
     * Current ticking seconds.
     */
    this.seconds = this.original;

    if (this.el) {
        this.el.innerHTML = this.format(this.seconds);
    }
};

/**
 * Start the timer.
 *
 * @returns {void}
 */
TickTock.prototype.start = function() {
    if (this.interval) { return; }

    this.options.onStart(this);

    var self = this;
    this.interval = setInterval(function() {
        var old = self.seconds;
        self.seconds = parseInt(old) + 1;
        self.el.innerHTML = self.format(self.seconds);
    }, 1000);
};

/**
 * Stop the timer.
 *
 * @returns {void}
 */
TickTock.prototype.stop = function() {
    if (this.interval) {
        this.options.onStop(this);
        clearInterval(this.interval);
        this.interval = null;
    }
};

/**
 * Stop the timer.
 *
 * @returns {void}
 */
TickTock.prototype.reset = function() {
    this.options.onReset(this);
    this.stop();
    this.seconds = this.original;
    this.el.innerHTML = this.format(this.original);
};

/**
 * Format seconds into `00:00:00`.
 *
 * @param {Number} seconds - Seconds to format.
 *
 * @returns {string}
 */
TickTock.prototype.format = function(seconds) {
    var hh   = Math.floor(seconds / 3600);
    seconds -= hh * 3600;
    var mm   = Math.floor(seconds / 60);
    seconds -= mm * 60;
    var ss   = parseInt(seconds % 60, 10);
    format   = hh.toString() + ':';

    if (mm > 9) {
      format += mm.toString();
    } else {
      format += '0' + mm.toString();
    }

    format += ':';

    if (ss > 9) {
      format += ss.toString();
    } else {
      format += '0' + ss.toString();
    }

    return format;
};