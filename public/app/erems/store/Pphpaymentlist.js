Ext.define('Erems.store.Pphpaymentlist', {
    extend: 'Ext.data.Store',
    alias: 'store.PphpaymentlistStore',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'Pphpaymentlist',
            model: 'Erems.model.Pphpaymentlist',			
            proxy: {
                type: 'ajax',				
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'erems/pphpayment/paymentlistread',
                    /*create: 'erems/pphpayment/create',
                    update: 'erems/pphpayment/update',
                    destroy: 'erems/pphpayment/depositdelete'*/
                },
                reader: {
                    type: 'json',
                    idProperty: 'payment_id',
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