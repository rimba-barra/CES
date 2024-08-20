Ext.define('Hrd.view.costcontrol.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    alias: 'widget.costcontrolpanel',
    itemId: 'CostcontrolPanel',
    gridPanelName: 'costcontrolgrid',
    requires: ['Hrd.view.costcontrol.GridCca', 'Hrd.view.costcontrol.GridCcb', 'Hrd.view.costcontrol.GridCcc', 'Hrd.library.template.view.MoneyField'],
    formSearchPanelName: 'costcontrolformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bodyStyle: 'background:none;border:0;',
                    id: 'formCostcontrolID',
                    layout: 'hbox',
                    margin: '5px 0 0 5px',
                    height: '100%',
                    items: [
                        {
                            xtype: 'tabpanel',
                            width: 800,
                            height: 400,
                            defaults: {
                                autoScroll: true,
                                padding: '10px',
                                width: '100%',
                            },
                            activeTab: 0, // index or id
                            items: [
                                {
                                    title: 'Cost Control 1',
                                    items: [
                                        {
                                            xtype: 'container',
                                            itemId: 'ccaBoxID',
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Kode',
                                                    name: 'cca_code'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Description',
                                                    name: 'cca_description'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Urut',
                                                    name: 'cca_urut'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Kode Bank',
                                                    name: 'cca_kode_bank'
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'costcontrolccagrid',
                                            height: 300
                                        }]
                                },
                                {
                                    title: 'Cost Control 2',
                                    items: [
                                        {
                                            xtype: 'container',
                                            itemId: 'ccbBoxID',
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            valueField: 'costcontrol_id',
                                                            displayField: 'code',
                                                            fieldLabel:'Cost Control 1',
                                                            name: 'ccb_parent_id'
                                                        }, {
                                                            xtype:'textfield',
                                                            margin:'0 0 5px 10px',
                                                            fieldLabel:'',
                                                            keepRO:true,
                                                            name:'cca_description'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Kode',
                                                    name: 'ccb_code'
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Keterangan',
                                                    name: 'ccb_description'
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Urut',
                                                    name: 'ccb_urut'
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'costcontrolccbgrid',
                                            height: 300
                                        }]
                                },
                                {
                                    title: 'Cost Control 3',
                                    items: [
                                        {
                                            xtype: 'container',
                                            itemId: 'cccBoxID',
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            valueField: 'costcontrol_id',
                                                            displayField: 'code',
                                                            fieldLabel:'Cost Control 2',
                                                            name: 'ccc_parent_id'
                                                        }, {
                                                            xtype:'textfield',
                                                            margin:'0 0 5px 10px',
                                                            fieldLabel:'',
                                                            keepRO:true,
                                                            name:'ccc_ccb_description'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Kode',
                                                    name: 'ccc_code'
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Keterangan',
                                                    name: 'ccc_description'
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Urut',
                                                    name: 'ccc_urut'
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'costcontrolcccgrid',
                                            height: 300
                                        }]
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
                    id: 'toolbarCostcontrolID',
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
                            text: 'Add'
                        },
                        {
                            action: 'edit',
                            iconCls: 'icon-edit',
                            text: 'Edit'
                        },
                        {
                            action: 'save',
                            text: 'Save',
                            iconCls: 'icon-save',
                        },
                        {
                            action: 'cancel',
                            iconCls: 'icon-cancel',
                            text: 'Cancel'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});