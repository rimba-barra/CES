Ext.define('Erems.store.Mastercollector', {
    extend: 'Ext.data.Store',
    alias: 'store.mastercollectorstore',
    requires: [
        'Erems.model.Admincollection'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'MastercollectorStore',
            model: 'Erems.model.Admincollection',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'erems/mastercollector/read',
                    create: 'erems/mastercollector/create',
                    update: 'erems/mastercollector/update',
                    destroy: 'erems/mastercollector/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'changeownership_id',
                    root: 'data'
                },
                // extraParams: {
                //     mode_read: "mastercollector", position: 8
                // },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                },

            }
        }, cfg)]);
    }
});