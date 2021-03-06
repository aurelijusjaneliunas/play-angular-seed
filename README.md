Play and angular seed
=====================================================
This is a sample application how play and angular work together

Requirements
=============
* Play 2.2.1 
* Node 0.10.30
* Npm 1.4.21 
* Chrome extenstion RemoteLiveReload 0.0.46 (for live reload of the page)

ECMAScript 6 support
=============
* Babelify transformer added
 
Stack
=============
* Play 2.2.1
* Jade template engine
* Stylus css preprocessor
* AngularJS frontend framework
* Bootstrap3  css framework
* Yeoman based frontend build system 

Prepare development server
=============
    npm install -g yo bower grunt-cli

Run development server
=============

Start play/sbt and run the following -

    $ update
    $ npm install
    $ bower install
    $ grunt (optional)
    $ run

Translations
=============
Translation messages is transported using play-jsmessages v.1.6.1 and done some magic with angular to interpolate them 
via directive, filter or simple get them from messages catalog. 

Notes.
https://github.com/julienrf/play-jsmessages

Page routing
=============
To enable nested page views the module 'angular-route-segment' was used. It is an extension of ngRoute module.

Notes.
https://github.com/artch/angular-route-segment

Some information
=============

This application provides different routes -

**/oldhome** serves the _default_ play landing page

**/** redirects to **/ui/**

**/ui/** serves the _angular application_