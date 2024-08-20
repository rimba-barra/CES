Ext.define('Erems.store.Masterdocumentunit', {
    extend: 'Ext.data.Store',
    alias: 'store.masterdocumentunitstore',
    requires: [
        'Erems.model.Unit'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterdocumentunitStore',
                model: 'Erems.model.Masterunitdocument',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterdocumentunit/read',
                        create: 'erems/masterdocumentunit/create',
                        update: 'erems/masterdocumentunit/update',
                        destroy: 'erems/masterdocumentunit/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'unit_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        mode_read: 'all',
                        code: '',
                        name: '',
                        birthdate: ''
                    },
                }
            }, cfg)]);
    }
});