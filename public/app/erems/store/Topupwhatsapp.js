Ext.define('Erems.store.Topupwhatsapp', {
    extend: 'Ext.data.Store',
    alias: 'store.topupwhatsappstore',
    requires: [
        'Erems.model.Topupwhatsapp'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'TopupwhatsappStore',
                model: 'Erems.model.Topupwhatsapp',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/topupwhatsapp/read',
                        create: 'erems/topupwhatsapp/create',
                        update: 'erems/topupwhatsapp/update',
                        destroy: 'erems/topupwhatsapp/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'whatsapp_topup_id',
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