Ext.define('Gl.store.Accountdebet', {
    extend: 'Ext.data.Store',
    alias: 'store.accountdebetstore',
    requires: [
        'Gl.model.Accountdebet'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'AccountdebetStore',
                model: 'Gl.model.Accountdebet',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/offset/read',
                        create: 'gl/offset/create',
                        update: 'gl/offset/update',
                        destroy: 'gl/offset/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'coa_id_debet',
                        root: 'data',
                        totalProperty: 'total'
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