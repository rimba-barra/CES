Ext.define('Gl.store.CoaSettingCombo', {
    extend: 'Ext.data.Store',
    alias: 'store.coasettingcombostore',
    requires: [
        'Gl.model.Coa'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CoaSettingComboStore',
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
                        read: 'gl/coa/read',
                        create: 'gl/coa/create',
                        update: 'gl/coa/update',
                        destroy: 'gl/coa/delete'
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
                        hideparam: 'forcombobox'
                    }
                }
            }, cfg)]);
    }
});