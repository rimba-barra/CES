Ext.define('Cashier.model.Subvouchersetup', {
    extend: 'Ext.data.Model',
    alias: 'model.subvouchersetupmodel',
    idProperty: 'subvoucher_id',
    fields: [
        {name: 'subvoucher_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'subvoucher_code', type: 'string'},
        {name: 'subvoucher_name', type: 'string'},
        {name: 'subvoucher_desc', type: 'string'},        
        {name: 'active', type: 'boolean'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});