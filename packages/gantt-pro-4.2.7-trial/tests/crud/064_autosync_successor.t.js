StartTest(function (t) {

    // SimManager broken in Ext 6.0.0
    if (Ext.versions.extjs.isLessThan('6.0.1')) return;

    t.diag('Adding a successor with autoSync should cause one sync call (two writes)');

    t.mountJsonResponse('create', [{
        "Id"           : 122,
        "StartDate"    : "2010-02-22",
        "EndDate"      : "2010-02-23",
        "PercentDone"  : 0,
        "Name"         : "New task",
        "Duration"     : 1,
        "DurationUnit" : "d",
        "parentId"     : "root",
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
                "parentId"     : 114,
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
        "parentId"     : "root",
        "index"        : 0
    }]);

    t.mountJsonResponse('update', [{
        "StartDate"    : "2010-02-08",
        "EndDate"      : "2010-02-16",
        "PercentDone"  : 0,
        "Name"         : "New task",
        "Duration"     : 6,
        "DurationUnit" : "d",
        "leaf"         : true
    }]);

    var dependencyStore = Ext.create("Gnt.data.DependencyStore", {
        proxy : {
            type : 'ajax',

            api    : {
                create : 'foo'
            },
            reader : {
                type : 'json'
            }
        }
    });

    var taskStore = Ext.create("Gnt.data.TaskStore", {
        autoSync        : true,
        dependencyStore : dependencyStore,

        proxy : {
            type : 'ajax',

            api    : {
                create  : 'create',
                read    : 'get',
                update  : 'update'
            },
            reader : {
                type : 'json'
            }
        },

        root : {
            expanded : true
        }
    });

    var writes = 0;

    taskStore.on('write', function () {
        writes++;
    });

    var leaf, first, nbrChildren;

    t.willFireNTimes(taskStore, 'beforesync', 2);

    t.chain(
        { waitForStoresToLoad : taskStore },

        function (next) {
            first       = taskStore.getRootNode().firstChild;
            nbrChildren = first.childNodes.length;
            leaf        = first.lastChild;

            t.ok(leaf.isLeaf(), 'Task is a leaf');

            next()
        },

        {
            waitFor : function () {
                return writes === 2;
            },
            trigger : function () {
                leaf.addSuccessor(new Gnt.model.Task({ Name : 'Foo' }));
            }
        },
        function evaluate(next) {
            t.is(first.childNodes.length, nbrChildren + 1, '1 child node added');
            t.is(writes, 2, '2 sync calls made for multiple update after an edit (cascade and recalculated parent)');

            t.is(dependencyStore.getCount(), 1, '1 record added to dependency store');

            // Server responds 'New task' => name
            t.is(first.lastChild.get('Name'), 'New task', 'New node has correct name');
            t.ok(first.lastChild.isLeaf(), 'New node is a leaf');

            t.is(dependencyStore.first().getTargetId(), 122, 'New task Id was applied to phantom dependency');

            taskStore.cascadeChanges = true;

            t.waitForEvent(taskStore, 'beforesync', next)

            leaf.setEndDate(new Date(2020, 0, 1));
        }
    );
});
