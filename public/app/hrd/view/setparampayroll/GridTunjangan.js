Ext.define('Hrd.view.setparampayroll.GridTunjangan', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.setparampayrolltunjangangrid',
    storeConfig: {
        id: 'SetparampayrollTunjanganGridStore',
        idProperty: 'tunjangangroup_id',
        extraParams: {
            mode_read:'tunjangangroup'
        }
    },
    bindPrefixName: 'Setparampayroll',
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
                    dataIndex: 'komponengaji_code',
                    text: 'Tunjangan #'
                },
                {
                    dataIndex: 'komponengaji_description',
                    text: 'Keterangan'
                },
                {
                    xtype:'numbercolumn',
                    dataIndex: 'value',
                    text: 'Nilai'
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