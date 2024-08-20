Ext.define('Cashier.view.useraccessprefix.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.useraccessprefixformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 240,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'user_prefix_id',
                },
                 {
                    xtype: 'hiddenfield',
                    name: 'project_id',
                },
                 {
                    xtype: 'hiddenfield',
                    name: 'pt_id',
                },
                {
                        xtype: 'ptusercomboboxpersh',
                        itemId: 'fd_projectpt_id_44',
                        id: 'projectpt_id_44',
                        name: 'projectpt_id',
                        fieldLabel: 'PT / Company',
                        emptyText: 'Select PT / Company',
                        enforceMaxLength: true,
                        enableKeyEvents: true,
                        rowdata: null
                    },
                     {
                        xtype: 'usermodulecashiercombobox',
                        itemId: 'fd_user_access_id_44',
                        id: 'user_access_id_44',
                        name: 'user_access_id',
                        fieldLabel: 'User',
                        emptyText: 'Select User',
                        enforceMaxLength: true,
                        enableKeyEvents: true,
                        rowdata: null
                    },
                     {
                        xtype: 'voucherprefixsetupcomboboxV2',
                        itemId: 'fd_voucherprefix_id_44',
                        id: 'voucherprefix_id_44',
                        name: 'voucherprefix_id',
                        fieldLabel: 'Voucher Prefix',
                        emptyText: 'Select Voucher Prefix',
                        enforceMaxLength: true,
                        enableKeyEvents: true,
                        rowdata: null
                    },
                    {
                        xtype: 'combobox',
                        name: 'module',
                        fieldLabel: 'Module',
                        queryMode: 'local',
                        valueField: 'module',
                        allowBlank: true,
                        forceSelection: true,
                        displayField: 'description',
                        store: new Ext.data.JsonStore({
                            fields: ['module', 'description'],
                            data: [
                                {module: '', description: 'All'},
                                {module: 'cashbon', description: 'Cashbon Department'},
                                {module: 'voucher', description: 'Voucher'},
                            ]
                        }),
                    },
               
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

