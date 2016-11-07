StartTest(function(t) {

    // Here we test that a CRUD manager appends records to a flat store when "append: true" is passed to load() call

    t.expectGlobals('TestTransport', 'TestEncoder', 'TestCrudManager');

    var crudManager, async, assertionsFn, response;

    // dummy transport implementation
    // just waits for 50ms and then calls the successful callback
    Ext.define('TestTransport', {
        sendRequest : function (config) {
            window.setTimeout(function () {
                config.success.call(config.scope || this, response);
                assertionsFn && assertionsFn();
            }, 50);
        }
    });

    // dummy encoder, does nothing
    Ext.define('TestEncoder', {
        encode : function (data) { return data; },
        decode : function (data) { return data; }
    });

    Ext.define('TestCrudManager', {
        extend  : 'Sch.crud.AbstractManager',
        mixins  : [ 'TestTransport', 'TestEncoder' ]
    });


    t.beforeEach(function () {
        crudManager && crudManager.destroy();

        crudManager = Ext.create('TestCrudManager');
    });


    t.it('Appends records to a flat store when "append: true" options is passed to load() call', function (t) {

        async = t.beginAsync();

        var store1  = new Ext.data.TreeStore({
            fields      : [ 'id' ],
            storeId     : 'store1',
            proxy       : 'memory',
            root        : {
                expanded : true,
                children : [
                    { id : 1, leaf : true },
                    { id : 2, leaf : true },
                    { id : 3, leaf : true }
                ]
            }
        });

        var store2  = new Ext.data.JsonStore({
            fields  : [ 'id' ],
            storeId : 'store2',
            data    : [
                { id : 1 },
                { id : 2 }
            ]
        });

        crudManager.addStore(['store1', 'store2'])

        response    = {
            success : true,
            store1  : { rows : [{ id : 4 }] },
            store2  : { rows : [{ id : 3 }] }
        }

        assertionsFn = function () {
            t.endAsync(async);
            t.isDeeplyUnordered(store1.getRange(), [store1.getNodeById(4)], 'store1 has proper set of records');
            t.isDeeplyUnordered(store2.getRange(), [store2.getById(1), store2.getById(2), store2.getById(3)], 'store2 has proper set of records');
        };

        crudManager.load({
            store2 : { append : true }
        });

    });

});
