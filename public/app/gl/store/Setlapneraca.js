Ext.define('Gl.store.Setlapneraca', {
    extend: 'Ext.data.Store',
    alias: 'store.setlapneracastore',
    requires: [
        'Gl.model.Setlapneraca'
    ],
   
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SetlapneracaStore',
                model: 'Gl.model.Setlapneraca',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/setlapneraca/read',
                        create: 'gl/setlapneraca/create',
                        update: 'gl/setlapneraca/update',
                        destroy: 'gl/setlapneraca/delete'
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
                    },extraParams: {
                        hideparam: 'default',
                        start:'0',
                        limit:"1000"
                    }
                }
            }, cfg)]);
    },
   
});