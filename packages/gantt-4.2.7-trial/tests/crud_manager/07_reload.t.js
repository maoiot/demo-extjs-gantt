// https://app.assembla.com/spaces/bryntum/tickets/2832-crud-manager--treestore-is-dirty-after-reload/details#
describe('Task store should not be dirty after CM load', function (t) {

    Ext.ux.ajax.SimManager.init().register(
        {
            'load.json' : {
                stype : 'json',  // use JsonSimlet (stype is like xtype for components)
                data  : {
                    "success" : true,
                    "tasks"   : {
                        "rows" : [
                            {
                                Name      : 'task1',
                                expanded  : true,
                                StartDate : '2016-10-11',
                                Duration  : 10,
                                children  : [
                                    {
                                        Id        : 1,
                                        Name      : 'foo',
                                        leaf      : true,
                                        StartDate : '2016-10-11',
                                        Duration  : 10
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        }
    );

    var cm = new Gnt.data.CrudManager({
        autoLoad  : true,
        transport : {
            load : {
                method : 'GET',
                url    : 'load.json'
            }
        },
        listeners : {
            load   : function () {
                cm.getTaskStore().getNodeById(1).setPercentDone(40);
                t.expect(cm.hasChanges()).toBe(true);

                cm.load(function () {
                    t.expect(cm.hasChanges()).toBe(false);
                })
            },
            single : true
        }
    });

    t.expect(cm.hasChanges()).toBe(false);
});
