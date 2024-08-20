Ext.define('Cashier.view.voucher.FormDataCetakSlip', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.voucherformcetakslip',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    kosongGa: -1,
    height: 350,
    uniquename: '_vouchercetakslip',
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
                    name: 'slip_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kasbank_id',
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No Rek Customer',
                    name: 'norek_customer',
                    readOnly: false,
                    width: 300,
                    allowBlank: true,
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nama Customer',
                    name: 'nama_customer',
                    readOnly: false,
                    width: 300,
                    allowBlank: true,
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Alamat Customer',
                    name: 'alamat_customer',
                    readOnly: false,
                    width: 300,
                    allowBlank: true,
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No Rek Penyetor',
                    name: 'norek_penyetor',
                    readOnly: false,
                    width: 300,
                    allowBlank: true,
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nama Penyetor',
                    name: 'nama_penyetor',
                    readOnly: false,
                    width: 300,
                    allowBlank: true,
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Alamat Penyetor',
                    name: 'alamat_penyetor',
                    readOnly: false,
                    width: 300,
                    allowBlank: true,
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Telp Penyetor',
                    name: 'telp_penyetor',
                    readOnly: false,
                    width: 300,
                    allowBlank: true,
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Amount',
                    id:'csg_amount',
                    itemId:'csg_amount',
                    name: 'amount',
                    readOnly: false,
                    width: 300,
                    allowBlank: true,
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Mata Uang',
                    name: 'mata_uang',
                    readOnly: false,
                    width: 300,
                    allowBlank: true,
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nama Bank',
                    name: 'nama_bank',
                    readOnly: false,
                    width: 300,
                    allowBlank: true,
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nama yang dapat dihubungi',
                    name: 'nama_yang_dapat_dihubungi',
                    readOnly: false,
                    width: 300,
                    allowBlank: true,
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'save',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 75, iconCls: 'icon-save',
                        text: 'Simpan'
                    },
                    {
                        xtype: 'button',
                        action: 'close',
                        itemId: 'btnClose',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Close',
                        handler: function () {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    },
});

