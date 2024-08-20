Ext.define('Hrd.view.transferapitransaction.GridProcess', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.transferapitransactionprocessgrid',
    storeConfig: {
        id: 'TransferapitransactionGridProcessStore',
        idProperty: 'department_id',
        extraParams: {}
    },
    bindPrefixName: 'department',
    newButtonLabel: 'New',
    itemId:'TransferapitransactionGridProcessID',
    layout: 'fit',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: [],
            dockedItems: me.generateDockedItems(),
            defaults: {
                xtype: 'gridcolumn',
                width:775,
                height: 500,
                layout: 'fit',
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
                   dataIndex: 'status_transfer',
                   text: 'Status Transfer',
                   width:100
                },
                {
                   dataIndex: 'project_name',
                   text: 'Project',
                   width:100
                },
                {
                   dataIndex: 'pt_name',
                   text: 'PT',
                   width:100
                },
                {
                   dataIndex: 'nik_group',
                   text: 'NIK Group',
                   width:100
                },
                {
                   dataIndex: 'employee_name',
                   text: 'Employee Name',
                   width:200
                },
                {
                   dataIndex: 'department',
                   text: 'Department',
                   width:100
                }, 
                {
                   dataIndex: 'total_attendance',
                   text: 'Total Attendance',
                   width:100
                },                
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            // {
            //     xtype: 'toolbar',
            //     dock: 'top',
            //     height: 28,
            //     items: [
            //         {
            //             xtype: 'button',
            //             action: 'choose_formcompetency',
            //             iconCls: 'icon-new',
            //             text: 'Choose Competency'
            //         },
            //         {
            //             xtype: 'button',
            //             action: 'delete_formcompetency',
            //             iconCls: 'icon-delete',
            //             text: 'Delete Competency'
            //         }
            //     ]
            // },
           /* {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }*/
        ];
        return dockedItems;
    },
   
});