Ext.define('Gl.view.subaccounttransaction.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.subaccounttransactionformdata',
    layout: 'vbox',
    bodyStyle: 'background-color:#dfe8f5;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                 {
                    xtype: 'hiddenfield',
                    name: 'paramfromcoa',
                    value: ''
                },
                 {
                    xtype: 'hiddenfield',
                    name: 'paramfromcoa_id',
                    value: '0'
                },
                 {
                    xtype: 'hiddenfield',
                    name: 'paramuntilcoa',
                    value: ''
                },
                 {
                    xtype: 'hiddenfield',
                    name: 'paramuntilcoa_id',
                    value: '0'
                },
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,
                    padding: '0 0 0 20px',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Report By',
                            padding: '0 0 0 20px',
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'Account Code',
                                    xtype: 'radiofield',
                                    name: 'sat_reportby',
                                    inputValue: '1',
                                    id: 'radio1',
                                    checked:true
                                },
                                {
                                    xtype: 'splitter',
                                    width: '50'
                                },
                                {
                                    boxLabel: 'Sub Account Code',
                                    xtype: 'radiofield',
                                    name: 'sat_reportby',
                                    inputValue: '2',
                                    id: 'radio2'
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Voucher',
                            padding: '0 0 0 20px',
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'All',
                                    xtype: 'radiofield',
                                    name: 'voucherdata',
                                    inputValue: '1',
                                    id: 'radiovoucher1',
                                    checked:true
                                },
                                {
                                    xtype: 'splitter',
                                    width: '114'
                                },
                                {
                                    boxLabel: 'Cash Flow',
                                    xtype: 'radiofield',
                                    name: 'voucherdata',
                                    inputValue: '2',
                                    id: 'radiovoucher2'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Sub',
                            padding: '0 0 0 20px',
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'Complete',
                                    xtype: 'radiofield',
                                    name: 'subdata',
                                    inputValue: '1',
                                    id: 'radiosub1',
                                    checked:true
                                },
                                {
                                    xtype: 'splitter',
                                    width: '78'
                                },
                                {
                                    boxLabel: 'By Sub',
                                    xtype: 'radiofield',
                                    name: 'subdata',
                                    inputValue: '2',
                                    id: 'radiosub2'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Detail',
                            padding: '0 0 0 20px',
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'No',
                                    xtype: 'radiofield',
                                    name: 'detaildatasub',
                                    inputValue: '1',
                                    id: 'radiodetailsub1'
                                },
                                {
                                    xtype: 'splitter',
                                    width: '114'
                                },
                                {
                                    boxLabel: 'Yes',
                                    xtype: 'radiofield',
                                    name: 'detaildatasub',
                                    inputValue: '2',
                                    id: 'radiodetailsub2',
                                    checked:true
                                }
                            ]
                        }

                    ]
                },
               {
                    xtype: 'tbspacer',
                    height: 20
                },
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,
                    padding: '0 0 0 20px',
                    items: [                     
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Transaction Date',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: '',
                                    emptyText: 'From Date',
                                    name: 'subfromdate',
                                    allowBlank: false,
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d'
                                },
                                {
                                    xtype: 'label',
                                    forId: 'lbl1',
                                    text: 'To',
                                    margin: '2 10 0 10'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: '',
                                    emptyText: 'Until Date',
                                    name: 'subuntildate',
                                    allowBlank: false,
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Account Code',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'coacomboboxgrid',
                                    fieldLabel: '',
                                    emptyText: 'From COA',
                                    name: 'sub_coa_from_id',
                                    allowBlank: false,
                                    enableKeyEvents : true
                                    
                                },
                                
                                {
                                    xtype: 'label',
                                    forId: 'lbl1',
                                    text: 'To',
                                    margin: '2 10 0 10'
                                },
                                {
                                    xtype: 'coacomboboxgrid',
                                    fieldLabel: '',
                                    emptyText: 'Until COA',
                                    name: 'sub_coa_until_id',
                                    allowBlank: false,
                                    enableKeyEvents : true
                                },
                            ]
                        },                     
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Sub Account Group',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'subaccountgroupcomboboxgrid',
                                    fieldLabel: '',
                                    emptyText: 'Select Sub ',
                                    name: 'sub_kelsub_id',
                                    allowBlank: false,
                                    enableKeyEvents : true
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Sub Account Code',
                            hidden:false,
                            name: 'subgl',
                            layout: 'hbox',
                            items: [
                                {
                                    
                                    xtype: 'subaccountcodecomboboxgrid',
                                    fieldLabel: '',
                                    emptyText: 'Select From ',
                                    name: 'sub_fromsubgl_id',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'label',
                                    forId: 'lbl1',
                                    text: 'To',
                                    margin: '2 10 0 10'
                                },
                                {
                                    xtype: 'subaccountcodecomboboxgrid',
                                    fieldLabel: '',
                                    emptyText: 'Select Until ',
                                    name: 'sub_untilsubgl_id',
                                    allowBlank: false,
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Code 1',
                            layout: 'hbox',
                            name: 'sub1',
                            hidden:true,
                            items: [
                                {
                                    
                                    xtype: 'combo',
                                    fieldLabel: '',
                                    emptyText: 'Select From ',
                                    name: 'fromsub1',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'label',
                                    forId: 'lbl1',
                                    text: 'To',
                                    margin: '2 10 0 10'
                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: '',
                                    emptyText: 'Select Until ',
                                    name: 'untilsub1',
                                    allowBlank: false,
                                },                                
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Code 2',
                            name: 'sub2',
                            hidden:true,
                            layout: 'hbox',
                            items: [
                                {
                                    
                                    xtype: 'combo',
                                    fieldLabel: '',
                                    emptyText: 'Select From ',
                                    name: 'fromsub2',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'label',
                                    forId: 'lbl1',
                                    text: 'To',
                                    margin: '2 10 0 10'
                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: '',
                                    emptyText: 'Select Until ',
                                    name: 'untilsub2',
                                    allowBlank: false,
                                },                                
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Code 3',
                            layout: 'hbox',
                            name: 'sub3',
                            hidden:true,
                            items: [
                                {
                                    
                                    xtype: 'combo',
                                    fieldLabel: '',
                                    emptyText: 'Select From ',
                                    name: 'fromsub3',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'label',
                                    forId: 'lbl1',
                                    text: 'To',
                                    margin: '2 10 0 10'
                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: '',
                                    emptyText: 'Select Until ',
                                    name: 'untilsub3',
                                    allowBlank: false,
                                },                                
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Code 4',
                            name: 'sub4',
                            hidden:true,
                            layout: 'hbox',
                            items: [
                                {
                                    
                                    xtype: 'combo',
                                    fieldLabel: '',
                                    emptyText: 'Select From ',
                                    name: 'fromsub4',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'label',
                                    forId: 'lbl1',
                                    text: 'To',
                                    margin: '2 10 0 10'
                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: '',
                                    emptyText: 'Select Until ',
                                    name: 'untilsub4',
                                    allowBlank: false,
                                },                                
                            ]
                        },
                    ]
                },
                {
                    xtype: 'tbspacer',
                    height: 20
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    padding: '0 0 0 200px',
                    items: [
                        {
                            xtype: 'button',
                            action: 'submit',
                            itemId: 'btnSubmit',
                            iconCls: 'icon-submit',
                            text: 'Submit',
                            padding: 5,
                        },
                        {
                            xtype: 'button',
                            action: 'cancel',
                            itemId: 'btnCancel',
                            iconCls: 'icon-cancel',
                            padding: 5,
                            text: 'Cancel',
                            handler: function () {
                                this.up('window').close();
                            }
                        }
                    ]
                }
            ],
        });
        me.callParent(arguments);
    },
});
