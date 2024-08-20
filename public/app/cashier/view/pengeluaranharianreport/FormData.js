Ext.define('Cashier.view.pengeluaranharianreport.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.pengeluaranharianreportformdata',
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
               
              /* {
                    xtype: 'tbspacer',
                    height: 20
                },
                */
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
                            items: [                               
                                    {
                                        xtype: 'projectcombobox',
                                        fieldLabel:'',
                                        emptyText: 'Select Project',
                                        name: 'project_id',
                                        allowBlank: false,
                                        enableKeyEvents: true,
                                        tpl: Ext.create('Ext.XTemplate',
                                          '<table class="x-grid-table" width="250px" >',
                                            '<tr class="x-grid-row">',
                                              
                                                '<th width="200px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                                            '</tr>',
                                            '<tpl for=".">',
                                                '<tr class="x-boundlist-item">',
                                                    '<td><div class="x-grid-cell x-grid-cell-inner">{projectname}</div></td>',
                                                '</tr>',
                                            '</tpl>',
                                         '</table>'
                                     ),    
                                    },
                            ]
                        },              
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'PT',
                            layout: 'hbox',
                            items: [                               
                                    {
                                        xtype: 'ptprojectcombobox',
                                        fieldLabel:'',
                                        emptyText: 'Select PT',
                                        name: 'pt_id',
                                        allowBlank: false,
                                        enableKeyEvents: true
                                    },
                            ]
                        }, 

                       

                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Department',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'departmentcombobox',
                                    fieldLabel: '',
                                    emptyText: 'ALL',
                                    name: 'dept_id',
                                    allowBlank: false,
                                    enableKeyEvents : true
                                    
                                },
                                   {
                                    xtype: 'splitter',
                                    width: '5'
                                },
                                 {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    name: 'dept_all',
                                    boxLabel: 'All',
                                    padding: '0 0 0 0',
                                    margin: '0 0 0 0',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    checked: false
                                },
                                
                            ]
                        },                                          
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Voucher Date',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: '',
                                    emptyText: 'From Date',
                                    name: 'voucher_fromdate',
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
                                    name: 'voucher_untildate',
                                    allowBlank: false,
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d'
                                }
                            ]
                        },
                       {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Due Date',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: '',
                                    emptyText: 'From Date',
                                    name: 'due_fromdate',
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
                                    name: 'due_untildate',
                                    allowBlank: false,
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Status',
                            layout: 'hbox',
                            items: [
                                     {
                                       xtype:'combobox',
                                       name:'statustype',
                                       valueField: 'statustype',
                                       queryMode:'local',
                                       dvalue: 'ALL',
                                       store:['ALL','NEW','PAID','REALIZED'],
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
                            fieldLabel: 'TKB',
                            layout: 'hbox',
                            items: [
                                     {
                                       xtype:'combobox',
                                       name:'tkb',
                                       valueField: 'tkb',
                                       queryMode:'local',
                                       dvalue: 'ALL',
                                       store:['ALL','YES','NO'],
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
