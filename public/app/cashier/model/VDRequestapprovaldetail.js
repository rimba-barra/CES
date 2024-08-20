Ext.define('Cashier.model.VDRequestapprovaldetail', {
    extend: 'Ext.data.Model',
    alias: 'model.vdrequestapprovaldetailmodel',
    idProperty: 'approval_id',
    fields: [
        {name: 'approval_id', type: 'int'},
        {name: 'title', type: 'string'},
        {name: 'module', type: 'string'},
        {name: 'filename', type: 'string'},
        {name: 'approval_type', type: 'string'},
        {name: 'path', type: 'string'},
        {name: 'sequence', type: 'int'},
        {name: 'approval_status', type: 'string'},
        {name: 'addby', type: 'int'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
        {name: 'approval_by', type: 'int'},
        {name: 'user_email', type: 'string'},
        {name: 'voucher_groupapprover_id', type: 'int'},
        {name: 'approval_date', type: 'string'},
        {name: 'approval_notes', type: 'string'},
        {name: 'statedata', type: 'string'},
        {name: 'user_fullname', type: 'string'}
    ]
});