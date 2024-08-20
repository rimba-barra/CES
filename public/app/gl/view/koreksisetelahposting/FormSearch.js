Ext.define('Gl.view.koreksisetelahposting.FormSearch', {
    extend: 'Gl.library.template.view.FormSearch',
    alias: 'widget.koreksisetelahpostingformsearch',
    width: '700',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'search'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_voucher_no',
                    name: 'voucher_no',
                    fieldLabel: 'Nomor Voucher',
                    enforceMaxLength: true,
                    maxLength: 50,
                    enableKeyEvents: true
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Tanggal Voucher',
                    defaultType: 'datefield',
                    defaults: {
                        flex:3
                        },
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'datefield',
                            itemId: 'fsms_fromdate',
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
                            margin: '0 0 0 50'
                        },
                        {
                            xtype: 'datefield',
                            itemId: 'fsms_untildate',
                            name: 'untildate',
                            emptyText: 'Until Date',
                            enforceMaxLength: true,
                            maxLength: 10,
                            enableKeyEvents: true,
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d'
                        }

                    ]

                },
                {
                    xtype: 'prefixcombobox',
                    fieldLabel: 'Prefix',
                    emptyText: 'Please Select',
                    name: 'prefix_id',
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Status',
                    defaultType: 'radiofield',
                    name: 'is_posting',
                    defaults: {
                        flex: 1
                    },
                    layout: 'vbox',
                    items: [
                        {
                            boxLabel: 'Sudah Posting',
                            name: 'is_posting',
                            inputValue: '1',
                            id: 'radio1',
                            checked: true
                        },
                        
                    ]
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    },
    listeners: {
        boxready: function () {
            $("input[name='voucher_no']").focus();
        }
    }
});
