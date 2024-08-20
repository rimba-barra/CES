Ext.define('Erems.store.Masterperiodecutoff', {
    extend   : 'Ext.data.Store',
    alias    : 'store.masterperiodecutoffstore',
    requires : [
        'Erems.model.Masterperiodecutoff'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId : 'MasterperiodecutoffStore',
                model   : 'Erems.model.Masterperiodecutoff',
                proxy   : {
                    type          : 'ajax',
                    actionMethods : {
                        read    : 'POST',
                        create  : 'POST',
                        update  : 'POST',
                        destroy : 'POST'
                    },
                    api : {
                        read    : 'erems/masterperiodecutoff/read',
                        create  : 'erems/masterperiodecutoff/create',
                        update  : 'erems/masterperiodecutoff/update',
                        destroy : 'erems/masterperiodecutoff/delete'
                    },
                    reader : {
                        type       : 'json',
                        idProperty : 'audit_periode_cutoff_id',
                        root       : 'data'
                    },
                    writer : {
                        type   : 'json',
                        encode : true,
                        root   : 'data'
                    }
                }
            }, cfg)]);
    }
});