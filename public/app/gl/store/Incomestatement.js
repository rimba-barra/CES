Ext.define('Gl.store.Incomestatement', {
    extend: 'Ext.data.Store',
    alias: 'store.incomestatementstore',
    requires: [
        'Gl.model.Incomestatement'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'IncomestatementStore',
                model: 'Gl.model.Incomestatement',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/incomestatement/read',
                        create: 'gl/incomestatement/create',
                        update: 'gl/incomestatement/update',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'from_coa_id',
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