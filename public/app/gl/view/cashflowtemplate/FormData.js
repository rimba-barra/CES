Ext.define('Gl.view.cashflowtemplate.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.cashflowtemplateformdata',
    frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'coalr_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'val1',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'val2',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'flag_input',
                    value: '0'
                },
                {
                    xtype: 'panel',
                    title: 'PARAMETER SETTING',
                    collapsible: true,
                    defaults: {
                        xtype: 'combobox',
                        width: '300',
                        labelWidth: '150',
                    },
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'splitter',
                            width: '1000'
                        },
                        {
                            padding: '10px 0 0 20px',
                            xtype: 'coasettingcombobox',
                            fieldLabel: 'Profit [Loss] Account 1',
                            emptyText: 'Please Select',
                            name: 'profitloss_coa_from',
                            allowBlank: false,
                        },
                        {
                            xtype: 'splitter',
                            width: '100'
                        },
                        {
                            padding: '0 0 0 20px',
                            xtype: 'coasettingcombobox',
                            fieldLabel: 'Profit [Loss] Account 2',
                            emptyText: 'Please Select',
                            name: 'profitloss_coa_until',
                            allowBlank: false
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            width: '100%',
                            defaults: {
                                labelWidth: '15',
                            },
                            padding: '0 0 0 20px',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Description',
                                    emptyText: 'REVENUE',
                                    name: 'desc1_note',
                                    width: '340',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'coasettingcombobox',
                                    fieldLabel: '',
                                    emptyText: 'From COA Desc 1',
                                    name: 'desc1_coa_from',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'coasettingcombobox',
                                    fieldLabel: '',
                                    emptyText: 'Until COA Desc 1',
                                    name: 'desc1_coa_until',
                                    allowBlank: false,
                                }
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '100'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            width: '100%',
                            padding: '0 0 0 20px',
                            defaults: {
                                labelWidth: '15',
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Description',
                                    emptyText: 'COST OF GOOD SOLD',
                                    name: 'desc2_note',
                                    width: '340',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'coasettingcombobox',
                                    fieldLabel: '',
                                    emptyText: 'From COA Desc 2',
                                    name: 'desc2_coa_from',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'coasettingcombobox',
                                    fieldLabel: '',
                                    emptyText: 'Until COA Desc 2',
                                    name: 'desc2_coa_until',
                                    allowBlank: false,
                                }
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '100'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            width: '100%',
                            padding: '0 0 0 20px',
                            defaults: {
                                labelWidth: '15',
                            },
                            items: [
                                {
                                    xtype: 'splitter',
                                    width: '157'
                                },
                                {
                                    xtype: 'label',
                                    text: '-------------------------------------------- (-)',
                                }
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '100'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            width: '100%',
                            padding: '0 0 0 20px',
                            defaults: {
                                labelWidth: '15',
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Description',
                                    emptyText: 'GROSS PROFIT (LOSS)',
                                    name: 'sum1_note',
                                    width: '340',
                                    allowBlank: false,
                                }

                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '100'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            width: '100%',
                            padding: '0 0 0 20px',
                            defaults: {
                                labelWidth: '15',
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Description',
                                    emptyText: 'OPERATING EXPENSES',
                                    name: 'desc3_note',
                                    width: '340',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'coasettingcombobox',
                                    fieldLabel: '',
                                    emptyText: 'From COA Desc 3',
                                    name: 'desc3_coa_from',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'coasettingcombobox',
                                    fieldLabel: '',
                                    emptyText: 'Until COA Desc 3',
                                    name: 'desc3_coa_until',
                                    allowBlank: false,
                                }
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            width: '100%',
                            padding: '0 0 0 20px',
                            defaults: {
                                labelWidth: '15',
                            },
                            items: [
                                {
                                    xtype: 'splitter',
                                    width: '157'
                                },
                                {
                                    xtype: 'label',
                                    text: '-------------------------------------------- (-)',
                                }
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '100'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            width: '100%',
                            padding: '0 0 0 20px',
                            defaults: {
                                labelWidth: '15',
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Description',
                                    emptyText: 'OPERATING INCOME(LOSS)',
                                    name: 'sum2_note',
                                    width: '340',
                                    allowBlank: false,
                                }

                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '100'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            width: '100%',
                            padding: '0 0 0 20px',
                            defaults: {
                                labelWidth: '15',
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Description',
                                    emptyText: 'OTHER INCOME (EXPENSE)',
                                    name: 'desc4_note',
                                    width: '340',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'coasettingcombobox',
                                    fieldLabel: '',
                                    emptyText: 'From COA Desc 4',
                                    name: 'desc4_coa_from',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'coasettingcombobox',
                                    fieldLabel: '',
                                    emptyText: 'Until COA Desc 4',
                                    name: 'desc4_coa_until',
                                    allowBlank: false,
                                }
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            width: '100%',
                            padding: '0 0 0 20px',
                            defaults: {
                                labelWidth: '15',
                            },
                            items: [
                                {
                                    xtype: 'splitter',
                                    width: '157'
                                },
                                {
                                    xtype: 'label',
                                    text: '-------------------------------------------- (+)',
                                }
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '100'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            width: '100%',
                            padding: '0 0 0 20px',
                            defaults: {
                                labelWidth: '15',
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Description',
                                    emptyText: 'EARING BEFORE TAX',
                                    name: 'sum3_note',
                                    width: '340',
                                    allowBlank: false,
                                }

                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '100'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            width: '100%',
                            padding: '0 0 0 20px',
                            defaults: {
                                labelWidth: '15',
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Description',
                                    emptyText: 'TAX',
                                    name: 'desc5_note',
                                    width: '340',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'coasettingcombobox',
                                    fieldLabel: '',
                                    emptyText: 'From COA Desc 5',
                                    name: 'desc5_coa_from',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'coasettingcombobox',
                                    fieldLabel: '',
                                    emptyText: 'Until COA Desc 5',
                                    name: 'desc5_coa_until',
                                    allowBlank: false,
                                }
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            width: '100%',
                            padding: '0 0 0 20px',
                            defaults: {
                                labelWidth: '15',
                            },
                            items: [
                                {
                                    xtype: 'splitter',
                                    width: '157'
                                },
                                {
                                    xtype: 'label',
                                    text: '-------------------------------------------- (-)',
                                }
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '100'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            width: '100%',
                            padding: '0 0 0 20px',
                            defaults: {
                                labelWidth: '15',
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Description',
                                    emptyText: 'For Account 80',
                                    name: 'desc6_note',
                                    width: '340',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'coasettingcombobox',
                                    fieldLabel: '',
                                    emptyText: 'From COA Desc 6',
                                    name: 'desc6_coa_from',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'coasettingcombobox',
                                    fieldLabel: '',
                                    emptyText: 'Until COA Desc 6',
                                    name: 'desc6_coa_until',
                                    allowBlank: false,
                                }
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            width: '100%',
                            padding: '0 0 0 20px',
                            defaults: {
                                labelWidth: '15',
                            },
                            items: [
                                {
                                    xtype: 'splitter',
                                    width: '157'
                                },
                                {
                                    xtype: 'label',
                                    text: '-------------------------------------------- (+)',
                                }
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '100'
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            bodyStyle: 'border:0px',
                            padding: '0 0 20px 20px',
                            width: '100%',
                            defaults: {
                                labelWidth: '15',
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Description',
                                    emptyText: 'NET INCOME',
                                    name: 'sum4_note',
                                    width: '340',
                                    allowBlank: false,
                                },
                            ]
                        },
                         {
                            xtype: 'splitter',
                            width: '100'
                        },
                            {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            width: '100%',
                            padding: '0 0 0 20px',
                            defaults: {
                                labelWidth: '15',
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Description',
                                    emptyText: 'Biaya Bunga SHL',
                                    name: 'bungaloan_desc',
                                    width: '340'
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'coasettingcombobox',
                                    fieldLabel: '',
                                    emptyText: 'COA Bunga Loan 1',
                                    name: 'coa_bungaloan1',
                                    
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'coasettingcombobox',
                                    fieldLabel: '',
                                    emptyText: 'COA Bunga Loan 2 ',
                                    name: 'coa_bungaloan2',
                                    
                                }
                            ]
                        },
                        {
                            xtype: 'tbspacer',
                            height: '15'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            padding: '0 0 15px 500px',
                            width: '100%',
                            defaults: {
                                labelWidth: '15',
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    action: 'save',
                                    itemId: 'btnSave',
                                    padding: 5,
                                    width: 75,
                                    iconCls: 'icon-save',
                                    text: 'Save'
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'button',
                                    action: 'cancel',
                                    itemId: 'btnCancel',
                                    padding: 5,
                                    width: 75,
                                    iconCls: 'icon-cancel',
                                    text: 'Cancel',
                                    handler: function () {
                                        this.up('window').close();
                                    }
                                }

                            ]
                        }
                    ]
                }
            ],
            //dockedItems: me.generateDockedItem()
        });
        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                padding: '0 0 0 500px',
                layout: {
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'save',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function () {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    },
    generateDefaults: function () {
        var def = {
            labelAlign: 'top',
            labelSeparator: ' ',
            labelClsExtra: 'small',
            fieldStyle: 'margin-bottom:3px;',
            anchor: '100%'
        }
        return def;
    },
});
