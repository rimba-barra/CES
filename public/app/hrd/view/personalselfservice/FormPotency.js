Ext.define('Hrd.view.personalselfservice.FormPotency', {
    extend: 'Ext.form.Panel',
    alias: 'widget.personalselfserviceformpotency',
    requires: [
    ],
    frame: true,
    autoScroll: true,
    height: 500,
    bodyBorder: true,
    bodyPadding: 0,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    uniquename: '_personalselfserviceformpotency',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    align: 'right',
                    autoScroll: true,
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            // Fieldset in Column 1
                            xtype: 'fieldset',
                            title: 'Data Skills',
                            layout: 'vbox',
                            width: '100%',
                            defaults: {
                                margin: '0 0 10 0',
                                xtype: 'fieldcontainer', layout: 'hbox',
                                defaults: {
                                    flex: 1,
                                    margin: '0 10 0 0'
                                }
                            },
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    title: '',
                                    defaultType: 'checkbox', // each item will be a radio button
                                    layout: 'hbox',
                                    defaults: {
                                        flex: 1
                                    },
                                    items: [{
                                            boxLabel: 'Teaching',
                                            name: 'skills_1'
                                        }, {
                                            xtype: 'hiddenfield',
                                            name: 'skills_1_id'
                                        }, {
                                            boxLabel: 'Selling',
                                            name: 'skills_2'
                                        }, {
                                            xtype: 'hiddenfield',
                                            name: 'skills_2_id'
                                        }, {
                                            boxLabel: 'Writing',
                                            name: 'skills_3'
                                        }, {
                                            xtype: 'hiddenfield',
                                            name: 'skills_3_id'
                                        }, {
                                            boxLabel: 'Computer',
                                            name: 'skills_4'
                                        }, {
                                            xtype: 'hiddenfield',
                                            name: 'skills_4_id'
                                        }]
                                },
                                {
                                    xtype: 'fieldcontainer', layout: 'hbox',
                                    defaults: {
                                        margin: "10 10 10 0"
                                    },
                                    items: [
                                        {xtype: 'checkbox', boxLabel: 'electronics', flex: 1, name: 'skills_5'},
                                        {xtype: 'textfield', flex: 4, name: 'skills_5_list'}, {
                                            xtype: 'hiddenfield',
                                            name: 'skills_5_id'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer', layout: 'hbox',
                                    defaults: {
                                        margin: "0 0 10 0"
                                    },
                                    items: [
                                        {xtype: 'checkbox', boxLabel: 'Others', flex: 1, name: 'skills_6'},
                                        {xtype: 'textfield', flex: 4, name: 'skills_6_list'}, {
                                            xtype: 'hiddenfield',
                                            name: 'skills_6_id'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer', layout: 'hbox',
                                    defaults: {
                                        margin: "0 10 10 0",
                                        xtype: 'radio'
                                    },
                                    items: [
                                        {xtype: 'checkbox', boxLabel: 'Language', flex: 1, name: 'skills_7'},
                                        {xtype: 'textfield', flex: 4, name: 'skills_7_list'},
                                        {boxLabel: 'Aktif', flex: 1, name: 'skills_7_active', inputValue: 1},
                                        {boxLabel: 'Pasif', checked: true, flex: 1, name: 'skills_7_active', inputValue: 0}, {
                                            xtype: 'hiddenfield',
                                            name: 'skills_7_id'
                                        }

                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer', layout: 'hbox',
                                    defaults: {
                                        margin: "0 10 10 0",
                                        xtype: 'radio'
                                    },
                                    items: [
                                        //{xtype: 'label', text: '', flex: 1, name: 'skills_8'},
                                        {xtype: 'hiddenfield', text: '', flex: 1, name: 'skills_8'},
                                        {xtype: 'textfield', flex: 4, name: 'skills_8_list'},
                                        {boxLabel: 'Aktif', flex: 1, name: 'skills_8_active', inputValue: 1},
                                        {boxLabel: 'Pasif', checked: true, flex: 1, name: 'skills_8_active', inputValue: 0}, {
                                            xtype: 'hiddenfield',
                                            name: 'skills_8_id'
                                        }

                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer', layout: 'hbox',
                                    defaults: {
                                        margin: "0 10 10 0",
                                        xtype: 'radio'
                                    },
                                    items: [
                                        //{xtype: 'label', text: '', flex: 1, name: 'skills_9'},
                                        {xtype: 'hiddenfield', text: '', flex: 1, name: 'skills_9'},
                                        {xtype: 'textfield', flex: 4, name: 'skills_9_list'},
                                        {boxLabel: 'Aktif', flex: 1, name: 'skills_9_active', inputValue: 1},
                                        {boxLabel: 'Pasif', checked: true, flex: 1, name: 'skills_9_active', inputValue: 0}, {
                                            xtype: 'hiddenfield',
                                            name: 'skills_9_id'
                                        }

                                    ]

                                },
                            ]
                        },
                        {
                            // Fieldset in Column 1
                            xtype: 'fieldset',
                            title: 'Data Hobies',
                            layout: 'vbox',
                            width: '100%',
                            defaults: {
                                margin: '0 0 10 0',
                                xtype: 'fieldcontainer', layout: 'hbox',
                                defaults: {
                                    flex: 1,
                                    margin: '0 10 0 0'
                                }
                            },
                            items: [
                                {
                                    items: [
                                        {xtype: 'checkbox', boxLabel: 'Sport', name: 'skills_10'},
                                        {xtype: 'textfield', flex: 2, name: 'skills_10_list'}, {
                                            xtype: 'hiddenfield',
                                            name: 'skills_10_id'
                                        },
                                        {xtype: 'checkbox', boxLabel: 'Painting', name: 'skills_11'},
                                        {xtype: 'textfield', flex: 2, name: 'skills_11_list'}, {
                                            xtype: 'hiddenfield',
                                            name: 'skills_11_id'
                                        }
                                    ]
                                },
                                {
                                    items: [
                                        {xtype: 'checkbox', boxLabel: 'Music', name: 'skills_12'},
                                        {xtype: 'textfield', flex: 2, name: 'skills_12_list'}, {
                                            xtype: 'hiddenfield',
                                            name: 'skills_12_id'
                                        },
                                        {xtype: 'checkbox', boxLabel: 'Culinary', name: 'skills_13'},
                                        {xtype: 'textfield', flex: 2, name: 'skills_13_list'}, {
                                            xtype: 'hiddenfield',
                                            name: 'skills_13_id'
                                        }
                                    ]
                                },
                                {
                                    items: [
                                        {xtype: 'checkbox', boxLabel: 'Dance', name: 'skills_14'},
                                        {xtype: 'textfield', flex: 2, name: 'skills_14_list'}, {
                                            xtype: 'hiddenfield',
                                            name: 'skills_14_id'
                                        },
                                        {xtype: 'checkbox', boxLabel: 'Others', name: 'skills_15'},
                                        {xtype: 'textfield', flex: 2, name: 'skills_15_list'}, {
                                            xtype: 'hiddenfield',
                                            name: 'skills_15_id'
                                        }
                                    ]
                                }

                            ]
                        },
                    ]
                },
            ],
        });
        me.callParent(arguments);
    },
});

