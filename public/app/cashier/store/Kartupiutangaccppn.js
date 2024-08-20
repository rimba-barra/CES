Ext.define('Cashier.store.Kartupiutangaccppn', {
    extend: 'Ext.data.Store',
    alias: 'store.kartupiutangaccppnstore',
    requires: [
        'Cashier.model.Kartupiutangaccppn'
    ],
    autoLoad: false,
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'KartupiutangaccppnStore',
            model: 'Cashier.model.Kartupiutangaccppn',
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
                    hideparam: 'hitungppn'
                }
            },
            sorters: [{
                property: 'sort',
                direction: 'ASC'
            }]
        }, cfg)]);
    }
});