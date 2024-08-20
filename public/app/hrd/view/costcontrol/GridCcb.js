Ext.define('Hrd.view.costcontrol.GridCcb', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.costcontrolccbgrid',
    storeConfig: {
        id: 'CostcontrolCcbGridStore',
        idProperty: 'costcontrol_id',
        extraParams: {
            mode_read:'ccb'
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
                    //xtype:'',
                    dataIndex: 'code',
                    text: 'Kode'
                },
                {
                    //xtype:'numbercolumn',
                    dataIndex: 'description',
                    text: 'Keterangan'
                },
                {
                    dataIndex:'urut',
                    text:'Urut'
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