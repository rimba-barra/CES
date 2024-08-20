Ext.define('Cashier.store.Subeditor', {
    extend: 'Ext.data.Store',
    alias: 'store.subeditorstore',
    requires: [
        'Cashier.model.Subeditor'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'SubeditorStore',
            model: 'Cashier.model.Subeditor',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'cashier/subeditor/read',
                    create: 'cashier/subeditor/create',
                    update: 'cashier/subeditor/update',
                    destroy: 'cashier/subeditor/delete'
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
                extraParams: {
                    'hideparam': 'default'
                }
            }
        }, cfg)]);
    }
});