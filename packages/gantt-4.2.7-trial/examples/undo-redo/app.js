Ext.application({
    name: 'Undo',

    launch: function () {
        var undoManager,
            vp = new Ext.Viewport({
                layout: 'border',
                items : [
                    {
                        xtype : 'panel',
                        region: 'center',
                        layout: 'border',
                        title : 'Undo/redo demo',
                        tools : [
                            {
                                xtype  : 'button',
                                iconCls: 'x-fa fa-undo',
                                style  : 'margin-right: 10px',
                                text   : 'Undo',
                                handler: function () {
                                    undoManager.undo();
                                }
                            },
                            {
                                xtype  : 'button',
                                iconCls: 'x-fa fa-repeat',
                                text   : 'Redo',
                                handler: function () {
                                    undoManager.redo();
                                }
                            }
                        ],
                        items : [
                            {
                                xtype           : 'ganttpanel',
                                rowHeight       : 35,
                                region          : 'center',
                                eventBorderWidth: 0,
                                viewPreset      : 'weekAndDayLetter',
                                plugins         : ['scheduler_treecellediting', 'gantt_taskcontextmenu'],
                                crudManager     : {
                                    autoLoad : true,
                                    transport: {
                                        load: {
                                            method: 'GET',
                                            url   : 'data/data.js'
                                        }
                                    }
                                },
                                columns         : [
                                    {
                                        xtype: 'namecolumn',
                                        width: 250
                                    }
                                ]
                            },
                            {
                                xtype  : 'gridpanel',
                                itemId : 'undolog',
                                region : 'east',
                                width  : 300,
                                split  : true,
                                columns: [
                                    {
                                        text     : '#',
                                        dataIndex: 'transactionId',
                                        width    : 50
                                    },
                                    {
                                        text     : 'Action',
                                        dataIndex: 'action'
                                    },
                                    {
                                        text     : 'Target',
                                        dataIndex: 'recordName',
                                        flex     : 1
                                    },
                                    {
                                        text     : 'Changed fields',
                                        dataIndex: 'fieldNames',
                                        flex     : 1,
                                        tdCls    : 'fieldnames'
                                    }
                                ],

                                store: {
                                    fields: ['transactionId', 'action', 'recordName', 'fieldNames']
                                },

                                reload: function (queue) {
                                    var actions = Ext.Array.map(queue, function (transaction, i) {
                                        return Ext.Array.map(transaction.getActions(), function (action) {
                                            var record = action.getRecord();

                                            return {
                                                transactionId: i,
                                                action       : Ext.getClassName(action).match(/[^.]*$/)[0] + ' ' + Ext.getClassName(record).match(/[^.]*$/)[0],
                                                recordName   : (record.getName && record.getName()) || ('#' + record.getId()),
                                                fieldNames   : action.getFieldNames && action.getFieldNames().join(', ')
                                            };
                                        });
                                    });

                                    actions = Array.prototype.concat.apply([], actions);

                                    this.store.loadData(actions);

                                    this.getView().scrollTo(0, Infinity);
                                }
                            }
                        ]
                    }, {
                        xtype  : 'details',
                        cls    : 'match-height-with-tools',
                        details: '<h3>Undo/redo demo</h3>' +
                        '<p>This example lets you undo/redo changes.</p>' +
                        '<p>NOTE: For this example to work you have to run it in a web server context.</p>'
                    }
                ]
            });

        undoManager = new Gnt.data.undoredo.Manager({
            transactionBoundary: 'timeout',
            stores             : [
                'tasks',
                'dependencies'
            ],
            listeners          : {
                undoqueuechange: function (um, queue) {
                    vp.down('#undolog').reload(queue);
                }
            }
        });

        undoManager.start();
    }
});
