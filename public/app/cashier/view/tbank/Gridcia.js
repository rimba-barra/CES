Ext.define('Cashier.view.tbank.Gridcia', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.ux.CheckColumn',
        'Ext.state.Stateful',
        'Ext.util.*',
    ],
    alias: 'widget.tbankciagrid',
    store: 'Tbankcia',
    bindPrefixName: 'Tbank',
    itemId: 'Tbankcia',
    title: 'Cash in Advance List',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            //contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
//            selModel: Ext.create('Ext.selection.CheckboxModel', {
//            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },

                {
                    xtype: 'checkcolumnapplybank', //only display checkbox from custome js 
                    header: 'Apply',
                    dataIndex: 'apply',
                    width: 80,
                    sortable: false,
                    renderer: function (value, meta, record) {
                        var checkbox, row, appliedamount, amount;
                        row = record['data'];
                        appliedamount = row.appliedamount;
                        amount = row.amount;
                        checkbox = "<center>";
                        if (amount == appliedamount) {
                            checkbox = checkbox + "<input type='checkbox' disabled " + (value ? "checked" : '') + "";
                        } else {
                            checkbox = checkbox + "<input type='checkbox' " + (value ? "checked" : '') + "";
                        }
                        checkbox = checkbox + " />";
                        checkbox = checkbox + "</center>";
                        return checkbox;
                    },
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_projectname',
                    dataIndex: 'projectname',
                    width: 180,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Project Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname',
                    dataIndex: 'ptname',
                    width: 180,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Pt Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cashinadvanceno',
                    width: 150,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'voucher_no',
                    hideable: false,
                    text: 'Cash Advance No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_balance',
                    dataIndex: 'balance',
                    titleAlign: 'center',
                    align: 'right',
                    width: 150,
                    hideable: false,
                    text: 'Remaining Balance',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_appliedamount',
                    dataIndex: 'appliedamount',
                    titleAlign: 'center',
                    align: 'right',
                    width: 150,
                    hideable: false,
                    text: 'Applied Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    dataIndex: 'amount',
                    titleAlign: 'center',
                    align: 'right',
                    width: 150,
                    hideable: false,
                    text: 'Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_applyamount',
                    dataIndex: 'applyamount',
                    titleAlign: 'center',
                    align: 'right',
                    width: 150,
                    hideable: false,
                    text: 'Apply Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_finish',
                    dataIndex: 'finish',
                    titleAlign: 'center',
                    align: 'center',
                    width: 100,
                    hideable: false,
                    text: 'Finish',
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_status',
                    dataIndex: 'status',
                    titleAlign: 'center',
                    align: 'center',
                    width: 100,
                    hideable: false,
                    text: 'Status',
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_evidancedate',
                    dataIndex: 'accept_date',
                    titleAlign: 'center',
                    align: 'left',
                    width: 120,
                    hideable: false,
                    text: 'Evidance Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_evidanceno',
                    dataIndex: 'evidanceno',
                    titleAlign: 'center',
                    align: 'left',
                    width: 150,
                    hideable: false,
                    text: 'Evidance No.',
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_department',
                    dataIndex: 'department',
                    titleAlign: 'center',
                    align: 'left',
                    width: 180,
                    hideable: false,
                    text: 'Department',
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_employeename',
                    dataIndex: 'made_by',
                    titleAlign: 'center',
                    align: 'left',
                    width: 180,
                    hideable: false,
                    text: 'Employee Name',
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    dataIndex: 'description',
                    titleAlign: 'center',
                    align: 'left',
                    width: 200,
                    hideable: false,
                    text: 'Description',
                },
                me.generateActionColumn()
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
//                    {
//                        text: 'Add new',
//                        itemId: 'btnAdd',
//                        action: 'create',
//                        iconCls: 'icon-add',
//                        bindAction: me.bindPrefixName + 'Create'
//                    },
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                id: 'paginggridtbankciadata',
                width: 360,
                displayInfo: true,
                store: 'Tbankcia',
                hideRefresh: true,
                listeners: {
                    afterrender: function (tbar) {
                        if (tbar.hideRefresh) {
                            tbar.down('#refresh').hide();
                        }
                    }

                }
            }
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 50,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [
//                {
//                    defaultIcon: 'icon-edit',
//                    iconCls: ' ux-actioncolumn icon-edit act-update',
//                    action: 'update',
//                    altText: 'Edit',
//                    tooltip: 'Edit'
//                },
//                {
//                    defaultIcon: 'icon-delete',
//                    action: 'destroy',
//                    iconCls: 'ux-actioncolumn icon-delete act-destroy',
//                    altText: 'Delete',
//                    tooltip: 'Delete'
//                }
            ]
        }

        return ac;

    },
});


