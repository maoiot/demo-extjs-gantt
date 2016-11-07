Ext.define('Gnt.data.Monkey', function() {

    var actionsLearnt = [],
        sharedTpl = new Ext.XTemplate('');

    function learnAction(actionTpl) {
        // <debug>
        Ext.Assert.isObject(actionTpl, 'Action template must be an object');
        Ext.Assert.truthy(
            Ext.isArray(actionTpl.description) || Ext.isString(actionTpl.description) || Ext.isFunction(actionTpl.description),
            'Action template must have description property defined, string, array or function is ok'
        );
        Ext.Assert.isFunctionProp(actionTpl, 'play');
        // </debug>

        actionsLearnt.push(actionTpl);

        return actionTpl;
    }

    function playAction(random, actionTpl, data, next) {
        var params = {},
            keys = Ext.Object.getKeys(actionTpl).sort();

        Ext.Array.forEach(keys, function(k) {
            var v = actionTpl[k];

            if (k !== 'play' && Ext.isFunction(v)) {
                params[k] = v(random, data, params);
            }
            else if (k !== 'play') {
                params[k] = v;
            }
        });

        sharedTpl.set(actionTpl.description || '');
        params.description = sharedTpl.apply(params);

        actionTpl.play(data, params, function() {
            next && next(params);
        });
    }

    //
    // Class public interface
    //
    return {
        uses : [
            'Gnt.data.Random'
        ],

        config : {
            /**
             * Random seed to inject into monkey's brain
             */
            seed : 'Bryntum',
            /**
             * Minimum actions a monkey will playfully execute
             */
            minActionsToDo : 1,
            /**
             * Maximum actions a monkey will playfully execute
             */
            maxActionsToDo : 5
        },

        constructor : function(config) {
            this.initConfig(config);
        },

        applyMinActionsToDo : function(value) {
            var maxActions = this.getMaxActionsToDo();
            return Ext.isNumber(value) && value > 0 && (Ext.isNumber(maxActions) ? value <= maxActions : true) ? value : undefined;
        },

        applyMaxActionsToDo : function(value) {
            var minActions = this.getMinActionsToDo();
            return Ext.isNumber(value) && value > 0 && (Ext.isNumber(minActions) ? value >= minActions : true) ? value : undefined;
        },

        /**
         * Starts monkey playing on a data, calling cb when it's done
         *
         * @param {Object} data The same object {@link Gnt.data.Generator#generateData()} returns
         * @param {Function} cb
         */
        playOn : function(data, cb) {
            var me = this,
                random = Gnt.data.Random.makeGenerator(me.getSeed()),
                actionsToPlay = random(me.getMinActionsToDo(), me.getMaxActionsToDo() + 1),
                actionsPlayed = [];

            function play() {
                playAction(random, random(actionsLearnt), data, function(action) {
                    actionsPlayed.push(action);
                    if (actionsPlayed.length < actionsToPlay) {
                        Ext.Function.defer(play, 1);
                    }
                    else {
                        cb && Ext.Function.defer(function() {
                            cb(actionsPlayed);
                        }, 1);
                    }
                })
            }

            play();
        },

        statics : {
            learn : learnAction
        }
    };
});
