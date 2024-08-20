Ext.define('Erems.model.Datatype', {
    extend: 'Ext.data.Model',
    alias: 'model.datatypemodel',

    idProperty: 'datatype_id',

    fields: [
        {
            name: 'datatype_id',
            type: 'string'
        },
        {
            name: 'datatype',
            type: 'string'
        }
    ]
});