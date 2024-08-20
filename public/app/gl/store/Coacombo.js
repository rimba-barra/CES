Ext.define('Gl.store.Coacombo', {
    extend: 'Ext.data.Store',
    alias: 'store.coacombostore',
    requires: [
        'Gl.model.Coa'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CoacomboStore',
                model: 'Gl.model.Coa',
                sorters: [
                    {property: 'coa', direction: 'ASC'}
                ],
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
                        root: 'data',
                        totalProperty: 'total'
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