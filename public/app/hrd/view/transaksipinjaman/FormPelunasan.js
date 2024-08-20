Ext.define('Hrd.view.transaksipinjaman.FormPelunasan', {
    alias: 'widget.transaksipinjamanpelunasanformdata',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    requires: ['Hrd.template.ComboBoxFields'],
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;
        var cbf = new Hrd.template.ComboBoxFields();
        Ext.applyIf(me, {
            items: [
                {
                   xtype:'hiddenfield',
                   name:'employee_id'
                },
                {
                   xtype:'hiddenfield',
                   name:'is_lunas'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Bulan',
                    name: 'month'
                },
                {
                    width: 100,
                    margin: '0 0 0 10',
                    items: [
                        {
                            xtype: 'radiogroup',
                            fieldLabel: '',
                            // Arrange radio buttons into two columns, distributed vertically

                            labelWidth: 1,
                            width: '100%',
                            layout: 'vbox',
                            defaults: {
                                margin: '0 7 0 0'
                            },
                            flex: 3,
                            items: [
                                {boxLabel: 'Per Karyawan', name: 'opsi', inputValue: "perkaryawan", checked: true},
                                {boxLabel: 'Seluruh Karyawan', name: 'opsi', inputValue: "all"},
                            ]
                        }

                    ]
                },
                {
                    xtype: 'checkbox',
                    name: 'update_payroll',
                    boxLabel: 'Update Payroll'
                }
            ],
            dockedItems: me.generateDockedItem()
        });
        me.callParent(arguments);
    },
    generateDockedItem: function() {
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
                        action: 'process',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Process'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function() {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    }
});