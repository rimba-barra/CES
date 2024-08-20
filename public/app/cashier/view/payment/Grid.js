Ext.define('Cashier.view.payment.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.paymentgrid',
    store: 'TPaymentcash',
    bindPrefixName: 'Payment',
    itemId: 'Payment',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            //contextMenu: me.generateContextMenu(),   
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                me.generateActionColumncustome(),
                /* 
                 {
                 xtype: 'gridcolumn',
                 itemId: 'colms_projectcode',
                 dataIndex: 'projectcode',
                 width: 100,
                 titleAlign: 'center',
                 align: 'left',
                 hideable: false,
                 text: 'Project Code'
                 },
                 */
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
                /* 
                 {
                 xtype: 'gridcolumn',
                 itemId: 'colms_ptcode',
                 dataIndex: 'ptcode',
                 width: 100,
                 titleAlign: 'center',
                 align: 'left',
                 hideable: false,
                 text: 'Pt Code'
                 },
                 */
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
                    itemId: 'colms_accept_date',
                    dataIndex: 'accept_date',
                    width: 110,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Accept Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_transno',
                    dataIndex: 'transno',
                    width: 80,
                    titleAlign: 'center',
                    align: 'right',
                    hideable: false,
                    text: 'Trans No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dataflow',
                    dataIndex: 'dataflow',
                    width: 90,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Data Flow'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_prefix',
                    dataIndex: 'prefix',
                    width: 120,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Prefix'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_no',
                    dataIndex: 'voucher_no',
                    width: 200,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Voucher No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kasbank_date',
                    dataIndex: 'kasbank_date',
                    width: 110,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Voucher Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_chequegiro_no',
                    dataIndex: 'chequegiro_no',
                    width: 200,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Cheque Giro No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_chequegiro_date',
                    dataIndex: 'chequegiro_date',
                    width: 110,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Cheque Giro Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa',
                    dataIndex: 'coa',
                    width: 100,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Acc. No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coaname',
                    dataIndex: 'coaname',
                    width: 180,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Acc. Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    dataIndex: 'description',
                    width: 200,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Description'
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
                    itemId: 'colms_chequegiro_payment_date',
                    dataIndex: 'chequegiro_payment_date',
                    width: 110,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Payment Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_yearmonth_trans',
                    dataIndex: 'yearmonth_trans',
                    width: 150,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Year month trans'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_chequegiro_accured',
                    dataIndex: 'chequegiro_accured',
                    width: 100,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Accured'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cashbon_projectname',
                    dataIndex: 'cashbon_projectname',
                    width: 200,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'For Project Name'
                },
            ],
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
                        xtype: 'panel',
                        layout: 'hbox',
                        border: false,
                        frame: true,
                        bodyStyle: 'border:0px',
                        items: [
                            {
                                xtype: 'datefield',
                                fieldLabel: 'Payment Date',
                                itemId: 'fd_chequegiro_payment_date_www',
                                id: 'chequegiro_payment_date_sws',
                                name: 'chequegiro_payment_date',
                                format: 'd-m-Y',
                                submitFormat: 'Y-m-d',
                                width: 200,
                                allowBlank: true,
                                enforceMaxLength: true,
                                enableKeyEvents: true,
                                rowdata: null
                            },
                            {
                                xtype: 'button',
                                action: 'payselected',
                                hidden: true,
                                itemId: 'btnPaySelected',
                                icon: 'app/main/images/icons/payment.png',
                                margin: '0 0 0 0',
                                bindAction: me.bindPrefixName + 'Update',
                                text: 'Pay Selected Data'
                            },
                        ]
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
    generateActionColumncustome: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: false,
            itemId: 'actioncolumn',
            width: 100,
            resizable: false,
            align: 'left',
            hideable: false,
            items: [
                {
                    text: 'Pay',
                    icon: 'app/main/images/icons/payment.png',
                    action: 'pay',
                    iconCls: 'icon-tagged',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Pay',
                    tooltip: 'Pay',
                },
                {
                    text: 'View',
                    iconCls: 'icon-search',
                    className: 'view',
                    action: 'view',
                    bindAction: me.bindPrefixName + 'Read',
                    altText: 'View',
                    tooltip: 'View'
                },
            ]
        };
        return ac;
    },
});


