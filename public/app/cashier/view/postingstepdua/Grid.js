Ext.define('Cashier.view.postingstepdua.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.postingstepduagrid',
    store: 'Postingstepdua',
    bindPrefixName: 'Postingstepdua',
    itemId: 'Postingstepdua',
    newButtonLabel: 'Add New',
    title: 'Source Data',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'checkcolumnpostingtogl', //only display checkbox from custome js 
                    header: 'Posting to Gl',
                    dataIndex: 'is_postingstep2',
                    width: 100,
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
                    itemId: 'colms_projectname',
                    width: 150,
                    dataIndex: 'projectname',
                    hideable: false,
                    text: 'Project'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname',
                    width: 200,
                    dataIndex: 'ptname',
                    hideable: false,
                    text: 'PT (Company)'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_no',
                    width: 150,
                    dataIndex: 'voucher_no',
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
                    text: 'Voucher Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
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
                    width: 200,
                    dataIndex: 'description',
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
                height: 30,
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
                                width: '40'
                            },
                            {
                                xtype: 'checkboxfield',
                                fieldLabel: '',
                                itemId: 'fd_checkallposting',
                                name: 'checkallposting',
                                boxLabel: 'All Voucher Posting',
                                padding: '0 0 0 0',
                                margin: '0 0 10 0',
                                boxLabelCls: 'x-form-cb-label small',
                                inputValue: '1',
                                uncheckedValue: '0',
                                checked: false
                            },
                        ]
                    },
                ]
            },
            {
                xtype: 'toolbar',
                dock: 'bottom',
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
                                width: '900'
                            },
                            {
                                xtype: 'button',
                                action: 'unposting',
                                itemId: 'btnUnposting',
                                padding: 5,
                                width: 150,
                                iconCls: '',
                                text: 'Unposting'
                            },
                            {
                                xtype: 'button',
                                action: 'postingtogl',
                                itemId: 'btnPostingtoGl',
                                padding: 5,
                                width: 150,
                                iconCls: '',
                                text: 'Posting to Gl'
                            },
                            {
                                xtype: 'splitter',
                                width: '10'
                            },
                            {
                                xtype: 'button',
                                action: 'cancel',
                                itemId: 'btnCancel',
                                iconCls: 'icon-cancel',
                                padding: 5,
                                text: 'Cancel',
                                handler: function () {
                                    this.up('window').close();
                                }
                            }
                        ]
                    },
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                id: 'pagingpostingstepdua',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }
        ];
        return dockedItems;
    },
});


