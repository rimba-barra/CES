Ext.define('Erems.store.Templatechecklist', {
    extend: 'Ext.data.Store',
    alias: 'store.templatecheckliststore',
    requires: [
        'Erems.model.Templatechecklist'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'TemplatechecklistStore',
                model: 'Erems.model.Templatechecklist',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/templatechecklist/read',
                        create: 'erems/templatechecklist/create',
                        update: 'erems/templatechecklist/update',
                        destroy: 'erems/templatechecklist/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'position_id',
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