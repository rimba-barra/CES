Ext.define('Erems.store.Surathimbauanuangmuka', {
    extend      : 'Ext.data.Store',
    alias       : 'store.surathimbauanuangmukastore',
    requires    : [ 'Erems.model.Surathimbauanuangmuka' ],
    constructor : function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId : 'SurathimbauanuangmukaStore',
            model   : 'Erems.model.Surathimbauanuangmuka',
            proxy   : {
                type          : 'ajax',
                actionMethods : {
                    read    : 'POST',
                    create  : 'POST',
                    update  : 'POST',
                    destroy : 'POST'
                },
                api : {
                    read    : 'erems/surathimbauanuangmuka/read',
                    create  : 'erems/surathimbauanuangmuka/create',
                    update  : 'erems/surathimbauanuangmuka/update',
                    destroy : 'erems/surathimbauanuangmuka/delete'
                },
                reader : {
                    type       : 'json',
                    idProperty : 'purchaseletter_id',
                    root       : 'data'
                },
                extraParams : {
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