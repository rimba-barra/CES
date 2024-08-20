Ext.define('Hrd.view.leavegiving.FormParamPh', {
    alias: 'widget.leavegivingformparamph',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.leavegiving.GridBandingPh','Hrd.view.leavegiving.GridBandingContractPh','Hrd.view.leavegiving.GridHoliday','Hrd.view.leavegiving.GridBandingPhSpecial','Hrd.view.leavegiving.GridBandingContractPhSpecial'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    height: 610,
    initComponent: function() {
        var me = this;





        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'parametercutiph_id'
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Ada Cuti Public Holiday?',
                    // Arrange radio buttons into two columns, distributed vertically
                    itemId: 'opsiParamPhId',
                    width: '100%',
                    layout: 'hbox',
                    defaults: {
                        margin: '0 7 0 0'
                    },
                    flex: 3,
                    items: [
                        {boxLabel: 'Tidak', name: 'opsiparamph', inputValue: 1, checked: true},
                        {boxLabel: 'Ya, ada', name: 'opsiparamph', inputValue: 2},
                    ]
                },
                {
                    xtype: 'leavegivingholidaygrid',
                    height: 200,
                    margin: '10 0 10 0',
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Terbit berdasarkan',
                    name: 'parametercutiph_terbit_id',
                    width:400,
                    displayField: 'parametercutiph_terbit',
                    valueField: 'parametercutiph_terbit_id',
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Expired berdasarkan',
                    name: 'parametercutiph_expired_id',
                    width:400,
                    displayField: 'parametercutiph_expired',
                    valueField: 'parametercutiph_expired_id',
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
                            fieldLabel: 'Expired sampai',
                            maskRe: /[0-9]/,
                            name: 'expired_sampai_ph',
                            margin: '0 20 0 0',
                            width: 200
                        },
                        {
                            xtype:'label',
                            itemId:'labelExpiredPh',
                            text:'(dalam satuan hari)',
                        }
                    ]
                },
                {
                    xtype:'label',
                    itemId:'labelKomaPh',
                    text:'*Jika total cuti yang dimasukan koma, silahkan menggunakan titik (contoh: 1.5/2.5)',
                    style: 'color:grey;',
                    margin: '5 0 10 0',
                },
                {
                    xtype: 'tabpanel',
                    itemId: 'tabPhID',
                    width: '100%',
                    activeTab: 0, // index or id
                    items: [
                        
                        {
                            title: 'Permanent',
                            itemId: 'PermanentPhTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'leavegivingbandingphgrid',
                                    height: 200,
                                    width: '100%',
                                    // style: 'padding: 10 0 10 0'

                                },
                            ]
                        },

                        {
                            title: 'Contract',
                            itemId: 'ContractPhTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'leavegivingbandingcontractphgrid',
                                    height: 200,
                                    width: '100%',
                                    // style: 'padding: 10 0 10 0'

                                },
                            ]
                        },
                        
                    ]
                },
                {
                    xtype:'label',
                    itemId:'labelSpecial',
                    text:'*Special Case (optional)',
                    style: 'color:black;',
                    margin: '15 0 10 0',
                },
                {
                    xtype: 'tabpanel',
                    itemId: 'tabPhSpecialID',
                    width: '100%',
                    activeTab: 0, // index or id
                    items: [
                        
                        {
                            title: 'Permanent',
                            itemId: 'PermanentPhSpecialTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'leavegivingbandingphspecialgrid',
                                    height: 200,
                                    width: '100%',
                                    // style: 'padding: 10 0 10 0'

                                },
                            ]
                        },

                        {
                            title: 'Contract',
                            itemId: 'ContractPhSpecialTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'leavegivingbandingcontractphspecialgrid',
                                    height: 200,
                                    width: '100%',
                                    // style: 'padding: 10 0 10 0'

                                },
                            ]
                        },
                        
                    ]
                },

                {
                    xtype: 'checkboxfield',
                    // fieldLabel: 'Mod',
                    itemId: 'fd_is_sama_ph',
                    name: 'is_sama_ph',
                    boxLabel: 'Permanent & Contract sama',
                    padding: '0 0 0 0',
                    margin: '10 0 0 0',
                    boxLabelCls: 'x-form-cb-label small',
                    inputValue: '1',
                    uncheckedValue: '0',
                    flex: 2,
                    checked: false
                }, 

            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});