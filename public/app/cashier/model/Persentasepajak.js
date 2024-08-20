Ext.define('Cashier.model.Persentasepajak', {
    extend: 'Ext.data.Model',
    alias: 'model.persentasepajakmodel',
    idProperty: 'persentasepajak_id',
    fields: [
        {name: 'persentasepajak_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'project_name', type: 'string'},
        {name: 'pt_id', type: 'int'},
        {name: 'pt_name', type: 'string'},
        {name: 'tipepajak', type: 'string'},
        {name: 'tipepajakdetail_id', type: 'int'},
        {name: 'tipepajakdetail', type: 'string'},
        {name: 'is_npwp', type: 'int'},
        {name: 'kelaskontraktor_id', type: 'int'},
        {name: 'kelaskontraktor', type: 'string'},
        {name: 'tipekontraktor_id', type: 'int'},
        {name: 'tipekontraktor', type: 'string'},
        {name: 'persentase', type: 'string'},
        {name: 'user_name', type: 'string'},
        {name: 'addon', type: 'date', dateformat: 'd-m-Y'}
    ]
});