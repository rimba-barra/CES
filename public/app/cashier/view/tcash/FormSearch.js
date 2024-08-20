Ext.define('Cashier.view.tcash.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.tcashformsearch',
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
                    xtype: 'projectptallcombobox',
                    fieldLabel: 'Pt/Company',
                    itemId: 'fs_projectpt_id',
                    id: 'projectpt_id_s',
                    name: 'projectpt_id',
                    width: 100,
                    emptyText: 'Project Company',
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'prefixcombobox',
                    fieldLabel: 'Prefix',
                    itemId: 'fs_prefix_id',
                    id: 'prefix_id_s',
                    name: 'prefix_id',
                    width: 100,
                    emptyText: 'Select Prefix',
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
                {
                    xtype: 'statuscombobox',
                    fieldLabel: 'Payment Type',
                    emptyText: 'Select Bank/Cash',
                    itemId: 'fdms_cash_bank',
                    name: 'cash_bank',
                    id: 'cash_bank_s',
                    allowBlank: false,
                    enforceMaxLength: true,
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Data flow',
                    defaultType: 'radiofield',
                    id: 'vpsf1',
                    defaults: {
                        flex: 1
                    },
                    layout: 'vbox',
                    items: [
                        {
                            boxLabel: 'In',
                            name: 'in_out',
                            inputValue: 'I',
                            id: 'radio1_s',
                            allowBlank: false
                        },
                        
                        {
                            boxLabel: 'Out',
                            name: 'in_out',
                            inputValue: 'O',
                            id: 'radio2_s',
                            allowBlank: false
                        }
                    ]
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
