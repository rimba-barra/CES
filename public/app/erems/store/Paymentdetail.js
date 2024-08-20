Ext.define('Erems.store.Paymentdetail', {
    extend: 'Ext.data.ArrayStore',
    alias: 'store.paymentdetailstore',
    fields: [
        {name: 'paymentdetail_id', type: 'int'},
        {name: 'payment_id', type: 'int'},
        {name: 'paymenttype_id', type: 'int'},
        {name: 'paymenttype', type: 'string'},
        {name: 'schedule_id', type: 'int'},
        {name: 'description', type: 'string'},
        {name: 'amount', type: 'string'},
        {name: 'payment', type: 'string'},
        {name: 'remaining_balance', type: 'string'},
        {name: 'denda', type: 'string'},
        {name: 'is_debitnote', type: 'string'},
        {name: 'is_creditnote', type: 'string'},
        {name: 'debitnote', type: 'string'},
        {name: 'creditnote', type: 'string'},
        {name: 'duedate', type: 'string'},
        {name: 'scheduletype_id', type: 'int'},
        {name: 'termin', type: 'string'},
        {name: 'scheduletype', type: 'string'}
    ],
    storeId: 'PaymentdetailStore',
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PaymentdetailStore',
                // model: 'Erems.model.Scheduletype',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST'
                    },
                    api: {
                        read: 'erems/installmentpayment/read'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'paymentdetail_id',
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