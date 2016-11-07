Ext.define('App.store.Resource', {
    extend  : 'Sch.data.ResourceStore',
    storeId : 'resource',
    proxy   : 'memory',
    data    : [
        { Id : 'r0', Name : 'Unassigned', Color : '#000' },
        { Id : 'r1', Name : 'Mike', Color : '#167abc' },
        { Id : 'r2', Name : 'Jake', Color : '#03b4d5' },
        { Id : 'r3', Name : 'King', Color : '#27D4F4' },
        { Id : 'r4', Name : 'Brian', Color : '#9cc96b' },
        { Id : 'r5', Name : 'Doug', Color : '#ffc107' },
        { Id : 'r6', Name : 'Jeff', Color : '#e44959' },
        { Id : 'r7', Name : 'Kate', Color : '#925e8b' },
        { Id : 'r8', Name : 'Ann', Color : '#949495' },
        { Id : 'r9', Name : 'Annika', Color : '#16b603' },
        { Id : 'r10', Name : 'Alp', Color : 'navy' }
    ]
});