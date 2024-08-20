Ext.define('Gl.model.ChangeSummaryJournal', {
    extend: 'Ext.data.Model',
    alias: 'model.changesummaryjournalmodel',
    idProperty: 'summary_id',
    fields: [
        {name: 'hideparam', type: 'string'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'summary_id', type: 'int'},
        {name: 'coa', type: 'string'},
        {name: 'voucher_date', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'debit_summary', type: 'decimal'},
        {name: 'credit_summary', type: 'decimal'},
        {name: 'net_summary', type: 'decimal'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
    ]
});