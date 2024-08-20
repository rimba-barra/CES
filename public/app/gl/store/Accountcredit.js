Ext.define('Gl.store.Accountcredit', {
    extend: 'Ext.data.Store',
    alias: 'store.accountcreditstore',
    requires: [
        'Gl.model.Accountcredit'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'AccountcreditStore',
                model: 'Gl.model.Accountcredit',
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
                        idProperty: 'coa_id_credit',
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