Ext.define('Hrd.view.uploadmaster.GridProcessCareerTransition', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.uploadmasterprocesscareertransitiongrid',
    storeConfig: {
        id: 'UploadmasterGridProcessCareerTransitionStore',
        idProperty: 'nik_group',
        extraParams: {}
    },
    bindPrefixName: 'employee_name',
    newButtonLabel: 'New',
    itemId:'UploadmasterGridProcessCareerTransitionID',
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
            // selModel: Ext.create('Ext.selection.CheckboxModel', {
            // }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
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
                   dataIndex: 'changetype',
                   text: 'Change Type',
                   width:100
                },
                {
                   dataIndex: 'alasanresign',
                   text: 'Alasan Resign',
                   width:100
                },
                {
                   dataIndex: 'perubahanstatus',
                   text: 'Perubahan Status',
                   width:100
                },
                {
                   dataIndex: 'reason',
                   text: 'Reason',
                   width:100
                },
                {
                   dataIndex: 'note',
                   text: 'Note',
                   width:100
                },
                {
                   dataIndex: 'sk_number',
                   text: 'SK Number',
                   width:100
                },
                {
                   dataIndex: 'effective_date',
                   text: 'Effective Date',
                   width:100,
                   format:'Y-m-d',
                   xtype:'datecolumn'
                },
                {
                   dataIndex: 'old_project_id',
                   text: 'Old Project Id',
                   width:100
                },
                {
                   dataIndex: 'old_project',
                   text: 'Old Project Name',
                   width:100
                },
                {
                   dataIndex: 'new_project_id',
                   text: 'New Project Id',
                   width:100
                },
                {
                   dataIndex: 'new_project',
                   text: 'New Project Name',
                   width:100
                },
                {
                   dataIndex: 'old_pt_id',
                   text: 'Old Pt Id',
                   width:100
                },
                {
                   dataIndex: 'old_pt',
                   text: 'Old Pt Name',
                   width:100
                },
                {
                   dataIndex: 'new_pt_id',
                   text: 'New Pt Id',
                   width:100
                },
                {
                   dataIndex: 'new_pt',
                   text: 'New Pt Name',
                   width:100
                },
                // {
                //    dataIndex: 'old_department_id',
                //    text: 'Old Department Id',
                //    width:100
                // },
                {
                   dataIndex: 'old_department',
                   text: 'Old Department Name',
                   width:100
                },
                // {
                //    dataIndex: 'new_department_id',
                //    text: 'New Department Id',
                //    width:100
                // },
                {
                   dataIndex: 'new_department',
                   text: 'New Department Name',
                   width:100
                },
                // {
                //    dataIndex: 'old_position_id',
                //    text: 'Old Position Id',
                //    width:100
                // },
                {
                   dataIndex: 'old_position',
                   text: 'Old Position Name',
                   width:100
                },
                // {
                //    dataIndex: 'new_position_id',
                //    text: 'New Position Id',
                //    width:100
                // },
                {
                   dataIndex: 'new_position',
                   text: 'New Position Name',
                   width:100
                },
                // {
                //    dataIndex: 'old_banding_id',
                //    text: 'Old Banding Id',
                //    width:100
                // },
                {
                   dataIndex: 'old_banding',
                   text: 'Old Banding Name',
                   width:100
                },
                // {
                //    dataIndex: 'new_banding_id',
                //    text: 'New Banding Id',
                //    width:100
                // },
                {
                   dataIndex: 'new_banding',
                   text: 'New Banding Name',
                   width:100
                },
                // {
                //    dataIndex: 'old_group_id',
                //    text: 'Old Group Id',
                //    width:100
                // },
                {
                   dataIndex: 'old_group',
                   text: 'Old Group Name',
                   width:100
                },
                // {
                //    dataIndex: 'new_group_id',
                //    text: 'New Group Id',
                //    width:100
                // },
                {
                   dataIndex: 'new_group',
                   text: 'New Group Name',
                   width:100
                },
                // {
                //    dataIndex: 'employeestatus_id',
                //    text: 'Employee Status Id',
                //    width:100
                // },
                {
                   dataIndex: 'employeestatus',
                   text: 'Employee Status Name',
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