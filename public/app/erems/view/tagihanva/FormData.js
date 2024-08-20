Ext.define('Erems.view.tagihanva.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.tagihanvaformdata',
    requires:[
        'Erems.library.template.component.Clustercombobox',
    ],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
	width: 400,
	// height: 400,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;

        var bankStore = Ext.create('Ext.data.Store', {
            fields: ['bankID', 'name'],
            data: [{
                "bankID": "BCA",
                "name": "BCA"
            }, {
                "bankID": "BNI",
                "name": "BNI"
            }, 
            //added by anas 24082021
            {
                "bankID": "Mandiri",
                "name": "Mandiri"
            }, {
                "bankID": "Permata",
                "name": "Permata"
            }]
        });

        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            itemId: 'cb_bank_va',
                            fieldLabel: 'Bank VA',
                            name: 'cb_bank_va',
                            allowBlank: false,
                            queryMode:'local',
                            displayField: 'name',
                            valueField: 'bankID',
                            store: bankStore,
                            //added by anas 26082021
                            listeners: {
                                // change: function () {
                                //     var txt = me.down('[name=cb_bank_va]');
                                //     me.down('[name=periode_cut_off]').setVisible(false);

                                //     if(txt.getValue() == "Mandiri" || txt.getValue() == "Permata")
                                //     {
                                //         me.down('[name=periode_cut_off]').setVisible(true);

                                //         var periode = new Date();
                                //         periode.setMonth(periode.getMonth() + 1);
                                //         me.down('[name=periode_cut_off]').setValue(periode);

                                //     }
                                // },
                                beforequery: function(record){
                                    record.query = new RegExp(record.query, 'i');
                                    record.forceAll = true;
                                }
                            }

                        },
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
                            xtype: 'datefield',
                            itemId: 'fdms_periode_cut_off',
                            name: 'periode_cut_off',
                            fieldLabel: 'Periode Cut Off',
                            labelSeparator: '',
                            format: 'd M Y',
                            altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                            submitFormat: 'Y-m-d H:i:s.u',
                            // value: new Date(),
                            // listeners:{
                            //     'beforerender':function(el){
                            //         var newDate = new Date(2022, 2, 31, 0, 0, 0);
                            //         el.setValue(newDate);
                            //     }
                            // }
                            //added by anas 26082021
                            // hidden: true,

                        },
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
                            xtype: 'clustercombobox',
                            itemId: 'fs_cluster_id',
                            name: 'cluster_id',
                            anchor: '-15'

                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'cbf_cluster',
                            inputValue: '1',
                            uncheckedValue: '0',
                            checked: true,
                            margin: '0 5px 0 0',
                            width: 20
                        },
                        {
                            xtype: 'label',
                            text: 'ALL'
                        }
                    ]
                }
            ]

        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var dockedItems = [
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
                        action: 'download',          
                        padding: 5,
                        width: 100,
                        iconCls: 'icon-excel',
                        text: 'Download',
                        itemId: 'downloadBtn'
                    },

                    // added by rico 16062022
                    {
                        xtype: 'button',
                        action: 'download',
                        padding: 5,
                        width: 100,
                        iconCls: 'icon-excel',
                        text: 'Customer',
                        itemId: 'customerBtn',
                        hidden: true
                    },
                    {
                        xtype: 'button',
                        action: 'download',
                        padding: 5,
                        width: 100,
                        iconCls: 'icon-excel',
                        text: 'Tagihan',
                        itemId: 'tagihanBtn',
                        hidden: true
                    },
                ]
            }
        ];
        return dockedItems;
    }
});

