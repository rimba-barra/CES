Ext.define('Erems.store.Pphpayment', {
    extend: 'Ext.data.Store',
    alias: 'store.PphpaymentStore',
	
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({            
            model: 'Erems.model.Pphpayment',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'erems/pphpayment/read',
                    create: 'erems/pphpayment/create',
                    update: 'erems/pphpayment/update',
                    destroy: 'erems/pphpayment/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'purchaseletter_id',
                    root: 'data'
                },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                }
            }
        }, cfg)]);
    }
});