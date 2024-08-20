Ext.define('Hrd.store.Roleapproval', {
    extend: 'Ext.data.Store',
    alias: 'store.roleapprovalstore',
    requires: [
        'Hrd.model.Generalparameter'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'RoleapprovalStore',
                model: 'Hrd.model.Generalparameter',             
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'hrd/roleapproval/read',
                        create: 'hrd/roleapproval/create',
                        update: 'hrd/roleapproval/update',
                        destroy: 'hrd/roleapproval/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'generalparameter_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        mode_read: 'default'
                    }
                }
            }, cfg)]);
    }
});