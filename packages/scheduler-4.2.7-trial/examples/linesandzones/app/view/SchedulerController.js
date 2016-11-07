/* globals App */

Ext.define('App.view.SchedulerController', {
    extend : 'Ext.app.ViewController',
    alias  : 'controller.scheduler',

    getZoneStore : function() {
        return this.getView().findPlugin('scheduler_zones').store;
    },

    onZoneAddPress : function (btn, pressed) {
        var store = this.getZoneStore();

        if (pressed) {
            btn.zone = store.add({
                Type      : 'Holiday',
                StartDate : new Date(2011, 0, 8),
                EndDate   : new Date(2011, 0, 9)
            })[0];
        } else {
            store.remove(btn.zone);
        }
    },

    onZone2AddPress : function (btn, pressed) {
        var store = this.getZoneStore();

        if (pressed) {
            btn.zone = store.add({
                Type      : 'Out of office',
                StartDate : new Date(2011, 0, 3),
                EndDate   : new Date(2011, 0, 4),
                Cls       : 'customZoneStyle'
            })[0];
        } else {
            store.remove(btn.zone);
        }
    },

    onRowAddPress : function (btn) {
        this.getView().getResourceStore().add({
            Name : 'New person'
        });
    },

    onHorizontalPress : function () {
        this.getView().setOrientation('horizontal');
    },

    onVerticalPress : function () {
        this.getView().setOrientation('vertical');
    },

    undo : function() {
        App.undoManager.undo();
    },

    redo : function() {
        App.undoManager.redo();
    }
});
