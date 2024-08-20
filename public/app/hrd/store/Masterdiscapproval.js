Ext.define('Hrd.store.Masterdiscapproval', {
    extend: 'Ext.data.Store',
    alias: 'store.masterdiscapproval',
    requires: [
        'Hrd.model.Masterdiscapproval'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterdiscapprovalStore',
                model: 'Hrd.model.Masterdiscapproval',             
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'hrd/masterdiscapproval/read',
                        create: 'hrd/masterdiscapproval/create',
                        update: 'hrd/masterdiscapproval/update',
                        destroy: 'hrd/masterdiscapproval/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'disckaryawan_approval_id',
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