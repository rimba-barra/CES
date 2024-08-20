Ext.define('Gl.store.Documentnumbering', {
    extend: 'Ext.data.Store',
    alias: 'store.documentnumberingstore',
    requires: [
        'Gl.model.Documentnumbering'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'DocumentnumberingStore',
                model: 'Gl.model.Documentnumbering',
                sorters: [{
                    property: 'subdsk',
                    direction: 'ASC'
                }],
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/documentnumbering/read',
                        create: 'gl/documentnumbering/create',
                        update: 'gl/documentnumbering/update',
                        destroy: 'gl/documentnumbering/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'documentnumber_id',
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