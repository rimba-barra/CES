Ext.define('Gl.view.journal.FormSearch', {
    extend: 'Gl.library.template.view.FormSearch',
    alias: 'widget.journalformsearch',
    width: '700',
    id: 'journalformsearchID',
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
                    enableKeyEvents: true,
                    hasfocus:true
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_description',
                    name: 'description',
                    fieldLabel: 'Desrkripsi',
                    enforceMaxLength: true,
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
                            width: 100,
                            enableKeyEvents: true,
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d'
                        },
                        {
                            xtype: 'label',
                            forId: 'myFieldId',
                            text: ' to',
                            margin: '0 0 0 20'
                        },
                        {
                            xtype: 'datefield',
                            itemId: 'fsms_untildate',
                            name: 'untildate',
                            emptyText: 'Until Date',
                            enforceMaxLength: true,
                            maxLength: 10,
                            width: 100,
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
                            boxLabel: 'Sudah Posting / KOREKSI DATA',
                            name: 'is_posting',
                            inputValue: '1',
                            id: 'radio1'
                        },
                        {
                            boxLabel: 'Belum Posting',
                            name: 'is_posting',
                            inputValue: '0',
                            id: 'radio2'
                        },
                        {
                            boxLabel: 'Semua',
                            name: 'is_posting',
                            inputValue: '2',
                            id: 'radio3'
                        }
                    ]
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    },
    listeners: {

    }
});
