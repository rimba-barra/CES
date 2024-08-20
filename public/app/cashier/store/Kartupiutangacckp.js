Ext.define('Cashier.store.Kartupiutangacckp', {
    extend: 'Ext.data.Store',
    alias: 'store.Kartupiutangacckpstore',
    requires: [
        'Cashier.model.Kartupiutangacckp'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'KartupiutangacckpStore',
            model: 'Cashier.model.Kartupiutangacckp',
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
                    hideparam: 'kartupiutang',
                    limit: 50
                }
            },
            filters: [{
                property: 'deleted',
                value: 0
            }]
        }, cfg)]);
    }
});