Ext.define('Gl.store.Levelcombox', {
    extend: 'Ext.data.Store',
    alias: 'store.levelcombostore',
    requires: [
        'Gl.model.Coa'
    ],
    groupers:'level',
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'LevelComboStore',
                model: 'Gl.model.Coa',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/coa/read'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'coa_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'default'
                    }
                }
            }, cfg)]);
    }
});