Ext.define('Erems.store.Mastercustomer', {
    extend: 'Ext.data.Store',
    alias: 'store.mastercustomerstore',
    requires: [
        'Erems.model.Mastercustomer'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MastercustomerStore',
                model: 'Erems.model.Mastercustomer',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/mastercustomer/read',
                        create: 'erems/mastercustomer/create',
                        update: 'erems/mastercustomer/update',
                        destroy: 'erems/mastercustomer/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'customer_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
					extraParams: {
						mode_read: 'all',
						code: '',
						name: '',
						birthdate: ''
					},
                }
            }, cfg)]);
    }
});