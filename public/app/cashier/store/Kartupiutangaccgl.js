Ext.define('Cashier.store.Kartupiutangaccgl', {
    extend: 'Ext.data.Store',
    alias: 'store.Kartupiutangaccglstore',
    requires: [
        'Cashier.model.Kartupiutangaccgl'
    ],
    autoLoad: false,
    pageSize: 50,
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'KartupiutangaccglStore',
            model: 'Cashier.model.Kartupiutangaccgl',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'cashier/kartupiutangacc/read',
                    create: 'cashier/kartupiutangacc/create',
                    update: 'cashier/kartupiutangacc/update',
                    destroy: 'cashier/kartupiutangacc/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'rn',
                    root: 'data'
                },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                },
                extraParams: {
                    hideparam: 'datagl'
                }
            },
        }, cfg)]);
    }
});