Ext.define('Cashier.store.Masterdebitsource', {
    extend: 'Ext.data.Store',
    alias: 'store.masterdebitsourcestore',
    requires: [
        'Cashier.model.Masterdebitsource'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'MasterdebitsourceStore',
            model: 'Cashier.model.Masterdebitsource',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'cashier/masterdebitsource/read',
                    create: 'cashier/masterdebitsource/create',
                    update: 'cashier/masterdebitsource/update',
                    destroy: 'cashier/masterdebitsource/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'debitsource_id',
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