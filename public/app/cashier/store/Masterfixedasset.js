Ext.define('Cashier.store.Masterfixedasset', {
    extend: 'Ext.data.Store',
    alias: 'store.masterfixedassetstore',
    requires: [
        'Cashier.model.Masterfixedasset'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'MasterfixedassetStore',
            model: 'Cashier.model.Masterfixedasset',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'cashier/masterfixedasset/read',
                    create: 'cashier/masterfixedasset/create',
                    update: 'cashier/masterfixedasset/update',
                    destroy: 'cashier/masterfixedasset/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'fixedasset_id',
                    root: 'data'
                },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                },
                extraParams: {
                    'hideparam': 'default'
                }
            }
        }, cfg)]);
    }
});