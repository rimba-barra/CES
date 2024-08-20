Ext.define('Hrd.view.absentrecord.FormCutiTambahan', {
    alias: 'widget.absentrecordformcutitambahan',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    requires: ['Hrd.template.ComboBoxFields', 'Hrd.view.absentrecord.GridEmployeeCutiTambahan'],
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'extraleave_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'proses'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'cancel'
                },
                // {
                //     xtype: 'fieldcontainer',
                //     layout: 'hbox',
                //     fieldLabel: 'Periode',
                //     defaults: {
                //         xtype: 'textfield',
                //         margin: '0 10 0 0'
                //     },
                //     items: [
                //         {
                //             xtype: 'combobox',
                //             name: 'periode',
                //             store: 'Trainingperiode',
                //             displayField: 'periode',
                //             valueField: 'periode',
                //         },
                //         {
                //             xtype: 'fieldcontainer',
                //             layout: 'vbox',
                //             fieldLabel: 'Expired',
                //             defaults: {
                //                 xtype: 'textfield',
                //                 margin: '0 10 0 0',
                //             },
                //             items: [
                //                 {
                //                     xtype: 'dfdatefield',
                //                     name: 'expired_date',
                //                     width: 180
                //                 },
                //                 {
                //                     xtype:'label',
                //                     itemId:'labelExpired',
                //                     text:'Expired akan mengikuti, jika Hak Cuti sudah diberikan',
                //                     style: 'color:grey;',
                //                     margin: '10 0 10 0',
                //                     width: 180
                //                 },
                //             ]
                //         },
                //     ]
                // },
                // {
                //     xtype: 'fieldcontainer',
                //     layout: 'hbox',
                //     fieldLabel: 'Leave Group',
                //     defaults: {
                //         xtype: 'textfield',
                //         margin: '0 10 0 0'
                //     },
                //     items: [
                //         {
                //             xtype: 'radiogroup',
                //             itemId: 'leaveGroupId',
                //             width: 160,
                //             layout: 'hbox',
                //             defaults: {
                //                 margin: '5 7 0 0'
                //             },
                //             items: [
                //                 {boxLabel: 'Yearly', name: 'leavegroup', inputValue: 1, checked: true},
                //                 {boxLabel: 'Big Leave', name: 'leavegroup', inputValue: 2},
                //             ]
                //         },
                //         {
                //             xtype: 'fieldcontainer',
                //             layout: 'vbox',
                //             fieldLabel: 'Leave Entitlements',
                //             defaults: {
                //                 xtype: 'textfield',
                //                 margin: '0 10 0 0',
                //             },
                //             items: [
                //                 {
                //                     xtype: 'textfield',
                //                     name: 'amount',
                //                     width: 180
                //                 },
                //                 {
                //                     xtype:'label',
                //                     itemId:'labelTitik',
                //                     text:'Gunakan titik [.] untuk desimal',
                //                     style: 'color:grey;',
                //                     margin: '10 0 10 0',
                //                     width: 180
                //                 },
                //             ]
                //         },
                //     ]
                // },
                
                // {
                //     xtype: 'combobox',
                //     fieldLabel: 'Periode',
                //     name: 'periode',
                //     store: 'Trainingperiode',
                //     width:300,
                //     displayField: 'periode',
                //     valueField: 'periode',
                // },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Periode',
                    maskRe: /[0-9]/,
                    name: 'periode',
                    enableKeyEvents: true,
                    width:300,

                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Leave Group',
                    // Arrange radio buttons into two columns, distributed vertically
                    itemId: 'leaveGroupId',
                    width: '100%',
                    layout: 'hbox',
                    defaults: {
                        margin: '5 7 0 0'
                    },
                    flex: 3,
                    items: [
                        {boxLabel: 'Yearly', name: 'leavegroup', inputValue: 1, checked: true},
                        {boxLabel: 'Big Leave', name: 'leavegroup', inputValue: 2},
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    fieldLabel: 'Expired',
                    defaults: {
                        xtype: 'textfield',
                        margin: '0 10 0 0',
                        width:191,
                    },
                    items: [
                        {
                            xtype: 'dfdatefield',
                            name: 'expired_date'
                        }
                    ]
                },
                {
                    xtype:'label',
                    itemId:'labelExpired',
                    text:'Jika Pemberian Hak Cuti sudah diberikan, expired ini akan mengikuti tanggal expired disana',
                    style: 'color:grey;',
                    margin: '0 0 20 0',
                },
                // {
                //     xtype:'textfield',
                //     name:'amount',
                //     width:300,
                //     fieldLabel:'Leave Entitlements',
                // },

                {
                    xtype: 'textfield',
                    fieldLabel: 'Leave Entitlements',
                    width: 300,
                    maskRe: /[0-9-.]/,
                    name: 'amount',
                    renderer: function(value, metadata, record) {
                        if (value === "") {
                            return 0;
                        } else {
                            return value;
                        }

                    }
                },

                {
                    xtype:'label',
                    itemId:'labelTitik',
                    text:'Gunakan titik [.] untuk nilai desimal',
                    style: 'color:grey;',
                    margin: '0 0 20 0',
                },

                {
                    xtype:'textareafield',
                    cols:10,
                    width:560,
                    fieldLabel:'Description',
                    name:'description'
                },
                {
                    xtype:'label',
                    itemId:'labelJumlah',
                    margin:'15px 5px 5px 5px',
                    text:'Jumlah karyawan terpilih: 0',
                },
                {
                    xtype: 'absentrecordemployeecutitambahangrid',
                    height: 200
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
                        // handler: function() {
                        //     this.up('window').close();
                        // }
                    },
                    {xtype:'tbfill'},
                    {
                        xtype: 'button',
                        action: 'view',
                        itemId: 'btnView',
                        padding: 5,
                        width: 75,
                        text: 'View Log',                       
                    },
                ]
            }
        ];
        return x;
    }
});