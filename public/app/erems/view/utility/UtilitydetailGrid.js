Ext.define('Erems.view.utility.Utilitydetailgrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.utilitydetailgrid',
    store: 'Utilitydetail',
    requires: [
        
    ],
    height: 200,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            //contextMenu: me.generateContextMenu(),
         	dockedItems: me.generateDockedItems(),
			
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
                    itemId: 'colms_utilitytype',
                    width: 100,
                    dataIndex: 'utilitytype',
                    hideable: false,
                    text: 'Utility Type'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_request_date',
                    width: 100,
                    dataIndex: 'request_date',
                    hideable: false,
                    text: 'Request Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_installment_date',
                    width: 100,
                    dataIndex: 'installment_date',
                    hideable: false,
                    text: 'Installment Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_followup_date',
                    width: 100,
                    dataIndex: 'followup_date',
                    hideable: false,
                    text: 'Followup Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_meter_no',
                    width: 100,
                    dataIndex: 'meter_no',
                    hideable: false,
                    text: 'Meter Number'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_utilitystatus',
                    width: 100,
                    dataIndex: 'utilitystatus',
                    hideable: false,
                    text: 'Status'
                },
				
                //   me.generateActionColumn()
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
         
                items: [
                    {
                        xtype: 'button',
                        action: 'add_utility',
                        hidden: true,
                        itemId: 'btnNews',
                        margin: '0 5 0 0',
                        padding:5,
                        iconCls: 'icon-new',
                        //bindAction: me.bindPrefixName+'SelectUnit',
                        text: 'Add New Progress Listrik dan Air'
                    },
					{
                        xtype: 'button',
                        action: 'edit_utility',
                        hidden: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        padding:5,
                        iconCls: 'icon-edit',
                        //bindAction: me.bindPrefixName+'SelectUnit',
                        text: 'Edit',
						disabled: true
                    },
					{
                        xtype: 'button',
                        action: 'delete_utility',
                        hidden: true,
                        itemId: 'btnDelete',
                        margin: '0 5 0 0',
                        padding:5,
                        iconCls: 'icon-delete',
                        //bindAction: me.bindPrefixName+'SelectUnit',
                        text: 'Delete',
						disabled: true
                    },
					{
                        xtype: 'button',
                        action: 'view_utility',
                        hidden: false,
                        itemId: 'btnView',
                        margin: '0 5 0 0',
                        padding:5,
                        iconCls: 'icon-search',
                        //bindAction: me.bindPrefixName+'SelectUnit',
                        text: 'View',
						disabled: true
                    }
                ]
            },
            /*{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }*/
        ];
        return dockedItems;
    }
});