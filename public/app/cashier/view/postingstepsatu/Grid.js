Ext.define('Cashier.view.postingstepsatu.Grid', {
    extend: 'Ext.grid.Panel',
    //extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.postingstepsatugrid',
    store: 'Postingstepsatusource',
    bindPrefixName: 'Postingstepsatu',
    itemId: 'Postingstepsatusource',
    newButtonLabel: 'Add New',
    title: 'Source Data',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            // contextMenu: me.generateContextMenu(),
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
                    xtype: 'checkcolumnpostingstepsatu', //only display checkbox from custome js 
                    header: 'Posting',
                    dataIndex: 'flag_posting',
                    width: 80,
                    sortable: false,
                    renderer: function (value, meta, record) {
                        var checkbox, row;
                        row = record['data'];
                        checkbox = "<center>";
                        checkbox = checkbox + "<input type='checkbox' " + (value ? "checked" : '') + "  />";
                        checkbox = checkbox + "</center>";
                        return checkbox;
                    },
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_transno',
                    width: 100,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'transno',
                    hideable: false,
                    text: 'Seq No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_accept_date',
                    dataIndex: 'accept_date',
                    width: 110,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Transaction Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
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
                    text: 'Cheque / Giro Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_prefix',
                    dataIndex: 'prefix',
                    width: 120,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Prefix Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa',
                    dataIndex: 'coa',
                    width: 100,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Account No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coaname',
                    width: 150,
                    dataIndex: 'coaname',
                    hideable: false,
                    text: 'Account Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dataflow',
                    dataIndex: 'dataflow',
                    width: 100,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Mutation',
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
                //me.generateActionColumn()
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
                height: 40,
                items: [
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        bodyBorder: false,
                        defaults: {
                            layout: 'fit'
                        },
                        padding: '0 0 0 0',
                        items: [
                            {
                                xtype: 'splitter',
                                width: '30'
                            },
                            {
                                xtype: 'checkboxfield',
                                fieldLabel: '',
                                itemId: 'fd_includegirono',
                                name: 'includegirono',
                                boxLabel: 'Include Giro No. in Descripton',
                                padding: '0 0 0 0',
                                margin: '0 0 10 0',
                                boxLabelCls: 'x-form-cb-label small',
                                inputValue: '1',
                                uncheckedValue: '0',
                                checked: true
                            },
                            {
                                xtype: 'splitter',
                                width: '10'
                            },
                            {
                                xtype: 'button',
                                action: 'movetodestination',
                                itemId: 'btnMovetodestination',
                                padding: 5,
                                width: 150,
                                iconCls: '',
                                text: 'Move to Destination <b>&#8595;</b>'
                            },
                            {
                                xtype: 'button',
                                action: 'checkallsource',
                                itemId: 'btnCheckallsource',
                                padding: 5,
                                width: 130,
                                iconCls: '',
                                text: 'Check all'
                            },
                            {
                                xtype: 'button',
                                action: 'clearallsource',
                                itemId: 'btnClearallsource',
                                padding: 5,
                                width: 75,
                                iconCls: 'icon-reset',
                                text: 'Clear'
                            }
                        ]
                    },
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                id: 'pagingpostingstepsatu',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }
        ];
        return dockedItems;
    },
});


