Ext.define('Gnt.examples.advanced.view.MainViewportModel', {
    extend  : 'Ext.app.ViewModel',
    alias   : 'viewmodel.advanced-viewport',

    data    : {
        crud                    : null,
        undoManager             : null,
        taskStore               : null,
        hasSelection            : false,
        fullscreenEnabled       : false,
        filterSet               : false,
        availableLocales        : null,
        currentLocale           : null,
        calendarManager         : null,
        hasChanges              : false,
        canUndo                 : false,
        canRedo                 : false
    },

    formulas : {
        // This is used for not showing the "Save changes" button in the advanced demo
        // since the example code is shared between the advanced demo and multiple backend demos.
        crudPersistable : function (get) {
            var crudManager = get('crud');

            // hide "Save changes" if sync URL is 'data/sync.json' (which is true for the advanced demo)
            return crudManager && crudManager.transport.sync.url != 'data/sync.json';
        }
    }
});
