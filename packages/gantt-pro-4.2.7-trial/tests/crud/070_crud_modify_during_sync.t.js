StartTest(function (t) {
    t.diag('When using autoSync, updating records during a sync operation should not attempt another sync');

    t.mountJsonResponse('create', [{
        "StartDate"    : "2010-02-22",
        "EndDate"      : "2010-02-23",
        "PercentDone"  : 0,
        "Name"         : "New task",
        "Duration"     : 1,
        "DurationUnit" : "d",
        "leaf"         : true
    }]);

    t.mountJsonResponse('read', [{
        "Id"           : 1,
        "StartDate"    : "2010-02-22",
        "EndDate"      : "2010-02-23",
        "PercentDone"  : 0,
        "Name"         : "New task",
        "Duration"     : 1,
        "DurationUnit" : "d",
        "leaf"         : true
    }]);

    var taskStore = Ext.create("Gnt.data.TaskStore", {
        autoSync : true,

        proxy : {
            type : 'ajax',

            api    : {
                create : 'create',
                read   : 'read'
            },
            reader : {
                type : 'json'
            }
        },

        root : {
            expanded : true
        }
    });

    t.chain(
        { waitForStoresToLoad : taskStore },

        function (next) {
            taskStore.on('beforesync', function (operations) {
                taskStore.on('beforesync', verify, null, { single : true });

                taskStore.getRootNode().appendChild({ Name : 'new' });
            }, null, { single : true });

            // This add should trigger the sync method
            taskStore.getRootNode().appendChild({ Name : 'old' });
        }
    );

    function verify(operations) {
        t.it('Second add should trigger another sync action, not including the first record', function(t) {
            t.is(operations.create.length, 1, '1 record to write');
            t.is(operations.create[0].getName(), 'new', 'Correct record found');
        })
    }
})
