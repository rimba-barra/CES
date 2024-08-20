Ext.define('Cashier.view.kasbondept.FormSearch', {
    extend       : 'Cashier.library.template.view.FormSearch',
    alias        : 'widget.kasbondeptformsearch',
    uniquename   : "_fskasbondept",
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items   : [
                {
                    xtype: 'hiddenfield',
                    name : 'hideparam',
                    value: 'default'
                },
                 {
                    xtype: 'hiddenfield',
                    name : 'project_id',
                },
                {
                    xtype           : 'ptusercombobox',
                    itemId          : 'fs_pt_id_cdr',
                    id              : 'pt_id_cdr',
                    name            : 'pt_id',
                    fieldLabel      : 'PT / Company',
                    emptyText       : 'Select PT / Company',
                    enforceMaxLength: true,
                    enableKeyEvents : true,
                    rowdata         : null
                },
                {
                    xtype           : 'departmentcombobox',
                    itemId          : 'fs_department_id_cdr',
                    id              : 'department_id_cdr',
                    name            : 'department_id',
                    fieldLabel      : 'Department',
                    emptyText       : 'Select Department',
                    enforceMaxLength: true,
                    enableKeyEvents : true,
                    rowdata         : null

                },
                {
                    xtype           : 'textfield',
                    itemId          : 'fs_voucher_no_cdr',
                    id              : 'fs_voucher_no_cdr',
                    name            : 'voucher_no',
                    fieldLabel      : 'Kasbon No.',
                    allowBlank      : false,
                    enableKeyEvents : true,
                    enforceMaxLength: true,
                    maxLength       : 20,
                },
                {
                    xtype           : 'textfield',
                    itemId          : 'fs_made_by_cdr',
                    id              : 'fs_made_by_cdr',
                    name            : 'made_by_name',
                    fieldLabel      : 'Made By',
                    enableKeyEvents : true,
                    enforceMaxLength: true,
                    maxLength       : 20,
                },
            
                 {
                            xtype     : 'fieldcontainer',
                            fieldLabel: 'Transaction Date',
                            layout    : 'hbox',
                            items     : [
                                {
                                    xtype           : 'datefield',
                                    emptyText       : 'From Date',
                                    name            : 'fromdate',
                                    itemId          : 'fs_fromdate_cdr',
                                    id              : 'fromdate_cdr',
                                    format          : 'd-m-Y',
                                    submitFormat    : 'Y-m-d',
                                    enforceMaxLength: true,
                                    maxLength       : 10,
                                    enableKeyEvents : true,
                                    flex            : 1
                                },
                                {
                                    xtype : 'label',
                                    forId : 'lbl1',
                                    text  : 'To',
                                    margin: '2 10 0 10'
                                },
                                {
                                    xtype           : 'datefield',
                                    itemId          : 'fd_untildate_cdr',
                                    id              : 'untildate_cdr',
                                    fieldLabel      : '',
                                    emptyText       : 'Until Date',
                                    name            : 'untildate',
                                    enforceMaxLength: true,
                                    maxLength       : 10,
                                    enableKeyEvents : true,
                                    format          : 'd-m-Y',
                                    submitFormat    : 'Y-m-d',
                                    flex            : 1
                                }
                            ]
                        },
                          {
                            xtype           : 'textfield',
                            itemId          : 'fs_description_cdr',
                            id              : 'fs_description_cdr',
                            name            : 'description',
                            fieldLabel      : 'Description',
                            enableKeyEvents : true,
                            enforceMaxLength: true,
                        },
                         {
                            xtype           : 'xmoneyfield',
                            itemId          : 'fs_amount_cdr',
                            id              : 'fs_amount_cdr',
                            name            : 'amount',
                            fieldLabel      : 'Amount Request',
                            enableKeyEvents : true,
                            enforceMaxLength: true,
                        },
                        {
                            xtype         : 'checkboxfield',
                            name          : 'is_not_tkb',
                            boxLabel      : 'Not TKB',
                            boxLabelCls   : 'x-form-cb-label small',
                            inputValue    : '1',
                            uncheckedValue: '0'
                        }
            
              
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
