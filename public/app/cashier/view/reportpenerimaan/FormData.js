Ext.define('Cashier.view.reportpenerimaan.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.reportpenerimaanformdata',   
    height: 250,
    width: 1024,
    layout: 'vbox',
    bodyStyle: 'background-color:#dfe8f5;',
    requires: [
        'Cashier.library.template.component.Ptbyusercombobox',
    ],
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [   
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,                  
                    items: [
                        
                        {
                            xtype: 'splitter',
                            width: '20'
                        },	
                        {
                            xtype: 'ptbyusercombobox',
                            itemId: 'fs_pt_id',
                            name: 'projectpt_id',
                        },
                    ]
                }, 
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,                  
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'hideparam',
                            value: 'default'
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        
                        {
                            xtype: 'combobox',
                            name: 'tipetanggal',
                            fieldLabel: 'Date Filter',
                            queryMode: 'local',
                            valueField: 'tipe',
                            allowBlank: false,
                            forceSelection: true,
                            msgTarget: "side",
                            blankText: 'This should not be blank!',
                            displayField: 'description',
                            store: new Ext.data.JsonStore({
                                fields: ['tipe', 'description'],
                                data: [
                                    {tipe: 'kwitansidate', description: 'Kwitansi Date'},
                                    {tipe: 'voucherdate', description: 'Voucher Date'},
                                ]
                            }),
                        },
                    ]
                }, 
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,                  
                    items: [
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Date',
                            emptyText: 'From',
                            name: 'fromdate',
                            allowBlank: false,
                            enableKeyEvents: true,
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d'
                        },
                        {
                            xtype: 'label',
                            forId: 'myFieldId',
                            text: 'To',
                            margin: '2 30 0 30'
                        },
                        {   
                            xtype: 'datefield',
                            emptyText: 'Untildate',
                            name: 'untildate',
                            allowBlank: false,
                            enableKeyEvents: true,
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d'
                        },
                    ]
                },
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,                  
                    items: [
                        {
                            xtype: 'splitter',
                            width: '20'
                        },{
                            xtype: 'checkboxfield',
                            fieldLabel: 'Wajib Memiliki No Kuitansi',
                            name: 'checkkwitansi',
                            boxLabel: 'Kuitansi',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: '1',
                            uncheckedValue: '0',
                            checked: true
                         },
                    ]
                },
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,                  
                    items: [
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Receipt No',
                            emptyText: 'Receipt No',
                            name: 'fromreceipt',
                            allowBlank: true,
                            enableKeyEvents: true,
                        },
                        {
                            xtype: 'label',
                            forId: 'myFieldId',
                            text: 'To',
                            margin: '2 30 0 48'
                        },
                        {   
                            xtype: 'textfield',
                            emptyText: 'Receipt No',
                            name: 'untilreceipt',
                            allowBlank: true,
                            enableKeyEvents: true
                        },
                    ]
                },
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,                  
                    items: [
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'combobox',
                            name: 'tipedata',
                            fieldLabel: 'Tipe Data',
                            queryMode: 'local',
                            valueField: 'status',
                            allowBlank: false,
                            forceSelection: true,
                            msgTarget: "side",
                            blankText: 'This should not be blank!',
                            displayField: 'description',
                            store: new Ext.data.JsonStore({
                                fields: ['status', 'description'],
                                data: [
                                    {status: 'all', description: 'ALL (Active and Deleted Data)'},
                                    {status: 'active', description: 'Active (Draft,Realized,Posted)'},
                                    {status: 'realpost', description: 'Realized & Posted'},
                                    {status: 'batal', description: 'Batal (Deleted)'},
                                    {status: 'nonbatal', description: 'Non Batal (Deleted)'},
                                    {status: 'batalnonbatal', description: 'Batal & Non Batal (Deleted)'},
                                ]
                            }),
                        },
                    ]
                },
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,                  
                    items: [
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        
                        {
                            xtype: 'combobox',
                            name: 'sortby',
                            fieldLabel: 'Sort By',
                            queryMode: 'local',
                            valueField: 'tipe',
                            allowBlank: false,
                            forceSelection: true,
                            msgTarget: "side",
                            blankText: 'This should not be blank!',
                            displayField: 'description',
                            store: new Ext.data.JsonStore({
                                fields: ['tipe', 'description'],
                                data: [
                                    {tipe: 'receiptno', description: 'Receipt No'},
                                    {tipe: 'kwitansidate', description: 'Kwitansi Date'},
                                    {tipe: 'voucherdate', description: 'Voucher Date'},
                                    {tipe: 'receiptstatus', description: 'Receipt Status'},
                                ]
                            }),
                        },
                    ]
                }, 
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,                  
                    items: [
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        
                        {
                            xtype: 'combobox',
                            name: 'templatemrt',
                            fieldLabel: 'Template',
                            queryMode: 'local',
                            valueField: 'tipe',
                            allowBlank: false,
                            forceSelection: true,
                            msgTarget: "side",
                            blankText: 'This should not be blank!',
                            displayField: 'description',
                            store: new Ext.data.JsonStore({
                                fields: ['tipe', 'description'],
                                data: [
                                    {tipe: 'temp1', description: 'Template 1'},
                                    {tipe: 'temp2', description: 'Template 2'},
                                ]
                            }),
                        },
                    ]
                }, 
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    padding: '0 0 0 350px',
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
