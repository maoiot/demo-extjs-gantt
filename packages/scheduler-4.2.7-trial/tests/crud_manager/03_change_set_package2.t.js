StartTest(function (t) {
    t.expectGlobal('TestModel', 'MyResource');

    Ext.define('TestModel', {
        extend  : 'Ext.data.Model',
        fields  : ['id', 'f1', 'f2', 'f3', { name : 'f4', critical : true }, { name : 'f5', persist : false }]
    });
    
    Ext.define('MyResource', {
        extend  : 'Sch.model.Resource',
        customizableFields  : ['Name', 'Surname']
    });
        
    t.it('Should write all fields', function (t) {
        var resourceStore   = t.getResourceStore({
                model           : 'MyResource',
                writeAllFields  : false,
                data            : [
                    { Id : 1, Name : 'Albert', Surname : 'Einstein' }
                ]
            }),
            someStore       = new Ext.data.JsonStore({
                model   : 'TestModel',
                data    : [
                    { id : 1, f1 : '11', f2 : '111', f4 : 'foo', f5 : 'garbage' }
                ]
            }),
            someStore1      = new Ext.data.JsonStore({
                fields  : ['id', 'ff1', 'ff2'],
                data    : [
                    { id : 1, ff1 : '11', ff2 : '111' }
                ]
            });
    
    
        var crud    = Ext.create('Sch.crud.AbstractManager', {
            writeAllFields : true,
            stores      : [
                { store : resourceStore, storeId : 'resources' },
                { store : someStore, storeId : 'something' },
                { store : someStore1, storeId : 'something1', writeAllFields : false }
            ],
            revision    : 1
        });
        
        someStore.getAt(0).set('f1', '22');
        someStore1.getAt(0).set('ff1', '22');
        resourceStore.getAt(0).setName('John');
        
        var pack = crud.getChangeSetPackage();
        
        t.isDeeply(pack.resources, { updated : [{ Id : 1, Name : 'John' }] });
        t.isDeeply(pack.something, { updated : [{ id : 1, f1 : '22', f2 : '111', f4 : 'foo' }] });
        t.isDeeply(pack.something1, { updated : [{ id : 1, ff1 : '22' }] });
    });
    
    
    t.it('Should write all fields', function (t) {
        var resourceStore   = t.getResourceStore({
                model           : 'MyResource',
                data            : [
                    { Id : 1, Name : 'Albert', Surname : 'Einstein' }
                ]
            }),
            someStore       = new Ext.data.JsonStore({
                model   : 'TestModel',
                writeAllFields : true,
                data    : [
                    { id : 1, f1 : '11', f2 : '111', f4 : 'foo', f5 : 'garbage' }
                ]
            }),
            someStore1      = new Ext.data.JsonStore({
                fields  : ['id', 'ff1', 'ff2'],
                data    : [
                    { id : 1, ff1 : '11', ff2 : '111' }
                ]
            });
    
    
        var crud    = Ext.create('Sch.crud.AbstractManager', {
            stores      : [
                { store : resourceStore, storeId : 'resources', writeAllFields : true },
                { store : someStore, storeId : 'something' },
                { store : someStore1, storeId : 'something1' }
            ],
            revision    : 1
        });
        
        someStore.getAt(0).set('f1', '22');
        someStore1.getAt(0).set('ff1', '22');
        resourceStore.getAt(0).setName('John');
        
        var pack = crud.getChangeSetPackage();
        
        t.isDeeply(pack.resources, { updated : [{ Id : 1, Name : 'John', Surname : 'Einstein' }] });
        t.isDeeply(pack.something, { updated : [{ id : 1, f1 : '22', f2 : '111', f4 : 'foo' }] });
        t.isDeeply(pack.something1, { updated : [{ id : 1, ff1 : '22' }] });
    });
});