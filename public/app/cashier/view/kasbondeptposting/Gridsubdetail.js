Ext.define('Cashier.view.kasbondeptposting.Gridsubdetail', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.kasbondeptpostinggridsubdetail',
    store: 'Kasbondeptpostingsubdetail',
    bindPrefixName:'KasbondeptPosting',
    itemId: 'Kasbondeptpostingsubdetail',
    title: 'SUB COA',
    newButtonLabel: 'Add New',
    uniquename: '_kasbondeptpostinggridsubdetail',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItemscustome(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            features: [
                {
                    ftype: 'summary',
                }
            ],
            columns: [
                {
                    xtype: 'rownumberer'
                },
                me.generateActionColumn(),
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_subglcode',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'kelsub',
                    hideable: false,
                    text: 'Kelsub'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_subcode',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'subcode',
                    hideable: false,
                    text: 'Sub Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code1',
                    width: 80,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'code1',
                    hideable: false,
                    text: 'Code 1'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code2',
                    width: 80,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'code2',
                    hideable: false,
                    text: 'Code 2'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code3',
                    width: 80,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'code3',
                    hideable: false,
                    text: 'Code 3'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code4',
                    width: 80,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'code4',
                    hideable: false,
                    text: 'Code 4'
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
		    /*	
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    summaryType: 'sum',
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        var summaryvalue = Ext.util.Format.number(value, '0,000.00');
                        return  "Sum Total : " + summaryvalue;
                    }*/
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_remarks',
                    width: 180,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'remarks',
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
                xtype: 'fieldcontainer',
                layout: 'hbox',
                align: 'right',
                bodyBorder: false,
                bodyStyle: 'background-color:#dfe8f5;',
                defaults: {
                    layout: 'fit'
                },
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'COA',
                        itemId: 'fd_coa',
                        id: 'coa'+me.uniquename,
                        name: 'coa',
                        emptyText: 'ACCOUNT',
                        width: 200,
                        readOnly: true,
                        allowBlank: true,
                        enforceMaxLength: true,
                        enableKeyEvents: true,
                        rowdata: null
                    },
                    {
                        xtype: 'splitter',
                        width: '10',
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '',
                        itemId: 'fd_coaname',
                        id: 'coaname'+me.uniquename,
                        name: 'coaname',
                        emptyText: 'ACCOUNT NAME',
                        width: 300,
                        readOnly: true,
                        allowBlank: true,
                        enforceMaxLength: true,
                        enableKeyEvents: true,
                        rowdata: null
                    },
                    {
                        xtype: 'splitter',
                        width: '10',
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '',
                        itemId: 'fd_balancecoa',
                        id: 'balancecoa'+me.uniquename,
                        name: 'balancecoa',
                        emptyText: 'BALANCE COA',
                        width: 200,
                        readOnly: true,
                        allowBlank: true,
                        enforceMaxLength: true,
                        enableKeyEvents: true,
                        rowdata: null
                    },
                ]
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 30,
                items: [
                    {
                        text: 'Add new',
                        itemId: 'btnAdd',
                        action: 'create',
                        iconCls: 'icon-add',
                        bindAction: me.bindPrefixName + 'Create'
                    },
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
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                id: 'pagingkasbondeptpostingsubdetail',
                width: 360,
                displayInfo: true,
                store: 'Kasbondeptpostingsubdetail',
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
                {
                    defaultIcon: 'icon-edit',
                    iconCls: ' ux-actioncolumn icon-edit act-update',
                    action: 'update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    defaultIcon: 'icon-delete',
                    action: 'destroy',
                    iconCls: 'ux-actioncolumn icon-delete act-destroy',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }
            ]
        }
        return ac;

    },
});


