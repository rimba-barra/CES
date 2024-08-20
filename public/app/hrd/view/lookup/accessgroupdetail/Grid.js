Ext.define('Hrd.view.lookup.accessgroupdetail.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.lookupaccessgroupdetailgrid',
    storeConfig:{
        id:'LookupAccessgroupdetailGroupStore',
        idProperty:'group_id',
        extraParams:{}
    },
    bindPrefixName: 'Group',
    newButtonLabel: 'New Group',
    initComponent: function() {
        var me = this;
		
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults:{
                 xtype: 'gridcolumn',                
            },
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
				checkOnly : true
            }),
            columns: [
                {
                    xtype: 'rownumberer',
					width:30
                },
                {
					dataIndex: 'code',
					text: 'Code',
					width:150
                },
                {
					dataIndex: 'group',
					text: 'Golongan',
					width:220
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
                dock: 'bottom',
                height: 28,
                items: [
					{
						xtype: 'tbfill'
					},
                    {
                        xtype: 'button',
                        border:1,
                        action: 'select',
                        margin: '0 5 0 0',
		        		iconCls: 'icon-new',
                        text: 'Add Selected'
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