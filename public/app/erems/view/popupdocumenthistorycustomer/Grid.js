/// Create by Erwin.S 15042021
Ext.define('Erems.view.popupdocumenthistorycustomer.Grid', {
    extend         : 'Erems.library.template.view.Grid',
    alias          : 'widget.popupdocumenthistorycustomergrid',
    store          : 'Popupdocumenthistorycustomer',
    bindPrefixName : '',
    newButtonLabel : 'New',
    initComponent  : function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu : me.generateContextMenu(),
            dockedItems : me.generateDockedItems(),
            viewConfig  : {},
            selModel    : {},
            defaults    : {
                xtype : 'gridcolumn',
                width : 100,
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    dataIndex: 'filename',
                    text: 'Filename'
                },
                {
                    xtype: 'gridcolumn',
                    width: 75,
                    dataIndex: 'type',
                    text: 'Type'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'description',
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'user_download',
                    text: 'User Download'
                },
                {
                    xtype: 'datecolumn',
                    width: 100,
                    dataIndex: 'tgl_download',
                    text: 'Tgl. Download'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'alasan',
                    text: 'Alasan'
                }
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'export_excel',
                        itemId: 'btnExport',
                        margin: '0 5 0 0',
                        iconCls: 'icon-print',
                        text: 'Export Excel'
                    }
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }
        ];
        return dockedItems;
    }
});
