Ext.define('Cashier.store.Documentnumbering', {
    extend: 'Ext.data.Store',
    alias: 'store.documentnumberingstore',
    requires: [
        'Cashier.model.Documentnumbering'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'DocumentnumberingStore',
                model: 'Cashier.model.Documentnumbering',
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
                        read: 'cashier/documentnumbering/read',
                        create: 'cashier/documentnumbering/create',
                        update: 'cashier/documentnumbering/update',
                        destroy: 'cashier/documentnumbering/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'documentnumber_id',
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