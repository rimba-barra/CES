Ext.define('Hrd.view.group.FormData', {
    alias: 'widget.groupformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: [],
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
                    name: 'group_id'
                },
                {
                    fieldLabel: 'Group Name',
                    name: 'group'
                },
                {
                    fieldLabel: 'Code',
                    name: 'code'
                },
                {
                    fieldLabel: 'Uang Makan',
                    name: 'uang_makan'
                },
                {
                    fieldLabel: 'Uang Makan Extra',
                    name: 'uang_makan_extra'
                },
                {
                    fieldLabel: 'Uang Transport',
                    name: 'uang_transport'
                },
                {
                    fieldLabel: 'Uang Hadir',
                    name: 'uang_hadir'
                },
                
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Lembur',
                    defaultType: 'radiofield',
                    defaults: {
                        margin: '0 10px 0 0'
                    },
                    layout: 'hbox',
                    items: [
                        {
                            boxLabel: 'Yes',
                            name: 'lembur',
                            
                            inputValue: '1'
                        }, {
                            boxLabel: 'No',
                            name: 'lembur',
                            checked: true,
                            inputValue: '0'
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Lambat',
                    defaultType: 'radiofield',
                    defaults: {
                        margin: '0 10px 0 0'
                    },
                    layout: 'hbox',
                    items: [
                        {
                            boxLabel: 'Yes',
                            name: 'lambat',
                            
                            inputValue: '1'
                        }, {
                            boxLabel: 'No',
                            name: 'lambat',
                            inputValue: '0',
                            checked: true
                        }
                    ]
                },
                {
                    fieldLabel: 'Denda Terlambat',
                    name: 'denda_terlambat'
                },
                {
                    fieldLabel: 'Uang Transport MOD',
                    name: 'uang_transport_mod'
                },
                {
                    fieldLabel: 'Uang Makan MOD',
                    name: 'uang_makan_mod'
                },
                {
                    fieldLabel: 'point',
                    name: 'point'
                },
                {
                    fieldLabel: 'Split Shift',
                    name: 'split_shift'
                }

            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});