Ext.define('Cashier.store.Pengajuanserahterima', {
    extend: 'Ext.data.Store',
    alias: 'store.pengajuanserahterimastore',
    requires: [
        'Cashier.model.Pengajuanserahterima'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'PengajuanserahterimaStore',
            model: 'Cashier.model.Pengajuanserahterima',
            proxy: {
                type: 'ajax',
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
                    idProperty: 'pengajuanserahterima_id',
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