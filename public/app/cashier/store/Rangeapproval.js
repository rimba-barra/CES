Ext.define('Cashier.store.Rangeapproval', {
    extend: 'Ext.data.Store',
    alias: 'store.rangeapprovalstore',
    fields: [
        {name: 'range_id', type: 'int'},
        {name: 'fromamount', type: 'numeric'},
        {name: 'untilamount', type: 'numeric'},
        {name: 'description', type: 'string'},
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'RangeapprovalStore',
                data: [
                    {"range_id": 1, "fromamount": 0, "untilamount": 999999999999, "description": 'Value 0.00 s/d 999,999,999,999.00'},
                ],
            }, cfg)]);
    }
});