Ext.define('Hrd.view.setparampayroll.GridPajak', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.setparampayrollpajakgrid',
    storeConfig: {
        id: 'SetparampayrollPajakGridStore',
        idProperty: 'parampajak_id',
        extraParams: {
            mode_read:'pajak'
        }
    },
    bindPrefixName: 'Setparampajak',
    newButtonLabel: 'New',
    initComponent: function() {
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
                    xtype:'numbercolumn',
                    dataIndex: 'value',
                    text: ' >= '
                },
                {
                    xtype:'numbercolumn',
                    dataIndex: 'percent',
                    text: 'Pajak (%) '
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
                        action: 'create',
                      
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                 
                        text:'Add'
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                      
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                 
                        text:'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
              
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                   
                ]
            }
        ];
        return dockedItems;
    }
});