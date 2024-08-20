Ext.define('Erems.model.Masterdeletereason', {
    extend: 'Ext.data.Model',
    alias: 'model.masterdeletereasonmodel',
        
    idProperty: 'Deletereason_id',

    fields: [
        {name: 'Deletereason_id',type: 'int'},{name: 'Deletereason',type: 'string'},{name: 'Description',type: 'string'},
    ]
});