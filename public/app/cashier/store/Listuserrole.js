Ext.define('Cashier.store.Listuserrole', {
    extend: 'Ext.data.Store',
    alias: 'store.listuserrolestore',
    requires: [
        'Cashier.model.Listuserrole'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'ListuserroleStore',
            model: 'Cashier.model.Listuserrole',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'cashier/listuserrole/read',
                    create: 'cashier/listuserrole/create'
                },
                reader: {
                    type: 'json',
                    idProperty: 'group_user_id',
                    root: 'data'
                },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                },
                extraParams: {
                    'hideparam': 'default',
                    'limit': 25
                }
            }
        }, cfg)]);
    }
});