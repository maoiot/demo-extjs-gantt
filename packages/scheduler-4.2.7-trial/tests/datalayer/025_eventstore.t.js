StartTest(function (t) {

    t.it('Basic instantiation', function (t) {
        var store = Ext.create('Sch.data.EventStore', {
            data : [{}]
        });

        t.isInstanceOf(store.first(), Sch.model.Event, 'Store should be configured with Sch.model.Event');

        store = Ext.create('Sch.data.EventStore', {
            model : 'Sch.model.Event',
            data  : [{}]
        });

        t.isInstanceOf(store.first(), Sch.model.Event, 'Should use EventModel when specifying model as String');

        Ext.define('Sch.model.Event2', {
            extend : 'Sch.model.Event'
        });

        store = Ext.create('Sch.data.EventStore', {
            model : 'Sch.model.Event2',
            data  : [{}]
        });

        t.isInstanceOf(store.first(), Sch.model.Event, 'Should be ok to subclass EventModel');

        t.throwsOk(function () {
            var store = Ext.create('Sch.data.EventStore', {
                model : Ext.define('Ext.ux.Mod', { extend : 'Ext.data.Model', proxy : 'memory' })
            });
        }, 'The model for the EventStore must subclass Sch.model.Event');

    });

    t.it('getEventsInTimeSpan + getTotalTimeSpan', function (t) {
        var store = Ext.create('Sch.data.EventStore', {
            data : [
                { Id : 1, ResourceId : 'c2', Name : 'Linda', StartDate : "2010-12-09", EndDate : "2010-12-13" }
            ]
        });

        var rs = new Sch.data.ResourceStore();
        store.setResourceStore(rs);

        t.is(store.resourceStore, rs, 'Should find resourceStore set on the eventStore');
        store.setResourceStore();

        t.is(store.getEventsInTimeSpan(new Date(2010, 11, 9), new Date(2010, 11, 13)).getCount(), 1, 'getEventsInTimeSpan');
        t.is(store.getEventsInTimeSpan(new Date(2010, 11, 9), new Date(2010, 11, 10), false).getCount(), 0, 'getEventsInTimeSpan partial miss');
        t.is(store.getEventsInTimeSpan(new Date(2010, 11, 9), new Date(2010, 11, 13), false).getCount(), 1, 'getEventsInTimeSpan get 1');

        t.isDeeplyStrict(store.getTotalTimeSpan(), {
            start : new Date(2010, 11, 9),
            end   : new Date(2010, 11, 13)
        }, 'getTotalTimeSpan');

        store.add(new Sch.model.Event({
            StartDate : new Date(2009, 1, 1)
        }));

        t.isDeeplyStrict(store.getTotalTimeSpan(), {
            start : new Date(2009, 1, 1),
            end   : new Date(2010, 11, 13)
        }, 'getTotalTimeSpan 2');

        store.remove(store.first());
    });

    t.it('getTotalTimeSpan partial data', function (t) {
        var store = Ext.create('Sch.data.EventStore', {
            data : [
                { StartDate : "2010-12-09" }
            ]
        });

        t.isDeeplyStrict(store.getTotalTimeSpan(), {
            start : new Date(2010, 11, 9),
            end   : new Date(2010, 11, 9)
        }, 'Missing end date');

        store.first().set({
            StartDate : null,
            EndDate   : new Date(2009, 1, 1)
        });

        t.isDeeplyStrict(store.getTotalTimeSpan(), { start : null, end : new Date(2009, 1, 1) }, 'Missing start date');
    });

    t.it('getByInternalId + append', function (t) {
        var store = Ext.create('Sch.data.EventStore', {
            data : [
                { ResourceId : 'c2', Name : 'Linda', StartDate : "2010-12-09", EndDate : "2010-12-13" }
            ]
        });

        t.is(store.getByInternalId(store.first().internalId), store.first(), 'getByInternalId');

        store.append({ Id : 2 });

        t.ok(store.getById(2), 'Found record after "append"');
    });

    t.it('getEventStore should return EventStore instance or null', function (t) {
        var vm = new Ext.app.ViewModel();
        var eventRecord = new Sch.model.Event();

        var assertStoreGetters = function () {
            t.notOk(eventRecord.getEventStore());
            t.notOk(eventRecord.getResource());
        };

        assertStoreGetters();

        vm.set('event', eventRecord);

        assertStoreGetters();
    });

    t.it('Should properly report list of events assigned to resource', function (t) {
        function idify(arr) {
            return Ext.Array.map(arr, function (item) {
                return item.getId();
            });
        }

        var store = new Sch.data.EventStore({
            data : [
                { ResourceId : 1, Id : 1 }
            ]
        });

        t.isDeeply(idify(store.getEventsForResource(1)), [1]);

        store.add([
            { ResourceId : 1, Id : 2 },
            { ResourceId : 1, Id : 3 },
            { ResourceId : 2, Id : 4 }
        ])

        t.isDeeply(idify(store.getEventsForResource(1)), [1, 2, 3]);
        t.isDeeply(idify(store.getEventsForResource(2)), [4]);

        store.remove(store.first());

        t.isDeeply(idify(store.getEventsForResource(1)), [2, 3]);
        t.isDeeply(idify(store.getEventsForResource(2)), [4]);

        store.remove(store.last());

        t.isDeeply(idify(store.getEventsForResource(1)), [2, 3]);
        t.isDeeply(idify(store.getEventsForResource(2)), []);

        var event = store.add({ ResourceId : 3, Id : 5 })[0]

        t.isDeeply(idify(store.getEventsForResource(3)), [5]);

        event.setResourceId(1);

        t.isDeeply(idify(store.getEventsForResource(1)), [2, 3, 5]);

        store.removeAll();

        t.isDeeply(idify(store.getEventsForResource(1)), []);

        store.loadData([
            { ResourceId : 1, Id : 1 }
        ]);

        t.isDeeply(idify(store.getEventsForResource(1)), [1]);
    });

    t.it('Resource/Event cache should handle server setting a new ResourceId field', function (t) {

        // SimManager is broken in 6.0.0
        if (Ext.versions.extjs.isLessThan('6.0.1')) return;

        var resourceStore = new Sch.data.ResourceStore({
            data : [
                { Id : 1 },
                { Id : 2 }
            ]
        });
        var eventStore    = new Sch.data.EventStore({
            resourceStore : resourceStore,

            proxy : {
                type : 'ajax',
                api  : {
                    create : 'event/create'
                },
                writer : {
                    allowSingle : false
                },
                reader : 'json'
            }
        });

        Ext.ux.ajax.SimManager.init({ }).register(
            {
                'event/create' : {
                    stype : 'json',  // use JsonSimlet (stype is like xtype for components)
                    data  : [
                        { "Id" : 1, "ResourceId" : 2, "Name" : "new name" }
                    ]
                }
            }
        );

        eventStore.add({ ResourceId : 1 });

        var event = eventStore.first();

        t.is(resourceStore.getById(1).getEvents()[0], event);

        eventStore.on({
            write: function (store, operation) {
                var records = operation.getRecords();

                t.is(resourceStore.getById(1).getEvents().length, 0);
                t.is(resourceStore.getById(2).getEvents()[0], event);
            }
        })

        eventStore.sync();
    });
});
