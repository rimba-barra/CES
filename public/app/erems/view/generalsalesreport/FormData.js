Ext.define('Erems.view.generalsalesreport.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.generalsalesreportformdata',
    requires: ['Erems.library.template.view.combobox.Cluster2', 'Erems.library.template.view.combobox.Type',
        'Erems.library.template.view.combobox.Productcategory',
        'Erems.library.template.component.Buildingclasscombobox',
        'Erems.template.ComboBoxFields'],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;
        
        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            height:350,
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'project_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'pt_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'Project'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'Pt'
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
                            xtype: 'dfdatefield',
                            fieldLabel: 'Purchase letter Date',
                            name: 'date_bot',
                            submitFormat: 'Y-m-d',
                            flex: 1
                        },
                        {
                            xtype: 'label',
                            text: 'to',
                            width: 20

                        },
                        {
                            xtype: 'dfdatefield',
                            fieldLabel: '',
                            name: 'date_top',
                            submitFormat: 'Y-m-d',
                            flex: 1
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
                            xtype: 'buildingclasscombobox',
                            name: 'buildingclass',
                            reportParams: true
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
                            xtype: 'combobox',
                            name: 'cluster_id',
                            fieldLabel: 'Cluster / Tower',
                            displayField: cbf.cluster.d,
                            valueField: cbf.cluster.v,
                            reportParams: true
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
                            xtype: 'combobox',
                            name: 'type_id',
                            fieldLabel: 'Type',
                            displayField: cbf.type.d,
                            valueField: cbf.type.v,
                            // bindPrefixName: "Townplanningreport",
                            // storeUrl: 'townplanningreport',
                            reportParams: true
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
                            xtype: 'combobox',
                            fieldLabel: 'Product Category',
                            displayField: cbf.productcategory.d,
                            valueField: cbf.productcategory.v,
                            name: 'productcategory_id',
                            reportParams: true
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
                            xtype: 'combobox',
                            fieldLabel: 'Salesman',
                            displayField:'employee_name',
                            valueField:'employee_id',
                            name: 'salesman_id',
                            reportParams: true
                        }
                    ]
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Group by',
                    width:300,
                    itemId: 'groupBy',
                    vertical: false,
                    items: [
                        {boxLabel: 'Salesman', name: 'Groupby', inputValue: "salesman", checked: true},
                        {boxLabel: 'Club Citra', name: 'Groupby', inputValue: "club citra"},
                        {boxLabel: 'Cara Bayar', name: 'Groupby', inputValue: "cara bayar"}
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
                    /*
                    {
                        xtype: 'button',
                        action: 'process',
                        itemId: 'btnSearch',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-search',
                        // disabled:true,
                        text: 'Process'
                    },
                    */
                    {
                        xtype: 'button',
                        action: 'processexcel',
                   
                        padding: 5,
                        width: 150,
                        iconCls: 'icon-search',
                        // disabled:true,
                        text: 'Process to Excel'
                    },
					/*
                    {
                        xtype: 'button',
                        action: 'reportjs',
                   
                        padding: 5,
                        width: 150,
                        iconCls: 'icon-search',
                        // disabled:true,
                        text: 'Report JS'
                    },
					*/
                    {
                        xtype: 'button',
                        action: 'reset',
                        itemId: 'btnReset',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-reset',
                        text: 'Reset'
                    },
                    
                ]
            }
        ];
        return dockedItems;
    }
});

