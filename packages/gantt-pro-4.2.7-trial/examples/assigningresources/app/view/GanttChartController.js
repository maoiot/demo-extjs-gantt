Ext.define('App.view.GanttChartController', {
    extend           : 'Ext.app.ViewController',
    alias            : 'controller.ganttcontroller',

    onPrevious : function () {
        this.getView().shiftPrevious();
    },
    
    onNext : function () {
        this.getView().shiftNext();
    },

    onZoomIn : function () {
        this.getView().zoomIn();
    },

    onZoomOut: function () {
        this.getView().zoomOut();
    },

    onUndo: function () {
        this.getView().getUndoManager().undo();
    },
    
    onRedo: function () {
        this.getView().getUndoManager().redo();
    }
});
