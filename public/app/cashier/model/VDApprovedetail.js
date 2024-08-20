Ext.define('Cashier.model.VDApprovedetail', {
    extend: 'Ext.data.Model',
    alias: 'model.vdapprovedetailmodel',
    idProperty: 'voucherdetail_id',
    fields: [
        {name: 'voucher_id', type: 'int'},
        {name: 'voucherdetail_id', type: 'int'},
        {name: 'coa_id', type: 'int'},
        {name: 'coa', type: 'string'},
        {name: 'coaname', type: 'string'},        
        {name: 'kelsub_id', type: 'int'},        
        {name: 'kelsub', type: 'string'},   
        {name: 'kelsubdesc', type: 'string'},   
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
        {name: 'typetransdetail', type: 'string'},
        {name: 'kasbondept_no', type: 'string'},
    ]
});