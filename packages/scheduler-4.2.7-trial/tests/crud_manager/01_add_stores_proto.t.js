StartTest(function(t) {

    // Checks that CRUD manager supports stores defined on prototype level

    t.it('Abstract CrudManager supports "stores" from prototype', function (t) {

        t.expectGlobal('TestCrudManager1');

        Ext.define('TestCrudManager1', {
            extend      : 'Sch.crud.AbstractManager',

            stores      : ['resources', 'events']
        });

        var resourceStore   = t.getResourceStore(),
            eventStore      = t.getEventStore();

        var crud    = Ext.create('TestCrudManager1');

        t.is(crud.stores.length, 2, 'proper number of stores');
        t.is(crud.getStore('resources'), resourceStore, 'resourceStore found');
        t.is(crud.getStore('events'), eventStore, 'eventStore found');
        t.is(crud.stores[0].store, resourceStore, 'resourceStore is 0th');
        t.is(crud.stores[1].store, eventStore, 'eventStore is 1st');
    });

    t.it('Sch.data.CrudManager supports "stores" from prototype', function (t) {

        t.expectGlobal('TestCrudManager2');

        var resourceStore   = t.getResourceStore(),
            eventStore      = t.getEventStore(),
            dependencyStore = t.getDependencyStore(),
            fooStore        = t.getResourceStore({ storeId : 'foo' }),
            barStore        = t.getEventStore({ storeId : 'bar' });

        Ext.define('TestCrudManager2', {
            extend          : 'Sch.data.CrudManager',

            resourceStore   : 'resources',
            eventStore      : 'events',
            dependencyStore : dependencyStore,
            stores          : ['foo', 'bar']
        });

        var crud    = Ext.create('TestCrudManager2');

        t.is(crud.stores.length, 5, 'proper number of stores');
        t.is(crud.getResourceStore(), resourceStore, 'resourceStore found');
        t.is(crud.getEventStore(), eventStore, 'eventStore found');
        t.is(crud.getDependencyStore(), dependencyStore, 'dependencyStore found');
        t.is(crud.getStore('resources'), resourceStore, 'resourceStore found');
        t.is(crud.getStore('events'), eventStore, 'eventStore found');
        t.is(crud.getStore('foo'), fooStore, 'fooStore found');
        t.is(crud.getStore('bar'), barStore, 'barStore found');
        t.is(crud.stores[0].store, fooStore, 'fooStore is 0th');
        t.is(crud.stores[1].store, barStore, 'barStore is 1st');
        t.is(crud.stores[2].store, eventStore, 'eventStore is 2nd');
        t.is(crud.stores[3].store, resourceStore, 'resourceStore is 3rd');
    });
});
