Ext.define('Erems.store.Masterattributevalue', {
    extend: 'Ext.data.Store',
    alias: 'store.masterattributevaluestore',
    requires: [
        'Erems.model.Masterattributevalue'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterattributevalueStore',
                model: 'Erems.model.Masterattributevalue',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterattribute/readdetail',
                        create: 'erems/masterattribute/createdetail',
                        update: 'erems/masterattribute/updatedetail',
                        destroy: 'erems/masterattribute/deletedetail'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'attributevalue_id',
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