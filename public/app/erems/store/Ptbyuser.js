Ext.define('Erems.store.Ptbyuser', {
    extend: 'Ext.data.Store',
    alias: 'store.ptbyuserstore',
    requires: [
        'Erems.model.Projectpt'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PtbyuserStore',
                model: 'Erems.model.Projectpt',
                sorters: [{
                    property: 'projectcode',
                    direction: 'ASC'
                }, {
                    property: 'ptcode',
                    direction: 'ASC'
                }],
                proxy: {
                    type: 'ajax',
                    timeout:45000000,
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                       
                    },
                    api: {
                        read: 'erems/common/read',
                        create: 'erems/common/create',
                        update: 'erems/common/update',
                        destroy: 'erems/common/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'pt_id',
                        root: 'data',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams:{
                        hideparam :'getptbyuser',
                        project_id: apps.project,
                        start: 0,
                        limit: 1000,
                    }
                }
            }, cfg)]);
    }
});