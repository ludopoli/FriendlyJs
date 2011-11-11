FriendlyJs 0.0.1
============

## What's FriendlyJs?

Javascript clientside and nodejs library for making friendly URLs by stripping out non lating chars, as well as converting chars in different languages to their latin counterparts.

Using it in a browser is quite simple:

```javascript
friendly('like this') //=> "like-this"
friendly().url('or like that дада') //=> "or-like-that-dada"

// or something more interesing like that:
var boom = new friendly();
boom.alphabets //=> collection of alphabets and rules
boom.trimNonLatinChars('love!me') //=> 'love-me' 
boom.convertToLatin(str)  //=> converts non Latin chars using alphabets (cyrilic and german chars are supported by default). ex. 'Привет' -> 'Privet'
boom.url(str) /=>
boom.toString() /=> identical to url
```

## Installation

For Nodejs there two ways to install the thingy, [NPM](http://www.npmjs.org/) is one of them:

```bash
$ npm install friendlyjs
```
Git clone is another one:

```bash
$ git clone git@github.com:ludopoli/friendlyjs.git
```

And then just let the node know about it:

```javascript
var friendly = require('friendlyjs') // npm
var friendly = require('./friendly.js') // manual install
```

If you want to use the thing in the browser, well, just reference the file,
this will create a 'friendly' variable in the global score.


## Adding additional alphabets
is as easy as:

```javascript
var boom = new friendly();
boom.alphabets.sibirian = "^-a,@-o,f-j";
boom.convertToLatin('love^me@') //=> 'loveameo' 
boom.url('lov e^me@') /=> 'lov-eameo'
```



## Credits

- Vladimir Slavin - vladimirslavin@gmail.com - [nakedslavin](http://github.com/nakedslavin


## License

Copyright (c) 2011 Ludopoli &lt;hello@ludopoli.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.