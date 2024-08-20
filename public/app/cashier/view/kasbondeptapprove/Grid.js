Ext.define('Cashier.view.kasbondeptapprove.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.kasbondeptapprovegrid',
    store: 'Kasbondeptapprove',
    bindPrefixName: 'KasbondeptApprove',
    itemId: 'KasbondeptApprove',
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
                    width: 150,
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
                    width: 150,
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
                    width: 150,
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
                        hidden: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                       // bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnDelete',
                        //bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
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
                    bindAction: me.bindPrefixName + 'Read',
                    altText: 'View',
                    tooltip: 'View'
                },
              /*  {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName + 'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                },
                */
                {//========= added on march 15th 2016 by Tirtha
                    text: 'Approve',
                    iconCls: 'icon-approve',
                    className: 'approve',
                    bindAction: me.bindPrefixName + 'Approve',
                    altText: 'Approve',
                    tooltip: 'Approve',
                    id: 'approve',
                },
               {//========= added on march 15th 2016 by Tirtha
                   text: 'Unapprove',
                   iconCls: 'icon-unapprove',
                   className: 'decline',
                    bindAction: me.bindPrefixName + 'Decline',
                    altText: 'Decline',
                   tooltip: 'Decline',
                   id: 'decline',
              }
            ],
        };
        return ac;
    },
    viewConfig: {
        listeners: {
            refresh: function (view) {
                var status, nodes, node, record, level, flag, cells, j, i;
                var status, actioncolumn, actioncolumngrid, eventdata, classdata, approve, unapprove,
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
                    approve = action[2];
                    unapprove = action[3];


                    switch (status) {
                        case '1':
                           // unapprove.remove();
                            break;
                        case '2':
                            acedit.remove();
                            acdelete.remove();
                            approve.remove();
                            break;
                        case '3':
                            acedit.remove();
                            acdelete.remove();
                            approve.remove();
                          //  unapprove.remove();
                            break;
                        case '4':
                            acedit.remove();
                            acdelete.remove();
                            approve.remove();
                           // unapprove.remove();
                            break;
                        case '5':
                            acedit.remove();
                            acdelete.remove();
                            approve.remove();
                          //  unapprove.remove();
                            break;
                    }

                }
            }
        }
    },
});


