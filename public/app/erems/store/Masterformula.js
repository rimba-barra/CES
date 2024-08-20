Ext.define('Erems.store.Masterformula', {
    extend: 'Ext.data.Store',
    alias: 'store.masterformulastore',
    requires: [
        'Erems.model.Masterformula'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterformulaStore',
                model: 'Erems.model.Masterformula',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterformula/read',
                        create: 'erems/masterformula/create',
                        update: 'erems/masterformula/update',
                        destroy: 'erems/masterformula/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'billingrules_id',
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