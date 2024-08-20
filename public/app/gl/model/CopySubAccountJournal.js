Ext.define('Gl.model.CopySubAccountJournal', {
    extend: 'Ext.data.Model',
    alias: 'model.copysubaccountjournalmodel',
    idProperty: 'journalsubdetail_id',
    fields: [
        {name: 'statedata_sub', type: 'string'},
        {name: 'hideparam', type: 'string'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'journal_id_sub', type: 'int'},
        {name: 'journaldetail_id_sub', type: 'int'},
        {name: 'journalsubdetail_id_sub', type: 'int'},
        {name: 'coa_id_sub', type: 'int'},
        {name: 'subgl_id_sub', type: 'int'},
        {name: 'voucherno_sub', type: 'string'},
        {name: 'subgl_sub', type: 'string'},
        {name: 'description_sub', type: 'string'},
        {name: 'kelsub_id_sub', type: 'int'},
        {name: 'kelsub_sub', type: 'string'},
        {name: 'code1_sub', type: 'string'},
        {name: 'code2_sub', type: 'string'},
        {name: 'code3_sub', type: 'string'},
        {name: 'code4_sub', type: 'string'},
        {name: 'code_sub', type: 'string'},      
        {name: 'keterangan_sub', type: 'string'},
        {name: 'amount_sub', type: 'number'},
        {name: 'is_post_sub', type: 'boolean'},      
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
    ]
});