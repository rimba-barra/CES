Ext.define('Cashier.view.kartupiutangacc.FormDataKartuPiutang', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.kartupiutangaccformdatakartupiutang',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 450,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: "_kartupiutangaccformdatakartupiutang",
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ': ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    id: 'hideparam' + me.uniquename,
                    name: 'hideparam',
                    value: 'kartupiutang'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'kartupiutang_id' + me.uniquename,
                    name: 'kartupiutang_id'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'coa' + me.uniquename,
                    name: 'coa'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'kelsub' + me.uniquename,
                    name: 'kelsub'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'kelsub_id' + me.uniquename,
                    name: 'kelsub_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'dpp'
                },
                // {
                //     xtype: 'accounttipepajakcombobox',
                //     name: 'coa_id',
                //     id: 'coa_id',
                //     fieldLabel: 'Account',
                //     allowBlank: false,
                //     labelWidth: 100,
                //     listeners: {
                //         select: function (combo) {
                //             var val = combo.getValue();
                //             var index = combo.getStore().findExact('coa_id', val);
                //             var record = combo.getStore().getAt(index);

                //             me.down("[name=coa]").setValue(record.get("coa"));
                //             me.down("[name=kelsub]").setValue(record.get("kelsub"));
                //             me.down("[name=kelsub_id]").setValue(record.get("kelsub_id"));
                //         }
                //     }
                // },
                {
                    xtype: 'coacombobox',
                    name: 'coa_id',
                    fieldLabel: 'Account',
                    id: 'coa_id',
                    allowBlank: false,
                    labelWidth: 100
                },
                {
                    xtype: 'textfield',
                    name: 'voucher_no',
                    id: 'voucher_no',
                    fieldLabel: 'Voucher No.',
                    // allowBlank: false,
                    labelWidth: 100,
                },
                {
                    xtype: 'datefield',
                    name: 'voucher_date',
                    id: 'voucher_date',
                    fieldLabel: 'Voucher Date',
                    // allowBlank: false,
                    labelWidth: 100,
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    anchor: '55%'
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Type',
                    columns: 2,
                    vertical: true,
                    labelWidth: 100,
                    allowBlank: false,
                    items: [
                        { boxLabel: 'Debet', name: 'type', inputValue: 'D', checked: true },
                        { boxLabel: 'Credit', name: 'type', inputValue: 'C' },
                    ]
                },
                {
                    xtype: 'numberfield',
                    name: 'rate',
                    fieldLabel: 'Rate (%)',
                    anchor: '40%',
                    labelWidth: 100,
                    allowBlank: false
                },
                {
                    xtype: 'xmoneyfield',
                    name: 'amount',
                    id: 'amount',
                    fieldLabel: 'Amount',
                    allowBlank: false,
                    labelWidth: 100,
                    anchor: '60%',
                    readOnly: true
                },
                {
                    xtype: 'textareafield',
                    name: 'description',
                    id: 'description',
                    fieldLabel: 'Description',
                    allowBlank: false,
                    labelWidth: 100
                },
                {
                    xtype: 'textfield',
                    name: 'ntpn',
                    fieldLabel: 'NTPN',
                    labelWidth: 100
                }
                // {
                //     xtype: 'fieldcontainer',
                //     fieldLabel: '',
                //     margin: '0 0 0 105',
                //     defaultType: 'checkboxfield',
                //     items: [
                //         {
                //             boxLabel  : 'SJ',
                //             name      : 'flag_sj',
                //             inputValue: '1',
                //             id        : 'flag_sj'
                //         }, 
                //         {
                //             boxLabel  : 'PJ',
                //             name      : 'flag_pj',
                //             inputValue: '1',
                //             id        : 'flag_pj'
                //         }, 
                //         {
                //             boxLabel  : 'PPh Partner',
                //             name      : 'flag_pph_partner',
                //             inputValue: '1',
                //             id        : 'flag_pph_partner'
                //         }, 
                //         {
                //             boxLabel  : 'PPh Owner',
                //             name      : 'flag_pph_owner',
                //             inputValue: '1',
                //             id        : 'flag_pph_owner'
                //         }, 
                //     ]
                // },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

