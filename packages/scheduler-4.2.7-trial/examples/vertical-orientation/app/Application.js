Ext.define('Sch.examples.vertical.Application', {
    extend          : 'Ext.app.Application',

    requires        : [
        'Sch.app.CrudManagerDomain',
        'Sch.examples.vertical.model.Event',
        'Sch.examples.vertical.data.CrudManager'
    ],

    paths           : {
        'Sch'   : '../../js/Sch'
    },

    views           : [
        'MainViewport'
    ],

    glyphFontFamily : 'FontAwesome',

    mainView        : null,

    crudManager     : null,

    /**
     * Mapping for the startDate config of the gantt panel
     */
    startDate       : null,

    /**
     * Mapping for the endDate config of the gantt panel
     */
    endDate         : null,

    listen          : {
        crudmanager : {
            'advanced-crudmanager' : {
                'loadfail' : 'onCrudError',
                'syncfail' : 'onCrudError'
            }
        }
    },

    constructor : function (config) {
        var me = this;

        me.crudManager = new Sch.examples.vertical.data.CrudManager({
            eventStore : new Sch.data.EventStore({
                model : 'Sch.examples.vertical.model.Event'
            }),
            resourceStore : new Sch.data.ResourceStore()
        });

        this.callParent(arguments);
    },

    /**
     * This method will be called on CRUD manager exception and display a message box with error details.
     */
    onCrudError : function (crud, response, responseOptions) {
        Ext.Msg.show({
            title    : 'Error',
            msg      : response.message || 'Request error',
            icon     : Ext.Msg.ERROR,
            buttons  : Ext.Msg.OK,
            minWidth : Ext.Msg.minWidth
        });
    },

    launch : function () {
        var me      = this,
            crud    = me.crudManager;

        me.mainView         = me.getMainViewportView().create({
            crudManager     : crud,
            startDate       : me.startDate
        });
    }
});
