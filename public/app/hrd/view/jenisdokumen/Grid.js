Ext.define('Hrd.view.jenisdokumen.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.jenisdokumengrid',
    storeConfig: {
        id: 'JenisdokumenGridStore',
        idProperty: 'jenisdocument_id',
        extraParams: {}
    },
    bindPrefixName: 'Jenisdokumen',
    newButtonLabel: 'New Dokumen',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults: {
                xtype: 'gridcolumn',
            },
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    dataIndex: 'index_no',
                    text: 'Index No'
                },
                {
                    dataIndex: 'code',
                    text: 'Kode'
                },
                {
                    dataIndex: 'description',
                    text: 'Keterangan',
		    width:'300'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});