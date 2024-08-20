Ext.define('Hrd.view.perjalanandinas.FormDataDetail', {
    alias: 'widget.perjalanandinasformdatadetail',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.library.template.view.MoneyField'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    height: 400,
    initComponent: function() {
        var me = this;





        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'perjalanandinas_detail_id'
                },
                {
                    xtype: 'combobox',
                     displayField: 'code',
                            valueField: 'group_id',
                             name: 'group_group_id',
                    fieldLabel: 'Golongan'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'combobox',
                             displayField: 'negaratujuan',
                            valueField: 'negaratujuan_id',
                            name: 'negaratujuan_negaratujuan_id',
                            margin:'0 10px 10px 0 ',
                            fieldLabel: 'Negara Tujuan'
                        },
                        {
                            xtype:'checkbox',
                            boxLabel:'Generate All'
                        }
                    ]

                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Currency'
                },
                {
                    
                    fieldLabel: 'Standart Hotel',
                    name:'description'
                },
                {
                  
                    fieldLabel: 'Harga Hotel',
                    xtype:'xmoneyfield',
                    name:'uanghotel'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin:'0 0 10px 0',
                    items: [
                        {
                           xtype:'label',
                           margin:'0 40px 0 0',
                           text:'Perjalanan Umum'
                        },
                        {
                            xtype: 'label',
                            margin:'0 120px 0 0',
                            text:'<= 1 bulan'
                        },
                        {
                            xtype: 'label',
                            text:'> 1 bulan'
                        },
                    ]

                },
                {
                    xtype: 'container',
                    margin:'0 0 5px 0',
                    layout: 'hbox',
                    items: [
                        {
                           xtype:'xmoneyfield',
                           name:'uangmakan_pu_1m',
                           margin:'0 10px 0 0',
                           fieldLabel:'Uang Makan'
                        },
                        {
                           xtype:'xmoneyfield',
                           name:'uangmakan_pu_xm',
                           fieldLabel:''
                        },
                    ]

                },
                {
                    xtype: 'container',
                    margin:'0 0 5px 0',
                    layout: 'hbox',
                    items: [
                        {
                           xtype:'xmoneyfield',
                           name:'uangsaku_pu_1m',
                           margin:'0 10px 0 0',
                           fieldLabel:'Uang Saku'
                        },
                        {
                           xtype:'xmoneyfield',
                           name:'uangsaku_pu_xm',
                           fieldLabel:''
                        },
                    ]

                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin:'0 0 10px 0',
                    items: [
                        {
                           xtype:'label',
                           margin:'0 40px 0 0',
                           text:'Perjalanan Project'
                        },
                        {
                            xtype: 'label',
                            margin:'0 120px 0 0',
                            text:'<= 1 bulan'
                        },
                        {
                            xtype: 'label',
                            text:'> 1 bulan'
                        },
                    ]

                },
                {
                    xtype: 'container',
                    margin:'0 0 5px 0',
                    layout: 'hbox',
                    items: [
                        {
                           xtype:'xmoneyfield',
                           name:'uangmakan_pp_1m',
                           margin:'0 10px 0 0',
                           fieldLabel:'Uang Makan'
                        },
                        {
                           xtype:'xmoneyfield',
                           name:'uangmakan_pp_xm',
                           fieldLabel:''
                        },
                    ]

                },
                {
                    xtype: 'container',
                    margin:'0 0 5px 0',
                    layout: 'hbox',
                    items: [
                        {
                           xtype:'xmoneyfield',
                           name:'uangsaku_pp_1m',
                           margin:'0 10px 0 0',
                           fieldLabel:'Uang Saku'
                        },
                        {
                           xtype:'xmoneyfield',
                           name:'uangsaku_pp_xm',
                           fieldLabel:''
                        },
                    ]

                },

            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});