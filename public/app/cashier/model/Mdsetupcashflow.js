Ext.define('Cashier.model.Mdsetupcashflow', {
    extend: 'Ext.data.Model',
    alias: 'model.mdsetupcashflowmodel',
    idProperty: 'setupcashflowdetail_id',
    fields: [
        {name: 'setupcashflowdetail_id', type: 'int'},
        {name: 'setupcashflow_id', type: 'int'},
        {name: 'coa_id', type: 'int'},
        {name: 'coa', type: 'string'},
        {name: 'coaname', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});