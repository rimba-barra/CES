Ext.define('Erems.store.Email', {
    extend: 'Ext.data.Store',
    alias: 'store.emailstore',
    requires: [
        'Erems.model.Email'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'EmailStore',
                model: 'Erems.model.Email',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST'
                    },
                    api: {
                        read: 'erems/email/read'
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
            }, cfg)]);
    }
});