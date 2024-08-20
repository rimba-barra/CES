Ext.define('Cashier.view.kasbondeptapprove.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.kasbondeptapproveformsearch',
    uniquename: "_fskasbondeptapprove",
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
                items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'ptusercombobox',
                    itemId: 'fs_pt_id_cda',
                    id: 'pt_id_cda',
                    name: 'pt_id',
                    fieldLabel: 'PT / Company',
                    emptyText: 'Select PT / Company',
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'departmentcombobox',
                    itemId: 'fs_department_id_cda',
                    id: 'department_id_cda',
                    name: 'department_id',
                    fieldLabel: 'Department',
                    emptyText: 'Select Department',
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null

                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_voucher_no_cda',
                    id: 'voucher_no_cda',
                    name: 'voucher_no',
                    fieldLabel: 'Kasbon No.',
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 20,
                },
                {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Transaction Date',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'datefield',
                                    emptyText: 'From Date',
                                    name: 'fromdate',
                                    itemId: 'fs_fromdate_cda',
                                    id: 'fromdate_cda',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    width: 110,
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    enableKeyEvents: true,
                                },
                                {
                                    xtype: 'label',
                                    forId: 'lbl1',
                                    text: 'To',
                                    margin: '2 10 0 10'
                                },
                                {
                                    xtype: 'datefield',
                                    itemId: 'fs_untildate_cda',
                                    id: 'untildate_cda',
                                    fieldLabel: '',
                                    emptyText: 'Until Date',
                                    name: 'untildate',
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    enableKeyEvents: true,
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    width: 110
                                }
                            ]
                        },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
