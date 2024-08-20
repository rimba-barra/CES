Ext.define('Erems.library.template.store.Kouti', {
    extend: 'Ext.data.Store',
    alias: 'store.koutistore',
    url: '',
    constructor: function(config) {
        this.callParent(arguments);
        console.log(config);
    },
    proxy: {
        type: 'ajax',
        actionMethods: {
            read: 'POST',
            create: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        api: {
            read: 'erems/expenserequest/read',
            create: 'erems/expenserequest/create',
            update: 'erems/expenserequest/update',
            destroy: 'erems/expenserequest/delete'
        },
        reader: {
            type: 'json',
            idProperty: 'expense_id',
            root: 'data',
            totalProperty: 'totalRow'
        },
        writer: {
            type: 'json',
            encode: true,
            root: 'data'
        },
        extraParams: {
            mode_read: 'all',
            page: 1,
            limit: 25
        }
    }

});