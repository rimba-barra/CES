Ext.define('Cashier.view.kasbondeptposting.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.kasbondeptpostinggrid',
    store: 'Kasbondeptposting',
    bindPrefixName: 'KasbondeptPosting',
    itemId: 'KasbondeptPosting',
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
                    xtype: 'rownumberer'
                },
                me.generateActionColumn(),
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_projectname',
                    dataIndex: 'projectname',
                    width: 180,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Project'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname',
                    dataIndex: 'ptname',
                    titleAlign: 'center',
                    align: 'left',
                    width: 150,
                    hideable: false,
                    text: 'Pt'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_department',
                    dataIndex: 'department',
                    titleAlign: 'center',
                    align: 'left',
                    width: 100,
                    hideable: false,
                    text: 'Departement'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_no',
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'voucher_no',
                    width: 90,
                    hideable: false,
                    text: 'CA NO'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_date',
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'voucher_date',
                    width: 80,
                    hideable: false,
                    text: 'CA DATE',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_status',
                    dataIndex: 'status',
                    width: 80,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Status',
                    renderer: function (value) {
                        if (value == '1') {
                            return '<span style="color:green">OPEN</span>';
                        } else if (value == '2') {
                            return '<span style="color:blue">APPROVED</span>';
                        } else if (value == '4') {
                            return '<span style="color:brown">APPLIED</span>';
                        }else if (value == '3') {
                            return '<span style="color:purple">REALIZED</span>';
                        }else if (value == '5') {
                            return '<span style="color:red">CLOSED</span>';
                        }else if (value == '6') {
                            return '<span style="color:red">DECLINED</span>';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kasbank',
                    dataIndex: 'kasbank',
                    width: 100,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Trans. Cash/Bank',
                    renderer: function (value) {
                        if (value == 'K') {
                            return 'CASH';
                        } else if (value == 'B') {
                            return 'BANK';
                        } else {
                            return '-';
                        }
                    }
                },

                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    titleAlign: 'center',
                    align: 'right',
                    dataIndex: 'amount',
                    width: 150,
                    hideable: false,
                    text: 'Amount Request',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount_bayar',
                    titleAlign: 'center',
                    align: 'right',
                    dataIndex: 'amount_bayar',
                    width: 200,
                    hideable: false,
                    text: 'Amount has been paid',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount_selisih',
                    titleAlign: 'center',
                    align: 'right',
                    dataIndex: 'amount_selisih',
                    width: 200,
                    hideable: false,
                    text: 'Amount check for balance',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount_kembali',
                    titleAlign: 'center',
                    align: 'right',
                    dataIndex: 'amount_cashback',
                    width: 200,
                    hideable: false,
                    text: 'Amount Cashback',
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
                    itemId: 'colms_madebyname',
                    width: 80,
                    dataIndex: 'made_by_name',
                    hideable: false,
                    text: 'Made By',
                },
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        hidden: false,
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
                        hidden: false,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                    {
                        xtype: 'button',
                        action: 'generatevouchermulti',
                        disabled: true,
                        hidden: false,
                        itemId: 'btnGenerateMulti',
                        bindAction: me.bindPrefixName + 'Generatevouchermulti',
                        text: 'Generate Voucher'
                    },
                ],

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
            dataIndex: 'status',
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
                    text: 'Payment'
                },
                {
                    xtype: 'button',
                    action: 'unposting',
                    hidden: true,
                    itemId: 'btnUnposting',
                    icon: 'app/main/images/icons/unposting.png',
                    margin: '0 0 0 0',
                    bindAction: me.bindPrefixName + 'Unposting',
                    text: 'Un-Payment'
                },
                  {
                    xtype: 'button',
                    action: 'generatevoucher',
                    itemId: 'btnGenerate',
                    icon: 'app/main/images/icons/generate.png',
                    margin: '0 0 0 0',
                    bindAction: me.bindPrefixName + 'Generatevoucher',
                    tooltip: 'Generate Voucher'
                },
            ],

        };
        return ac;
    },
    viewConfig: {
        listeners: {
            refresh: function (view) {
                var status, nodes, node, record, level, flag, cells, j, i;
                var status, actioncolumn, actioncolumngrid, eventdata, classdata, acposting, acunposting,
                        acedit, acdelete, action, kasbank, acgenerate, batas_toleransi, amount, cashbon_fund_transfer_id;
                nodes = view.getNodes();
                for (i = 0; i < nodes.length; i++) {
                    node = nodes[i];
                    record = view.getRecord(node);
                    status = record.get('status');
                    kasbank = record.get('kasbank');
                    amount = record.get('amount');
                    cashbon_fund_transfer_id = record.get('cashbon_fund_transfer_id');
                    batas_toleransi = record.get('batas_toleransi');
                    cells = Ext.get(node).query('td');
                    actioncolumngrid = cells[2];
                    eventdata = Ext.get(actioncolumngrid).select("div")['elements'][0];
                    action = eventdata.childNodes;
                    acedit = action[0];
                    acdelete = action[1];
                    acposting = action[2];
                    acunposting = action[3];
                    acgenerate = action[4];

                    switch (status) {
                        case '1':
                            acedit.remove();
                            acdelete.remove();
                            acposting.remove();
                            acunposting.remove();
                            acgenerate.remove();
                            break;
                        case '2':
                            acdelete.remove();
                            if (kasbank == 'K' || kasbank == '') {
                                acposting.remove();
                            }
                            if (batas_toleransi == 0 || amount < batas_toleransi || cashbon_fund_transfer_id != 0){
                            	acgenerate.remove();
                            }
                            acunposting.remove();
                            break;
                        case '3':
                            acedit.remove();
                            acdelete.remove();
                            if (kasbank !== 'B') {
                                acunposting.remove();
                            }
                            acposting.remove();
                            acgenerate.remove();
                            break;
                        case '4':
                            acedit.remove();
                            acdelete.remove();
                            acposting.remove();
                            acunposting.remove();
                            acgenerate.remove();
                            break;
                        case '5':
                            acedit.remove();
                            acdelete.remove();
                            acposting.remove();
                            acunposting.remove();
                            acgenerate.remove();
                            break;
                    }

                }
            }
        }
    },
});


