Ext.define('Masterdata.store.Documentnumbering', {
    extend: 'Ext.data.Store',
    alias: 'store.DocumentnumberingStore',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'DocumentnumberingStore',
            model: 'Masterdata.model.Documentnumbering',
            proxy: {
                type: 'ajax',
                timeout:4500000,
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'masterdata/documentnumbering/read',
                    create: 'masterdata/documentnumbering/create',
                    update: 'masterdata/documentnumbering/update',
                    destroy: 'masterdata/documentnumbering/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'documentnumber_id',
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