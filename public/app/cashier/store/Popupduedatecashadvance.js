Ext.define('Cashier.store.Popupduedatecashadvance', {
    extend: 'Ext.data.Store',
    alias: 'store.popupduedatecashadvancestore',
    requires: [
        'Cashier.model.Tcashadvance'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PopupduedatecashadvanceStore',
                model: 'Cashier.model.Tcashadvance',
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
                        read: 'cashier/popupduedatecashadvance/read',
                        create: 'cashier/popupduedatecashadvance/create',
                        update: 'cashier/popupduedatecashadvance/update',
                        destroy: 'cashier/popupduedatecashadvance/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'kasbon_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },

                }
            }, cfg)]);
    }
});