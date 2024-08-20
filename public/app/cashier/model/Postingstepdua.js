Ext.define('Cashier.model.Postingstepdua', {
    extend: 'Ext.data.Model',
    alias: 'model.postingstepduamodel',
    idProperty: 'journal_id',
    fields: [
        {name: 'journal_id', type: 'int'},
        {name: 'kasbank_id', type: 'int'},
        {name: 'seq', type: 'int'},
        {name: 'sort', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'projectcode', type: 'string'},
        {name: 'projectname', type: 'string'},
        {name: 'pt_id', type: 'int'},
        {name: 'flag_posting', type: 'bit'},
        {name: 'ptname', type: 'string'},
        {name: 'ptname', type: 'string'},
        {name: 'prefix_id', type: 'int'},
        {name: 'prefix', type: 'string'},
        {name: 'is_post', type: 'bit'},
        {name: 'is_fromkasir', type: 'bit'},
        {name: 'is_postingstep2', type: 'bit'},
        {name: 'voucher_date', type: 'date'},
        {name: 'voucher_no', type: 'string'},
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