Ext.define('Hrd.view.uploadtransaction.GridProcessUnpaidLeave', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.uploadtransactionprocessunpaidleavegrid',
    storeConfig: {
        id: 'UploadtransactionGridProcessUnpaidLeaveStore',
        idProperty: 'department_id',
        extraParams: {}
    },
    bindPrefixName: 'department',
    newButtonLabel: 'New',
    itemId:'UploadtransactionGridProcessUnpaidLeaveID',
    layout: 'fit',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: [],
            dockedItems: me.generateDockedItems(),
            defaults: {
                xtype: 'gridcolumn',
                width:775
            },
            viewConfig: {
            },
            // selModel: Ext.create('Ext.selection.CheckboxModel', {
            // }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                // {
                //    dataIndex: 'status_transfer',
                //    text: 'Status Transfer',
                //    width:100
                // },
                {
                    xtype       : 'booleancolumn',
                    text        : 'Transfer',
                    dataIndex   : 'upload_check',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    width       : 60,
                    resizable   : false,
                    align       : 'center'
                },                
                {
                   dataIndex: 'action_process',
                   text: 'Action Transfer',
                   width:100
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
                   dataIndex: 'start_date',
                   text: 'Start Date',
                   width:100
                },
                {
                   dataIndex: 'end_date',
                   text: 'End Date',
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
                   width:150
                },
                {
                   dataIndex: 'department',
                   text: 'Department',
                   width:100
                }, 
                {
                   dataIndex: 'total_unpaid_leave',
                   text: 'Total Unpaid Leave',
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