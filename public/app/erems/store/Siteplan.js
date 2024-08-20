Ext.define('Erems.store.Siteplan', {
    extend: 'Ext.data.Store',
    alias: 'store.siteplanstore',
    requires: [
        'Erems.model.Siteplan'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SiteplanStore',
                model: 'Erems.model.Siteplan',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/siteplan/read',
                        create: 'erems/siteplan/create',
                        update: 'erems/siteplan/update',
                        destroy: 'erems/siteplan/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'hgbajb_id',
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