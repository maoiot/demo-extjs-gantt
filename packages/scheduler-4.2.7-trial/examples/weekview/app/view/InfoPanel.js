Ext.define('App.view.InfoPanel', {
    extend    : 'Ext.Container',
    alias     : 'widget.infopanel',
    requires  : [
        'App.view.InfoPanelModel'
    ],
    viewModel : 'infopanel',
    reference : 'infopanel',
    cls       : 'infopanel',
    width     : 340,
    layout    : {
        type  : 'vbox',
        align : 'stretch'
    },
    items : [
        {
            xtype       : 'form',
            bodyPadding : '0 15',
            title       : 'Task details',
            defaults    : {
                anchor     : '100%',
                labelWidth : 80
            },
            items       : [
                {
                    xtype      : 'textfield',
                    fieldLabel : 'Name',
                    name       : 'Name',
                    reference  : 'eventNameField',
                    bind       : {
                        value    : '{eventRecord.Name}',
                        readOnly : '{!eventRecord}'
                    }
                },
                {
                    xtype  : 'fieldcontainer',
                    layout : 'hbox',
                    items  : [
                        {
                            xtype      : 'datefield',
                            fieldLabel : 'Starts',
                            labelWidth : 80,
                            flex       : 1,
                            name       : 'StartDate',
                            format     : 'Y-m-d',
                            bind       : {
                                value    : '{StartDate}',
                                readOnly : '{!eventRecord}'
                            }
                        },
                        {
                            xtype     : 'timefield',
                            margin    : '0 0 0 10',
                            width     : 90,
                            name      : 'StartTime',
                            format    : 'H:i',
                            increment : 30,
                            bind      : {
                                minValue : '{defaultMinTime}',
                                maxValue : '{defaultMaxTime}',
                                value    : '{StartTime}',
                                readOnly : '{!eventRecord}'
                            }
                        }
                    ]
                },
                {
                    xtype  : 'fieldcontainer',
                    layout : 'hbox',
                    items  : [
                        {
                            xtype      : 'datefield',
                            fieldLabel : 'Ends',
                            labelWidth : 80,
                            flex       : 1,
                            name       : 'EndDate',
                            format     : 'Y-m-d',
                            bind       : {
                                minValue : '{minEndDate}',
                                value    : '{EndDate}',
                                readOnly : '{!eventRecord}'
                            }
                        },
                        {
                            xtype     : 'timefield',
                            margin    : '0 0 0 10',
                            name      : 'EndTime',
                            width     : 90,
                            format    : 'H:i',
                            increment : 30,
                            bind      : {
                                minValue : '{minEndTime}',
                                maxValue : '{defaultMaxTime}',
                                value    : '{EndTime}',
                                readOnly : '{!eventRecord}'
                            }
                        }
                    ]
                },
                {
                    xtype      : 'resourcecombo',
                    fieldLabel : 'Assigned to',
                    name       : 'ResourceId',
                    bind       : {
                        value    : '{eventRecord.ResourceId}',
                        readOnly : '{!eventRecord}'
                    }
                }
            ]
        },
        {
            xtype       : 'panel',
            title       : 'Resource filter',
            cls         : 'resourcefilter',
            bodyPadding : '0 15',
            flex        : 1,
            layout      : 'fit',
            margin      : '10 0 0 0',
            items       : [{ xtype : 'resourcefilter' }]
        }
    ]
});