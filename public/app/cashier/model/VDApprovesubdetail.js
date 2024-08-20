Ext.define('Cashier.model.VDApprovesubdetail', {
    extend: 'Ext.data.Model',
    alias: 'model.vdapprovesubdetailmodel',
    idProperty: 'vouchersubdetail_id',
    fields: [
        {name: 'voucher_id', type: 'int'},
        {name: 'voucherdetail_id', type: 'int'},
        {name: 'vouchersubdetail_id', type: 'int'},
        {name: 'coa_id', type: 'int'},
        {name: 'subgl_id', type: 'int'},
        {name: 'coa', type: 'string'},
        {name: 'subcode', type: 'string'},
        {name: 'code', type: 'string'},
        {name: 'code1', type: 'string'},
        {name: 'code2', type: 'string'},
        {name: 'code3', type: 'string'},
        {name: 'code4', type: 'string'},
        {name: 'coaname', type: 'string'},        
        {name: 'kelsub_id', type: 'int'},        
        {name: 'kelsub', type: 'string'},   
        {name: 'subcashier_id', type: 'int'},        
        {name: 'subcashierdesc', type: 'string'},   
        {name: 'indexdata', type: 'int'},        
        {name: 'dataflow', type: 'string'},
        {name: 'amount', type: 'number'},
        {name: 'remarks', type: 'string'},
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