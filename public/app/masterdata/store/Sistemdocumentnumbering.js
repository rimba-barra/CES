Ext.define('Masterdata.store.Sistemdocumentnumbering', {
    extend: 'Ext.data.Store',
    alias: 'store.SistemdocumentnumberingStore',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'SistemdocumentnumberingStore',
            model: 'Masterdata.model.Sistemdocumentnumbering',
            proxy: {
                type: 'ajax',
                timeout:45000,
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'masterdata/sistemdocumentnumbering/read',
                    create: 'masterdata/sistemdocumentnumbering/create',
                    update: 'masterdata/sistemdocumentnumbering/update',
                    destroy: 'masterdata/sistemdocumentnumbering/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'sistemdocumentnumber_id',
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