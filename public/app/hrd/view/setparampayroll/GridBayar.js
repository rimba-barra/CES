Ext.define('Hrd.view.setparampayroll.GridBayar', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.setparampayrollbayargrid',
    storeConfig: {
        id: 'SetparampayrollBayarGridStore',
        idProperty: 'parambayar_id',
        extraParams: {
            mode_read:'bayar'
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
                  //  xtype:'numbercolumn',
                    dataIndex: 'komponengaji_code',
                    text: 'Kode #'
                },
                {
                  //  xtype:'numbercolumn',
                    dataIndex: 'komponengaji_description',
                    text: 'Keterangan'
                },
                {
                   // xtype: 'booleancolumn',
                    width: 75,
                    align: 'center',
                   //falseText: ' ',
                  //  trueText: '&#10003;',
                    dataIndex: 'is_dimuka',
                    text: 'Bayar di muka'
                   
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