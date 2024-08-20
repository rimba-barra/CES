Ext.define('Gl.view.subvsaccount.Grid', {
    extend: 'Ext.grid.Panel',
    loadStore: [],
    alias: 'widget.subvsaccountgrid',
    loadedStore: {},
    title: 'Process Result',
    store: 'Subvsaccount',
    bindPrefixName: 'Subvsaccount',
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
                    width: 150,
                    dataIndex: 'voucher_no',
                    hideable: false,
                    text: 'Voucher No'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_date',
                    width: 150,
                    dataIndex: 'voucher_date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                    hideable: false,
                    text: 'Voucher Date'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa',
                    width: 150,
                    dataIndex: 'coa',
                    hideable: false,
                    text: 'Account COA'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kelsub',
                    width: 150,
                    dataIndex: 'kelsub',
                    hideable: false,
                    text: 'Kelsub'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 150,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Sub code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ketaccount',
                    width: 300,
                    dataIndex: 'keterangan',
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_note',
                    width: 200,
                    dataIndex: 'note',
                    hideable: false,
                    text: 'Message'
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
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        border: false,
                        padding: '0 0 0 900px',
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
                            },
                            {
                                xtype: 'button',
                                action: 'destroyall',
                                itemId: 'btnDestroyAll',
                                padding: 5,
                                width: 75,
                                text: 'Delete All'
                            },
                            {
                                xtype: 'button',
                                action: 'view',
                                itemId: 'btnView',
                                padding: 5,
                                width: 75,
                                text: 'View'
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
                },
                {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    id: 'btnDelete',
                    bindAction: me.bindPrefixName + 'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                },
                
            ]
        };
        return ac;
    },
});


