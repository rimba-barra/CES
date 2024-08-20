Ext.define('Hrd.view.absentrecord.FormInvalidabsent', {
    alias: 'widget.absentrecordforminvalidabsent',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    requires: ['Hrd.view.absentrecord.GridEmployeeIA'],
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'absentdetail_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'employee_employee_id'
                },
                {
                    xtype: 'fieldset',
                    title: 'Filter',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'dfdatefield',
                            name: 'start_date',
                            value: new Date(),
                            fieldLabel: 'Tgl : ',
                            labelWidth: 40,
                            flex: 1,
                        },
                        {
                            xtype: 'dfdatefield',
                            name: 'end_date',
                            value: new Date(),
                            fieldLabel: 'S/D : ',
                            labelWidth: 30,
                            margin: '0 10px 5px 10px',
                            flex: 1,
                        },
                        {
                            xtype: 'button',
                            action: 'cari',
                            text: 'SEARCH',
                            width: 100
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Daftar Karyawan',
                    //layout: 'vbox',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            width:'100%',
                            margin:'0 0 10px 0',
                            items: [
                                {
                                    xtype: 'checkbox',
                                    name: 'select_all',
                                    inputValue: '1',
                                    boxLabel: 'Pilih Semua',
                                    flex: 1
                                },
                                {
                                    xtype: 'combobox',
                                    flex: 1,
                                    editable: false,
                                    multiSelect: true,
                                    queryMode: 'local',
                                    fieldLabel: 'Departemen',
                                    name: 'department_id',
                                    displayField: 'code',
                                    valueField: 'department_id',
                                }
                            ]
                        },
                        {
                            xtype: 'absentrecordemployeeiagrid',
                            layout:'fit',
                            height: 300
                        }
                    ]
                },
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
                        action: 'send_mail',
                        padding: 5,
                        width: 100,
                        iconCls: 'icon-save',
                        text: 'Send Mail'
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