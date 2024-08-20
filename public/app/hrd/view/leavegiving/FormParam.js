Ext.define('Hrd.view.leavegiving.FormParam', {
    alias: 'widget.leavegivingformparam',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.leavegiving.GridBanding','Hrd.view.leavegiving.GridBandingContract'],
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
                    name: 'parametercuti_id'
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Opsi Parameter',
                    // Arrange radio buttons into two columns, distributed vertically
                    itemId: 'opsiParamId',
                    width: '100%',
                    layout: 'hbox',
                    defaults: {
                        margin: '0 7 0 0'
                    },
                    flex: 3,
                    items: [
                        {boxLabel: 'Group Policy', name: 'opsiparam', inputValue: 1, checked: true},
                        {boxLabel: 'Custom by Banding', name: 'opsiparam', inputValue: 2},
                    ]
                },
                // {
                //     xtype: 'radiogroup',
                //     fieldLabel: 'Terbit berdasarkan',
                //     // Arrange radio buttons into two columns, distributed vertically
                //     itemId: 'terbitId',
                //     width: '100%',
                //     layout: 'hbox',
                //     defaults: {
                //         margin: '0 7 0 0'
                //     },
                //     flex: 3,
                //     items: [
                //         {boxLabel: 'Per Bulan (setiap tanggal 1)', name: 'opsiterbit', inputValue: 1, checked: true},
                //         {boxLabel: 'Per Tahun (setiap 1 Januari)', name: 'opsiterbit', inputValue: 2},
                //         {boxLabel: 'Anniversary (setiap Hire Date)', name: 'opsiterbit', inputValue: 3},
                //     ]
                // },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Terbit berdasarkan',
                    name: 'parametercuti_terbit_id',
                    width:400,
                    displayField: 'parametercuti_terbit',
                    valueField: 'parametercuti_terbit_id',
                },
                // {
                //     xtype: 'radiogroup',
                //     fieldLabel: 'Expired berdasarkan',
                //     // Arrange radio buttons into two columns, distributed vertically
                //     itemId: 'expiredId',
                //     width: '100%',
                //     layout: 'hbox',
                //     defaults: {
                //         margin: '0 7 0 0'
                //     },
                //     flex: 3,
                //     items: [
                //         {boxLabel: 'Tahun Kalendar (start dari 1 Januari)', name: 'opsiexpired', inputValue: 1, checked: true},
                //         {boxLabel: 'Anniversary (start dari Hire Date)', name: 'opsiexpired', inputValue: 2},
                //     ]
                // },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Expired berdasarkan',
                    name: 'parametercuti_expired_id',
                    width:400,
                    displayField: 'parametercuti_expired',
                    valueField: 'parametercuti_expired_id',
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
                            name: 'expired_sampai',
                            margin: '0 20 0 0',
                            width: 200
                        },
                        {
                            xtype:'label',
                            itemId:'labelExpired',
                            text:'(dalam satuan bulan)',
                        }
                    ]
                },
                // {
                //     xtype: 'leavegivingbandinggrid',
                //     height: 200
                // },
                {
                    xtype:'label',
                    itemId:'labelTerbit',
                    text:'*Silahkan masukan kolom dibawah sesuai pilihan anda diatas.',
                    style: 'color:grey;',
                    margin: '10 0 0 0',
                },
                {
                    xtype:'label',
                    itemId:'labelTerbitCth',
                    text:'(contoh: jika 1 tahun = 12 cuti, maka 1 bulan = 1 cuti)',
                    style: 'color:grey;',
                    margin: '0 0 0 10',
                },
                {
                    xtype:'label',
                    itemId:'labelTerbitBulan',
                    text:'- Jika Per Bulan maka masukan setiap bulannya (contoh: 1 cuti)',
                    style: 'color:grey;',
                    margin: '10 0 0 0',
                },
                {
                    xtype:'label',
                    itemId:'labelTerbitTahun',
                    text:'- Jika Per Tahun/Anniversary maka langsung masukan totalnya (contoh: 12 cuti)',
                    style: 'color:grey;',
                    margin: '0 0 5 0',
                },
                {
                    xtype:'label',
                    itemId:'labelKoma',
                    text:'*Jika total cuti yang dimasukan koma, silahkan menggunakan titik (contoh: 1.5/2.5)',
                    style: 'color:grey;',
                    margin: '5 0 10 0',
                },
                {
                    xtype: 'tabpanel',
                    itemId: 'tabID',
                    width: '100%',
                    activeTab: 0, // index or id
                    items: [
                        
                        {
                            title: 'Permanent',
                            itemId: 'PermanentTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'leavegivingbandinggrid',
                                    height: 200,
                                    width: '100%',
                                    // style: 'padding: 10 0 10 0'

                                },
                            ]
                        },

                        {
                            title: 'Contract',
                            itemId: 'ContractTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'leavegivingbandingcontractgrid',
                                    height: 200,
                                    width: '100%',
                                    // style: 'padding: 10 0 10 0'

                                },
                            ]
                        },
                        
                    ]
                },
                // {
                //     xtype: 'checkbox',
                //     boxLabel: 'Permanent & Contract sama',
                //     fieldLabel:'&nbsp;',
                //     name: 'is_sama',
                //     uncheckedValue: '0',
                //     inputValue: '1'
                // },
                {
                    xtype: 'checkboxfield',
                    // fieldLabel: 'Mod',
                    itemId: 'fd_is_sama',
                    name: 'is_sama',
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