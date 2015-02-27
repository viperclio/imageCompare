# imageCompare
Light and fast only 3kb before/after image plugin with no dependencies


Live demo here http://codepen.io/anon/pen/wBXqqb

To initialize the plugin just make a simple markup like:
<div class="container">
	<img src="img/demo1.png" />
	<img src="img/demo2.png" />
</div>

and then declare a new instance of the plugin like:
var compare = new ImageDetect('.container');
              or
var compare = new ImageDetect('.container', 2); // you can use 1, 2, 3 or 4 to set where the moving overlay will start at. Default is 2

and finally run the init() method on the new instance:
compare.init();

Enjoy!!


