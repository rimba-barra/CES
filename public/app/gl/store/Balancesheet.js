Ext.define('Gl.store.Balancesheet', {
    extend: 'Ext.data.Store',
    alias: 'store.balancesheetstore',
    requires: [
        'Gl.model.Balancesheet'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'BalancesheetStore',
                model: 'Gl.model.Balancesheet',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/balancesheet/read',
                        create: 'gl/balancesheet/create',
                        update: 'gl/balancesheet/update',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'from_coa_id',
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