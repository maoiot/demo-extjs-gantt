Ext.define("App.DemoScheduler", {
    extend : "Sch.panel.SchedulerGrid",

    requires : [
        'App.DemoEditor',
        'Ext.grid.plugin.CellEditing'
    ],

    title           : 'Scheduler with event editor',
    rowHeight       : 40,
    snapToIncrement : true,
    border          : true,

    columns : [
        { header : 'Staff', sortable : true, width : 80, dataIndex : 'Name', field : { xtype : 'textfield' }, flex : 1 },
        {
            header : 'Type', sortable : true, width : 120, dataIndex : 'Type', field : {
            xtype          : 'combobox',
            store          : ['Sales', 'Developer', 'Marketing', 'Product manager'],
            typeAhead      : true,
            forceSelection : true,
            triggerAction  : 'all',
            selectOnFocus  : true
        }
        },
        {
            header    : 'Task Color',
            sortable  : false,
            width     : 100,
            dataIndex : 'Color',
            field     : {
                xtype : 'textfield',
                // match from start to end that each char is not double quote
                regex : /^[^"]*$/
            }
        },
        {
            xtype : 'actioncolumn',

            sortable : false,
            align    : 'center',
            tdCls    : 'sch-valign',
            width    : 50,

            position : 'right',

            items : [
                {
                    iconCls : 'icon-delete',
                    tooltip : 'Clear row',
                    handler : function (view, rowIndex, colIndex, btn, e, resource) {
                        var events    = resource.getEvents(),
                            toRemove  = [],
                            viewStart = view.timeAxis.getStart(),
                            viewEnd   = view.timeAxis.getEnd();

                        Ext.each(events, function (ev) {
                            if (Sch.util.Date.intersectSpans(viewStart, viewEnd, ev.getStartDate(), ev.getEndDate())) {
                                toRemove.push(ev);
                            }
                        });

                        view.eventStore.remove(toRemove);
                    }
                },
                {
                    iconCls : 'icon-add',
                    tooltip : 'Add new event',
                    handler : function (view, rowIndex, colIndex, btn, e, resource) {
                        view.eventStore.add({
                            StartDate  : view.timeAxis.getStart(),
                            EndDate    : view.timeAxis.getEnd(),
                            ResourceId : resource.getId(),
                            Title      : 'New task...',
                            Location   : 'Local office',
                            EventType  : 'Meeting'
                        });
                    }
                }
            ]
        }
    ],

    // Specialized body template with header and footer
    eventBodyTemplate : '<div class="sch-event-header">{headerText}</div><div class="sch-event-footer">{footerText}</div>',

    tooltipTpl : '<dl class="eventTip">' +
    '<dt class="icon-clock">Time</dt><dd>{[Ext.Date.format(values.StartDate, "Y-m-d G:i")]}</dd>' +
    '<dt class="icon-task">Task</dt><dd>{Title}</dd>' +
    '<dt class="icon-earth">Location</dt><dd>{Location}&nbsp;</dd>' +
    '</dl>',

    initComponent : function () {
        var me = this;

        Ext.apply(this, {

            tools : [
                {
                    type    : 'left',
                    scope   : this,
                    handler : function () {
                        this.shiftPrevious();
                    }
                },
                {
                    type    : 'right',
                    scope   : this,
                    handler : function () {
                        this.shiftNext();
                    }
                },
                {
                    type    : 'close',
                    tooltip : 'Clear database',
                    scope   : this,
                    handler : function () {
                        this.eventStore.removeAll();
                    }
                }
            ],

            bbar : [
                {
                    enableToggle : true,
                    scale        : 'medium',
                    text         : 'Select Date...',
                    scope        : this,
                    menu         : Ext.create('Ext.menu.DatePicker', {
                        handler : function (dp, date) {
                            var D = Ext.Date;
                            this.setTimeSpan(D.add(date, D.HOUR, 8), D.add(date, D.HOUR, 18));
                        },
                        scope   : this
                    })
                }
            ],

            plugins : [
                {
                    ptype : 'myeditor'
                    // Editor configuration goes here
                },

                {
                    ptype        : 'cellediting',
                    clicksToEdit : 1
                },

                {
                    ptype : 'scheduler_zones',
                    store : this.zoneStore
                }
            ]
        });

        this.callParent(arguments);
    },

    eventRenderer : function (item, resourceRec, tplData) {
        var bookingStart = item.getStartDate();
        tplData.style    = 'background-color:' + resourceRec.get('Color');

        return {
            headerText : Ext.Date.format(bookingStart, this.getDisplayDateFormat()),
            footerText : item.getName()
        };
    },

    onEventCreated : function (newEventRecord) {
        // Overridden to provide some default values
        newEventRecord.set({
            Title     : 'New task...',
            Location  : 'Local office',
            EventType : 'Meeting'
        });
    }
});