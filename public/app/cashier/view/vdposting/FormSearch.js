Ext.define('Cashier.view.vdposting.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.vdpostingformsearch',
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
                    itemId: 'fd_pt_id_11e31',
                    id: 'pt_id_11e31',
                    name: 'pt_id',
                    fieldLabel: 'PT / Company',
                    emptyText: 'Select PT / Company',
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'departmentcombobox',
                    itemId: 'fd_department_id_11e31',
                    id: 'department_id_11e31',
                    name: 'department_id',
                    fieldLabel: 'Department',
                    emptyText: 'Select Department',
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null

                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_voucher_no_11e31',
                    id: 'fdms_voucher_no_11e31',
                    name: 'voucher_no',
                    fieldLabel: 'Voucher No.',
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 20,
                },
                {
                    xtype: 'datefield',
                    itemId: 'fsms_fromdate_11e31',
                    id: 'fromdate_11e31',
                    name: 'fromdate',
                    emptyText: 'From Date',
                    enforceMaxLength: true,
                    maxLength: 10,
                    enableKeyEvents: true,
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d'
                },
                {
                    xtype: 'label',
                    forId: 'myFieldId',
                    text: ' to',
                    margin: '0 20 0 30'
                },
                {
                    xtype: 'datefield',
                    itemId: 'fsms_untildate_11e31',
                    id: 'untildate_11e31',
                    name: 'untildate',
                    emptyText: 'Until Date',
                    enforceMaxLength: true,
                    maxLength: 10,
                    enableKeyEvents: true,
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d'
                },
                {
                    xtype: 'statusvouchercombobox',
                    itemId: 'fs_status_11e31',
                    id: 'status_11e31',
                    name: 'status',
                    fieldLabel: '',
                    emptyText: 'Select Status',
                    enforceMaxLength: true,
                    enableKeyEvents: true
                },

                {
                    xtype: 'textfield',
                    itemId: 'fdms_description_11e31',
                    id: 'fdms_description_11e31',
                    name: 'description',
                    fieldLabel: 'Description',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 20,
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
