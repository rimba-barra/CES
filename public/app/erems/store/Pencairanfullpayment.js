Ext.define('Erems.store.Pencairanfullpayment', {
    extend: 'Ext.data.Store',
    alias: 'store.pencairanfullpaymentstore',
    requires: [
        'Erems.model.Pencairanfullpayment'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PencairanfullpaymentStore',
                model: 'Erems.model.Pencairanfullpayment',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/pencairankpr/read',
                        create: 'erems/pencairankpr/create',
                        update: 'erems/pencairankpr/update',
                        destroy: 'erems/pencairankpr/delete'
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
                    },
					extraParams: {
						read_type_mode: 'full_payment'
					},
                }
            }, cfg)]);
    }
});