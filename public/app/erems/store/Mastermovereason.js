Ext.define('Erems.store.Mastermovereason', {
    extend: 'Ext.data.Store',
    alias: 'store.mastermovereasonstore',
    requires: [
        'Erems.model.Mastermovereason'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MastermovereasonStore',
                model: 'Erems.model.Mastermovereason',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/mastermovereason/read',
                        create: 'erems/mastermovereason/create',
                        update: 'erems/mastermovereason/update',
                        destroy: 'erems/mastermovereason/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'movereason_id',
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