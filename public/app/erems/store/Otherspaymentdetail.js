Ext.define('Erems.store.Otherspaymentdetail', {
    extend: 'Ext.data.ArrayStore',
    alias: 'store.otherspaymentdetailstore',
    fields: [
        'paymentdetail_id','paymenttype_id','paymenttype','amount','description'
        
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'OtherspaymentdetailStore'
            }, cfg)]);
    }
});