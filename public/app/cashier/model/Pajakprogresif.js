Ext.define('Cashier.model.Pajakprogresif', {
    extend: 'Ext.data.Model',
    alias: 'model.pajakprogresifmodel',
    idProperty: 'persentaseprogdetail_id',
    fields: [
        {name: 'persentaseprogdetail_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'tipepajakdetail_id', type: 'int'},
        {name: 'pajakprogresif', type: 'string'},
        {name: 'tipepajakdetail', type: 'string'},
        {name: 'sequence', type: 'int'},
        {name: 'persentase', type: 'string'},
        {name: 'min_amount', type: 'string'},
        {name: 'max_amount', type: 'string'},
        {name: 'factor_amount', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'}
    ]
});