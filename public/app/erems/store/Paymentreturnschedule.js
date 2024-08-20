Ext.define('Erems.store.Paymentreturnschedule', {
    extend: 'Ext.data.Store',
    alias: 'store.paymentreturnschedulestore',
    requires: [
        'Erems.model.Discountcollectionschedule'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PaymentreturnscheduleStore',
                model: 'Erems.model.Discountcollectionschedule',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/paymentreturn/read',
                        create: '',
                        update: '',
                        destroy: ''
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'schedule_id',
                        root: 'data'
                    },
					extraParams: {
						read_type_mode: 'read_schedule'
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