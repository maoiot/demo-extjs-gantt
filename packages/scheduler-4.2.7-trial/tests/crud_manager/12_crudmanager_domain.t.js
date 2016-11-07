StartTest(function(t) {

    t.expectGlobals('MyApp', 'TestCrudManager1', 'TestCrudManager2');

    var response = {
        success  : true,
        revision : 99
    };

    Ext.define('TestCrudManager1', {
        extend : 'Sch.crud.AbstractManager',

        encode : function (data) { return data; },
        decode : function (data) { return data; },
        sendRequest : function (config) {
            window.setTimeout(function () {
                config.success.call(config.scope || this, response);
            }, 1);
        },
        listeners : {
            load : function () {
                // set flag that this CRUD manager is loaded
                this.__loaded = true;
            }
        }
    });

    Ext.define('TestCrudManager2', {
        extend : 'TestCrudManager1',
        // this crud manager class has another alias
        alias  : 'crudmanager.foo'
    });


    // counter of listened events per a selector
    var counter = {
        '*'   : 0,
        'foo' : 0
    };


    t.it('CrudManagerDomain allows an application to listen to CRUD manager events', function (t) {

        var crud1 = Ext.create('TestCrudManager1'),
            crud2 = Ext.create('TestCrudManager2');

        Ext.application({
            requires : [ 'Sch.app.CrudManagerDomain' ],
            name     : 'MyApp',
            listen   : {
                crudmanager : {
                    '*' : {
                        beforeloadapply : function () {
                            counter['*']++;
                        }
                    },
                    'foo' : {
                        beforeloadapply : function () {
                            counter.foo++;
                        }
                    }
                }
            }
        });

        t.waitFor(
            // wait till both crud managers get loaded
            function () {
                return crud1.__loaded && crud2.__loaded;
            },
            // check number of listener calls
            function () {
                t.isDeeply(counter, { '*' : 2, 'foo' : 1 }, 'Listeners were called proper number of times');
            }
        );

        crud1.load();
        crud2.load();

    });

});
