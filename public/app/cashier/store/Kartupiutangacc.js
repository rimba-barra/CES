Ext.define('Cashier.store.Kartupiutangacc', {
    extend: 'Ext.data.Store',
    alias: 'store.Kartupiutangaccstore',
    requires: [
        'Cashier.model.Kartupiutangacc'
    ],
    autoLoad: false,
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'KartupiutangaccStore',
            model: 'Cashier.model.Kartupiutangacc',
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
                    idProperty: 'subgl_id',
                    root: 'data'
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