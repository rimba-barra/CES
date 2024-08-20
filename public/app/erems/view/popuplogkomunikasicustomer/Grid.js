/// Create by Erwin.S 15042021
Ext.define('Erems.view.popuplogkomunikasicustomer.Grid', {
    extend         : 'Erems.library.template.view.Grid',
    alias          : 'widget.popuplogkomunikasicustomergrid',
    store          : 'Popuplogkomunikasicustomer',
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
                    dataIndex: 'email',
                    text: 'Email'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'department',
                    text: 'Department'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'phone',
                    text: 'Phone'
                },
                {
                    xtype: 'gridcolumn',
                    width: 300,
                    dataIndex: 'log_komunikasi',
                    text: 'Log Komunikasi'
                },
                {
                    xtype: 'datecolumn',
                    width: 200,
                    dataIndex: 'Addon',
                    text: 'Addon'
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
