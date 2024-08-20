Ext.define('Cashier.store.Datatype', {
    extend: 'Ext.data.Store',
    alias: 'store.datatypestore',
    requires: [
        'Cashier.model.Datatype'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'DatatypeStore',
                model: 'Cashier.model.Datatype',
                data: [
                    {datatype_id: 'CHARACTER', datatype: 'CHARACTER'},
                    {datatype_id: 'INTEGER', datatype: 'INTEGER'},
                    {datatype_id: 'DATETIME', datatype: 'DATETIME'},
                    {datatype_id: 'BOOLEAN', datatype: 'BOOLEAN'},
                    {datatype_id: 'IMAGE', datatype: 'IMAGE'}
                ]
            }, cfg)]);
    }
});