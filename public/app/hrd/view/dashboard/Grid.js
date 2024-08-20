Ext.define('Hrd.view.dashboard.Grid', {
    extend: 'Hrd.library.template.view.Grid',
    alias: 'widget.dashboardgrid',
    bindPrefixName: 'Dashboard',
    itemId: 'Dashboard',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                me.generateActionColumn(),
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_typetransfer',
                    width: 120,
                    dataIndex: 'typetransfer',
                    hideable: false,
                    text: 'Transfer Type'
                },
                {

                    xtype: 'gridcolumn',
                    itemId: 'colms_employee_nik',
                    width: 160,
                    dataIndex: 'employee_nik',
                    hideable: false,
                    text: 'NIK'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_employee_name',
                    width: 160,
                    dataIndex: 'employee_name',
                    hideable: false,
                    text: 'Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_reason',
                    width: 160,
                    dataIndex: 'reason',
                    hideable: false,
                    text: 'Reason'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_note',
                    width: 160,
                    dataIndex: 'note',
                    hideable: false,
                    text: 'Note'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_sk_number',
                    width: 160,
                    dataIndex: 'sk_number',
                    hideable: false,
                    text: 'SK No.'
                },
                {
                    xtype: 'datecolumn',
                    itemId: 'colms_effective_date',
                    width: 160,
                    format: 'd-m-Y H:i:s',
                    dataIndex: 'effective_date',
                    hideable: false,
                    text: 'Effective Date',
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_projectname',
                    width: 180,
                    dataIndex: 'projectname',
                    hideable: false,
                    text: 'Previous Project Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_new_projectname',
                    width: 180,
                    dataIndex: 'new_projectname',
                    hideable: false,
                    text: 'New Project Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname',
                    width: 250,
                    dataIndex: 'ptname',
                    hideable: false,
                    text: 'Previous PT Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_new_ptname',
                    width: 250,
                    dataIndex: 'new_ptname',
                    hideable: false,
                    text: 'New PT Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_department',
                    width: 250,
                    dataIndex: 'department',
                    hideable: false,
                    text: 'Previous Department'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_new_department',
                    width: 250,
                    dataIndex: 'new_department',
                    hideable: false,
                    text: 'New Department'
                },

                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_jobfamily',
                    width: 250,
                    dataIndex: 'jobfamily',
                    hideable: false,
                    text: 'Previous Job Family'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_new_jobfamily',
                    width: 250,
                    dataIndex: 'new_jobfamily',
                    hideable: false,
                    text: 'New Job Family'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_position',
                    width: 250,
                    dataIndex: 'position',
                    hideable: false,
                    text: 'Previous Position'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_new_position',
                    width: 250,
                    dataIndex: 'new_position',
                    hideable: false,
                    text: 'New Position'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_banding',
                    width: 250,
                    dataIndex: 'banding',
                    hideable: false,
                    text: 'Previous Banding'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_new_banding',
                    width: 250,
                    dataIndex: 'new_banding',
                    hideable: false,
                    text: 'New Banding'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_hari_kerja_perminggu',
                    width: 150,
                    dataIndex: 'old_hari_kerja_perminggu',
                    hideable: false,
                    text: 'Previous Working Days'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_new_hari_kerja_perminggu',
                    width: 150,
                    dataIndex: 'new_hari_kerja_perminggu',
                    hideable: false,
                    text: 'New Working Days'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_createby',
                    width: 120,
                    dataIndex: 'createby',
                    hideable: false,
                    text: 'Created by '
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_updatedby',
                    width: 120,
                    dataIndex: 'updatedby',
                    hideable: false,
                    text: 'Updated by '
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_approvalname',
                    width: 120,
                    dataIndex: 'approvalname',
                    hideable: false,
                    text: 'Approval for '
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_userapprove',
                    width: 120,
                    dataIndex: 'userapprove',
                    hideable: false,
                    text: 'User Approve by'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_approve_date',
                    width: 160,
                    dataIndex: 'approve_date',
                    hideable: false,
                    text: 'Approval Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_is_approve',
                    dataIndex: 'is_approve',
                    width: 100,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Status',
                    renderer: function (value) {
                        if (value) {
                            return 'Approved';
                        } else {
                            return 'Waiting';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_sk_file_upload_path',
                    dataIndex: 'sk_file_upload_path',
                    width: 150,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Status Document',
                    renderer: function (value) {                        
                        if(value.length < 20){
                            return 'No Document';
                         }else{
                             return 'Document already exist';
                         }                       
                    }
                },
            ],
        });

        me.callParent(arguments);
    }
});


