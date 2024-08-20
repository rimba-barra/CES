Ext.define('Cashier.store.Unitnumber', {
    extend: 'Ext.data.Store',
    alias: 'store.unitnumberstore',
    requires: [
        'Cashier.model.Unitnumber'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'UnitnumberStore',
                model: 'Cashier.model.Unitnumber',
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
                        read: 'cashier/pengajuanserahterima/read',
                        create: 'cashier/pengajuanserahterima/create',
                        update: 'cashier/pengajuanserahterima/update',
                        destroy: 'cashier/pengajuanserahterima/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'unit_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'getunit',
                    
                    }
                }
            }, cfg)]);
    }
});