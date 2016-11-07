/**
 * Provides {@link Gnt.data.Random#random} function, a seedable random number generator on steroids.
 *
 * This class requires Seedrandom library to generate reproducable results using seed, otherwise it fallsback to
 * Math.random()
 */
Ext.define('Gnt.data.Random', function() {

    /**
     * Generates a random number in [min, max) range using rnd function to generate a random number in [0, 1) range,
     * or generates a random number in [0, min) range if max is not given, or selects a random item from an array
     * given in min parameter and using max parameter as maximum index limit or as index probability distribution
     * function if given, or returns a key from an object given in min parameter using corresponding key values as
     * key probabilities.
     *
     * @param {Function} rnd Random number generator function which returns random numbers in [0, 1) range
     * @param {Number|Array|Object} [min]
     * @param {Number|Function} [max]
     * @return {Number/String/Mixed}
     *
     * @member Gnt.data.Random
     */
    function random(rnd, min, max) {
        var EO = Ext.Object,
            EA = Ext.Array,
            keys, vals, kvsum, randVal,
            result;

        switch (true) {
        // Keys by key probability
        case Ext.isObject(min):
            keys = EO.getKeys(min).sort();
            vals = EA.map(keys, function(key) {
                var v = min[key];
                return Ext.isFunction(v) ? v(key, keys) : v;
            });
            kvsum = EA.sum(vals);
            vals = EA.map(vals, function(val) {
                return val / kvsum;
            });
            randVal = random(rnd);
            result = EA.reduce(vals, function(prev, curr, index) {
                var reduceResult = prev;

                if (!Ext.isString(prev)) {
                    if (prev <= randVal && randVal < prev + curr) {
                        reduceResult = keys[index];
                    }
                    else {
                        reduceResult = prev + curr;
                    }
                }

                return reduceResult;
            }, 0);
            break;
        // Array element by index probability
        case Ext.isArray(min) && Ext.isFunction(max):
            randVal = EA.reduce(min, function(prev, curr, index) {
                prev[index] = max(index, curr);
                return prev;
            }, {});
            result = min[random(rnd, randVal)];
            break;
        // Array element up to max index (not including) or up to array length
        case Ext.isArray(min):
            result = min[random(rnd, 0, max || min.length)];
            break;
        // Integer within [min, max)
        case min !== undefined && max !== undefined:
            result = min + Math.floor((max - min) * rnd());
            break;
        // Integer within [0, max)
        case min !== undefined:
            result = Math.floor(min * rnd());
            break;
        // Float wither [0, 1)
        default:
            result = rnd();
        }

        return result;
    }

    //
    // Class public interface
    //
    return {
        singleton : true,

        /**
         * Returns random numbers generating function which uses given seed to initialize random numbers sequence.
         *
         * @param {Mixed} seed
         * @return {Function} See {@link Gnt.data.Random#random} for more information about min/max paramters
         * @return {Number|Array|Object} return.min
         * @return {Number|Function} return.max
         * @return {Mixed} return.return
         *
         * @static
         * @member Gnt.data.Generator
         */
        makeGenerator : function(seed) {
            // <debug>
            if (!Math.seedrandom) {
                Ext.log({
                    msg : 'No seedrandom library found, falling back to standard Math.random() random numbers generator',
                    level : 'warn'
                });
            }
            // </debug>
            var rnd = Math.seedrandom && new Math.seedrandom(seed) || Math.random;

            return function(min, max) {
                return random(rnd, min, max);
            }
        },

        random : random
    }
});
