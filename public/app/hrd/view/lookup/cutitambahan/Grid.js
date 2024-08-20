Ext.define('Hrd.view.lookup.cutitambahan.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.lookupcutitambahangrid',
    storeConfig:{
        id:'LookupMonitoringmatrixEmployeeStore',
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
					width:150
                },
                {
					dataIndex: 'employee_name',
					text: 'Employee Name',
					width:220
                },
                {
					dataIndex: 'department',
					text: 'Department',
					width:200, 
                }/*
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