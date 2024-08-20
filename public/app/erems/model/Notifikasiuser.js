Ext.define('Erems.model.Notifikasiuser', {
    extend: 'Ext.data.Model',
    alias: 'model.notifikasiusermodel',
    idProperty: 'notifikasi_user_id',
    fields: [
        {
            name: 'notifikasi_user_id',
            type: 'int'
        },
        {
            name: 'notifikasi_module_id',
            type: 'int'
        },
        {
            name: 'user_id',
            type: 'int'
        },
        {
            name: 'Active',
            type: 'int'
        },
        {
            name: 'user_email',
            type: 'string'
        },
        {
            name: 'module_name',
            type: 'string'
        },
        {
            name: 'description',
            type: 'string'
        },
        {
            name: 'status',
            type: 'string'
        },
        // added by rico 06022023
        {
            name: 'dayofweek',
            type: 'string'
        },
        {
            name: 'dayofmonth',
            type: 'string'
        },
        {
            name: 'is_allday',
            type: 'int'
        },
    ]
});