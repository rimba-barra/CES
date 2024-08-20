Ext.define('Hrd.view.absentrecord.FormReason', {
    alias: 'widget.absentrecordformreason',
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
                  name:'employee_employee_id'
                },
                {
                    xtype: 'checkbox',
                    boxLabel: 'Pengambilan cuti',
                    name: 'is_cuti',
                    inputValue: '1',
                    flex: 1
                },
                {
                    xtype: 'combobox',
                    name: 'absenttype_absenttype_id',
                    fieldLabel: 'Alasan Tidak Hadir',
                    displayField: cbf.absenttype.d,
                    valueField: cbf.absenttype.v,
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'datefield',
                        labelWidth: 50,
                        format: 'd/m/Y',
                        submitFormat: 'Y-m-d',
                        flex: 1
                    },
                    items: [
                        {
                            fieldLabel: 'Tanggal',
                            name: 'start_date',
                            value: new Date()
                        },
                        {
                            fieldLabel: 's/d',
                            name: 'end_date',
                            labelWidth: 20,
                            margin: '0 0 0 20px',
                            value: new Date()
                        }
                    ]

                },
                {
                    xtype: 'checkbox',
                    boxLabel: '1/2 Hari',
                    name: 'is_halfday',
                    inputValue: '1',
                    flex: 1
                },
                {
                    xtype: 'textareafield',
                    name: 'note',
                    width: '100%',
                    fieldLabel: 'Untuk keperluan'
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