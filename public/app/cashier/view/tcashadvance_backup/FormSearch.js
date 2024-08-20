Ext.define('Cashier.view.tcashadvance.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.tcashadvanceformsearch',
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
                    xtype: 'hiddenfield',
                    name: 'project_id',
                    value: '0'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'pt_id',
                    value: '0'
                },
                {
                    xtype: 'ptusercombobox',
                    fieldLabel: 'Pt/Company',
                    itemId: 'fs_pt_id',
                    id: 'pt_id_s',
                    name: 'pt_id',
                    width: 100,
                    emptyText: 'PT / Company',
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'departmentcombobox',
                    fieldLabel: 'Departement',
                    itemId: 'fd_department_id',
                    id: 'department_id_s',
                    name: 'department_id',
                    emptyText: '',
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'voucherprefixcombobox',
                    fieldLabel: 'Voucher Prefix',
                    itemId: 'fd_voucherprefix_id',
                    id: 'voucherprefix_id_qw',
                    name: 'voucherprefix_id',
                    emptyText: '',
                    width: 300,
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '',
                    itemId: 'fs_prefixdesc',
                    id: 'prefixdesc_s',
                    name: 'prefixdesc',
                    emptyText: 'Prefix Description',
                    width: 100,
                    readOnly: true,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'coacombobox',
                    fieldLabel: 'Account Code',
                    itemId: 'fs_coa_id',
                    id: 'coa_id_s',
                    name: 'coa_id',
                    width: 100,
                    emptyText: 'Select Account Code',
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '',
                    itemId: 'fs_coaname',
                    id: 'coaname_s',
                    name: 'coaname',
                    emptyText: 'Account code Description',
                    width: 450,
                    readOnly: true,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Accept Date',
                    itemId: 'fd_accept_date',
                    id: 'accept_date_s',
                    name: 'accept_date',
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Claim Date',
                    itemId: 'fd_claim_date',
                    id: 'claim_date_s',
                    name: 'claim_date',
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Description',
                    itemId: 'fs_description',
                    id: 'description_s',
                    name: 'description',
                    width: 20,
                    emptyText: '',
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
