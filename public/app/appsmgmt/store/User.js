Ext.define('Appsmgmt.store.User', {
    extend: 'Ext.data.Store',
    alias: 'store.UserStore',
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'UserStore',
            model: 'Appsmgmt.model.User',
            proxy: {
                type: 'ajax',
                timeout:4500000,
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'appsmgmt/user/read',
                    create: 'appsmgmt/user/create',
                    update: 'appsmgmt/user/update',
                    destroy: 'appsmgmt/user/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'user_id',
                    root: 'data'
                },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                }
            }
        }, cfg)])
    }
});