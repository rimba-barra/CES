Ext.define('Cashier.store.Reportbankpaymentvoucher', {
    extend: 'Ext.data.Store',
    alias: 'store.reportbankpaymentvoucher',
    requires: [
        'Cashier.model.Reportbankpaymentvoucher'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ReportbankpaymentvoucherStore',
                model: 'Cashier.model.Reportbankpaymentvoucher',
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
                        read: 'cashier/reportbankpaymentvoucher/read',
                        create: 'cashier/reportbankpaymentvoucher/create',
                        update: 'cashier/reportbankpaymentvoucher/update',
                        destroy: 'cashier/reportbankpaymentvoucher/delete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'cheque_id',
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