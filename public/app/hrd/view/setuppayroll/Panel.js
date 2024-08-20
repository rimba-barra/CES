Ext.define('Hrd.view.setuppayroll.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    alias: 'widget.setuppayrollpanel',
    itemId: 'SetuppayrollPanel',
    gridPanelName: 'setuppayrollgrid',
    requires: ['Hrd.library.template.view.MoneyField', 'Hrd.view.setuppayroll.Grid'],
    formSearchPanelName: 'setuppayrollformsearch',
    initComponent: function() {
        var me = this;



        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bodyStyle: 'background:none;border:0;',
                    id: 'formSetuppayrollID',
                    layout: 'hbox',
                    margin: '5px 0 0 5px',
                    height: '100%',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                xtype: 'container',
                                layout: 'vbox',
                                margin: '5px 5px 5px 10px'
                            },
                            items: [
                                {
                                   xtype:'hiddenfield',
                                   name:'setuppayroll_id'
                                },
                                {
                                    width: 600,
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: '',
                                            displayField: 'code',
                                            name: 'grouppayroll_grouppayroll_id',
                                            valueField: 'grouppayroll_id'
                                        },
                                        {
                                            xtype: 'setuppayrollgrid',
                                            width: '100%',
                                            height: 300
                                        }
                                    ]

                                },
                                {
                                   
                                    items: [
                                        
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Komponen Gaji',
                                            displayField: 'code',
                                            valueField: 'komponengaji_id',
                                            name: 'komponengaji_komponengaji_id'
                                        },
                                        {
                                  
                                            margin: '0 0 0 10',
                                            items: [
                                                {
                                                    xtype: 'radiogroup',
                                                    fieldLabel: 'Bulan / Hari',
                                                    // Arrange radio buttons into two columns, distributed vertically

                                                  
                                                    width: '100%',
                                                    layout: 'hbox',
                                                    defaults: {
                                                        margin: '0 7 0 0'
                                                    },
                                           
                                                    items: [
                                                        {boxLabel: 'Bln', name: 'bln_hr', inputValue: "B", checked: true},
                                                        {boxLabel: 'Hr', name: 'bln_hr', inputValue: "H"},
                                                    ]
                                                }

                                            ]
                                        },
                                        {
                                  
                                            margin: '0 0 0 10',
                                            items: [
                                                {
                                                    xtype: 'radiogroup',
                                                    fieldLabel: 'Is Trans',
                                                    // Arrange radio buttons into two columns, distributed vertically

                                                  
                                                    width: '100%',
                                                    layout: 'hbox',
                                                    defaults: {
                                                        margin: '0 7 0 0'
                                                    },
                                           
                                                    items: [
                                                        {boxLabel: 'Ya', name: 'is_trans', inputValue: "1"},
                                                        {boxLabel: 'Tidak', name: 'is_trans', inputValue: "0",checked: true},
                                                    ]
                                                }

                                            ]
                                        },
                                        {
                                            xtype: 'xmoneyfield',
                                            fieldLabel: 'Value',
                                            name: 'value'
                                        }
                                    ]

                                },
                            ]
                        }
                    ]
                }


            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    id: 'toolbarSetuppayrollID',
                    height: 28,
                    defaults: [
                        {
                            xtype: 'button',
                            margin: '0 5 0 0'
                        }
                    ],
                    items: [
                        {
                            action: 'create',
                            iconCls: 'icon-new',
                            //  hidden:true,
                            text: 'Add'
                        },
                        {
                            action: 'edit',
                            iconCls: 'icon-edit',
                            //  hidden:true,
                            text: 'Edit'
                        },
                        {
                            action: 'save',
                            text: 'Save',
                            iconCls: 'icon-save',
                        },
                        {
                            action: 'delete',
                            iconCls: 'icon-delete',
                            // hidden:true,
                            text: 'Delete'
                        },
                        {
                            action: 'cancel',
                            iconCls: 'icon-cancel',
                            // hidden:true,
                            text: 'Cancel'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});