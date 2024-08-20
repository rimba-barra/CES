Ext.define('Erems.model.Masterpricelist', {
    extend: 'Ext.data.Model',
    alias: 'model.masterpricelistmodel',
    idProperty: 'pricelist_id',
    fields: [
        { name: 'pricelist_id', type: 'int' },
        { name: 'project_id', type: 'int' },
        { name: 'pt_id', type: 'int' },
        { name: 'keterangan', type: 'string' },
        { name: 'pricelist_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
        { name: 'doc_status', type: 'string' },
        { name: 'approveby', type: 'string' },
        { name: 'approve_user_name', type: 'string' },
        { name: 'approve_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
        { name: 'last_action_name', type: 'string' },
        { name: 'last_action_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
        { name: 'next_action_name', type: 'string' },
        { name: 'is_sendmail', type: 'int' },
        { name: 'rejectby', type: 'int' },
        { name: 'reject_notes', type: 'string' },
        { name: 'nomor_im', type: 'string' },
        
        { name: 'pricelist_end_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' }, // added by rico 08022023
    ]
});