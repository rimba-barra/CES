Ext.define('Cashier.view.voucher.FormDataEstimasiDenda', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.voucherformestimasidenda',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    kosongGa: -1,
    height: 350,
    uniquename: '_voucherestimasidenda',
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
                    name: 'ed_unit_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'ed_schedule_id',
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Schedule',
                    name: 'ed_schedule_description',
                    readOnly: true,
                    width: 300,
                    allowBlank: true,
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Due Date',
                    name: 'ed_due_date',
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    width: 300,
                    emptyText: 'Due Date',
                    readOnly: true,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    id: 'formdataestimasidendadue_date',
                    itemId: 'formdataestimasidendadue_date',
                    hideTrigger: false,
                    onDownArrow: Ext.emptyFn,
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Estimasi Tanggal Realisasi',
                    name: 'ed_realization_date',
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    width: 300,
                    emptyText: 'Estimasi Tanggal Realisasi',
                    readOnly: false,
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    id: 'formdataestimasidendarealization_date',
                    itemId: 'formdataestimasidendarealization_date',
                    hideTrigger: false,
                    onDownArrow: Ext.emptyFn,
                    listeners: {
                        render: function () {
                            var picker = this.getPicker();
                            picker.on("select", function () {
                                this.hide();
                            });
                            //  this.triggerCell.hide();
                            this.inputCell.on("click", function () {
                                if (picker.hidden)
                                    picker.show();
                                else
                                    picker.hide();
                            });
                        }
                    }
                },
                {
                    xtype: 'xmoneyfield',
                    name: 'ed_estimasi_payment',
                    fieldLabel: 'Estimasi Payment',
                    itemId: 'ed_estimasi_payment',
                    id: 'ed_estimasi_payment',
                    width: '100',
                    readOnly: false,
                    allowBlank: false,
                    fieldStyle: 'text-align:right;align:right;background-color:#ffffff;background-image: none;',
                },
                {
                    xtype: 'xmoneyfield',
                    name: 'ed_amount_payment',
                    fieldLabel: 'Remaining Balance',
                    itemId: 'ed_amount_payment',
                    id: 'ed_amount_payment',
                    width: '100',
                    readOnly: false,
                    allowBlank: false,
                    fieldStyle: 'text-align:right;align:right;background-color:#ffffff;background-image: none;',
                },
                {
                    xtype: 'xmoneyfield',
                    name: 'ed_current_denda',
                    fieldLabel: 'Denda Belum Dibayarkan',
                    itemId: 'ed_current_denda',
                    id: 'ed_current_denda',
                    width: '100',
                    readOnly: true,
                    allowBlank: true,
                    fieldStyle: 'text-align:right;align:right;background-color:#eee;background-image: none;',
                },
                {
                    xtype: 'xmoneyfield',
                    name: 'ed_denda',
                    itemId: 'ed_denda',
                    id: 'ed_denda',
                    fieldLabel: 'Estimasi Denda Baru',
                    width: '100',
                    readOnly: true,
                    allowBlank: true,
                    fieldStyle: 'text-align:right;align:right;background-color:#eee;background-image: none;',
                },
                {
                    xtype: 'xmoneyfield',
                    name: 'ed_toleransi_denda',
                    itemId: 'ed_toleransi_denda',
                    id: 'ed_toleransi_denda',
                    fieldLabel: 'Toleransi Denda',
                    width: '100',
                    readOnly: true,
                    allowBlank: true,
                    fieldStyle: 'text-align:right;align:right;background-color:#eee;background-image: none;',
                },
                {
                    xtype: 'xmoneyfield',
                    name: 'ed_total_denda',
                    itemId: 'ed_total_denda',
                    id: 'ed_total_denda',
                    fieldLabel: 'Total Denda',
                    width: '100',
                    readOnly: true,
                    allowBlank: true,
                    fieldStyle: 'text-align:right;align:right;background-color:#eee;background-image: none;',
                },
                {
                    xtype: 'xmoneyfield',
                    name: 'ed_angsuran_min_denda',
                    itemId: 'ed_angsuran_min_denda',
                    id: 'ed_angsuran_min_denda',
                    fieldLabel: 'Payment - Denda',
                    width: '100',
                    readOnly: true,
                    allowBlank: true,
                    fieldStyle: 'text-align:right;align:right;background-color:#eee;background-image: none;',
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
                        text: 'Hitung'
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

