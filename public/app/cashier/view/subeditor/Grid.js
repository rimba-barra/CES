Ext.define('Cashier.view.subeditor.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.subeditorgrid',
    store: 'Subeditor',
    bindPrefixName: 'Subeditor',
    itemId: 'SubeditorGrid',
    title: 'Sub Editor',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            // dockedItems: me.generateDockedItems(),
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
                    itemId: 'colms_jid',
                    width: 130,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'jid',
                    hideable: false,
                    text: 'JID'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_date',
                    dataIndex: 'voucher_date',
                    titleAlign: 'center',
                    align: 'center',
                    width: 130,
                    hideable: false,
                    text: 'Voucher Date',
                    renderer: Ext.util.Format.dateRenderer('d/m/Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_no',
                    dataIndex: 'voucher_no',
                    titleAlign: 'center',
                    align: 'center',
                    width: 100,
                    hideable: false,
                    text: 'Voucher No'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa',
                    dataIndex: 'coa',
                    titleAlign: 'center',
                    align: 'center',
                    width: 80,
                    hideable: false,
                    text: 'COA'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_type',
                    dataIndex: 'type',
                    titleAlign: 'center',
                    align: 'center',
                    width: 50,
                    hideable: false,
                    text: 'Type'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kelsub',
                    dataIndex: 'kelsub',
                    titleAlign: 'left',
                    align: 'center',
                    width: 50,
                    hideable: false,
                    text: 'Kelsub'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    dataIndex: 'code',
                    titleAlign: 'center',
                    align: 'center',
                    width: 80,
                    hideable: false,
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code1',
                    dataIndex: 'code1',
                    titleAlign: 'center',
                    align: 'center',
                    width: 80,
                    hideable: false,
                    text: 'Code 1'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    dataIndex: 'description',
                    titleAlign: 'center',
                    align: 'left',
                    width: 180,
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_keterangan',
                    dataIndex: 'keterangan',
                    titleAlign: 'center',
                    align: 'left',
                    width: 180,
                    hideable: false,
                    text: 'Keterangan'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    dataIndex: 'amount',
                    titleAlign: 'center',
                    align: 'right',
                    width: 140,
                    hideable: false,
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    text: 'Amount'
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
                    {
                        text: 'Edit',
                        itemId: 'btnEdit',
                        action: 'update',
                        iconCls: 'icon-edit',
                        disabled: true,
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        text: 'Convert COA non-Sub to Sub',
                        itemId: 'btnConvert',
                        action: 'convertcoanonsubtosub',
                        iconCls: 'icon-copy',
                        // bindAction: me.bindPrefixName + 'CovertCOANonSubtoSub'
                    },
                    {
                        text: 'Delete Selected',
                        itemId: 'btnDelete',
                        action: 'destroy',
                        iconCls: 'icon-delete',
                        disabled: true,
                        bindAction: me.bindPrefixName + 'Delete'
                    },
                    {
                        xtype: 'tbspacer',
                        flex: 1
                    },
                    {
                        xtype: 'tbseparator'
                    },
                    {
                        xtext: 'button',
                        itemId: 'btnHelp',
                        name: 'btnHelp',
                        icon: 'app/main/images/icons/help-book.png',
                        title: 'Sub Editor',
                        tooltip : "Help?",  
                    },
                    
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                id: 'pagingsubeditor',
                width: 360,
                displayInfo: true,
                store:'Subeditor'
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
            hideable: true,
            items: [
                {
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    text : 'Delete',
                    iconCls: 'icon-delete',
                    action: 'destroy',
                    bindAction: me.bindPrefixName + 'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }

            ]
        };
        return ac;
    }
});


