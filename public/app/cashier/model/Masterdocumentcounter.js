Ext.define('Cashier.model.Masterdocumentcounter', {
    extend: 'Ext.data.Model',
    alias: 'model.masterdocumentcounter',
    idProperty: 'counter_no_id',
    fields: [
        {name: 'counter_no_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'project_name', type: 'string'},
        {name: 'pt_id', type: 'int'},
        {name: 'pt_name', type: 'string'},
        {name: 'counter_type', type: 'string'},
        {name: 'year', type: 'string'},
        {name: 'month', type: 'string'},
        {name: 'counter', type: 'string'}
    ]
});