/* global App: true */
Ext.ns('App');

//Ext.Loader.setConfig({enabled: true, disableCaching : true });
Ext.Loader.setPath('Sch', '../../js/Sch');
Ext.Loader.setPath('Gnt', '../../js/Gnt');

Ext.require([
    'Gnt.panel.Gantt',
    'Sch.plugin.TreeCellEditing',
    'Gnt.column.PercentDone',
    'Gnt.column.StartDate',
    'Gnt.column.EndDate',
    'Gnt.column.ResourceAssignment',
    'Gnt.model.Assignment'
]);

// get requested locale from URL hash
var localeClass, locale = window.location.hash.substr(1);
switch (locale) {
    case 'ru' :
        localeClass = 'RuRU';
        break;
    case 'de' :
        localeClass = 'De';
        break;
    case 'pl' :
        localeClass = 'Pl';
        break;
    case 'sv_SE' :
        localeClass = 'SvSE';
        break;
    case 'it' :
        localeClass = 'It';
        break;
    case 'nl' :
        localeClass = 'Nl';
        break;
}

// by default we will use English locale
if (!localeClass) {
    localeClass = 'En';
    locale = 'en';
}

// now when we know the requested locale
// we will require Ext to load gantt localization class
Ext.require('Gnt.locale.' + localeClass);

// also we need to include corresponding ExtJS localization file
Ext.Loader.loadScript({
    url   : 'http://www.bryntum.com/examples/extjs-6.0.1/build/classic/locale/locale-' + locale + '.js',
    onLoad: function () {
        // after ExtJs locale is applied we invoke rendering
        // (when Ext will load all the required classes)
        Ext.onReady(App.Gantt.init, App.Gantt);
    }
});

App.Gantt = {
    init: function () {

        var resourceStore = Ext.create("Gnt.data.ResourceStore");

        var assignmentStore = Ext.create("Gnt.data.AssignmentStore", {
            autoLoad: true,

            //        autoSync : true, // uncomment for sending updates automatically to server

            // Must pass a reference to resource store
            resourceStore: resourceStore,
            proxy        : {
                method: 'GET',
                type  : 'ajax',
                api   : {
                    read: 'data/assignmentdata.js'
                    //                uncomment and provide your urls to hook with server-side
                    //                ,
                    //                create : 'create.php',
                    //                update : 'update.php',
                    //                destroy : 'delete.php'
                },
                reader: {
                    keepRawData : true,
                    type        : 'json',
                    rootProperty: 'assignments'
                }
            },
            listeners    : {
                load: function () {
                    resourceStore.loadData(this.proxy.reader.rawData.resources);
                }
            }
        });

        var taskStore = Ext.create("Gnt.data.TaskStore", {
            proxy: {
                type  : 'ajax',
                method: 'GET',
                url   : 'data/taskdata.js',
                reader: {
                    type: 'json'
                }
            }
        });

        var cellEditing = Ext.create('Sch.plugin.TreeCellEditing', {
            clicksToEdit: 1
        });

        var gantt = Ext.create('Gnt.panel.Gantt', {
            region     : 'center',
            title      : 'Localization demo',
            multiSelect: true,

            rowHeight: 31,

            // Object with editor and dataIndex defined
            leftLabelField: {
                dataIndex: 'Name',
                editor   : {xtype: 'textfield'}
            },

            // ... or an object with editor and renderer defined
            rightLabelField: {
                dataIndex: 'Id',
                renderer : function (value) {
                    return 'Id: #' + value;
                }
            },

            eventRenderer: function (task) {
                if (assignmentStore.findExact('TaskId', task.data.Id) >= 0) {
                    // This task has resources assigned, show a little icon
                    return {
                        ctcls: 'resources-assigned'
                    };
                }
            },

            highlightWeekends       : true,
            showTodayLine           : true,
            loadMask                : true,
            enableDependencyDragDrop: false,
            snapToIncrement         : true,
            plugins                 : cellEditing,
            bodyBorder              : false,
            eventBorderWidth        : 0,

            startDate : new Date(2010, 0, 11),
            endDate   : Sch.util.Date.add(new Date(2010, 0, 11), Sch.util.Date.WEEK, 20),
            viewPreset: 'weekAndDayLetter',

            // Setup your static columns
            columns        : [
                {
                    xtype: 'namecolumn',
                    width: 250
                },
                {
                    width: 150,
                    xtype: 'resourceassignmentcolumn'
                }
            ],
            tools          : [
                {xtype: 'label', text: 'Language', style: 'margin-right:10px'},
                {
                    xtype        : 'combo',
                    store        : new Ext.data.ArrayStore({
                        fields: ['code', 'language'],
                        data  : [
                            ['sv_SE', 'Swedish'],
                            ['en', 'English'],
                            ['de', 'German'],
                            ['it', 'Italian'],
                            ['ru', 'Russian'],
                            ['pl', 'Polish'],
                            ['nl', 'Dutch']
                        ]
                    }),
                    displayField : 'language',
                    valueField   : 'code',
                    mode         : 'local',
                    triggerAction: 'all',
                    emptyText    : 'Select a language...',
                    selectOnFocus: true,
                    value        : locale || '',
                    editable     : false,
                    listeners    : {
                        select: function (f, record) {
                            window.location.hash = '#' + record.get('code');
                            window.location.reload(true);
                        }
                    }
                }
            ],
            resourceStore  : resourceStore,
            assignmentStore: assignmentStore,
            taskStore      : taskStore,
            stripeRows     : true
        });

        this.viewport = new Ext.Viewport({
            layout: 'border',

            items: [
                gantt, {
                    xtype  : 'details',
                    cls: 'match-height-with-tools',
                    details: '<h3>Localization demo</h3>' +
                    '<p>You can easily localize the Ext Gantt component by loading different localization files. ' +
                    'Keep in mind, you will need to include a file to localize the underlying Ext JS library too.</p>' +
                    '<p>NOTE: For this example to work you have to run it in a web server context.</p>'
                }
            ]
        });
    }
};
