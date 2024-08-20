Ext.define('Cashier.store.Subdesccode', {
    extend: 'Ext.data.Store',
    alias: 'store.subdesccodestore',
    requires: [
        'Cashier.model.Subdesccode'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SubdesccodeStore',
                model: 'Cashier.model.Subdesccode',
                sorters: [{
                    property: 'subdsk',
                    direction: 'ASC'
                }],
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/subdesccode/read',
                        create: 'cashier/subdesccode/create',
                        update: 'cashier/subdesccode/update',
                        destroy: 'cashier/subdesccode/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'subdsk_id',
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