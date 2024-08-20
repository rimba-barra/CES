Ext.define('Erems.store.Approvalpricelistreport', {
    extend      : 'Ext.data.Store',
    alias       : 'store.approvalpriceliststorereport',
    requires    : ['Erems.model.Approvalpricelist'],
    constructor : function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId : 'ApprovalpricelistrejectStore',
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
                    status  : 'ALL',
                    mode_sp : 'report',
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