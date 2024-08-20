Ext.define('Cashier.model.VDRequestlistapproval', {
    extend: 'Ext.data.Model',
    alias: 'model.vdrequestlistapprovalmodel',
    idProperty: 'approval_by',
    fields: [
        {name: 'hideparam', type: 'string'},
        {name: 'statedata', type: 'string'},
        {name: 'voucher_groupapprover_id', type: 'int'},
        {name: 'sequence', type: 'int'},
        {name: 'approval_by', type: 'int'},
        {name: 'user_email', type: 'string'},
        {name: 'approval_type', type: 'string'},
        {name: 'approval_id', type: 'int'},
    ]
});