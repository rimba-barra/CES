Ext.define('Erems.view.rekapstockreport.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.rekapstockreportformdata',
    requires: ['Erems.library.template.view.combobox.Cluster2', 'Erems.library.template.view.combobox.Type',
        'Erems.library.template.view.combobox.Productcategory',
        'Erems.library.template.view.combobox.Unitstatus',
        'Erems.library.template.component.Buildingclasscombobox',
        //'Erems.library.template.component.Unitstatuscombobox'
        ],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            items: [
                {
                    xtype:'hiddenfield',
                    name:'project_id'
                },
                {
                    xtype:'hiddenfield',
                    name:'pt_id'
                },
                {
                    xtype:'hiddenfield',
                    name:'Project'
                },
                {
                    xtype:'hiddenfield',
                    name:'Pt'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    hidden: true,
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
                            xtype: 'buildingclasscombobox',
                            name: 'buildingclass',
                            reportParams: true
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'cbf_buildingclass',
                            checked: true,
                            inputValue: '1',
                            uncheckedValue: '0',
                            margin: '0 5px 0 0',
                            width: 20
                        },
                        {
                            xtype: 'label',
                            text: 'ALL'
                        }
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
                            xtype: 'cbcluster2',
                            name: 'cluster_id',
                            bindPrefixName: "Townplanningreport",
                            storeUrl: 'rekapstockreport',
                            reportParams: true
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

                , {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
                            xtype: 'cbtype',
                            name: 'type_id',
                            bindPrefixName: "Townplanningreport",
                            storeUrl: 'rekapstockreport',
                            reportParams: true
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'cbf_type',
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
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    hidden: true,
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
                            xtype: 'cbproductcategory',
                            name: 'productcategory_id',
                            bindPrefixName: "Townplanningreport",
                            storeUrl: 'rekapstockreport',
                            reportParams: true
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'cbf_productcategory',
                            inputValue: '1',
                            checked: true,
                            uncheckedValue: '0',
                            margin: '0 5px 0 0',
                            width: 20
                        },
                        {
                            xtype: 'label',
                            text: 'ALL'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    hidden: true,
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
                            xtype: 'cbunitstatus',
                            name: 'unitstatus_id',
                            bindPrefixName: "Townplanningreport",
                            storeUrl: 'rekapstockreport',
                            reportParams: true
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'cbf_unitstatus',
                            inputValue: '1',
                            checked: true,
                            uncheckedValue: '0',
                            margin: '0 5px 0 0',
                            width: 20
                        },
                        {
                            xtype: 'label',
                            text: 'ALL'
                        }
                    ]

                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Group by',
                    // Arrange radio buttons into two columns, distributed vertically
                    itemId: 'groupBy',
                    vertical: false,
                    hidden: true,
                    items: [
                        {boxLabel: 'Cluster', name: 'Groupby', inputValue:"cluster",checked: true},
                        {boxLabel: 'Type', name: 'Groupby', inputValue:"type"}
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
                        action: 'process',
                        itemId: 'btnSearch',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-search',
                        text: 'Process'
                    },
                    {
                        xtype: 'button',
                        action: 'reset',
                        itemId: 'btnReset',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-reset',
                        text: 'Reset'
                    }
                ]
            }
        ];
        return dockedItems;
    }
});

