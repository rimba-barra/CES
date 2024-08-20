Ext.define('Cashier.store.Kartupiutangaccpph', {
    extend: 'Ext.data.Store',
    alias: 'store.kartupiutangaccpphstore',
    requires: [
        'Cashier.model.Kartupiutangaccpph'
    ],
    autoLoad: false,
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'KartupiutangaccpphStore',
            model: 'Cashier.model.Kartupiutangaccpph',
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
                    idProperty: 'kartupiutang_id',
                    root: 'data'
                },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                },
                extraParams: {
                    hideparam: 'hitungpph'
                }
            },
            sorters: [{
                property: 'sort',
                direction: 'ASC'
            }]
        }, cfg)]);
    }
});