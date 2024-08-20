Ext.define('Cashier.model.Jupload', {
    extend: 'Ext.data.Model',
    alias: 'model.juploadmodel',
    idProperty: 'jupload_id',
    fields: [
        {name: 'jupload_id', type: 'int'},
        {name: 'projectpt_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'uploaduniquenumber', type: 'string'},
        {name: 'seq_detail', type: 'int'},
        {name: 'voucher_no', type: 'string'},
        {name: 'voucher_date', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'prefix', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'coa_detail', type: 'string'},
        {name: 'type', type: 'string'},
        {name: 'kawasan', type: 'string'},
        {name: 'sub_unit', type: 'string'},
        {name: 'amount_detail', type: 'money'},
       
    ]
});