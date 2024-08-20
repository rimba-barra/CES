Ext.define('Cashier.view.vdposting.Gridlookupvoucher', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.vdpostinggridlookupselected',
    store: 'VDApprove',
    bindPrefixName: 'VDPosting',
    itemId: 'VDPostinglookupvoucher',
    title: 'DATA VOUCHER APPROVE FOR POSTING',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItemscustome(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_projectname',
                    width: 180,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'projectname',
                    hideable: false,
                    text: 'Project'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname',
                    width: 180,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'ptname',
                    hideable: false,
                    text: 'Pt'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_status',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'status',
                    hideable: false,
                    text: 'Status'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_no',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'voucher_no',
                    hideable: false,
                    text: 'Voucher No (Reg)'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_no',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'voucher_no',
                    hideable: false,
                    text: 'Voucher No (Reg)'
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
                    itemId: 'colms_voucher_date',
                    dataIndex: 'voucher_date',
                    width: 110,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Voucher Date',
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
                    itemId: 'colms_cashier_voucher_no_tmp',
                    dataIndex: 'cashier_voucher_no_tmp',
                    width: 150,
                    titleAlign: 'left',
                    align: 'left',
                    hideable: false,
                    text: 'Cashier Voucher No Tmp.'
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
                    itemId: 'colms_vendor_note',
                    dataIndex: 'vendor_note',
                    width: 150,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Vendor Note'
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
    generateDockedItemscustome: function () {
        var me = this;
        var dockedItems = [            
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                id: 'paginglookupvoucherapprove',
                width: 360,
                displayInfo: true,
                store: this.getStore(),
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
});


