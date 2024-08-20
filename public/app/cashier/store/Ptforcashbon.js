Ext.define('Cashier.store.Ptforcashbon', {
    extend: 'Ext.data.Store',
    alias: 'store.ptforcashbonstore',
    requires: [
        'Cashier.model.Ptforcashbon'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PtforcashbonStore',
                model: 'Cashier.model.Ptforcashbon',
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
                        read: 'cashier/ptforcashbon/read',
                        create: 'cashier/ptforcashbon/create',
                        update: 'cashier/ptforcashbon/update',
                        destroy: 'cashier/ptforcashbon/delete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'pt_id_cashbon',
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