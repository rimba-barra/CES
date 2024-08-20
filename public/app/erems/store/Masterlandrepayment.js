Ext.define('Erems.store.Masterlandrepayment', {
    extend: 'Ext.data.Store',
    alias: 'store.masterlandrepaymentstore',
    requires: [
        'Erems.model.Masterlandrepayment'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterlandrepaymentStore',
                model: 'Erems.model.Masterlandrepayment',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterlandrepayment/read',
                        create: 'erems/masterlandrepayment/create',
                        update: 'erems/masterlandrepayment/update',
                        destroy: 'erems/masterlandrepayment/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'landrepayment_id',
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