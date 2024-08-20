Ext.define('Erems.store.Otherspaymentdatadetail', {
    extend: 'Ext.data.Store',
    alias: 'store.otherspaymentdatadetailstore',
    requires: [
        'Erems.model.Otherspaymentdatadetail'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'OtherspaymentdatadetailStore',
                model: 'Erems.model.Otherspaymentdatadetail',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/otherspayment/read',
                        create: 'erems/otherspayment/create',
                        update: 'erems/otherspayment/update',
                        destroy: 'erems/otherspayment/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'payment_id',
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