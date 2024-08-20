Ext.define('Erems.store.Approvalpricelistopen', {
    extend      : 'Ext.data.Store',
    alias       : 'store.approvalpriceliststoreopen',
    requires    : ['Erems.model.Approvalpricelist'],
    constructor : function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId : 'ApprovalpricelistopenStore',
            model   : 'Erems.model.Approvalpricelist',
            proxy   : {
                type          : 'ajax',
                actionMethods : {
                    read    : 'POST',
                    create  : 'POST',
                    update  : 'POST',
                    destroy : 'POST'
                },
                api: {
                    read    : 'erems/approvalpricelist/read',
                    create  : 'erems/approvalpricelist/create',
                    update  : 'erems/approvalpricelist/update',
                    destroy : 'erems/approvalpricelist/delete'
                },
                reader : {
                    type       : 'json',
                    idProperty : 'pricelist_id',
                    root       : 'data'
                },
                extraParams : {
                    status : 'OPEN'
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