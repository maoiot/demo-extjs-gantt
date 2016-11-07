StartTest(function (t) {

    var crudManager, response, assertionsFn, async;

    t.expectGlobals('TestTransport', 'TestEncoder', 'TestCrudManager');

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

        crudManager = Ext.create('TestCrudManager', {
            trackResponseType : true
        });
    });

    t.it('CrudManager handles "sync" response on "load" request for a flat store', function (t) {

        async = t.beginAsync();

        t.expectGlobals('TestModel1');

        Ext.define('TestModel1', {
            extend : 'Ext.data.Model',
            fields : ['id', 'text1']
        })

        var store1 = Ext.create('Ext.data.Store', {
            model   : 'TestModel1',
            proxy   : 'memory',
            storeId : 'store1',
            data    : [
                { id : 1, text1 : 'foo' },
                { id : 2, text1 : 'bar' }
            ]
        });

        crudManager.addStore(store1);

        response = {
            type    : 'sync',
            success : true,
            store1  : {
                rows : [
                    { id : 1, text1 : 'new text1' },
                    { id : 3, text1 : 'new row' }
                ],
                removed : [
                    { id : 2 }
                ]
            }
        }

        t.wontFire(store1, 'load');

        assertionsFn = function () {
            t.endAsync(async);
            t.isDeeplyUnordered(store1.getRange(), [store1.getById(1), store1.getById(3)], 'store1 has proper set of records');
            t.notOk(store1.getNewRecords().count, 'store1 has no new records');
            t.notOk(store1.getUpdatedRecords().count, 'store1 has no updated records');
            t.notOk(store1.getRemovedRecords().count, 'store1 has no removed records');
        }

        crudManager.load();
    });


    t.it('CrudManager handles "sync" response on "load" request for a tree store', function (t) {

        async = t.beginAsync();

        t.expectGlobals('TestModel2');

        Ext.define('TestModel2', {
            extend : 'Ext.data.Model',
            fields : ['id', 'text1']
        })

        var store1 = Ext.create('Ext.data.TreeStore', {
            model   : 'TestModel2',
            proxy   : 'memory',
            storeId : 'store1',
            root    : {
                expanded : true,
                children : [
                    { id : 1, text1 : 'node-1', leaf : true },
                    {
                        id       : 2,
                        text1     : 'node-2',
                        expanded : true,
                        children : [
                            { id : 21, text1 : 'node-21', leaf : true },
                            { id : 22, text1 : 'node-22', leaf : true }
                        ]
                    },
                    { id : 3, text1 : 'node-3' }
                ]
            }
        });

        crudManager.addStore(store1);

        response = {
            type    : 'sync',
            success : true,
            store1  : {
                rows : [
                    { id : 4, text1 : 'node-4' },
                    { id : 23, text1 : 'node-23', parentId : 2 },
                    { id : 2, parentId : 1 },
                    {
                        id       : 5,
                        text1     : 'node-5',
                        expanded : true,
                        children : [
                            { id : 51, text1 : 'node-51', leaf : true },
                            { id : 52, text1 : 'node-52', leaf : true }
                        ]
                    }
                ],
                removed : [
                    { id : 21 }
                ]
            }
        }

        t.wontFire(store1, 'load');

        assertionsFn = function () {
            t.endAsync(async);

            t.notOk(store1.getNewRecords().count, 'store1 has no new records');
            t.notOk(store1.getUpdatedRecords().count, 'store1 has no updated records');
            t.notOk(store1.getRemovedRecords().count, 'store1 has no removed records');

            // expand node-1 to make sure getRange() returns all the store records
            store1.getNodeById(1).expand();

            t.isDeeplyUnordered(store1.getRange(), [
                store1.getNodeById(1),
                store1.getNodeById(2),
                store1.getNodeById(22),
                store1.getNodeById(23),
                store1.getNodeById(3),
                store1.getNodeById(4),
                store1.getNodeById(5),
                store1.getNodeById(51),
                store1.getNodeById(52)
            ], 'store1 has proper set of records');

            t.isDeeplyUnordered(store1.getRoot().childNodes, [
                store1.getNodeById(1),
                store1.getNodeById(3),
                store1.getNodeById(4),
                store1.getNodeById(5)
            ], 'root has proper set of children');

            t.isDeeplyUnordered(store1.getNodeById(1).childNodes, [store1.getNodeById(2)], 'node-1 has proper set of children');
            t.isDeeplyUnordered(store1.getNodeById(3).childNodes, [], 'node-3 has proper set of children');
            t.isDeeplyUnordered(store1.getNodeById(4).childNodes, [], 'node-4 has proper set of children');
            t.isDeeplyUnordered(store1.getNodeById(5).childNodes, [store1.getNodeById(51), store1.getNodeById(52)], 'node-5 has proper set of children');
            t.isDeeplyUnordered(store1.getNodeById(2).childNodes, [store1.getNodeById(22), store1.getNodeById(23)], 'node-2 has proper set of children');
        }

        crudManager.load();
    });

});