Ext.define('Cashier.model.Listuserrole', {
    extend: 'Ext.data.Model',
    alias: 'model.listuserrolemodel',
    idProperty: 'group_user_id',
    fields: [
        {name: 'group_user_id', type: 'int'},
        {name: 'project_name', type: 'string'},
        {name: 'pt_name', type: 'string'},
        {name: 'user_name', type: 'string'},
        {name: 'user_fullname', type: 'string'},
        {name: 'group_name', type: 'string'},
        {name: 'addon', type: 'date', dateformat: 'd-m-Y H:i:s'},
        {name: 'addby', type: 'string'}
    ]
});