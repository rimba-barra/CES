Ext.define('Cashier.store.TPaymentcash', {
    extend: 'Ext.data.Store',
    alias: 'store.tpaymentcashstore',
    requires: [
        'Cashier.model.TPaymentcash'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'TPaymentStore',
                model: 'Cashier.model.TPaymentcash',
                sorters: [{
                        property: 'voucher_no',
                        direction: 'DESC'
                    },
                    {
                        property: 'accept_date',
                        direction: 'DESC'
                    }
                ],
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
                        read: 'cashier/payment/read',
                        create: 'cashier/payment/create',
                        update: 'cashier/payment/update',
                        destroy: 'cashier/payment/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'kasbank_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'default',
                        project_id:apps.project,
                       
                    }
                }
            }, cfg)]);
    }
});