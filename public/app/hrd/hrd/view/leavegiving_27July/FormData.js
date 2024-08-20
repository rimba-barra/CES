Ext.define('Hrd.view.leavegiving.FormData', {
    alias: 'widget.leavegivingformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.ComboBoxFields', 'Hrd.view.leavegiving.GridLeave'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},

    initComponent: function() {
        var me = this;





        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'leaveentitlements_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'employee_id'
                }
                , {
                    fieldLabel: 'NIK',
                    name: 'employee_nik',
                    readOnly: true
                },
                {
                    fieldLabel: 'Nama Karyawan',
                    name: 'employee_name',
                    readOnly: true,
                    width: 400
                },
                {
                    xtype:'datefield',
                    fieldLabel: 'Tanggal Masuk',
                    name: 'hire_date',
                    format:'d-m-Y',
                    readOnly: true
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Jenis Cuti',
                    // Arrange radio buttons into two columns, distributed vertically
                    itemId: 'leaveGroupId',
                 
                    width: '100%',
                    layout: 'hbox',
                    defaults: {
                        margin: '0 7 0 0'
                    },
                    flex: 3,
                    items: [
                        {boxLabel: 'Tahunan', name: 'leavegroup', inputValue: 1, checked: true},
                        {boxLabel: 'Besar', name: 'leavegroup', inputValue: 2},
                    ]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '5 0',
                    defaults: {
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: 'Periode pakai',
                            maskRe: /[0-9]/,
                            name: 'start_use'

                        }, {
                            xtype: 'label',
                            text: 's/d',
                            margin: '0 10'
                        }, {
                            name: 'end_use',
                            maskRe: /[0-9]/
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    fieldLabel: 'Hak cuti',
                    width: '100%',
                    defaults: {
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            name: 'amount',
                            maskRe: /[0-9-]/,
                            width: 100
                        },
                        {
                            fieldLabel: 'Sisa cuti',
                            labelWidth: 50,
                            width: 100,
                            maskRe: /[0-9-]/,
                            margin: '0 0 0 10',
                            name: 'rest'
                        },
                        {
                            xtype: 'label',
                            text: '',
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    fieldLabel: 'Kadaluarsa',
                    defaults: {
                        xtype: 'textfield',
                        margin: '0 10 0 0'
                    },
                    items: [
                        {
                            xtype: 'dfdatefield',
                            name: 'expired_date'
                        },
                        {
                            xtype: 'checkbox',
                            boxLabel: 'Habis cuti',
                            inputValue: 1,
                            name: 'is_leave_end'
                        }
                    ]
                },
                {
                    fieldLabel: 'Perpanjangan',
                    xtype: 'dfdatefield',
                    name: 'extension_date'
                },
                {
                    xtype: 'textareafield',
                    name: 'extension_note',
                    width: 450,
                    height: 70,
                    fieldLabel: 'Alasan perpanjangan'
                },
                {
                    xtype:'leavegivingleavegrid',
                    height:200
                }
                
            ],
            dockedItems: []
        });

        me.callParent(arguments);
    }
});