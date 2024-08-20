Ext.define('Erems.view.purchaseletter.RescheduleFormData', {
    extend: 'Erems.library.template.view.FormData',
    requires: ['Erems.view.purchaseletter.RescheduleMainGrid',
        'Erems.library.template.component.Tanggalvalidasicombobox'
    ],
    alias: 'widget.purchaseletterrschformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 600,
    bodyBorder: true,
    editedRow: -1,
    bodyStyle: 'padding:5px 5px 0',
    initComponent: function () {
        var me = this;


        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'reschedule_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'harga_total_jual'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Tanggal Serah Terima',
                    name: 'rencanaserahterima_date',
                    value: new Date(),
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d H:i:s.u',
                    flex: 1
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Rencana serah terima',
                            enableKeyEvents: true,
                            name: 'rencanaserahterima_month'
                        },
                        {
                            xtype: 'label',
                            text: ' - Bulan setelah SPPJB'
                        }
                    ]
                },
                {
                    xtype      : 'xnotefieldEST',
                    fieldLabel : 'Alasan',
                    name       : 'reason'
                },
                {
                    xtype: 'tanggalvalidasicombobox',
                    name: 'tanggal_validasi',
                    maskRe: /[0-9]/,
                    hidden: true
                    // anchor: '-15'
                },
                {
                    xtype: 'purchaseletterreschmaingrid',
                    height: 250
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '[Balance Value]',
                    name: 'balance_value',
                    labelWidth: 100,
                    readOnly: true,
                    width: 300
                },
                {
                    xtype: 'label',
                    text: '[NB : Pastikan nilai kolom [Balance Value] bernilai 0 sebelum di save. Klik pada kolom "amount" pada baris tagihan terakhir untuk mengnolkan nilai [Balance Value].]'
                }],
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
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function () {
                            this.up('window').close();
                        }
                    }

                ]
            }
        ];
        return x;
    }
});