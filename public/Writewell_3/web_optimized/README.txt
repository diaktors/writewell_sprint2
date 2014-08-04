I assume you have node.js installed. (http://nodejs.org/)
Also, .less is used for all custom css. (http://lesscss.org/)
Easiest way to auto-compile .less on a mac: http://incident57.com/less/

The app is built with require.js to handle js dependencies. r.js is used to minify the code and is a side add-on that works with require.js. 


You can run a simple HTTP server by naving to this (main) directory (the one with server.js in it)
Run: node server.js 

You can minify the code with the following. Once again, you're in the main directory.  All output is to the ‘web_optimized’ folder.
Run: sh ./optimize.sh
or 
Rum: node_modules/requirejs/bin/r.js -o js/app.build.js







/* edited by sairam */
header .nav-links li.help-icon:hover .dropdown-menu li{
    width: 195px;
    margin-right: -10px;
}




header .nav-links li.account:hover .dropdown-menu li a,header .nav-links li.help-icon:hover .dropdown-menu li a {
  width: 150px;
  height: 40px;
  border: none;



above block are related in css take care 1484