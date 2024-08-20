Ext.define('Gl.store.Changenumberordatevoucher', {
    extend: 'Ext.data.Store',
    alias: 'store.changenumberordatevoucherstore',
    requires: [
        'Gl.model.Changenumberordatevoucher'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ChangenumberordatevoucherStore',
                model: 'Gl.model.Changenumberordatevoucher',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/changenumberordatevoucher/read',
                        create: 'gl/changenumberordatevoucher/create',
                        update: 'gl/changenumberordatevoucher/update',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'copy_journal_id',
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