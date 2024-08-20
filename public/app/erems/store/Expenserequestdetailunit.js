Ext.define('Erems.store.Expenserequestdetailunit', {
    extend: 'Ext.data.Store',
    alias: 'store.expenserequestdetailunitstore',
    requires: [
        'Erems.model.Expenserequestdetailunit'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ExpenserequestdetailunitStore',
                model: 'Erems.model.Expenserequestdetailunit',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST'
                    },
                    api: {
                        read: 'erems/expenserequest/read'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'expensedetail_id',
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
