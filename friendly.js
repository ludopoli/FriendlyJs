var module = typeof(module) === 'undefined' ?  {} : module;

// friendlyjs 0.0.1
// (c) 2011 Vladimir Slavin, Ludopoli GmbH.
// friendly.js is freely distributable under the MIT license.

var friendlyjs = 
(function() {
	// stripped down version of UnderscoreJs (Underscore.js 1.2.1
	// (c) 2011 Jeremy Ashkenas, DocumentCloud Inc. MIT)
	// maybe it makes sence to reference the whole library module in node environment,
	// once the _ bug is fixed.
	// full library can be found here http://documentcloud.github.com/underscore
	function getUnderscoreLib() {
		var underscore = {};

		var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
		
		var wrap = function(obj) { return new wrapper(obj); };
	  	var slice            = ArrayProto.slice,
	      unshift          = ArrayProto.unshift,
	      toString         = ObjProto.toString,
	      hasOwnProperty   = ObjProto.hasOwnProperty;

	  var
	    nativeForEach      = ArrayProto.forEach,
	    nativeMap          = ArrayProto.map,
	    nativeReduce       = ArrayProto.reduce,
	    nativeReduceRight  = ArrayProto.reduceRight,
	    nativeFilter       = ArrayProto.filter,
	    nativeEvery        = ArrayProto.every,
	    nativeSome         = ArrayProto.some,
	    nativeIndexOf      = ArrayProto.indexOf,
	    nativeLastIndexOf  = ArrayProto.lastIndexOf,
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind;
	
	  underscore.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) == '[object Array]';
	  };
	  if (toString.call(arguments) == '[object Arguments]') {
	    underscore.isArguments = function(obj) {
	      return toString.call(obj) == '[object Arguments]';
	    };
	  } else {
	    underscore.isArguments = function(obj) {
	      return !!(obj && hasOwnProperty.call(obj, 'callee'));
	    };
	  }
		
		var each = underscore.each = underscore.forEach = function(obj, iterator, context) {
	    if (obj == null) return;
	    if (nativeForEach && obj.forEach === nativeForEach) {
	      obj.forEach(iterator, context);
	    } 
		else {
	      for (var key in obj) {
	        if (hasOwnProperty.call(obj, key)) {
	          if (iterator.call(context, obj[key], key, obj)) return;
	        }
	      }
	    }
	  };

	underscore.filter = underscore.select = function(obj, iterator, context) {
	    var results = [];
	    if (obj == null) return results;
	    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
	    each(obj, function(value, index, list) {
	      if (iterator.call(context, value, index, list)) results[results.length] = value;
	    });
	    return results;
	  };
	  underscore.map = function(obj, iterator, context) {
	    var results = [];
	    if (obj == null) return results;
	    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
	    each(obj, function(value, index, list) {
	      results[results.length] = iterator.call(context, value, index, list);
	    });
	    return results;
	  };
	
	  underscore.flatten = function(array, shallow) {
	    return underscore.reduce(array, function(memo, value) {
	      if (underscore.isArray(value)) return memo.concat(shallow ? value : underscore.flatten(value));
	      memo[memo.length] = value;
	      return memo;
	    }, []);
	  };
	
	  underscore.toArray = function(iterable) {
	    if (!iterable)                return [];
	    if (iterable.toArray)         return iterable.toArray();
	    if (underscore.isArray(iterable))      return slice.call(iterable);
	    if (underscore.isArguments(iterable))  return slice.call(iterable);
	    return underscore.values(iterable);
	  };

	  underscore.reduce = underscore.foldl = underscore.inject = function(obj, iterator, memo, context) {
	    var initial = memo !== void 0;
	    if (obj == null) obj = [];
	    if (nativeReduce && obj.reduce === nativeReduce) {
	      if (context) iterator = underscore.bind(iterator, context);
	      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
	    }
	    each(obj, function(value, index, list) {
	      if (!initial) {
	        memo = value;
	        initial = true;
	      } else {
	        memo = iterator.call(context, memo, value, index, list);
	      }
	    });
	    if (!initial) throw new TypeError("Reduce of empty array with no initial value");
	    return memo;
	  };	
	  underscore.identity = function(value) {
	    return value;
	  };
	  underscore.keys = function(obj) {
	    if (obj !== Object(obj)) throw new TypeError('Invalid object');
	    var keys = [];
	    for (var key in obj) if (hasOwnProperty.call(obj, key)) keys[keys.length] = key;
	    return keys;
	  };
	  underscore.values = function(obj) {
	    return underscore.map(obj, underscore.identity);
	  };

	  return underscore;
	}
	var underscore =  getUnderscoreLib();
	
	
	// @add additional alphabets as needed.
	var alphabets = {};
	alphabets.german = "ä-ae,ö-oe,ü-ue,ß-ss";
	alphabets.cyrilic = "а-a,б-b,в-v,г-g,д-d,е-e,ё-e,ж-zh,з-z,и-i,й-j,к-k,л-l,м-m,н-n,о-o,п-p,р-r,с-s,т-t,у-u,ф-f,х-kh,ц-tc,ч-ch,ш-sh,щ-sh,ы-i,э-e,ю-yu,я-ya";

	function convertToLatin(str) {
		if(str) {
			var rules = [],
				resultedString = "";
			
			// include additional alphabets if provided
			if(alphabets && underscore.keys(alphabets).length > 0) {
				var allAlphabets = underscore.values(alphabets);
				var mappedRules = underscore.map(allAlphabets, function(a) {
					return a.split(',');
				});
				rules = underscore.flatten(mappedRules);
				
					
				for(var s in str) {
					if(typeof(str[s]) === 'string') {
						
						var single = underscore.filter(rules,function(rule) {
							return rule.split('-')[0] == str[s].toLowerCase();
						});

						if(single.length > 0) {
							var surprise = single[0].split('-')[1];
							resultedString += surprise;
						}
						else {
							resultedString += str[s];
						}
					}
				}
				return resultedString;

			}
		}
		return str || "";
	}


	function trimNonLatinChars(str) { 
		if(str) {
			var latinAlphabet = "abcdefghijklmnopqrstuvwxyz";
			var arabicNumbers = "1234567890";
			var resultedString = "";

			for(var s in str) {
				if(typeof(str[s]) === 'string') {
					if(latinAlphabet.indexOf(str[s].toLowerCase()) > -1 || 
						arabicNumbers.indexOf(str[s]) > -1) { 
							resultedString += str[s];
					}
					else {
							resultedString += '-'; 
					}
				}
			}
			return resultedString;
		}
		else { return ""; }
	}

	return function(str) {
		this.alphabets = alphabets;
		this.trimNonLatinChars = function(str) {return trimNonLatinChars(str); };
		this.convertToLatin = function(str) {return convertToLatin(str); };
		this.url = function(str) {return trimNonLatinChars(convertToLatin(str)); }
		this.toString = function() {
			return this.url(str);
		}
	}

})();

if(module.exports) {
	// commonjs/nodejs env.
	module.exports.friendly = function(str) { return new friendlyjs(str); }
}
else {
	window.friendly = function(str) { return new friendlyjs(str); }
}