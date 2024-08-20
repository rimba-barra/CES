Ext.define('Erems.store.Formorderijb', {
    extend: 'Ext.data.Store',
    alias: 'store.formorderijbstore',
    requires: [
        'Erems.model.Formorderijb'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'FormorderijbStore',
                model: 'Erems.model.Formorderijb',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/formorderijb/read',
                        create: 'erems/formorderijb/create',
                        update: 'erems/formorderijb/update',
                        destroy: 'erems/formorderijb/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'formorderijb_id',
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