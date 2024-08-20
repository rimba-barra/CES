Ext.define('Cashier.view.tcashadvance.FormCoadetail', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.tcashadvanceformcoadetail',
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
                    name: 'kasbank_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kasbankdetail_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'seq',
                    id: 'seq_wwasd',
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'combo',
                            fieldLabel: 'Account Code',
                            itemId: 'fd_coa_id',
                            id: 'coa_id_d',
                            name: 'coa_id',
                            emptyText: 'Select COA',
                            width: 230,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        
                    ]                    
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Account Name',
                            itemId: 'fd_coaname',
                            id: 'coaname_d',
                            name: 'coaname',
                            emptyText: 'Auto Value',
                            width: 400,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        
                    ]                    
                },              
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Description',
                            itemId: 'fd_description',
                            id: 'description_d',
                            name: 'description',
                            emptyText: '',
                            width: 400,
                            readOnly: false,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        
                    ]                    
                },
                {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Data flow',
                            defaultType: 'radiofield',
                            defaults: {
                                flex: 3
                            },
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'IN TRANS',
                                    name: 'dataflow',
                                    inputValue: 'I',
                                    id: 'radio1_d',
                                    allowBlank: false
                                },                                
                                {
                                    boxLabel: 'OUT TRANS',
                                    name: 'dataflow',
                                    inputValue: 'O',
                                    id: 'radio2_d',
                                    allowBlank: false
                                }
                            ]
                        },
                           {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Amount',
                            itemId: 'fd_amount',
                            id: 'amount_d',
                            name: 'amount',
                            emptyText: 'Input amount',
                            width: 400,
                            readOnly: false,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        
                    ]                    
                },
              
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

