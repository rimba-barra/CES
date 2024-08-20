Ext.define('Erems.store.Masterdocumentcustomer', {
    extend: 'Ext.data.Store',
    alias: 'store.masterdocumentcustomerstore',
    requires: [
        'Erems.model.Mastercustomer'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterdocumentcustomerStore',
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
                        read: 'erems/masterdocumentcustomer/read',
                        create: 'erems/masterdocumentcustomer/create',
                        update: 'erems/masterdocumentcustomer/update',
                        destroy: 'erems/masterdocumentcustomer/delete'
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