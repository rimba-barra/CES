Ext.define('Gl.view.accountvssub.Grid', {
    extend: 'Ext.grid.Panel',
    loadStore: [],
    alias: 'widget.accountvssubgrid',
    loadedStore: {},
    title: 'Process Result',
    store: 'Accountvssub',
    bindPrefixName: 'Accountvssub',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            viewConfig: {
            },
            selModel: {
                injectCheckbox: 0,
                pruneRemoved: false
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_no',
                    width: 100,
                    dataIndex: 'voucher_no',
                    hideable: false,
                    text: 'Voucher No'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_date',
                    width: 100,
                    dataIndex: 'voucher_date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                    hideable: false,
                    text: 'Voucher Date'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa',
                    width: 100,
                    dataIndex: 'coa',
                    hideable: false,
                    text: 'Acc. Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_journalstatus',
                    width: 120,
                    dataIndex: 'journalstatus',
                    hideable: false,
                    text: 'Status'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amountheader',
                    width: 180,
                    dataIndex: 'amountheader',
                    hideable: false,
                    text: 'Amount Journal',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    editor: {
                        xtype: 'textfield',
                        fieldStyle: 'text-align:right'
                    }

                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amountdetail',
                    width: 180,
                    dataIndex: 'amountdetail',
                    hideable: false,
                    text: 'Sum Amount Journal Detail',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    editor: {
                        xtype: 'textfield',
                        fieldStyle: 'text-align:right'
                    }

                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amountsubdetail',
                    width: 180,
                    dataIndex: 'amountsubdetail',
                    hideable: false,
                    text: 'Sum Amount Journal Sub Detail',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    editor: {
                        xtype: 'textfield',
                        fieldStyle: 'text-align:right'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_flag',
                    width: 450,
                    dataIndex: 'flag',
                    hideable: false,
                    text: 'Root Problem'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_note',
                    width: 600,
                    dataIndex: 'note',
                    hideable: false,
                    text: 'Note'
                },
                me.generateActionColumn()
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    },
    viewConfig: {
        stripeRows: false
    },
    generateDockedItems: function () {
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    padding: 6,
                    type: 'vbox'
                },
                items: [
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        bodyStyle: 'background-color:#dfe8f5;',
                        border: false,
                        items: [
                            {
                                xtype: 'splitter',
                                width: '815'
                            },
                            {
                                xtype: 'textfield',
                                anchor: '100%',
                                fieldLabel: 'Total Header',
                                itemId: 'fdms_totalheader',
                                name: 'totalheader'

                            },
                            {
                                xtype: 'splitter',
                                width: '30'
                            },
                            {
                                xtype: 'textfield',
                                anchor: '100%',
                                fieldLabel: 'Total Detail',
                                itemId: 'fdms_totaldetail',
                                name: 'totaldetail'

                            },
                        ]

                    },
                    { xtype: 'tbspacer', height: 20},
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        bodyStyle: 'background-color:#dfe8f5;',
                        border: false,
                        items: [
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                bodyStyle: 'background-color:#dfe8f5;',
                                border: false,
                                items: [
                                    {
                                        xtype: 'checkboxfield',
                                        anchor: '100%',
                                        fieldLabel: '',
                                        boxLabel: 'Summary',
                                        itemId: 'fdms_is_summary',
                                        name: 'is_summary',
                                        checked: false,
                                        inputValue: '1',
                                        uncheckedValue: '0',
                                        //readOnly: true
                                    },
                                    {
                                        xtype: 'splitter',
                                        width: '20'
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'print',
                                        itemId: 'btnPrint',
                                        margin: '0 5 0 0',
                                        iconCls: 'icon-print',
                                        text: 'Print'
                                    }

                                ]

                            },
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
                                padding: '0 0 0 1000px',
                                items: [
                                    {
                                        xtype: 'button',
                                        action: 'process',
                                        itemId: 'btnProcess',
                                        padding: 5,
                                        width: 75,
                                        text: 'Process'
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'cancel',
                                        itemId: 'btnCancel',
                                        padding: 5,
                                        width: 75,
                                        iconCls: 'icon-cancel',
                                        text: 'Cancel',
                                        handler: function () {
                                            this.up('window').close();
                                        }
                                    }

                                ]
                            },
                        ]

                    },
                ]
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
                {//========= added on march 15th 2016 by Tirtha
                    text: 'showdata',
                    iconCls: 'icon-search',
                    className: 'showdata',
                    action: 'showdata',
                    bindAction: me.bindPrefixName + 'Read',
                    altText: 'View',
                    tooltip: 'View'
                }
            ]
        };
        return ac;
    },
});


