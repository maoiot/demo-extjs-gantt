Ext.define('App.store.ResourceStore', {
    extend  : 'Sch.data.ResourceStore',
    sorters : 'Name',
    storeId : 'resources',

    data    : [
        { Id : 'r1', Name : 'Mike' },
        { Id : 'r2', Name : 'Linda' },
        { Id : 'r3', Name : 'Don' },
        { Id : 'r4', Name : 'Karen' },
        { Id : 'r5', Name : 'Doug' },
        { Id : 'r6', Name : 'Peter' },
        { Id : 'r7', Name : 'Fred' },
        { Id : 'r8', Name : 'Lisa' },
        { Id : 'r9', Name : 'Annie' },
        { Id : 'r10', Name : 'Dan' }
    ]
});
