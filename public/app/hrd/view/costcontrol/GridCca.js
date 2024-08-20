Ext.define('Hrd.view.costcontrol.GridCca', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.costcontrolccagrid',
    storeConfig: {
        id: 'CostcontrolccaGridStore',
        idProperty: 'costcontrol_id',
        extraParams: {
            mode_read:'cca'
        }
    },
    bindPrefixName: 'Costcontrol',
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
                    dataIndex: 'code',
                    text: 'Kode'
                },
                {
                    dataIndex: 'description',
                    text: 'Keterangan',
                    width:300
                },
                {
                    
                    dataIndex: 'urut',
                    text: 'Urut'
                },
                {
                    
                    dataIndex: 'kode_bank',
                    text: 'Kode bank'
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