Ext.define('Cashier.view.kasbondeptposting.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.kasbondeptpostingformsearch',
    uniquename: "_fskasbondeptposting",
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
                },

                {
                    xtype: 'ptusercombobox',
                    itemId: 'fs_pt_id_cdp',
                    id: 'pt_id_cdp',
                    name: 'pt_id',
                    fieldLabel: 'PT / Company',
                    emptyText: 'Select PT / Company',
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'departmentcombobox',
                    itemId: 'fs_department_id_cdp',
                    id: 'department_id_cdp',
                    name: 'department_id',
                    fieldLabel: 'Department',
                    emptyText: 'Select Department',
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null

                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_voucher_no_cdp',
                    id: 'fs_voucher_no_cdp',
                    name: 'voucher_no',
                    fieldLabel: 'Kasbon No.',
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 20,
                },
                  {
                    xtype: 'textfield',
                    itemId: 'fs_made_by_cdp',
                    id: 'fs_made_by_cdp',
                    name: 'made_by_name',
                    fieldLabel: 'Made By',
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
                                    itemId: 'fs_fromdate_cdp',
                                    id: 'fromdate_cdp',
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
                                    itemId: 'fs_untildate_cdp',
                                    id: 'untildate_cdp',
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
                         {
                            xtype: 'textfield',
                            itemId: 'fs_description_cdp',
                            id: 'fs_description_cdp',
                            name: 'description',
                            fieldLabel: 'Description',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                        },
                         {
                            xtype: 'xmoneyfield',
                            itemId: 'fs_amount_cdp',
                            id: 'amount_cdp',
                            name: 'amount',
                            fieldLabel: 'Amount Request',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                        },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
