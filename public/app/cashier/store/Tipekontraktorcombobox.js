Ext.define('Cashier.store.Tipekontraktorcombobox', {
    extend: 'Ext.data.Store',
    alias: 'store.tipekontraktorcomboboxstore',
    requires: [
        'Cashier.model.Tipekontraktorcombobox'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'TipekontraktorcomboboxStore',
                model: 'Cashier.model.Tipekontraktorcombobox',
                proxy: {
                    type: 'ajax',
                    timeout:45000000,
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
                        idProperty: 'tipekontraktor_id'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'tipekontraktor'
                    }
                }
            }, cfg)]);
    }
});