Ext.define('Gl.view.bungaloan.Grid', {
    extend: 'Gl.library.template.view.Grid',
    alias: 'widget.bungaloangrid',
    store: 'Bungaloan',
    bindPrefixName: 'Bungaloan',
    newButtonLabel: 'Add New',
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    initComponent: function () {
        var me = this;
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItemsCustome(),
            plugins: [rowEditing],
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_bulan',
                    width: 150,
                    dataIndex: 'bulan',
                    hideable: false,
                    text: 'Bulan',
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_bunga',
                    width: 100,
                    dataIndex: 'bunga',
                    hideable: false,
                    text: 'Bunga',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    editor: {
                        xtype: 'textfield',
                        fieldStyle: 'text-align:right'
                    }

                },
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItemsCustome: function () {
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'generate',
                        hidden: true,
                        itemId: 'btnGenerate',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Generate',
                        text: 'Generate'
                    },
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
    },
});


