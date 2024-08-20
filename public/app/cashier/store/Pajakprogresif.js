Ext.define('Cashier.store.Pajakprogresif', {
    extend: 'Ext.data.Store',
    alias: 'store.pajakprogresifstore',
    requires: [
        'Cashier.model.Pajakprogresif'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PajakprogresifStore',
                model: 'Cashier.model.Pajakprogresif',
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
                        read: 'cashier/pajakprogresif/read',
                        create: 'cashier/pajakprogresif/create',
                        update: 'cashier/pajakprogresif/update',
                        destroy: 'cashier/pajakprogresif/delete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'persentaseprogdetail_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'default'
                    }
                }
            }, cfg)]);
    }
});