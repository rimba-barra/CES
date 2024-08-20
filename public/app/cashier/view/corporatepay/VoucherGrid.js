Ext.define('Cashier.view.corporatepay.VoucherGrid', {
    extend: 'Cashier.library.template.view.GridDS2Browse',
    alias: 'widget.vouchergrid',
    storeConfig: {
        id: 'IDselectedvoucher',
        idProperty: 'kasbank_id',
        extraParams: {
            mode_read: 'kasbanklist'
        }
    },
    id: 'browsekasbankid',
    simpleSelect: true,
    height: 300,
    bindPrefixName: 'Corporatepay',
    newButtonLabel: 'Add',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            defaults: {
                xtype: 'gridcolumn',
                width: 11
            },
            columns: [
                {
                    xtype: 'rownumberer',
                    width: 35,
                },
                {
                    width: 150,
                    dataIndex: 'vid',
                    text: 'VoucherID',
                },
                {
                    width: 150,
                    dataIndex: 'voucher_no',
                    text: 'Voucher No',
                },
                {
                    width: 150,
                    dataIndex: 'vendor_name',
                    text: 'Vendor Name',
                },
                {
                    width: 150,
                    dataIndex: 'bank_code',
                    text: 'Bank Code',
                },
                {
                    width: 150,
                    dataIndex: 'vendor_bank_name',
                    text: 'Bank Name',
                },
                {
                    width: 150,
                    dataIndex: 'vendor_bank_account_name',
                    text: 'Bank Account Name',
                },
                {
                    width: 150,
                    dataIndex: 'vendor_bank_account_no',
                    text: 'Bank Account No',
                },
                {
                    width: 150,
                    dataIndex: 'description',
                    text: 'Description',
                },
                {
                    width: 150,
                    dataIndex: 'amount',
                    text: 'Amount',
                },
                {
                    width: 150,
                    dataIndex: 'vendor_bank_currency',
                    text: 'Currency',
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
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'pickvoucher',
                        id:'btnpickvoucher',
                        itemId:'btnpickvoucher',
                        margin: '0 5 0 0',
                        iconCls: 'icon-approve',
                        text: "Pick Voucher"
                    },
                ]
            }
        ];
        return dockedItems;
    },
    getFormSearch: function () {


        var x = [
            {
                xtype: 'hiddenfield',
                id: 'projectVoucherId',
                name: 'project_id'
            },
            {
                xtype: 'hiddenfield',
                id: 'choosenkasbankid',
                name: 'choosenkasbankid'
            },
            {
                xtype: 'hiddenfield',
                id: 'ptVoucherId',
                name: 'pt_id'
            },
            {
                xtype: 'textfield',
                name: 'voucher_no',
                fieldLabel: ' Voucher No ',
                maxLength: 30,
                anchor: '-15',
                width: 100,
                id: 'voucherNoid',
                itemId:'voucherNoid',
                listeners: {
                    afterrender: function (field) {
                        field.focus(false, 1000);
                    }
                }
            },
            {
                xtype: 'textfield',
                name: 'vid',
                fieldLabel: 'Voucher ID ',
                id:'voucherIDid',
                itemId:'voucherIDid',
                maxLength: 30,
                anchor: '-15',
                width: 100,
            },
            {
                xtype: 'textfield',
                name: 'description',
                fieldLabel: 'Description ',
                id:'fs_desc',
                itemId:'fs_desc',
                width: 100,
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
            },
        ];
        return x;
    }
});