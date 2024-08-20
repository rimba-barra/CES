Ext.define('Cashier.model.Postingstepsatudestination', {
    extend: 'Ext.data.Model',
    alias: 'model.postingstepsatudestinationmodel',
    idProperty: 'journal_id',
    fields: [
        {name: 'journal_id', type: 'int'},
        {name: 'seq', type: 'int'},
        {name: 'sort', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'projectcode', type: 'string'},
        {name: 'projectname', type: 'string'},
        {name: 'pt_id', type: 'int'},
        {name: 'flag_posting', type: 'bit'},
        {name: 'ptname', type: 'string'},
        {name: 'ptname', type: 'string'},
        {name: 'coa_id', type: 'int'},
        {name: 'coa', type: 'string'},
        {name: 'coaname', type: 'string'},
        {name: 'department_id', type: 'int'},
        {name: 'department', type: 'string'},
        {name: 'dataflow', type: 'string'},
        {name: 'prefix_id', type: 'int'},
        {name: 'prefix_id_gl', type: 'int'},
        {name: 'prefix', type: 'string'},
        {name: 'prefix_gl', type: 'string'},
        {name: 'is_post', type: 'bit'},
        {name: 'is_fromkasir', type: 'bit'},
        {name: 'is_postingstep2', type: 'bit'},
        {name: 'accept_date', type: 'date'},
        {name: 'voucher_date_gl', type: 'date'},
        {name: 'voucher_no', type: 'string'},
        {name: 'voucher_no_gl', type: 'string'},
        {name: 'amount', type: 'number'},
        {name: 'debet_total', type: 'number'},
        {name: 'credit_total', type: 'number'},
        {name: 'selisih', type: 'number'},
        {name: 'description', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'active', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});