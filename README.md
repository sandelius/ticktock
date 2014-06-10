## TickTock

Simple Javascript timer that allows you to `start`, `stop` and `reset` the timer.

### Usage

    <span id="timer"></span>

    <script>
        window.onload = function() {

            var tt = new TickTock('#timer', {
                onStop: function(tt) {
                    alert('Stopped at ' + tt.seconds + ' seconds.');
                }
            });

            // Start the timer
            tt.start();

            // Stop the timer
            tt.stop();

            // Reset the timer
            tt.reset();
        }
    </script>

We can use data attributes to set the default starting point, in seconds.

    <span id="timer" data-seconds="360"></span>
    0:06:00

See the `demo.html` for examples.

#### Options
    var tt = new TickTock('#timer', {
        onStart: function(tt) {},
        onStop:  function(tt) {},
        onreset: function(tt) {}
    });
