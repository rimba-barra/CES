 var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });

Ext.define('Cashier.view.subchasier.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.subchasiergrid',
    store: 'Subchasier',
    bindPrefixName: 'Subchasier',
    itemId: 'Subchasier',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
               Ext.applyIf(me, {
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            plugins: [rowEditing],
            title: 'Sub Cashier',
            frame: true,
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    width: 200,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description',
                    editor: {
                        allowBlank: false
                    }
                },
            ],
            tbar: [{
                    text: 'Add New',
                    iconCls: 'icon-new',
                    handler: function () {
                        if (rowEditing.editing)
                            return false;
                        var r = {
                            description: 'Test',                           
                        };
                        rowEditing.startAdd(r,0);
                    }
                }, {
                    itemId: 'removecell',
                    text: 'Remove Cell',
                    iconCls: 'icon-remove',
                    handler: function () {
                        var sm = me.getGrid().getSelectionModel();
                        rowEditing.cancelEdit();
                        me.getGrid().getStore().remove(sm.getSelection());
                    },
                    disabled: true
                }],
        });

        me.callParent(arguments);
    },
});


