Ext.define('Cashier.view.logautomail.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.logautomailformsearch',
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
                    xtype: 'hidden',
                    name: 'project_id'
                },
                 {
                    xtype: 'automailmodulecombobox',
                    name: 'module_code',
                    fieldLabel: 'Module',
                    emptyText: 'Select Module',
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                  {
                    xtype: 'automailtypecombobox',
                    name: 'type_code',
                    fieldLabel: 'Type',
                    emptyText: 'Select Type',
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                 {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Sent Date',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'datefield',
                                    emptyText: 'From Date',
                                    name: 'from_senddate',
                                    itemId: 'fsms_fromdate_11e32',
                                    id: 'fromdate_11e32',
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
                                    itemId: 'fsms_untildate_11e32',
                                    id: 'untildate_11e32',
                                    fieldLabel: '',
                                    emptyText: 'Until Date',
                                    name: 'until_senddate',
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    enableKeyEvents: true,
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    width: 110
                                }
                            ]
                        },
                {
                    xtype: 'combobox',
                    name: 'status',
                    fieldLabel: 'Sent Status',
                    queryMode: 'local',
                    valueField: 'status',
                    allowBlank: true,
                    forceSelection: true,
                    displayField: 'description',
                    store: new Ext.data.JsonStore({
                        fields: ['status', 'description'],
                        data: [
                            {status: 'Success', description: 'Success'},
                            {status: 'Falied', description: 'Failed'},
                        ]
                    }),
                },

                {
                    xtype: 'textfield',
                    name: 'send_email',
                    fieldLabel: 'Recipient Mail',
                    maxLength: 500
                },

                {
                    xtype: 'textfield',
                    name: 'voucher_no',
                    fieldLabel: 'Voucher No',
                    maxLength: 500
                },
                
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
