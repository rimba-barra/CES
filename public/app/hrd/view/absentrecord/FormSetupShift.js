Ext.define('Hrd.view.absentrecord.FormSetupShift', {
    alias: 'widget.absentrecordformsetupshift',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.combobox.ShiftType'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;
        var c = 38;
        var cb = [];
        for (var i = 1; i <= c; i++) {
            var day = 0;
            if(i > 7){
                day = i-7;
                cb.push({boxLabel: day, name: 'day_' + day, inputValue: day});
            }else{
                day = 100+i;
                cb.push({boxLabel: '&nbsp', name: 'day_' + day, inputValue: day});
            }
            
        }
        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'department_id'
                },
                {
                    xtype: 'fieldset',
                    title: 'Tools',
                    layout: 'hbox',
                    defaults:{
                        margin:'5px 10px 5px 5px'
                    },
                    items: [
                        {
                            xtype: 'button',
                            action: 'genholiday',
                            text: 'Generate from Holiday'
                        },
                        {
                            xtype: 'button',
                            action: 'shiftexcel',
                            
                            text: 'Import from Excel'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Format Baru',
                    layout: 'vbox',
                    /* defaults: {
                     xtype: 'textfield',
                     readOnly: true,
                     margin:'0 10 0 0',
                     },
                     */
                    defaults: {
                        xtype: 'container',
                        layout: 'hbox',
                 
                        defaults: {
                            xtype: 'textfield',
                            readOnly: true,
                            margin: '0 10 0 0',
                        }

                    },
                    items: [
                        {
                            margin: '10 0 10 0',
                            defaults: {
                                xtype: 'radiofield',
                              //  name: 'pilihan_target',
                                margin: '0 10 0 0',
                            },
                            items: [
                                {
                                    boxLabel: 'Karyawan',
                                    checked: true,
                                    name: 'pilihan_target',
                                    
                                    inputValue: 'employee'
                                }, {
                                    boxLabel: 'Departemen',
                                    name: 'pilihan_target',
                                    inputValue: 'division'
                                },
                                {
                                    boxLabel: 'Kelompok',
                                    name: 'pilihan_target',
                                    inputValue: 'kelompok'
                                },
                                {
                                    boxLabel: 'All',
                                    name: 'pilihan_target',
                                    inputValue: 'all'
                                },
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: '',
                                    xtype: 'cbshifttype',
                                    name: 'shifttype_id',
                                    readOnly: false
                                },
                                {
                                    name: 'in_time',
                                },
                                {
                                    xtype: 'label',
                                    text: 's/d'
                                },
                                {
                                    name: 'out_time'
                                }
                            ]
                        },
                    ]
                },
                {
                    xtype: 'checkboxgroup',
                 //   fieldLabel: '',
                    // Arrange checkboxes into two columns, distributed vertically
                    width:400,
                    columns: 6,
                    vertical: true,
                    items: cb
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
                        action: 'save',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        action: 'clear_selection',
                        padding: 5,
                        width: 100,
                        iconCls: 'icon-delete',
                        text: 'Hapus Pilihan'
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
    },
});