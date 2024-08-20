Ext.define('Erems.model.Scheduletype', {
    extend: 'Ext.data.Model',
    alias: 'model.scheduletypemodel',
        
    idProperty: 'scheduletype_id',

    fields: [
        {name: 'scheduletype_id',type: 'int'},{name: 'scheduletype',type: 'string'},{name: 'description',type: 'string'},
    ]
});