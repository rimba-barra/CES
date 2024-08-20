Ext.define('Erems.store.Mastercustomerdocumentadmincollection', {
    extend: 'Ext.data.Store',
    alias: 'store.mastercustomerdocumentadmincollectionstore',
    requires: [
        'Erems.model.Mastercustomerdocument'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MastercustomerdocumentadmincollectionStore',
                model: 'Erems.model.Mastercustomerdocument',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/admincollection/read',
                        create: 'erems/mastercustomer/create',
                        update: 'erems/mastercustomer/update',
                        destroy: 'erems/mastercustomer/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'customerdocument_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
					extraParams: {
						read_type_mode: 'customer_document'
					},
                }
            }, cfg)]);
    }
});