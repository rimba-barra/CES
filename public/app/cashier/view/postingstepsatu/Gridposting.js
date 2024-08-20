Ext.define('Cashier.view.postingstepsatu.Gridposting', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.postingstepsatugridposting',
    store: 'Postingstepsatudestination',
    bindPrefixName: 'Postingstepsatu',
    itemId: 'Postingstepsatudestination',
    newButtonLabel: 'Add New',
    title: 'Destination Data',
    uniquename: '_postingstepsatugridposting',
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
                {
                    xtype: 'checkcolumnpostingstepsatu', //only display checkbox from custome js 
                    header: 'Unposting',
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
                    dataIndex: 'transno',
                    hideable: false,
                    text: 'Seq'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_accept_date',
                    width: 120,
                    dataIndex: 'accept_date',
                    hideable: false,
                    text: 'Transaction Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_no',
                    width: 150,
                    dataIndex: 'voucher_no',
                    hideable: false,
                    text: 'Voucher No'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa',
                    width: 150,
                    dataIndex: 'coa',
                    hideable: false,
                    text: 'Account Code'
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
                    itemId: 'colms_prefix',
                    width: 150,
                    dataIndex: 'prefix',
                    hideable: false,
                    text: 'Prefix Code Cashier'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_prefix_gl',
                    width: 150,
                    dataIndex: 'prefix_gl',
                    hideable: false,
                    text: 'Prefix Code Gl'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_no_gl',
                    width: 150,
                    dataIndex: 'voucher_no_gl',
                    hideable: false,
                    text: 'Voucher No Gl'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_date_gl',
                    width: 150,
                    dataIndex: 'voucher_date_gl',
                    hideable: false,
                    text: 'Voucher Date Gl',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dataflow',
                    width: 150,
                    dataIndex: 'dataflow',
                    hideable: false,
                    titleAlign: 'center',
                    align: 'center',
                    text: 'Mutation'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    width: 150,
                    dataIndex: 'amount',
                    hideable: false,
                    text: 'Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    width: 150,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_flagsub',
                    width: 150,
                    dataIndex: 'flagsub',
                    hideable: false,
                    text: 'Flag sub'
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
                                width: '220'
                            },
                            {
                                xtype: 'button',
                                action: 'movetosource',
                                itemId: 'btnMovetosource',
                                padding: 5,
                                width: 130,
                                iconCls: '',
                                text: 'Move to Source <b>&uarr;</b>'
                            },
                            {
                                xtype: 'button',
                                action: 'checkalldestination',
                                itemId: 'btnCheckalldestination',
                                padding: 5,
                                width: 130,
                                iconCls: '',
                                text: 'Check all '
                            },
                            {
                                xtype: 'button',
                                action: 'clearalldestination',
                                itemId: 'btnClearalldestination',
                                padding: 5,
                                width: 75,
                                iconCls: 'icon-reset',
                                text: 'Clear'
                            },
                            {
                                xtype: 'splitter',
                                width: '10'
                            },
                            {
                                xtype: 'label',
                                forId: 'notif',
                                name: 'notif',
                                text: '',
                            }
                        ]
                    },
                ]
            },
            {
                xtype: 'toolbar',
                dock: 'bottom',
                height: 25,
                items: [
                    {
                        xtype: 'fieldcontainer',
                        layout: 'vbox',
                        bodyBorder: false,
                        defaults: {
                            layout: 'fit'
                        },
                        padding: '0 0 0 0',
                        items: [
                            {
                                xtype: 'fieldcontainer',
                                layout: 'vbox',
                                bodyBorder: false,
                                defaults: {
                                    layout: 'fit'
                                },
                                padding: '0 0 0 0',
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
                                                width: '900'
                                            },
                                            {
                                                xtype: 'button',
                                                action: 'postingstepsatu',
                                                itemId: 'btnPostingstepsatu',
                                                padding: 5,
                                                width: 130,
                                                iconCls: '',
                                                text: 'Posting step satu'
                                            },
                                            {
                                                xtype: 'button',
                                                action: 'save',
                                                itemId: 'btnSave',
                                                padding: 5,
                                                width: 130,
                                                iconCls: 'icon-save',
                                                text: 'Save '
                                            },
                                            {
                                                xtype: 'button',
                                                action: 'cancel',
                                                itemId: 'btnCancel',
                                                padding: 5,
                                                width: 75,
                                                iconCls: 'icon-cancel',
                                                text: 'Cancel'
                                            }
                                        ]
                                    },
                                ]
                            }

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
            width: 50,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [
                {
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },             
            ]
        }

        return ac;

    },
});


