Ext.define('Cashier.store.Kelaskontraktorcombobox', {
    extend: 'Ext.data.Store',
    alias: 'store.kelaskontraktorcomboboxstore',
    requires: [
        'Cashier.model.Kelaskontraktorcombobox'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'KelaskontraktorcomboboxStore',
                model: 'Cashier.model.Kelaskontraktorcombobox',
                proxy: {
                    type: 'ajax',
                    timeout: 45000000,
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/common/read',
                        create: 'cashier/common/create',
                        update: 'cashier/common/update',
                        destroy: 'cashier/common/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'kelaskontraktor_id'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'kelaskontraktor',
                    }
                }
            }, cfg)]);
    }
});