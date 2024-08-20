Ext.define('Cashier.view.subcoalist.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.subcoalistformdata',
    layout: 'vbox',
    bodyStyle: 'background-color:#dfe8f5;',
    height: 250,
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
              /*  {
                    xtype: 'hiddenfield',
                    name: 'pt_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'project_id',
                }, */
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,
                    padding: '0 0 0 120px',
                    items: [
                       /*{
                            xtype: 'fieldcontainer',
                            fieldLabel: 'PT',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'ptbyusercombobox',
                                    fieldLabel: '',
                                    emptyText: 'Select Data',
                                    name: 'projectpt_id',
                                    allowBlank: false,
                                }
                            ]
                        }*/
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
                                        forceSelection: true,
                                        rowdata: null,
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
                                        listeners: {
                                            keyup: function (field) {
                                                var searchString = field.getRawValue().toString().toLowerCase();
                                                if(searchString == null){
                                                    return false;
                                                }
                                                if (searchString) {
                                                    this.store.filterBy(function (record, id) {
                                                        if (record.get('projectname') == null ) {
                                                            return false;
                                                        }else{
                                                            if (record.get('projectname').toString().toLowerCase().indexOf(searchString) > -1) {
                                                                return true;
                                                                this.store.clearFilter(true);
                                                            } else {
                                                                return false;
                                                                this.store.clearFilter(true);
                                                            }    
                                                        }

                                                    });
                                                }
                                            },
                                            buffer:300
                                        }    
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
                                        forceSelection: true,
                                        rowdata: null,
                                        enableKeyEvents: true,
                                        listeners: {
                                            keyup: function (field) {
                                                var searchString = field.getRawValue().toString().toLowerCase();
                                                if(searchString == null){
                                                    return false;
                                                }
                                                if (searchString) {
                                                    this.store.filterBy(function (record, id) {
                                                        if (record.get('ptname') == null || record.get('code') == null) {
                                                            return false;
                                                        }else{
                                                            if (record.get('ptname').toString().toLowerCase().indexOf(searchString) > -1) {
                                                                return true;
                                                                this.store.clearFilter(true);
                                                            } else if (record.get('code').toString().toLowerCase().indexOf(searchString) > -1) {
                                                                return true;
                                                                this.store.clearFilter(true);
                                                            } else {
                                                                return false;
                                                                this.store.clearFilter(true);
                                                            }    
                                                        }

                                                    });
                                                }
                                            },
                                            buffer:300
                                        }
                                    },
                            ]
                        },             
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Sub Account Group',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'subaccountgroupcombobox',
                                    fieldLabel: '',
                                    emptyText: 'Select Data',
                                    name: 'subaccgroup_id',
                                },
                               {
                                    xtype: 'splitter',
                                    width: '5'
                                },
                                 {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    name: 'subaccgroup_all',
                                    boxLabel: 'All',
                                    padding: '0 0 0 0',
                                    margin: '0 0 0 0',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    checked: true
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Format Report',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype:'combobox',
                                    name:'formatreport',
                                    valueField: 'formatreport',
                                    queryMode:'local',
                                    dvalue: 'DEFAULT',
                                    store:['DEFAULT', 'EXCEL'],
                                    autoSelect:true,
                                    forceSelection:true,
                                        listeners: {
                                         afterrender: function() {
                                            this.setValue(this.dvalue);    
                                         }
                                     }
                                 },
                            ]
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
                    padding: '0 0 0 250px',
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
