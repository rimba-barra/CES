Ext.define('Hrd.view.overtimevariables.Panel', {
    extend: 'Ext.form.Panel',
    requires: [],
    alias: 'widget.overtimevariablespanel',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            autoScroll: true,
            bodyStyle:'background:none;border:0;background-color:#D6E3F2;',
            dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                            xtype: 'button',
                            action:'save',
                            text: 'SAVE'
                        }]
                }],
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'padding:5px 5px 0;background:none',
                    width: 570,
                    border:0,
                    /* General Information*/

                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '10 0',
                            
                            defaults: {
                                xtype: 'fieldset',
                                flex: 1,
                                margin: '0 2',
                                defaults: {
                                    xtype: 'textfield'
                                }
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'vbox',
                                    defaults: {
                                        xtype: 'fieldset',
                                        
                                        flex: 1,
                                        margin: '0 2',
                                        width: '100%',
                                        defaults: {
                                            xtype: 'textfield'
                                        }
                                    },
                                    items: [
                                        {
                                            title: 'Hari Biasa',
                                            style:'background-color:white;',
                                            defaults: {
                                                xtype: 'textfield',
                                                margin: '0 0 10 0',
                                                width: 170
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    width: '100%',
                                                    items: [
                                                        {
                                                            
                                                            fieldLabel: 'Setelah',
                                                            xtype:'textfield',
                                                            enableKeyEvents:true,
                                                          //  maskRe:'/([01]?[0-9]|2[0-3]):[0-5][0-9]/',
                                                            name:'general_day_after',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'hh : mm',
                                                            margin: '0 0 0 10',
                                                            width: 50
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    width: '100%',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Penambah',
                                                            name:'general_day_enhancer',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'menit',
                                                            margin: '0 0 0 10',
                                                            width: 50
                                                        }
                                                    ]
                                                },
                                                {
                                                    fieldLabel: 'Faktor 1',
                                                    name:'general_day_factor_1'
                                                },
                                                {
                                                    fieldLabel: 'Faktor 2',
                                                    name:'general_day_factor_2'
                                                },
                                                {
                                                    fieldLabel: 'Faktor Pagi',
                                                    name:'general_day_factor_morning'
                                                }
                                            ]
                                        },
                                        {
                                            title: 'Terlambat [Menit]',
                                            style:'background-color:white;',
                                            defaults: {
                                                margin: '5 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'timefield',
                                                            format:'i',
                                                            name:'late_category_1_start',
                                                            fieldLabel: 'Kategori I',
                                                            labelWidth: 70,
                                                            flex: 5
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            fieldLabel: ' s/d ',
                                                            name:'late_category_1_end',
                                                            labelWidth: 20,
                                                            margin: '0 0 0 10',
                                                            flex: 3
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Kategori II',
                                                            name:'late_category_2_start',
                                                            labelWidth: 70,
                                                            flex: 5
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            fieldLabel: ' s/d ',
                                                            name:'late_category_2_end',
                                                            labelWidth: 20,
                                                            margin: '0 0 0 10',
                                                            flex: 3
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Kategori III',
                                                    name:'late_category_3',
                                                    width: 140,
                                                    labelWidth: 70,
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    title: 'Hari Libur',
                                    style:'background-color:white;',
                                    height: '100%',
                                    defaults: {
                                        margin: '0 0 10 0',
                                        xtype: 'textfield',
                                        width: 170,
                                        labelWidth: 70
                                    },
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            // title: 'Normal (5 HK)',
                                            title: 'Hari Libur (5 HK)',
                                            width: '100%',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            
                                                            fieldLabel: 'Setelah',
                                                            xtype:'timefield',
                                                            name:'normal_holiday_after',
                                                            format:'H:i',
                                                            labelWidth: 70,
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'hh : mm',
                                                            
                                                            width: 50,
                                                            margin: '0 5'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            // title: 'Hari Pendek (6 HK)',
                                            title: 'Hari Libur (6 HK)',
                                            width: '100%',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype:'timefield',
                                                            format:'H:i',
                                                            fieldLabel: 'Setelah',
                                                            name:'short_holiday_after',
                                                            labelWidth: 70,
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'hh : mm',
                                                            width: 50,
                                                            margin: '0 5'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            // title: 'Hari Pendek Nasional (6 HK)',
                                            title: 'Hari Pendek (6 HK)',
                                            width: '100%',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype:'timefield',
                                                            format:'H:i',
                                                            fieldLabel: 'Setelah',
                                                            name:'short_holiday_nasional_after',
                                                            labelWidth: 70,
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'hh : mm',
                                                            width: 50,
                                                            margin: '0 5'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            fieldLabel: 'Faktor 1',
                                            name:'holiday_factor_1'
                                        },
                                        {
                                            fieldLabel: 'Faktor 2',
                                            name:'holiday_factor_2'
                                        },
                                        {
                                            fieldLabel: 'Faktor 3',
                                            name:'holiday_factor_3'
                                        }
                                    ]
                                }

                            ]
                        }, {
                            xtype: 'panel',
                            title: 'Lain - lain',
                            bodyStyle:'background:none;border:0;background-color:#D6E3F2;',
                            layout: 'hbox',
                            defaults: {
                                xtype: 'container',
                                flex: 1,
                                margin: '0 5'
                            },
                            items: [
                                {
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            title: 'Istirahat',
                                            style:'background-color:white;',
                                            width: 250,
                                            defaults: {
                                                margin: '0 0 10 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'radiogroup',
                                                    
                                                    fieldLabel: 'Potong Istirahat',
                                                    // Arrange radio buttons into two columns, distributed vertically
                                                    itemId: 'sexID',
                                                    width: '100%',
                                                    layout: 'hbox',
                                                    defaults: {
                                                        margin: '0 7 0 0'
                                                    },
                                                    flex: 3,
                                                    items: [
                                                        {boxLabel: 'Yes', name: 'breaktime_cut', inputValue: 1, checked: true},
                                                        {boxLabel: 'No', name: 'breaktime_cut', inputValue: 0},
                                                    ]
                                                },
                                                {
                                                    xtype: 'checkbox',
                                                    fieldLabel: 'Potong berdasarkan Kelipatan',
                                                    name:'cut_based_multiply'
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Potong Istirahat setelah ',
                                                            name:'breaktime_cut_after',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'jam',
                                                            margin: '0 0 0 10',
                                                            width: 50
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Lama Istirahat ',
                                                            name:'breaktime_duration',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'jam',
                                                            margin: '0 0 0 10',
                                                            width: 50
                                                        }
                                                    ]
                                                }

                                            ]
                                        }

                                    ]
                                },
                                {
                                    layout: 'vbox',
                                    defaults: {
                                        xtype: 'fieldset',
                                        flex: 1,
                                        width: 250,
                                    },
                                    items: [
                                        {
                                            title: 'Makan Lembur',
                                            //width:'100%',
                                            style:'background-color:white;',
                                            items: [
                                                {
                                                    xtype: 'radiogroup',
                                                    fieldLabel: 'Potong Jam Lembur',
                                                    // Arrange radio buttons into two columns, distributed vertically
                                                    itemId: 'overtime_cutId',
                                                    width: '100%',
                                                    layout: 'hbox',
                                                    defaults: {
                                                        margin: '0 7 0 0'
                                                    },
                                                    flex: 3,
                                                    items: [
                                                        {boxLabel: 'Yes', name: 'overtime_cut', inputValue: 1, checked: true},
                                                        {boxLabel: 'No', name: 'overtime_cut', inputValue:0},
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Makan Extra Setelah',
                                                            name:'overtime_meal_after',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'jam',
                                                            margin: '0 0 0 10',
                                                            width: 50
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            title: 'Batasan Menit',
                                            style:'background-color:white;',
                                            layout: 'hbox',
                                            defaults: {
                                                labelWidth: 60,
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Mininum',
                                                    name:'minutes_limit_minimum',
                                                    margin: '0 10 0 0',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Maksimum',
                                                    name:'minutes_limit_maximum',
                                                    flex: 1
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});