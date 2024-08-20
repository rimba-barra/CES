Ext.define('Gl.store.Setlaprugilaba', {
    extend: 'Ext.data.Store',
    alias: 'store.setlaprugilabastore',
    requires: [
        'Gl.model.Setlaprugilaba'
    ],
   
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SetlaprugilabaStore',
                model: 'Gl.model.Setlaprugilaba',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/setlaprugilaba/read',
                        create: 'gl/setlaprugilaba/create',
                        update: 'gl/setlaprugilaba/update',
                        destroy: 'gl/setlaprugilaba/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'rptformat_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    }
                }
            }, cfg)]);
    },
   
});