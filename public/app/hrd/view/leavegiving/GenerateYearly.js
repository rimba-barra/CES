Ext.define('Hrd.view.leavegiving.GenerateYearly', {
    alias: 'widget.leavegivingyearlyformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: [],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    height: 270,
    initComponent: function() {
        var me = this;





        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
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
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '5 0',
                    defaults: {
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: 'Periode',
                            maskRe: /[0-9]/,
                            name: 'start_use',
                            margin: '0 20 0 0',
                            width: 200
                        }, {
                            fieldLabel: 'Hak Cuti',
                            //maskRe: /[0-9]/,
                            name: 'amount',
                            margin: '0 20 0 0',
                            width: 200
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '5 0',
                    items: [{
                            xtype: 'checkbox',
                            boxLabel: 'Berdasarkan Tanggal Masuk',
                            name: 'base_hire_date',
                            margin: '5 30 5 0'
                        }, {
                            xtype: 'datefield',
                            fieldLabel: '',
                            name: 'hire_date',
                            readOnly: true,
                            labelWidth: 50
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Kadaluarsa',
                            name: 'expired_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            //readOnly: true
                        },
                        {
                            margin:'0 0 10px 10px',
                            xtype: 'checkbox',
                            name: 'akumulasi',
                            inputValue: '1',
                            checked:true,
                            hidden:true,
                            boxLabel: 'Akumulasi Sisa Cuti'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Extension',
                            name: 'extension_date',
                            format: 'd-m-Y',
                            
                            submitFormat: 'Y-m-d',
                            //readOnly: true
                        },
                        {
                            margin:'0 0 0 10px',
                            xtype: 'checkbox',
                            name: 'proportional',
                            inputValue: '1',
                            checked:true,
                            boxLabel: 'Cuti proporsional'
                        }
                    ]
                }

            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});