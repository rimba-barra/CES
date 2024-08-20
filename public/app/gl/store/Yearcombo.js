Ext.define('Gl.store.Yearcombo', {
    extend: 'Ext.data.Store',
    alias: 'store.yearcombostore',
    requires: [
        'Gl.model.Yearcombo'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'YearcomboStore',
                model: 'Gl.model.Yearcombo',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/copyjournal/read',
                        create: 'gl/copyjournal/create',
                        update: 'gl/copyjournal/update',
                        destroy: 'gl/copyjournal/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'voucher_no',
                        root: 'data',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'yearlist'
                    }
                }
            }, cfg)]);
    }
});