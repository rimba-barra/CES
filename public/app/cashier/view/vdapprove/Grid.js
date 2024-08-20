Ext.define('Cashier.view.vdapprove.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.vdapprovegrid',
    store: 'VDApprove',
    bindPrefixName: 'VDApprove',
    itemId: 'VDApprove',
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
                    width: 35,
                    titleAlign: 'center',
                    align: 'center',
                },
                me.generateActionColumn(),
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_is_approvepajak',
                    dataIndex: 'is_approvepajak',
                    width: 50,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Pajak',
                    renderer: me.renderPajak
                },
                {
                    xtype: 'gridcolumn',
                    hidden: true,
                    dataIndex: 'hod_approver'
                },
             
//                    xtype: 'gridcolumn',
//                    itemId: 'colms_projectname',
//                    dataIndex: 'projectname',
//                    width: 150,
//                    titleAlign: 'center',
//                    align: 'left',
//                    hideable: false,
//                    text: 'Project'
//                },
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
                    itemId: 'colms_voucher_no',
                    dataIndex: 'voucher_no',
                    width: 100,
                    titleAlign: 'left',
                    align: 'left',
                    hideable: false,
                    text: 'Voucher No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_date',
                    dataIndex: 'voucher_date',
                    width: 110,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Reg Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                    renderer: function (value, metaData, record, row, col, store, gridView) {
//                        console.log(record.get('duedate'));
                        if (moment(record.get('voucher_date')).format("DD-MM-YYYY") == "01-01-1900") {
                            return '-';
                        } else {
                            return moment(record.get('voucher_date')).format("DD-MM-YYYY");
                        }

                    },
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
                    itemId: 'colms_vendornamenote',
                    dataIndex: 'vendor_note',
                    width: 150,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Vendor Note'
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
                    itemId: 'colms_cashier_voucher_date',
                    dataIndex: 'cashier_voucher_date',
                    width: 110,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Voucher Date',
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
//                {
//                    xtype: 'gridcolumn',
//                    itemId: 'colms_statusrequestemail',
//                    dataIndex: 'statusrequestemail',
//                    width: 130,
//                    titleAlign: 'center',
//                    align: 'left',
//                    hideable: false,
//                    text: 'Request Approval Mail'
//                },
//               
//             
//             
//               
//               
//                
//               
//                
//               
//                {
//                    xtype: 'gridcolumn',
//                    itemId: 'colms_currency_word',
//                    dataIndex: 'currency_word',
//                    width: 150,
//                    titleAlign: 'left',
//                    align: 'left',
//                    hideable: false,
//                    text: 'Currency Word'
//                },
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
                {
                    text: 'View',
                    iconCls: 'icon-search',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'View',
                    tooltip: 'View'
                },
                {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName + 'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                },

                {//========= added on march 15th 2016 by Tirtha
                    text: 'Approve',
                    iconCls: 'icon-approve',
                    className: 'approve',
                    bindAction: me.bindPrefixName + 'Approve',
                    altText: 'Approve',
                    tooltip: 'Approve',
                    id: 'approve',
                },

                {//========= added on jan 3rd 2019 by Semy
                    text: 'Unapprove',
                    iconCls: 'icon-unapprove',
                    className: 'unapprove',
                    bindAction: me.bindPrefixName + 'Unapprove',
                    altText: 'Unapprove',
                    tooltip: 'Unapprove',
                    id: 'unapprove',
                },
                {
                    text: 'Approve Pajak',
                    iconCls: 'icon-approve2',
                    className: 'approvepajak',
                    bindAction: me.bindPrefixName + 'Approvepajak',
                    altText: 'Approve Pajak',
                    tooltip: 'Approve Pajak',
                    id: 'approvepajak',
                },
                {//========= added on jan 3rd 2019 by Semy
                    text: 'ApproveSBY',
                    iconCls: 'icon-approve',
                    className: 'approvesby',
                    bindAction: me.bindPrefixName + 'Approvesby',
                    altText: 'Approve HOD / Atasan',
                    tooltip: 'Approve HOD / Atasan',
                    id: 'approvesby',
                },
            ],
        };
        return ac;
    },
    generateDockedItems: function () {
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
                        disabled: true,
                        hidden: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-search',
                        padding: '0 0 10 0',
                        text: 'View',
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnDelete',
                        padding: '0 0 10 0',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                    {
                        xtype: 'checkboxfield',
                        fieldLabel: '',
                        itemId: 'fd_checkusecopyva',
                        name: 'checkusecopyva',
                        boxLabel: 'Use Print Copy',
                        padding: '0 10 20 0',
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
                        margin: '0 0 10 0',
                        padding: '0 0 10 0',
                        itemId: 'btnPrintvoucher',
                        bindAction: me.bindPrefixName + 'Printvoucher',
                        iconCls: 'icon-print',
                        text: 'Print Selected'
                    },
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: 'VDApprove',
                id: 'pagingold'
            }
        ];
        return dockedItems;
    },
    viewConfig: {
        listeners: {
            refresh: function (view) {
                var status, nodes, node, record, level, flag, cells, j, i;
                var status, actioncolumn, actioncolumngrid, eventdata, classdata, approve, unapprove, approvepajak,
                        acedit, acdelete, action, approvesby;
                nodes = view.getNodes();
                for (i = 0; i < nodes.length; i++) {
                    node = nodes[i];
                    record = view.getRecord(node);
                    status = record.get('status');
                    is_pajak = record.get('is_pajak');
                    is_approvepajak = record.get('is_approvepajak');
                    hod_approve_status = record.get('hod_approve_status');
                    cells = Ext.get(node).query('td');
                    actioncolumngrid = cells[2];
                    eventdata = Ext.get(actioncolumngrid).select("div")['elements'][0];
                    action = eventdata.childNodes;
                    acedit = action[0];
                    acdelete = action[1];
                    approve = action[2];
                    unapprove = action[3];
                    approvepajak = action[4];
                    approvesby = action[5];
                    switch (status) {
                        case '1':
                            unapprove.remove();
                            break;
                        case '2':
                            acedit.remove();
                            acdelete.remove();
                            approve.remove();
                            approvesby.remove();
                            break;
                        case '3':
                            acedit.remove();
                            acdelete.remove();
                            approve.remove();
                            unapprove.remove();
                            approvesby.remove();
                            break;
                        case '4':
                            acedit.remove();
                            acdelete.remove();
                            approve.remove();
                            unapprove.remove();
                            approvesby.remove();
                            break;
                        case '7':
                            acedit.remove();
                            acdelete.remove();
                            approve.remove();
                            unapprove.remove();
                            approvesby.remove();
                            approvepajak.remove();
                            break;
                    }

                    if (is_pajak == 1 && is_approvepajak == 1) {
                        approvepajak.remove();
                    } else if (is_pajak !== 1) {
                        approvepajak.remove();
                    } else if (is_pajak == 1 && hod_approve_status == 'APPROVED') {
                        approve.remove();
                    }

                    acdelete.remove();
                    unapprove.remove();

                }
            }
        }
    },
    renderPajak: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'is_approvepajak';
        return this.comboBoxFieldGen(name, record, false);
    },
    comboBoxFieldGen: function (name, record, enable) {
        if (record.get(name)) {
            var a = '&#10003;';
        } else {
            var a = '';
        }
        return a;
    }
});


