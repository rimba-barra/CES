Ext.define('Hrd.view.cleansingdata.Grid', {
    extend: 'Hrd.library.template.view.Grid',
    alias: 'widget.cleansingdatagrid',
    store: 'Cleansingdata',
    bindPrefixName: 'Cleansingdata',
    itemId: 'Cleansingdata',
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
                    width: 150,
                    dataIndex: 'jobfamily',
                    hideable: false,
                    text: 'Previous Job Family'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_new_jobfamily',
                    width: 150,
                    dataIndex: 'new_jobfamily',
                    hideable: false,
                    text: 'New Job Family'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_banding',
                    width: 150,
                    dataIndex: 'banding',
                    hideable: false,
                    text: 'Previous Banding'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_new_banding',
                    width: 150,
                    dataIndex: 'new_banding',
                    hideable: false,
                    text: 'New Banding'
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
                    itemId: 'colms_note',
                    width: 160,
                    dataIndex: 'note',
                    hideable: false,
                    text: 'Note'
                },
            ],
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
                        hidden: true,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Create',
                        text: me.newButtonLabel
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                    {
                        xtype: 'button',
                        action: 'print',
                        hidden: true,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        bindAction: me.bindPrefixName + 'Print',
                        iconCls: 'icon-print',
                        text: 'Print / Save'
                    },
		    {
                        xtype: 'button',
                        action: 'export',
                        hidden: true,
                        itemId: 'btnExport',
                        margin: '0 5 0 0',
                        bindAction: me.bindPrefixName + 'Export',
                        icon: 'app/main/images/icons/excel.png',
                        text: 'Export'
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
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                {
                    xtype: 'button',
                    action: 'uploaddocument',
                    hidden: false,
                    itemId: 'btnUploaddocument',
                    icon: 'app/main/images/icons/fa-upload.png',
                    margin: '0 0 0 0',
                    bindAction: me.bindPrefixName + 'Upload',
                    text: 'Upload Document',
                    tooltip: 'Upload Document',
                },
                {
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    text: 'Approve',
                    iconCls: 'icon-approve',
                    className: 'approve',
                    bindAction: me.bindPrefixName + 'Approve',
                    altText: 'Approve',
                    tooltip: 'Approve',
                },/*
                {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName + 'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                },*/
                {
                    xtype: 'button',
                    action: 'document',
                    hidden: false,
                    itemId: 'btnDocument',
                    icon: 'app/main/images/icons/archives.png',
                    margin: '0 0 0 0',
                    bindAction: me.bindPrefixName + 'Document',
                    text: 'View Document',
                    tooltip: 'View Document',
                },
		{
                    xtype: 'button',
                    action: 'print',
                    hidden: false,
                    itemId: 'btnPrint',
                    icon: 'app/main/images/icons/printer.png',
                    margin: '0 0 0 0',
                    bindAction: me.bindPrefixName + 'Print',
                    text: 'Print Document',
                    tooltip: 'Print Document',
                },


            ]
        };
        return ac;
    },
    viewConfig: {
        listeners: {
            refresh: function (view) {
                var status, nodes, node, record, level, flag, posisikolom, j, i;
                var status, statusrequest, actioncolumn, actioncolumngrid, eventdata, classdata, acedit, acdelete, acemail
                        , action, new_project_id, new_pt_id, acdoc, acapprove, typetransfer, old_project_id, old_pt_id,
                         sk_file_upload_path,acdocument;
                nodes = view.getNodes();
                for (i = 0; i < nodes.length; i++) {
                    node = nodes[i];
                    record = view.getRecord(node);
                    typetransfer = record.get('changetype_id');
                    status = record.get('is_approve');
                    old_project_id = record.get('old_project_id');
                    new_project_id = record.get('new_project_id');
                    new_pt_id = record.get('new_pt_id');
                    old_pt_id = record.get('old_pt_id');
                    status = record.get('is_approve');
                    sk_file_upload_path = record.get('sk_file_upload_path');
                    
                   
                    

                    posisikolom = Ext.get(node).query('td');
                    actioncolumngrid = posisikolom[2];
                    eventdata = Ext.get(actioncolumngrid).select("div")['elements'][0];
                    action = eventdata.childNodes;

                    acdoc = action[0];//posisi index
                    acedit = action[1];//posisi index
                    acapprove = action[2];
                    acdelete = action[3];
                    acdocument = action[4];

                    if (status) {
                        acedit.remove();
                        acapprove.remove();
                        acdelete.remove();
                    }

                    if (apps.project == new_project_id && apps.pt == new_pt_id && typetransfer == 3) {
                        acdoc.remove();
                        acedit.remove();
                        acdelete.remove();
                    }
                    if (apps.project == old_project_id && apps.pt == old_pt_id && typetransfer == 3) {
                        acapprove.remove();
                    }
                    
                    if(sk_file_upload_path.length < 20){
                        acdocument.remove();
                    }
                }
            }
        }
    },

});


