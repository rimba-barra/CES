Ext.define('Cashier.view.vdapprove.GridApprove', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.vdapprovegridnew',
    store: 'VDApproveNew',
    bindPrefixName: 'VDApprove',
    itemId: 'VDApproveNew',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer',
                    text: 'No.',
                    width: 40,
                    titleAlign: 'center',
                    align: 'center',
                },
                me.generateActionColumn(),
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_projectname',
                    dataIndex: 'projectname',
                    width: 150,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Project'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname',
                    dataIndex: 'ptname',
                    width: 150,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'PT / Company'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_department',
                    dataIndex: 'department',
                    width: 150,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Department'
                },
		        {
                    xtype: 'gridcolumn',
                    itemId: 'colms_createdby',
                    dataIndex: 'createdby',
                    width: 150,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Created By'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_vendorname',
                    dataIndex: 'vendorname',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Vendor'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_vendorname2',
                    dataIndex: 'vendor_note',
                    width: 150,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Vendor note'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_date',
                    id: 'colms_voucher_date',
                    name: 'colms_voucher_date',
                    dataIndex: 'voucher_date',
                    width: 110,
                    titleAlign: 'center',
                    align: 'center',
                    // sortable: false,
                    hideable: false,
                    text: 'Reg Date',
//                    listeners: {
//                        headerclick:function(header, column, e, t,eOpts){
//                            var store = Ext.data.StoreManager.lookup('VDApproveNew');
//                            store.removeAll();
//                            store.reload({
//                            params: {
//                                "hideparam": 'approve_only',
//                                "desc": 1,
//                                "project_id": apps.project,
//                                "start": 0,
//                                "limit": 25,
//                            },
//                            callback: function (records, operation, success) {
//
//                            }
//                            });
//                        }
//                    },
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_no',
                    dataIndex: 'voucher_no',
                    width: 150,
                    titleAlign: 'left',
                    align: 'left',
                    hideable: false,
                    text: 'Voucher No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_vid',
                    dataIndex: 'vid',
                    width: 120,
                    titleAlign: 'left',
                    align: 'left',
                    text: 'Reg No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kasbank',
                    dataIndex: 'kasbank',
                    width: 120,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Cash / Bank'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dataflow',
                    dataIndex: 'dataflow',
                    width: 120,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Data flow',
                    renderer: function (value) {
                        if (value == 'O') {
                            return 'OUT TRANS';
                        } else if (value == 'I') {
                            return 'IN TRANS';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_approveby',
                    dataIndex: 'approvename',
                    width: 100,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Next Approval By'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_status',
                    dataIndex: 'status',
                    width: 100,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Status',
                    renderer: function (value) {
                        if (value == '1') {
                            return '<span style="color:orange">OPEN</span>';
                        } else if (value == '2') {
                            return '<span style="color:blue">APPROVED</span>';
                        } else if (value == '3') {
                            return '<span style="color:brown">PAID</span>';
                        } else if (value == '4') {
                            return '<span style="color:green">REALIZED</span>';
                        } else if (value == '5') {
                            return '<span style="color:red">ON APPROVAL</span>';
                        } else if (value == '6') {
                            return '<span style="color:orange">ON PENDING</span>';
                        } else if (value == '7') {
                            return '<span style="color:red">REJECTED</span>';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_chequegiro_no',
                    dataIndex: 'chequegiro_no',
                    width: 150,
                    titleAlign: 'left',
                    align: 'left',
                    hideable: false,
                    text: 'Cheque / Giro No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cashier_voucher_date',
                    dataIndex: 'cashier_voucher_date',
                    width: 110,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Cashier Voucher Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cashier_voucher_no',
                    dataIndex: 'cashier_voucher_no',
                    width: 150,
                    titleAlign: 'left',
                    align: 'left',
                    hideable: false,
                    text: 'Cashier Voucher No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    dataIndex: 'amount',
                    width: 150,
                    titleAlign: 'center',
                    align: 'right',
                    hideable: false,
                    text: 'Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    dataIndex: 'description',
                    width: 200,
                    titleAlign: 'left',
                    align: 'left',
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_chequegiro_date',
                    dataIndex: 'chequegiro_date',
                    width: 110,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Cheque / Giro Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_chequegiro_handover_date',
                    dataIndex: 'chequegiro_handover_date',
                    width: 110,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Handover Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cashier_note',
                    dataIndex: 'cashier_note',
                    width: 200,
                    titleAlign: 'left',
                    align: 'left',
                    hideable: false,
                    text: 'Cashier Note'
                }
            ]
        });

        me.callParent(arguments);
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
            dataIndex: 'status',
            items: [
//                {
//                    text: 'Edit',
//                    iconCls: 'icon-edit',
//                    bindAction: me.bindPrefixName + 'Update',
//                    altText: 'Edit',
//                    tooltip: 'Edit'
//                },
//                {
//                    text: 'Delete',
//                    iconCls: 'icon-delete',
//                    bindAction: me.bindPrefixName + 'Delete',
//                    altText: 'Delete',
//                    tooltip: 'Delete'
//                },
//                {//========= added on march 15th 2016 by Tirtha
//                    text: 'Approve',
//                    iconCls: 'icon-approve',
//                    className: 'approve',
//                    bindAction: me.bindPrefixName + 'Approve',
//                    altText: 'Approve',
//                    tooltip: 'Approve',
//                    id: 'approve',
//                },
                {//========= added on march 15th 2016 by Tirtha
                    text: 'Unapprove',
                    iconCls: 'icon-unapprove',
                    className: 'unapprove',
                    bindAction: me.bindPrefixName + 'Unapprove',
                    altText: 'Unapprove',
                    tooltip: 'Unapprove',
                    id: 'unapprove'
                }
            ],
        };
        return ac;
    },
    generateDockedItems: function() {
        var me = this;
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 30,
                items: [
//                    {
//                        xtype: 'button',
//                        action: 'create',
//                        hidden: true,
//                        itemId: 'btnNew',
//                        margin: '0 5 0 0',
//                        iconCls: 'icon-new',
//                        bindAction: me.bindPrefixName + 'Create',
//                        text: me.newButtonLabel
//                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        disabled: false,
                        hidden: false,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-search',
                        text: 'View',
                        padding : '0 0 10 0',
                        bindAction: me.bindPrefixName + 'Read'
                    },
                    // {
                    //     xtype: 'button',
                    //     action: 'destroy',
                    //     disabled: true,
                    //     hidden: true,
                    //     itemId: 'btnDelete',
                    //     bindAction: me.bindPrefixName + 'Delete',
                    //     iconCls: 'icon-delete',
                    //     padding : '0 0 10 0',
                    //     text: 'Delete Selected'
                    // },
                    {
                        xtype: 'checkboxfield',
                        fieldLabel: '',
                        itemId: 'fd_checkusecopyva',
                        name: 'checkusecopyva',
                        boxLabel: 'Use Print Copy',
                        padding : '0 10 20 0',
                        margin: '0 10 10 0',
                        boxLabelCls: 'x-form-cb-label small',
                        inputValue: '1',
                        uncheckedValue: '0',
                        checked: false
                    },
                     {
                        xtype: 'button',
                        action: 'printvoucher',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnPrintvoucher',
                        bindAction: me.bindPrefixName + 'Printvoucher',
                        iconCls: 'icon-print',
                        text: 'Print Selected',
                        padding : '0 0 10 0',
                    },
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: 'VDApproveNew',
                id:'pagingnew'
            }
        ];
        return dockedItems;
    },
    viewConfig: {
        listeners: {
            refresh: function (view) {
                var status, nodes, node, record, level, flag, cells, j, i;
                var status, actioncolumn, actioncolumngrid, eventdata, classdata, approve, unapprove,
                        acedit,acdelete, action;
                nodes = view.getNodes();
                for (i = 0; i < nodes.length; i++) {
                    node = nodes[i];
                    record = view.getRecord(node);
                    status = record.get('status');
                    cells = Ext.get(node).query('td');
                    actioncolumngrid = cells[2];
                    eventdata = Ext.get(actioncolumngrid).select("div")['elements'][0];
                    action = eventdata.childNodes;
                    acedit = action[0];
                    acdelete = action[1];
                    approve = action[2];
                    unapprove = action[0];
                    unapprove.remove(); // karna tidak dipakai, di remove saja button unapprovenya
                    switch (status) {
                        case '1':
                            unapprove.remove();
                            break;
                        case '2':
                           // acedit.remove();
                           // acdelete.remove();
                          //  approve.remove();
                            break;
                        case '3':
                           // acedit.remove();
                            //acdelete.remove();
                           // approve.remove();
                            unapprove.remove();
                            break;
                    }

                }
            }
        }
    },
});


