Ext.define('Cashier.view.vdposting.GridApprove', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.vdpostingapprovegridnew',
    store: 'VDPostingnew',
    bindPrefixName: 'VDPosting',
    itemId: 'VDPostingnew',
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
                    width: 150,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Vendor'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_statusrequestemail',
                    dataIndex: 'statusrequestemail',
                    width: 130,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Request Approval Mail'
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
                    itemId: 'colms_status',
                    dataIndex: 'status',
                    width: 100,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Status',
                    renderer: function (value) {
                        if (value == '1') {
                            return 'OPEN';
                        } else if (value == '2') {
                            return 'APPROVE';
                        } else if (value == '3') {
                            return 'POSTING';
                        }
                    }
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
            items: [
                {
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName + 'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                },
                {
                    xtype: 'button',
                    action: 'posting',
                    hidden: true,
                    itemId: 'btnPosting',
                    icon: 'app/main/images/icons/posting.png',
                    margin: '0 0 0 0',
                    bindAction: me.bindPrefixName + 'Posting',
                    text: 'Posting'
                },
                {
                    xtype: 'button',
                    action: 'unposting',
                    hidden: true,
                    itemId: 'btnUnposting',
                    icon: 'app/main/images/icons/unposting.png',
                    margin: '0 0 0 0',
                    bindAction: me.bindPrefixName + 'Unposting',
                    text: 'Unposting'
                },
            ]
        };
        return ac;
    },
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
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
                        xtype: 'checkboxfield',
                        fieldLabel: '',
                        itemId: 'fd_checkusecopyvp',
                        name: 'checkusecopyvp',
                        boxLabel: 'Use Print Copy',
                        padding: '0 0 0 0',
                        margin: '0 0 10 0',
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
                        text: 'Print Selected'
                    },
                    {
                        xtype: 'button',
                        action: 'postingselected',
                        disabled: false,
                        hidden: false,
                        itemId: 'btnPostingselected',
                        bindAction: me.bindPrefixName + 'selected',
                        iconCls: 'icon-new',
                        text: 'Posting'
                    },
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
    viewConfig: {
        listeners: {
            refresh: function (view) {
                var status, nodes, node, record, level, flag, cells, j, i;
                var status, actioncolumn, actioncolumngrid, eventdata, classdata, acposting, acunposting,
                        acedit, acdelete, action;
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
                    acposting = action[2];
                    acunposting = action[3];

                    switch (status) {
                        case '2':
                            acdelete.remove();
                            acunposting.remove();
                            break;
                        case '3':
                            acedit.remove();
                            acdelete.remove();
                            acposting.remove();
                            break;
                    }

                }
            }
        }
    },
});


