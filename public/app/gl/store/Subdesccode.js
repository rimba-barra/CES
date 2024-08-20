Ext.define('Gl.store.Subdesccode', {
    extend: 'Ext.data.Store',
    alias: 'store.subdesccodestore',
    requires: [
        'Gl.model.Subdesccode'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SubdesccodeStore',
                model: 'Gl.model.Subdesccode',
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
                        read: 'gl/subdesccode/read',
                        create: 'gl/subdesccode/create',
                        update: 'gl/subdesccode/update',
                        destroy: 'gl/subdesccode/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'subdsk_id',
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