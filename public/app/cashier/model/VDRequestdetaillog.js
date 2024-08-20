Ext.define('Cashier.model.VDRequestdetaillog', {
    extend: 'Ext.data.Model',
    alias: 'model.vdrequestdetaillogmodel',
    idProperty: 'action_id',
    fields: [
        {name: 'action_id', type: 'int'},
        {name: 'action', type: 'string'},
        {name: 'user_fullname', type: 'string'},
        {name: 'addon', type: 'datetime',dateFormat: 'Y-m-d h:i:s'},
        {name: 'transaction_no', type: 'string'},
        {name: 'module', type: 'string'},
    ]
});