Ext.define('Cashier.model.Masterdebitsource', {
    extend: 'Ext.data.Model',
    alias: 'model.masterdebitsourcemodel',
    idProperty: 'debitsource_id',
    fields: [
        {name: 'debitsource_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'project_name', type: 'string'},
        {name: 'pt_id', type: 'int'},
        {name: 'pt_name', type: 'string'},
        {name: 'bank_id', type: 'int'},
        {name: 'bank_name', type: 'string'},
        {name: 'debitsource', type: 'string'},
        {name: 'acc_no', type: 'string'},
    ]
});