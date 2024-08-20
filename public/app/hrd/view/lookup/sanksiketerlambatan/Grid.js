Ext.define('Hrd.view.lookup.sanksiketerlambatan.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.lookupsanksiketerlambatangrid',
    storeConfig:{
        id:'LookupSanksiKeterlambatanEmployeeStore',
        idProperty:'employee_id',
        extraParams:{}
    },
    bindPrefixName: 'Employee',
    newButtonLabel: 'New Employee',
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
					dataIndex: 'employee_nik',
					text: 'NIK',
					width:70
                },
                {
					dataIndex: 'employee_name',
					text: 'Employee Name',
					width:180
                },
                {
					dataIndex: 'department',
					text: 'Department',
					width:180, 
                },
                {
                    dataIndex: 'total_late',
                    text: 'Total Late',
                    width:100, 
                },
                {
                    dataIndex: 'avg_late',
                    text: 'Average Late',
                    width:100, 
                }

                //added by anas 29012024
                ,{
                    dataIndex: 'total_lost',
                    text: 'Total Lost Time',
                    width:100, 
                },
                {
                    dataIndex: 'avg_lost',
                    text: 'Average Lost Time',
                    width:100, 
                }
                //end added by anas

                /*
                {
					dataIndex: 'project_name',
					text: 'Project',
					width:200, 
                },
                {
					dataIndex: 'pt_name',
					text: 'PT',
					width:200
                }*/
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