StartTest(function(t) {

    // Here we test reject() method of Sch.data.CrudManager class

    var initTestData = function () {

        var resourceStore = t.getResourceTreeStore(),
            eventStore    = t.getEventStore();

        var someStore1  = new Ext.data.JsonStore({
            storeId     : 'someStore1',
            fields      : ['id', 'ff1', 'ff2'],
            data        : [
                { id : 11, ff1 : '11', ff2 : '111' },
                { id : 12, ff1 : '22', ff2 : '222' },
                { id : 13, ff1 : '33', ff2 : '333' }
            ]
        });

        var someStore2  = new Ext.data.TreeStore({
            storeId     : 'someStore2',
            fields      : ['id', 'f1', 'f2'],
            root        : {
                expanded    : true,
                children    : [
                    { id : 1, f1 : '11', f2 : '111' },
                    { id : 2, f1 : '22', f2 : '222' },
                    { id : 3, f1 : '33', f2 : '333' },
                    { id : 4, f1 : '44', f2 : '444' }
                ]
            }
        });

        var crud    = Ext.create('Sch.data.CrudManager', {
            resourceStore   : resourceStore,
            eventStore      : eventStore,
            stores          : [ someStore1, someStore2 ],
            revision        : 1
        });

        // init stores changes
        var res = resourceStore.getRoot().appendChild({});
        resourceStore.getNodeById('r7').set('Name', 'foo');
        resourceStore.getNodeById('r8').remove();

        eventStore.add({
            ResourceId : res.getId(),
            StartDate  : new Date(2011, 0, 3),
            EndDate    : new Date(2011, 0, 5)
        });
        eventStore.getById(1).set('Name', 'bar');
        eventStore.remove(eventStore.getById(5));

        someStore1.remove(someStore1.getById(11));
        someStore1.getById(12).set('ff1', '-22');
        someStore1.add({ 'ff1' : 'new', 'ff2' : 'new' });

        someStore2.getRootNode().removeChild(someStore2.getNodeById(4));
        someStore2.getNodeById(3).set('f1', '-33');
        someStore2.getNodeById(3).appendChild({ f1 : '55', f2 : '555' });

        return crud;
    };

    t.it('reject() cleans up all dirty records', function (t) {

        var crud            = initTestData(),
            someStore1      = crud.getStore('someStore1'),
            someStore2      = crud.getStore('someStore2'),
            resourceStore   = crud.getResourceStore(),
            eventStore      = crud.getEventStore();

        crud.reject();

        t.notOk(resourceStore.getModifiedRecords().length, 'resourceStore: has no dirty added/updated records');
        t.notOk(resourceStore.getRemovedRecords().length, 'resourceStore: has no dirty removed records');
        t.notOk(eventStore.getModifiedRecords().length, 'eventStore: has no dirty added/updated records');
        t.notOk(eventStore.getRemovedRecords().length, 'eventStore: has no dirty removed records');
        t.notOk(someStore1.getModifiedRecords().length, 'someStore1: has no dirty added/updated records');
        t.notOk(someStore1.getRemovedRecords().length, 'someStore1: has no dirty removed records');
        t.notOk(someStore2.getModifiedRecords().length, 'someStore2: has no dirty added/updated records');
        t.notOk(someStore2.getRemovedRecords().length, 'someStore2: has no dirty removed records');

        t.is(someStore2.count(), 4, 'someStore2: proper number of records');

    });

});
