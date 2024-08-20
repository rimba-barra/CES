Ext.define('Hrd.view.mhasilkerja.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.mhasilkerjagrid',
    storeConfig: {
        id: 'MhasilkerjaGridStore',
        idProperty: 'hasilkerja_item_id',
        extraParams: {}
    },
    bindPrefixName: 'Mhasilkerja',
    newButtonLabel: 'New',
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
				/*
                {
                    xtype: 'rownumberer'
                },*/
                {
                    dataIndex: 'index_no',
                    text: 'Index No',
                    width:'100'
                },
                {
                    dataIndex: 'hasilkerja_item',
                    text: 'Penilaian',
                    width:'600'
                },
                {
                    dataIndex: 'bobot',
                    text: 'Bobot',
                    width:'100'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});