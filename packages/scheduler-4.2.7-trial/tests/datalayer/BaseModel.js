Ext.define('BaseModel', {
    extend             : 'Sch.model.Customizable',
    customizableFields : [
        {
            name    : 'Field1',
            type    : 'date',
            dateFormat : 'c'
        }
    ]
});
