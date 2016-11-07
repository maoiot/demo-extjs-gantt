Ext.define('GanttTaskBoard.store.DependencyStore', {
    extend                : 'Gnt.data.DependencyStore',
    storeId               : 'dependencyStore',
    allowedDependencyTypes: ['EndToStart'],
    autoLoad              : true,
    proxy                 : {
        type  : 'ajax',
        url   : 'data/dependencies.xml',
        method: 'GET',
        reader: {
            type        : 'xml',
            rootProperty: 'Links',
            record      : 'Link' // records will have a 'Link' tag
        }
    }
});