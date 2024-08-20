Ext.define('Cashier.view.cashflowtype.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.cashflowtypeformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 240,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
            {
                xtype: 'hiddenfield',
                name: 'hideparam',
                value: 'default'
            },
            {
                xtype: 'hiddenfield',
                name: 'cashflowtype_id',
            },
            {
                xtype: 'grouptypecombobox',
                itemId: 'fdms_grouptype_id',
                name: 'grouptype_id',
                width: 300,
                emptyText: 'Select Group Type',
                fieldLabel: 'Group Type',
                allowBlank: false,
                enforceMaxLength: true,
            },
            {
                xtype: 'textfield',
                itemId: 'fdms_cashflowtype_ids',
                name: 'cashflowtype_ids',
                fieldLabel: 'Cashflow ID',
                allowBlank: true,
                enableKeyEvents: true,
                readOnly: true,
                enforceMaxLength: true,
                maxLength: 20,
            },
            {
                xtype: 'textfield',
                itemId: 'fdms_cashflowtype',
                name: 'cashflowtype',
                emptyText: 'Input Cashflow Type',
                fieldLabel: 'Cashflow Type',
                allowBlank: false,
                enableKeyEvents: true,
                enforceMaxLength: true,
                maxLength: 100,
            },
            {
                xtype: 'textfield',
                itemId: 'fdms_description',
                name: 'description',
                emptyText: 'Input Description',
                fieldLabel: 'Description',
                enableKeyEvents: true,
                allowBlank: true,
                enforceMaxLength: true,
            },
            {
                xtype: 'fieldcontainer',
                fieldLabel: 'Type',
                layout: 'hbox',
                items: [
                        {
                         xtype:'combobox',
                         name:'dataflow',
                         allowBlank: false,
                         valueField: 'dataflow',
                         displayField: 'dataflow_name',
                         queryMode:'local',
                         emptyText: 'Select Type',
                         dvalue: '-',
                         store: Ext.create('Ext.data.Store', {
                            fields: ['dataflow', 'dataflow_name'],
                            data: [
                            {'dataflow': '-', 'dataflow_name': 'ALL'},
                            {'dataflow': 'I', 'dataflow_name': 'I'},
                            {'dataflow': 'O', 'dataflow_name': 'O'},
                            ]
                        }),
                         autoSelect:true,
                         forceSelection:true,
                         listeners: {
                            afterrender: function() {
                               this.setValue(this.dvalue);    
                           }
                       }
                   }
                   ]
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                bodyBorder: false,
                defaults: {
                    layout: 'fit'
                },
                anchor: '-10',
                items: [

                {
                    xtype: 'numberfield',
                    minValue: 0,
                    value:0,
                    name: 'sort',
                    fieldLabel: 'Sort',
                    emptyText: 'Input Life Time',
                    width:'50%'
                }
                ]
            },
       ],
       dockedItems: me.generateDockedItem()
   });

        me.callParent(arguments);
    }
});

