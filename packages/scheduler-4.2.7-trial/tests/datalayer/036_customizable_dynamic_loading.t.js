StartTest(function (t) {

    // #3144 - Customizable model looses inherited fields when dynamic classes loading is used

    t.expectGlobals('BaseModel', 'SubModel', 'MyStore');

    Ext.Loader.setConfig({
        enabled        : true,
        disableCaching : true,
        paths          : {
            'Sch'       : '../js/Sch',
            'Robo'      : '../../robo/lib/Robo',
            'BaseModel' : 'datalayer/BaseModel.js',
            'SubModel'  : 'datalayer/SubModel.js'
        }
    });

    t.it('Model converts String values to Date instances when Ext.Loader is used', function (t) {

        var async = t.beginAsync();

        Ext.require(['SubModel', 'Ext.data.Store', 'Ext.data.proxy.Memory'], function () {
            var store = new Ext.data.Store({
                model : 'SubModel',
                proxy : 'memory'
            });

            var proxy = store.getProxy();

            store.on('load', function () {
                t.is(store.getAt(0).getField1(), new Date(2016, 7, 15), 'proper date value found');
                t.endAsync(async);
            });

            proxy.data = [{ Field1 : '2016-08-15' }];
            store.load();
        });

    });

});
