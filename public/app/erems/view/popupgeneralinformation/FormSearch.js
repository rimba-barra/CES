Ext.define('Erems.view.popupgeneralinformation.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    requires: ['Erems.template.ComboBoxFields'],
    alias: 'widget.popupgeneralinformationformsearch',
    initComponent: function() {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Unit Number',
                    name: 'unit_number'
                },
                {
                    xtype:'combobox',
                    name: 'cluster_id',
                    displayField: 'code',
                    valueField: cbf.cluster.v,
                    enableKeyEvents: true,
                    queryMode: 'local',
                    fieldLabel: 'Cluster',
                    listConfig: {
                        itemTpl: '{cluster}'
                    }
                },
                {
                    xtype      : 'xnamefieldEST',
                    fieldLabel : 'Customer Name',
                    name       : 'customer_name'
                },
                {
                    xtype      : 'xnamefieldEST',
                    fieldLabel : 'Salesman Name',
                    name       : 'salesman_name'
                },
                {
                    xtype: 'panel',
                    height: 48,
                    bodyStyle:'background:none;border:0;',
                    layout: {
                        type: 'column'
                    },
                    items: [
                        {
                            xtype: 'dfdatefield',
                            width: 100,
                        
                            name:'bot_purchase_date',
                            fieldLabel: 'Purchase Date',
                            labelSeparator:'',
                            labelAlign: 'top',
                          
                           // labelWidth: 50
                        },
                        {
                            xtype: 'label',
                            margin: '20px 5px',
                            padding: '0px 20px',
                            styleHtmlContent: false,
                            width: 15,
                            text:'s/d'
                        },
                        {
                            xtype: 'dfdatefield',
                            width: 100,
                          
                            name:'top_purchase_date',
                            fieldLabel: '&nbsp;',
                            labelSeparator:'',
                           
                            labelAlign: 'top'
                        },
                        {
                            xtype: 'label',
                            margin: '20px 0px',
                            padding: '0px 5px',
                            text: ''
                        }
                    ]
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});