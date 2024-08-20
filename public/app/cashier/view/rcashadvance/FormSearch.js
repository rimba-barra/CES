Ext.define('Cashier.view.rcashadvance.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.rcashadvanceformsearch',
    uniquename: "_fsrcashadvance",
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
                    itemId: 'fd_pt_id' + me.uniquename,
                    id: 'pt_id' + me.uniquename,
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
                    itemId: 'fs_department_id' + me.uniquename,
                    id: 'department_id' + me.uniquename,
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
                    xtype: 'textfield',
                    fieldLabel: 'Voucher No.',
                    itemId: 'fd_voucher_no' + me.uniquename,
                    id: 'voucher_no' + me.uniquename,
                    name: 'voucher_no',
                    emptyText: 'Manual Input',
                    width: 250,
                    readOnly: false,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'statusciacombobox',
                    itemId: 'fs_statusdata' + me.uniquename,
                    id: 'statusdata',
                    name: 'statusdata',
                    fieldLabel: 'Status',
                    width: 300,
                    emptyText: 'Select Status',
                    enforceMaxLength: true,
                    enableKeyEvents: true
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
