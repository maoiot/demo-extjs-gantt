Ext.define('App.view.CarScheduleController', {
    extend          : 'Ext.app.ViewController',
    alias           : 'controller.carschedule',

    onZoomIn : function () {
        this.getView().zoomIn();
    },

    onZoomOut : function () {
        this.getView().zoomOut();
    }
});