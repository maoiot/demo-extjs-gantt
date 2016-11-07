StartTest(function (t) {

    // SimManager broken in Ext 6.0.0
    if (Ext.versions.extjs.isLessThan('6.0.1')) return

    t.mountJsonResponse('create', [{
        "Id"           : 122,
        "StartDate"    : "2010-02-22",
        "EndDate"      : "2010-02-23",
        "PercentDone"  : 0,
        "Name"         : "New task",
        "Duration"     : 1,
        "DurationUnit" : "d",
        "index"        : 5,
        "leaf"         : true
    }]);

    t.mountJsonResponse('get', [{
        "children"     : [
            {
                "children"     : null,
                "leaf"         : true,
                "expanded"     : false,
                "Id"           : 117,
                "StartDate"    : "2010-02-03",
                "EndDate"      : "2010-02-11",
                "PercentDone"  : 0,
                "Name"         : "Child 1",
                "Duration"     : 6,
                "DurationUnit" : "d",
                "index"        : 0
            }],
        "leaf"         : false,
        "expanded"     : true,
        "Id"           : 114,
        "StartDate"    : "2010-02-03",
        "EndDate"      : "2010-02-11",
        "PercentDone"  : 0,
        "Name"         : "Parent 1",
        "Duration"     : 6,
        "DurationUnit" : "d",
        "parentId"     : null,
        "index"        : 0
    }]);

    t.mountJsonResponse('update', [{
        "leaf"         : false,
        "expanded"     : true,
        "Id"           : 114,
        "StartDate"    : "2010-02-03",
        "EndDate"      : "2010-02-11",
        "PercentDone"  : 0,
        "Name"         : "Parent 1",
        "Duration"     : 7,
        "DurationUnit" : "d",
        "parentId"     : null,
        "index"        : 0// Seems required as of 4.1
    }]);

    var dependencyStore = Ext.create("Gnt.data.DependencyStore");

    var taskStore = Ext.create("Gnt.data.TaskStore", {
        // test was written with assumption of `cascadeChanges` : false
        cascadeChanges : false,
        autoSync        : true,
        dependencyStore : dependencyStore,

        root : {
            expanded : true
        },
        proxy : {
            type : 'ajax',
            api    : {
                create : 'create',
                read   : 'get',
                update : 'update'
            },
            reader : 'json'
        }
    });

    t.waitForStoresToLoad(taskStore, function () {
        var first       = taskStore.getRootNode().firstChild;
        var nbrChildren = first.childNodes.length;
        var leaf        = first.firstChild;

        t.ok(leaf.isLeaf(), 'Task is a leaf');

        t.willFireNTimes(taskStore, 'beforesync', 1);

        // 1 write for creating the predecessor task, 1 write to update its parent end date
        t.willFireNTimes(taskStore, 'write', 2);
        var writes      = 0;

        var as = t.beginAsync();
        taskStore.on('write', function () {
            writes++;
            if (writes === 2) {
                evaluate();
            }
        }, null, { delay : 100 });

        leaf.addPredecessor(new Gnt.model.Task({ Name : 'Foo' }));

        function evaluate() {
            t.endAsync(as);

            t.is(first.childNodes.length, nbrChildren + 1, '1 child node added');
            t.is(dependencyStore.getCount(), 1, '1 record added to dependency store');

            // Server responds 'New task' => name
            t.is(first.firstChild.get('Name'), 'New task', 'New node has correct name');
            t.ok(first.firstChild.isLeaf(), 'New node is a leaf');

            t.is(first.getStartDate(), new Date(2010, 1, 3), 'Updated parent start date ok');
            t.is(first.getDuration(), 7, 'Updated parent duration ok');
        }
    });
})    
