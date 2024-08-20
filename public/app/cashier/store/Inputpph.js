Ext.define('Cashier.store.Inputpph', {
    extend: 'Ext.data.Store',
    alias: 'store.inputpphstore',
    requires: [
        'Cashier.model.Inputpph'
    ],
    pageSize: 100000,
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'InputpphStore',
            model: 'Cashier.model.Inputpph',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'cashier/inputpph/read',
                    create: 'cashier/inputpph/create',
                    update: 'cashier/inputpph/update',
                    destroy: 'cashier/inputpph/delete',
                },
                reader: {
                    type: 'json',
                    idProperty: 'journalsubdetail_id',
                    root: 'data'
                },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                },
                extraParam: {
                    hideparam: 'default',
                    limit: 25,
                    start: 0
                }
            }
        }, cfg)]);
    }
});