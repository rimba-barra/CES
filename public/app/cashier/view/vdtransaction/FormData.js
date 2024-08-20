Ext.define('Cashier.view.vdtransaction.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.vdtransactionformdata',
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
                            fieldLabel: 'Project',
                            layout: 'hbox',
                            width: 1000,
                            items: [                               
                                {
                                    xtype: 'projectcombobox',
                                    fieldLabel:'',
                                    emptyText: 'Select Project',
                                    name: 'project_id',
                                    allowBlank: false,
                                    enableKeyEvents: true,
                                    tpl: '',
                                    width: 250,
                                    matchFieldWidth: true,
                                    forceSelection: true
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'PT',
                            layout: 'hbox',
                            width: 1000,
                            items: [                               
                                {
                                    xtype: 'ptprojectcustomcombobox',
                                    fieldLabel:'',
                                    emptyText: 'Select PT',
                                    name: 'pt_id_from',
                                    id: 'pt_id_from',
                                    allowBlank: false,
                                    enableKeyEvents: true,
                                    width: 250,
                                },
                                {
                                    xtype: 'label',
                                    forId: 'lbltopt',
                                    text: 'To',
                                    margin: '2 10 0 25'
                                },
                                {
                                    xtype: 'ptprojectcustomcombobox',
                                    fieldLabel:'',
                                    emptyText: 'Select PT',
                                    name: 'pt_id_to',
                                    id: 'pt_id_to',
                                    allowBlank: false,
                                    enableKeyEvents: true,
                                    width: 250,
                                },
                            ]
                        },  
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Vendor From',
                            layout: 'hbox',
                            width: 1000,
                            items: [
                                {
                                    xtype: 'vendorcombobox',
                                    fieldLabel: '',
                                    emptyText: 'Type Vendor Name...',
                                    name: 'from_vendor_id',
                                    allowBlank: false,
                                    enableKeyEvents : true,
                                    width: 250,
                                    listeners: {
                                        render: function(c) {
                                         Ext.QuickTips.register({
                                           target: c.getEl(),
                                           text: 'Ketik nama vendor untuk melakukan pencarian vendor lainnya.',
                                           enabled: true,
                                           showDelay: 20,
                                           trackMouse: true,
                                           autoShow: true
                                         });
                                       }
                                   } 
                                },
                                {
                                    xtype: 'label',
                                    forId: 'lbl1',
                                    text: 'To',
                                    margin: '2 10 0 25'
                                },
                                {
                                    xtype: 'vendorcomboboxV2',
                                    fieldLabel: '',
                                    emptyText: 'Type Vendor Name...',
                                    name: 'until_vendor_id',
                                    allowBlank: false,
                                    enableKeyEvents : true,
                                    width: 250,
                                    listeners: {
                                        render: function(c) {
                                         Ext.QuickTips.register({
                                           target: c.getEl(),
                                           text: 'Ketik nama vendor untuk melakukan pencarian vendor lainnya.',
                                           enabled: true,
                                           showDelay: 20,
                                           trackMouse: true,
                                           autoShow: true
                                         });
                                       }
                                   } 
                                },
                                {
                                    xtype: 'label',
                                    forId: 'lbl2',
                                    text: ' ',
                                    margin: '2 0 0 25'
                                },
                                {
                                    xtype: 'checkbox',
                                    boxLabel: 'All',
                                    name: 'allvendor',
                                    checked: false,
                                    inputValue: '1'
                                }
                            ]
                        },     
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Department From',
                            layout: 'hbox',
                            width: 1000,
                            items: [
                                {
                                    xtype: 'departmentbyusercombobox',
                                    fieldLabel: '',
                                    emptyText: 'From Department',
                                    name: 'from_dept_id',
                                    allowBlank: false,
                                    enableKeyEvents : true,
                                    width: 250
                                },
                                {
                                    xtype: 'label',
                                    forId: 'lbl1',
                                    text: 'To',
                                    margin: '2 10 0 25'
                                },
                                {
                                    xtype: 'departmentbyusercombobox',
                                    fieldLabel: '',
                                    emptyText: 'Until Department',
                                    name: 'until_dept_id',
                                    allowBlank: false,
                                    enableKeyEvents : true,
                                    width: 250
                                },
                            ]
                        },                                                         
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Transaction Date',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: '',
                                    emptyText: 'From Date',
                                    name: 'from_date',
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
                                    name: 'until_date',
                                    allowBlank: false,
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d'
                                }
                            ]
                        },
                        
                   
                      
                        
                    ]
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
                            fieldLabel: 'Transaction Type',
                            padding: '0 0 0 20px',
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'All',
                                    xtype: 'radiofield',
                                    name: 'trans_type',
                                    inputValue: '',
                                    id: 'radio1',
                                    checked:true
                                },
                                {
                                    xtype: 'splitter',
                                    width: '50'
                                },
                                {
                                    boxLabel: 'Kas',
                                    xtype: 'radiofield',
                                    name: 'trans_type',
                                    inputValue: 'K',
                                    id: 'radio2'
                                },
                                 {
                                    xtype: 'splitter',
                                    width: '50'
                                },
                                {
                                    boxLabel: 'Bank',
                                    xtype: 'radiofield',
                                    name: 'trans_type',
                                    inputValue: 'B',
                                    id: 'radio3'
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Group By',
                            padding: '0 0 0 20px',
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'List',
                                    xtype: 'radiofield',
                                    name: 'group_by',
                                    inputValue: '1',
                                    id: 'radiogroup1',
                                    checked:true
                                },
                                {
                                    xtype: 'splitter',
                                    width: '44'
                                },
                                {
                                    boxLabel: 'Dept',
                                    xtype: 'radiofield',
                                    name: 'group_by',
                                    inputValue: '2',
                                    id: 'radiogroup2'
                                },
                                 {
                                    xtype: 'splitter',
                                    width: '44'
                                },
                                {
                                    boxLabel: 'Vendor',
                                    xtype: 'radiofield',
                                    name: 'group_by',
                                    inputValue: '3',
                                    id: 'radiogroup3'
                                },
                                 {
                                    xtype: 'splitter',
                                    width: '45'
                                },
                                {
                                    boxLabel: 'Tanggal',
                                    xtype: 'radiofield',
                                    name: 'group_by',
                                    inputValue: '4',
                                    id: 'radiogroup4'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Data Flow',
                            padding: '0 0 0 20px',
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'All',
                                    xtype: 'radiofield',
                                    name: 'data_flow',
                                    inputValue: '',
                                    id: 'radioflow1',
                                    checked:true
                                },
                                {
                                    xtype: 'splitter',
                                    width: '50'
                                },
                                {
                                    boxLabel: 'IN',
                                    xtype: 'radiofield',
                                    name: 'data_flow',
                                    inputValue: 'I',
                                    id: 'radioflow2'
                                },
                                 {
                                    xtype: 'splitter',
                                    width: '57'
                                },
                                {
                                    boxLabel:'OUT',
                                    xtype: 'radiofield',
                                    name: 'data_flow',
                                    inputValue: 'O',
                                    id: 'radioflow3'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Detail COA',
                            padding: '0 0 0 20px',
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'Yes',
                                    xtype: 'radiofield',
                                    name: 'detail_coa',
                                    inputValue: '1',
                                    id: 'radiodetail1',
                                    checked:true
                                },
                              
                                {
                                    xtype: 'splitter',
                                    width: '44'
                                },

                                  {
                                    boxLabel: 'No',
                                    xtype: 'radiofield',
                                    name: 'detail_coa',
                                    inputValue: '2',
                                    id: 'radiodetail2'
                                },
                               
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Status',
                            padding: '0 0 0 20px',
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'All',
                                    xtype: 'radiofield',
                                    name: 'status',
                                    inputValue: '0',
                                    id: 'radiostatus1',
                                    checked:true
                                },
                                {
                                    xtype: 'splitter',
                                    width: '44'
                                },
                                {
                                    boxLabel: 'Draft',
                                    xtype: 'radiofield',
                                    name: 'status',
                                    inputValue: '1',
                                    id: 'radiostatus2'
                                },
                                {
                                    xtype: 'splitter',
                                    width: '44'
                                },
                                {
                                    boxLabel: 'Realized',
                                    xtype: 'radiofield',
                                    name: 'status',
                                    inputValue: '3',
                                    id: 'radiostatus3'
                                },
                               
                            ]
                        },
                         {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Report Type',
                            layout: 'hbox',
                            items: [
                                     {
                                       xtype:'combobox',
                                       name:'reporttype',
                                       valueField: 'reporttype',
                                       queryMode:'local',
                                       dvalue: 'DEFAULT',
                                       store:['DEFAULT','EXCEL'],
                                       autoSelect:true,
                                       forceSelection:true,
                                           listeners: {
                                            afterrender: function() {
                                               this.setValue(this.dvalue);    
                                            }
                                        }
                                    }
                            ]
                        }

                    ]
                },
              /* {
                    xtype: 'tbspacer',
                    height: 20
                },
                */
               
               /* {
                    xtype: 'tbspacer',
                    height: 15
                },
                */
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
