Ext.define('Gl.view.cashflowtemplate.FormSetting', {
    extend: 'Ext.form.Panel',
    alias: 'widget.cashflowtemplateformsetting',
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
                            padding: '20px 0 0 20px',
                            xtype: 'coacombobox',
                            fieldLabel: 'Profit [Loss] Account 1',
                            emptyText: 'Please Select',
                            name: 'profitloss1',
                            
                        },
                        {
                            xtype: 'splitter',
                            width: '100'
                        },
                        {
                            padding: '0 0 0 20px',
                            xtype: 'coacombobox',
                            fieldLabel: 'Profit [Loss] Account 2',
                            emptyText: 'Please Select',
                            name: 'profitloss2'
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
                                    name: 'desc1',
                                    width: '340'
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'coacombobox',
                                    fieldLabel: '',
                                    emptyText: 'From COA Desc 1',
                                    name: 'combo1',
                                    
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'coacombobox',
                                    fieldLabel: '',
                                    emptyText: 'Until COA Desc 1',
                                    name: 'combo2',
                                    
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
                                    name: 'desc2',
                                    width: '340'
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'coacombobox',
                                    fieldLabel: '',
                                    emptyText: 'From COA Desc 2',
                                    name: 'combo3',
                                    
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'coacombobox',
                                    fieldLabel: '',
                                    emptyText: 'Until COA Desc 2',
                                    name: 'combo4',
                                    
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
                                    name: 'desc3',
                                    width: '340'
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
                                    name: 'desc4',
                                    width: '340'
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'coacombobox',
                                    fieldLabel: '',
                                    emptyText: 'From COA Desc 3',
                                    name: 'combo5',
                                    
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'coacombobox',
                                    fieldLabel: '',
                                    emptyText: 'Until COA Desc 3',
                                    name: 'combo6',
                                    
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
                                    name: 'desc5',
                                    width: '340'
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
                                    name: 'desc6',
                                    width: '340'
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'coacombobox',
                                    fieldLabel: '',
                                    emptyText: 'From COA Desc 4',
                                    name: 'combo7',
                                    
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'coacombobox',
                                    fieldLabel: '',
                                    emptyText: 'Until COA Desc 4',
                                    name: 'combo8',
                                    
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
                                    name: 'desc5',
                                    width: '340'
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
                                    name: 'desc7',
                                    width: '340'

                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'coacombobox',
                                    fieldLabel: '',
                                    emptyText: 'From COA Desc 5',
                                    name: 'combo9',
                                    
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'coacombobox',
                                    fieldLabel: '',
                                    emptyText: 'Until COA Desc 5',
                                    name: 'combo10',
                                    
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
                                    name: 'desc7',
                                    width: '340'
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'coacombobox',
                                    fieldLabel: '',
                                    emptyText: 'From COA Desc 6',
                                    name: 'combo11',
                                    
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'coacombobox',
                                    fieldLabel: '',
                                    emptyText: 'Until COA Desc 6',
                                    name: 'combo12',
                                    
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
                                    name: 'desc8',
                                    width: '340'
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
                                    name: 'desc9',
                                    width: '340'
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'coacombobox',
                                    fieldLabel: '',
                                    emptyText: 'COA Bunga Loan 1',
                                    name: 'combo13',
                                    
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'coacombobox',
                                    fieldLabel: '',
                                    emptyText: 'COA Bunga Loan 2 ',
                                    name: 'combo14',
                                    
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            padding: '0 0 10px 500px',
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
