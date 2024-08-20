Ext.define('Erems.view.purchaseletterNew.FormDataAddSchedule', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.purchaseletterNewformdataaddschedule',
    requires: ['Erems.library.template.view.MoneyField'],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 400,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {xtype: 'hiddenfield', name: 'purchaseletter_id'},
                {
                    xtype: 'dfdatefield',
                    name: 'help_tgl',
                    fieldLabel: 'Dari Tgl',
                    labelWidth: 50,
                    width: 150
                },
                {
                    xtype: 'combobox',
                    displayField: 'scheduletype',
                    valueField: 'scheduletype_id',
                    name: 'help_tipe',
                    labelWidth: 35,
                    fieldLabel: 'Type',

                    width: 110
                },
                {
                    xtype: 'textfield',
                    labelWidth: 70,
                    name: 'help_termin',
                    fieldLabel: 'Termin Mulai',

                    width: 100
                },
                {
                    xtype: 'xmoneyfield',
                    labelWidth: 50,
                    name: 'help_amount',
                    fieldLabel: 'Nilai Tagihan',

                    width: 150
                },
                {
                    xtype: 'textfield',
                    labelWidth: 20,
                    name: 'help_jml',
                    fieldLabel: 'Jumlah Row',

                    width: 50
                }
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
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Proses'
                    },

                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
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