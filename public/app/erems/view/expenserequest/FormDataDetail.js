Ext.define('Erems.view.expenserequest.FormDataDetail', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.expenserequestformdatadetail',
    requires: ['Erems.library.template.component.Paymenttypecombobox',
        'Erems.library.template.component.Clustercombobox',
        'Erems.library.template.component.Blockcombobox',
        'Erems.library.template.component.Expensetypecombobox',
        'Erems.template.ComboBoxFields'],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    editedRow: -1,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;background-color:#ffffff;',
    initComponent: function() {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'unit_unit_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'purchaseletter_purchaseletter_id'
                },
                {
                    padding: '5px',
                    layout: 'hbox',
                    width: '100%',
                    bodyStyle: 'border:0px',
                    items: [{
                            xtype: 'textfield',
                            fieldLabel: 'Kawasan',
                            anchor: '-5',
                            name: 'cluster_code',
                            readOnly:true,
                            flex: 2

                        }, {
                            xtype: 'splitter', width: 5,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '',
                            readOnly:true,
                            anchor: '-5',
                            name: 'cluster_cluster',
                            flex: 3
                        }
                    ]
                },
                {
                    padding: '5px',
                    layout: 'hbox',
                    width: '100%',
                    bodyStyle: 'border:0px',
                    items: [{
                            xtype: 'textfield',
                            fieldLabel: 'Block',
                            anchor: '-5',
                            name: 'block_code',
                            readOnly:true,
                            flex: 2

                        }, {
                            xtype: 'splitter', width: 5,
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '',
                            readOnly:true,
                            anchor: '-5',
                            name: 'block_block',
                            flex: 3
                        }
                    ]
                },
                {
                    padding: '5px',
                    layout: 'hbox',
                    width: '100%',
                    bodyStyle: 'border:0px',
                    items: [{
                            xtype: 'textfield',
                            fieldLabel: 'Unit',
                            anchor: '-5',
                            readOnly:true,
                            name: 'unit_unit_number',
                            flex: 2

                        }, {
                            xtype: 'splitter', width: 5
                        }, {
                            xtype: 'button',
                            text: 'Browse Unit',
                            action: 'browse_unit',
                            anchor: '-5',
                            flex: 1
                        }, {
                            xtype: 'label', text: '', flex: 1
                        }
                    ]
                },
                {
                    padding: '5px',
                    layout: 'hbox',
                    width: '100%',
                    bodyStyle: 'border:0px',
                    items: [{
                            xtype: 'textfield',
                            readOnly:true,
                            fieldLabel: 'Purchaseletter No.',
                            name: 'purchaseletter_purchaseletter_no',
                            flex: 1
                        }

                    ]
                },
                {
                    padding: '30px 5px 5px 5px',
                    layout: 'hbox',
                    width: '100%',
                    bodyStyle: 'border:0px',
                    items: [{
                            xtype: 'textfield',
                            fieldLabel: 'Payment type',
                            anchor: '-5',
                            name: 'paymenttype_code',
                            readOnly:true,
                            enableKeyEvents: true,
                            flex: 2

                        }, {
                            xtype: 'splitter', width: 5,
                        }, {
                            xtype: 'combobox',
                            queryMode:'local',
                            anchor: '-5',
                            fieldLabel: '',
                            name: 'paymenttype_paymenttype_id',
                            displayField: cbf.paymenttype.d,
                            valueField: cbf.paymenttype.v,
                            flex: 3
                        }
                    ]
                },
                {
                    padding   : '5px',
                    layout    : 'hbox',
                    width     : '100%',
                    bodyStyle : 'border:0px',
                    items     : [{
                            xtype      : 'xnotefieldEST',
                            fieldLabel : 'Notes',
                            name       : 'description',
                            flex       : 1
                        }
                    ]
                },
                {
                    padding: '5px',
                    layout: 'hbox',
                    width: '100%',
                    bodyStyle: 'border:0px',
                    items: [
                        {
                            xtype:'xmoneyfield',
                            name:'amount',
                            fieldLabel:'Amount',
                            anchor: '-5',
                        },
                        {
                            xtype: 'splitter', width: 5,
                        }, {
                            xtype: 'combobox',
                            anchor: '-5',
                            displayField: cbf.expensetype.d,
                            valueField: cbf.expensetype.v,
                            fieldLabel: 'Expense Type',
                            editable:false,
                            name: 'expensetype_expensetype_id',
                            flex: 2
                        }
                    ]
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

