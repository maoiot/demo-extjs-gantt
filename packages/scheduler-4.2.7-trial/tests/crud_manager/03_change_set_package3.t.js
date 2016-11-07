StartTest(function(t) {

    // Checks that crud manager 'haschanges' event catches removals and doesn't react on tree store collapse/expand #2413

    t.expectGlobal('TestCrudManager1', 'TestModel');

    Ext.define('TestModel', {
        extend  : 'Ext.data.Model',

        fields  : ['id', 'text']
    });

    Ext.define('TestCrudManager1', {
        extend : 'Sch.crud.AbstractManager'
    });

    var someStore, crud;

    t.beforeEach(function () {

        someStore = new Ext.data.TreeStore({
            model   : 'TestModel',
            root    : {
                children : [
                    {
                        id       : 1,
                        text     : '11',
                        expanded : true,
                        children : [
                            {
                                id   : 11,
                                text : '11',
                                leaf : true
                            },
                            {
                                id   : 12,
                                text : '11',
                                leaf : true
                            }
                        ]
                    }
                ]
            }
        });

        crud = Ext.create('TestCrudManager1', {
            stores : [
                { store : someStore, storeId : 'foo' }
            ]
        });

    });

    t.it('haschanges event is not fired during nodes collapse/expand', function (t) {

        t.notOk(crud.getChangeSetPackage(), 'No changes initially');

        t.willFireNTimes(crud, 'haschanges', 1);

        someStore.getNodeById(12).remove();

        t.ok(crud.hasChanges(), 'hasChanges() is true');
    });

    t.it('haschanges event is not fired during nodes collapse/expand', function (t) {

        t.notOk(crud.getChangeSetPackage(), 'No changes initially');

        t.wontFire(crud, 'haschanges');

        var node = someStore.getNodeById(1);

        node.collapse();

        t.notOk(crud.hasChanges(), 'hasChanges() is false');

        node.expand();

        t.notOk(crud.hasChanges(), 'hasChanges() is still false');
    });

});
