Ext.define('Cashier.view.mutasikasbank.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.mutasikasbankformdata',
    layout: 'vbox',
    padding: '0 0 0 10',
    bodyStyle: 'background-color:#dfe8f5;',
    border: false,
    uniquename:'_fmutasikasbank',
    id: 'mutasikasbankID',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: ''
            },
            items: [
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'hiddenfield',
                    id: 'hideparam'+me.uniquename,
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'projectcombobox',
                    fieldLabel:'Project',
                    emptyText: 'Select Project',
                    name: 'project_id',
                    allowBlank: false,
                    enableKeyEvents: true,
                    margin: '0 0 5 0',
                    width: 400,
                    enforeMaxLength: true,
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
                                    if (record.get('projectname') == null) {
                                        return false;
                                    }else{
                                        if (record.get('projectname').toString().toLowerCase().indexOf(searchString) > -1) {
                                            return true;
                                            this.store.clearFilter(true);
                                        }
                                    }

                                });
                            }
                        },
                        buffer:300
                    }
                },
                {
                    xtype: 'ptprojectcombobox',
                    fieldLabel:'PT',
                    emptyText: 'Select PT',
                    name: 'pt_id',
                    allowBlank: false,
                    margin: '0 0 5 0',
                    enableKeyEvents: true,
                    forceSelection: true,
                    width: 400,
                    listeners: {
                        keyup: function (field) {
                            var searchString = field.getRawValue().toString().toLowerCase();
                            if(searchString == null){
                                return false;
                            }
                            if (searchString) {
                                this.store.filterBy(function (record, id) {
                                    if (record.get('ptname') == null || record.get('code') == null || record.get('projectname') == null) {
                                        return false;
                                    }else{
                                        if (record.get('ptname').toString().toLowerCase().indexOf(searchString) > -1) {
                                            return true;
                                            this.store.clearFilter(true);
                                        } else if (record.get('code').toString().toLowerCase().indexOf(searchString) > -1) {
                                            return true;
                                            this.store.clearFilter(true);
                                        } else if (record.get('projectname').toString().toLowerCase().indexOf(searchString) > -1) {
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
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'COA',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [

                        {
                            xtype: 'coacombogrid',
                            fieldLabel: '',
                            emptyText: 'From COA',
                            name: 'sub_coa_from_id',
                            allowBlank: false,
                            enableKeyEvents : true,
                            forceSelection: true,
                            typeAhead: true,
                            listeners: {
                                keyup: function (field) {
                                    var me = this;
                                    var c = 0;
                                    var searchString = field.getValue().toLowerCase();
                                    var store = field.getPicker().getStore();
                                    if (searchString) {

                                        store.filterBy(function (record, id) {
                                            if (record.get('name').toLowerCase().indexOf(searchString) > -1) {
                                                return true;
                                                store.clearFilter(true);
                                            } else if (record.get('coa').indexOf(searchString) > -1) {
                                                return true;
                                                store.clearFilter(true);
                                            } else {
                                                return false;
                                                store.clearFilter(true);
                                            }
                                        });
                                    }
                                },
                                buffer: 300,
                            },
                            
                        },
                        
                        {
                            xtype: 'label',
                            forId: 'lbl1',
                            text: 'To',
                            margin: '2 10 0 10'
                        },
                        {
                            xtype: 'coacombogrid',
                            fieldLabel: '',
                            emptyText: 'Until COA',
                            name: 'sub_coa_until_id',
                            allowBlank: false,
                            enableKeyEvents : true,
                            typeAhead: true,
                            forceSelection: true,
                            listeners: {
                                keyup: function (field) {
                                    var me = this;
                                    var c = 0;
                                    var searchString = field.getValue().toLowerCase();
                                    var store = field.getPicker().getStore();
                                    if (searchString) {

                                        store.filterBy(function (record, id) {
                                            if (record.get('name').toLowerCase().indexOf(searchString) > -1) {
                                                return true;
                                                store.clearFilter(true);
                                            } else if (record.get('coa').indexOf(searchString) > -1) {
                                                return true;
                                                store.clearFilter(true);
                                            } else {
                                                return false;
                                                store.clearFilter(true);
                                            }
                                        });
                                    }
                                },
                                buffer: 300,
                            },
                        },
                    ]
                },  
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Department',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        {
                            xtype: 'departmentcombobox',
                            fieldLabel: '',
                            emptyText: 'ALL',
                            name: 'dept_id',
                            margin: '0 0 5 0',
                            enableKeyEvents : true
                            
                        },
                        {
                            xtype: 'checkbox',
                            inputValue: 'All',
                            boxLabel: 'All',
                            name: 'dept_all',
                            checked: true,
                            margin: '0 0 0 5'
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Periode',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: '',
                            emptyText: 'From Date',
                            name: 'periodfrom',
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
                            name: 'periodto',
                            allowBlank: false,
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d'
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Liquid',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        {
                            boxLabel: 'All',
                            xtype: 'radiofield',
                            name: 'is_liquid',
                            inputValue: '2',
                            id: 'radioliquid3',
                            checked:true 
                        },
                        {
                            boxLabel: 'Liquid',
                            xtype: 'radiofield',
                            name: 'is_liquid',
                            inputValue: '1',
                            id: 'radioliquid2',
                            margin: '0 0 0 65'
                        },
                        {
                            xtype: 'splitter',
                            width: '60'
                        },
                        {
                            boxLabel: 'Non-Liquid',
                            xtype: 'radiofield',
                            name: 'is_liquid',
                            inputValue: '0',
                            id: 'radioliquid1',
                            margin: '0 0 0 20'
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Detail',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        {
                            boxLabel: 'Yes',
                            xtype: 'radiofield',
                            name: 'is_detail',
                            inputValue: '1',
                            id: 'detail1',
                            checked:true 
                        },
                        {
                            boxLabel: 'No',
                            xtype: 'radiofield',
                            name: 'is_detail',
                            inputValue: '0',
                            id: 'detail2',
                            margin: '0 0 0 60'
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Sort By',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        {
                            boxLabel: 'Date',
                            xtype: 'radiofield',
                            name: 'sortby',
                            inputValue: '1',
                            id: 'sortby1',
                            checked:true 
                        },
                        {
                            boxLabel: 'Voucher No.',
                            xtype: 'radiofield',
                            name: 'sortby',
                            inputValue: '2',
                            id: 'sortby2',
                            margin: '0 0 0 55'
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    margin: '10 0 0 200',
                    items: [
                        {
                            xtype: 'button',
                            action: 'submit',
                            itemId: 'btnSubmit',
                            iconCls: 'icon-print',
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
                            margin: '0 0 0 5',
                            handler: function () {
                                this.up('window').close();
                            }
                        }
                    ]
                },
                 
            ],
        });
        me.callParent(arguments);
    },
});
