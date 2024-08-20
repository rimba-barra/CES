Ext.define('Cashier.view.vdapprove.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.vdapproveformsearch',  
    uniquename: '_vdappr',  
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
                    itemId: 'fd_pt_id'+me.uniquename,
                    id: 'pt_id'+me.uniquename,
                    name: 'pt_id',
                    fieldLabel: 'PT / Company',
                    emptyText: 'Select PT / Company',
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'departmentcombobox',
                    itemId: 'fd_department_id'+me.uniquename,
                    id: 'department_id'+me.uniquename,
                    name: 'department_id',
                    fieldLabel: 'Department',
                    emptyText: 'Select Department',
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null

                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_voucher_no'+me.uniquename,
                    id: 'fdms_voucher_no'+me.uniquename,
                    name: 'voucher_no',
                    fieldLabel: 'Voucher No.',
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 20,
                },
                {
                    xtype: 'datefield',
                    itemId: 'fsms_fromdate'+me.uniquename,
                    id: 'fromdate'+me.uniquename,
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
                    itemId: 'fsms_untildate'+me.uniquename,
                    id: 'untildate'+me.uniquename,
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
                    itemId: 'fs_status'+me.uniquename,
                    id: 'status'+me.uniquename,
                    name: 'status',
                    fieldLabel: '',
                    emptyText: 'Select Status',
                    enforceMaxLength: true,
                    enableKeyEvents: true
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_vid'+me.uniquename,
                    id: 'fdms_vid'+me.uniquename,
                    name: 'vid',
                    fieldLabel: 'Reg. No.',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 20,
                },
                {
                    splitter:20
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_description_no'+me.uniquename,
                    id: 'fdms_description_no'+me.uniquename,
                    name: 'description',
                    fieldLabel: 'Description',
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
