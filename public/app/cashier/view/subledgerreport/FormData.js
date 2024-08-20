Ext.define('Cashier.view.subledgerreport.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.subledgerreportformdata',
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
                    xtype: 'panel',
                    layout: 'vbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,
                    padding: '0 0 0 20px',
                    items: [
                            {
                                xtype: 'combobox',
                                name: 'pt_pt_id',
                                fieldLabel: 'Company',
                                displayField: 'name',
                                valueField: 'pt_id',
                                width: '300',
                                forceSelection: true,
                                allowBlank: false
                            },
                            {
                                xtype: 'combobox',
                                name: 'kelsub_kelsub_id',
                                fieldLabel: 'Sub Type',
                                displayField: 'description',
                                valueField: 'kelsub_id',
                                width: '300',
                                forceSelection: true,
                                allowBlank: true
                            },
                            {
                                xtype: 'fieldcontainer',
                                fieldLabel: 'Sub Start',
                                layout: 'hbox',
                                items: [
                                         {
                                            xtype: 'combobox',
                                            name: 'subgl_subglstart_id',
                                            fieldLabel: '',
                                            displayField: 'code',
                                            valueField: 'subgl_id',
                                            forceSelection: true,
                                            allowBlank: true
                                        },
                                        {
                                            xtype: 'label',
                                            forId: 'lbl1',
                                            text: 'Sub End',
                                            margin: '2 10 0 10'
                                        },
                                        {
                                            xtype: 'combobox',
                                            name: 'subgl_subglend_id',
                                            fieldLabel: '',
                                            displayField: 'code',
                                            valueField: 'subgl_id',
                                            forceSelection: true,
                                            allowBlank: true
                                        },
                                ]
                            },
                            {
                                xtype: 'fieldcontainer',
                                fieldLabel: 'Coa Start',
                                layout: 'hbox',
                                items: [
                                         {
                                            xtype: 'combobox',
                                            name: 'coa_coastart_id',
                                            fieldLabel: '',
                                            displayField: 'coa',
                                            valueField: 'coa_id',
                                            forceSelection: true,
                                            allowBlank: true
                                        },
                                        {
                                            xtype: 'label',
                                            forId: 'lbl1',
                                            text: 'Coa End',
                                            margin: '2 10 0 10'
                                        },
                                        {
                                            xtype: 'combobox',
                                            name: 'coa_coaend_id',
                                            fieldLabel: '',
                                            displayField: 'coa',
                                            valueField: 'coa_id',
                                            forceSelection: true,
                                            allowBlank: true
                                        },
                                ]
                            },
                            {
                                xtype: 'fieldcontainer',
                                fieldLabel: 'Tanggal Transaksi',
                                layout: 'hbox',
                                items: [
                                        {
                                            xtype: 'datefield',
                                            fieldLabel:'',
                                            emptyText: 'From Date',
                                            name: 'fromdate',
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
                                            fieldLabel:'',
                                            emptyText: 'Until Date',
                                            name: 'untildate',
                                            allowBlank: false,
                                            format: 'd-m-Y',
                                            submitFormat: 'Y-m-d'
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
                                        boxLabel: 'Yes',
                                        xtype: 'radiofield',
                                        name: 'detaildata',
                                        inputValue: '1',
                                        id: 'detailyes',
                                        checked:true
                                    },
                                    {
                                        xtype: 'splitter',
                                        width: '50'
                                    },
                                    {
                                        boxLabel: 'No',
                                        xtype: 'radiofield',
                                        name: 'detaildata',
                                        inputValue: '2',
                                        id: 'detailno'
                                    }
                                ]
                            },
                            {
                                xtype: 'combobox',
                                name: 'department_department_id',
                                fieldLabel: 'Dept',
                                displayField: 'name',
                                valueField: 'department_id',
                                hidden: true,
                                width: '300',
                                forceSelection: true,
                                allowBlank: true
                            },
                            {
                                xtype: 'fieldcontainer',
                                fieldLabel: 'Year',
                                layout: 'hbox',
                                hidden: true,
                                items: [
                                        {
                                            xtype: 'yearcombobox',
                                            fieldLabel:'',
                                            emptyText: 'Year',
                                            name: 'yeardata',
                                            allowBlank: false,
                                        }
                                ]
                            }, 
                            {
                                xtype: 'fieldcontainer',
                                fieldLabel: 'Period',
                                layout: 'hbox',
                                hidden: true,
                                items: [
                                         {
                                            xtype: 'monthcombobox',
                                            fieldLabel:'',
                                            emptyText: 'Month',
                                            name: 'monthdata',
                                            allowBlank: true,
                                        },
                                        {
                                            xtype: 'monthcombobox',
                                            fieldLabel:' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Until',
                                            emptyText: 'Month',
                                            name: 'monthdatauntil',
                                            allowBlank: true,
                                        }
                                ]
                            }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    padding: '0 0 0 10px',
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
