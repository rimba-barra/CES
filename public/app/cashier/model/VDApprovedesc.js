Ext.define('Cashier.model.VDApprovedesc', {
    extend: 'Ext.data.Model',
    alias: 'model.vdapprovedescmodel',
    idProperty: 'voucherdesc_id',
    fields: [
        {name: 'voucher_id', type: 'int'},
        {name: 'voucherdesc_id', type: 'int'},
        {name: 'posting_no', type: 'int'},
        {name: 'receipt_no', type: 'string'},
        {name: 'indexdata', type: 'int'},
        {name: 'code', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'active', type: 'boolean'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
        {name: 'statedata', type: 'string'},
    ]
});