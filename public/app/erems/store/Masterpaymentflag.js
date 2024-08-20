Ext.define('Erems.store.Masterpaymentflag', {
    extend: 'Ext.data.Store',
    alias: 'store.masterpaymentflagstore',
    requires: [
        'Erems.model.Masterpaymentflag'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterpaymentflagStore',
                model: 'Erems.model.Masterpaymentflag',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterpaymentflag/read',
                        create: 'erems/masterpaymentflag/create',
                        update: 'erems/masterpaymentflag/update',
                        destroy: 'erems/masterpaymentflag/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'paymentflag_id',
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