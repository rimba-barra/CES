Ext.define('Cashier.model.Tipepajak', {
    extend: 'Ext.data.Model',
    alias: 'model.tipepajakmodel',
    idProperty: 'tipepajak_id',
    fields: [
        {name: 'tipepajak_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'tipepajakdetail_id', type: 'int'},
        {name: 'persentasepajak_id', type: 'int'},
        {name: 'tipepajak', type: 'string'},
        {name: 'tipepajakdetail', type: 'string'},
        {name: 'persentase', type: 'string'}
    ]
});