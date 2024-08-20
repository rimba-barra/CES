Ext.define('Cashier.store.Masterdocumenttype', {
    extend: 'Ext.data.Store',
    alias: 'store.masterdocumenttypestore',
    requires: [
        'Cashier.model.Masterdocumenttype'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterdocumenttypeStore',
                model: 'Cashier.model.Masterdocumenttype',
                proxy: {
                    type: 'ajax',
                    timeout:45000000,
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/masterdocumenttype/read',
                        create: 'cashier/masterdocumenttype/create',
                        update: 'cashier/masterdocumenttype/update',
                        destroy: 'cashier/masterdocumenttype/delete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'documenttype_id',
                        totalProperty: 'total'
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