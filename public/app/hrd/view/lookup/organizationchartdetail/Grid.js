Ext.define('Hrd.view.lookup.organizationchartparent.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.lookuporganizationchartparentgrid',
//    storeConfig:{
//        id:'LookupMonitoringmatrixPositionStore',
//        idProperty:'position_id',
//        extraParams:{}
//    },
    bindPrefixName: 'Parent',
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
            columns: [
                {
                    xtype: 'rownumberer',
                    width:30
                },
                {
                    dataIndex: 'position',
                    text: 'Position',
                    width:150
                },
                {
                    dataIndex: 'description',
                    text: 'Description',
                    width:200
                },
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