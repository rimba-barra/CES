Ext.define('Erems.store.Datatype', {
    extend: 'Ext.data.Store',
    alias: 'store.datatypestore',
    requires: [
        'Erems.model.Datatype'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'DatatypeStore',
                model: 'Erems.model.Datatype',
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