Ext.define('Cashier.view.rcash.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.rcashformsearch',
    uniqeuname: "_fsrcash",
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    id: 'hideparam' + me.uniqeuname,
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'prefix_id' + me.uniqeuname,
                    name: 'prefix_id',
                },
                {
                    xtype: 'ptusercombobox',
                    itemId: 'fd_pt_id' + me.uniqeuname,
                    id: 'pt_id' + me.uniqeuname,
                    name: 'pt_id',
                    fieldLabel: 'PT / Company',
                    emptyText: 'Select PT / Company',
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'departmentcombobox',
                    fieldLabel: 'Departement',
                    itemId: 'fs_department_id' + me.uniqeuname,
                    id: 'department_id' + me.uniqeuname,
                    name: 'department_id',
                    emptyText: '',
                    width: 400,
                    readOnly: false,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'voucherprefixcombobox',
                    itemId: 'fs_voucherprefix' + me.uniqeuname,
                    id: 'voucherprefix_id' + me.uniqeuname,
                    name: 'voucherprefix_id',
                    fieldLabel: 'Prefix',
                    width: 300,
                    emptyText: 'Select Prefix Voucher',
                    enforceMaxLength: true,
                    enableKeyEvents: true
                },
                {
                    xtype: 'statusallcombobox',
                    itemId: 'fs_statusall' + me.uniqeuname,
                    id: 'status' + me.uniqeuname,
                    name: 'status',
                    fieldLabel: 'Status',
                    width: 300,
                    emptyText: 'Select Prefix Voucher',
                    enforceMaxLength: true,
                    enableKeyEvents: true
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Voucher Type',
                            defaultType: 'radiofield',
                            defaults: {
                                flex: 3
                            },
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'Cash',
                                    name: 'kasbank',
                                    inputValue: 'KAS',
                                    id: 'radio1' + me.uniqeuname,
                                    allowBlank: false
                                },
                                {
                                    boxLabel: 'Bank',
                                    name: 'kasbank',
                                    inputValue: 'BANK',
                                    id: 'radio2' + me.uniqeuname,
                                    allowBlank: false
                                },
                                {
                                    boxLabel: 'ALL',
                                    name: 'kasbank',
                                    inputValue: 'KASBANK',
                                    id: 'radio3' + me.uniqeuname,
                                    allowBlank: false
                                },
                            ]
                        },
                    ]
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Voucher No',
                    itemId: 'fd_voucher_no' + me.uniqeuname,
                    id: 'voucher_no' + me.uniqeuname,
                    name: 'voucher_no',
                    width: 300,
                    readOnly: false,
                    emptyText: 'Manual Input',
                    enforceMaxLength: true,
                    enableKeyEvents: true
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
