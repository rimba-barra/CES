Ext.define('Cashier.view.masterconsolidation.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.masterconsolidationformdata',
    frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    deletedRows: [],
    editedRow: -1,
    muniquename: "_masterconsolidation",
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [{
                    xtype: 'hiddenfield',
                    name: 'consolidation_id'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                        xtype: 'textfield',
                        fieldLabel: 'Group Name ',
                        emptyText: 'Group Consolidation For ... ',
                        width    : 400,
                        name: 'group_consolidation',
                        allowBlank: false,
                        hidden: false,
                        padding: '0 0 0 10'
                    }]
                },
                {
                    xtype: 'combobox',
                    name: 'user_user_id',
                    fieldLabel: 'Name',
                    hidden: true,
                    enforceMaxLength: true,
                    forceSelection: true,
                    displayField: 'user_fullname',
                    valueField: 'user_id',
                    queryMode: 'local',
                    width    : 500,
                    tpl: Ext.create('Ext.XTemplate',
                        '<table class="x-grid-table" width="500px" >',
                        '<tr class="x-grid-row">',
                        '<th width="80px"><div class="x-column-header x-column-header-inner">Full Name</div></th>',
                        '<th width="100px"><div class="x-column-header x-column-header-inner">Email</div></th>',
                        '</tr>',
                        '<tpl for=".">',
                        '<tr class="x-boundlist-item">',
                        '<td ><div class="x-grid-cell x-grid-cell-inner">{user_fullname}</div></td>',
                        '<td ><div class="x-grid-cell x-grid-cell-inner">{user_email}</div></td>',
                        '</tr>',
                        '</tpl>',
                        '</table>'
                    ),
                },
                {
                    // Fieldset in Column 1
                    xtype: 'fieldset',
                    title: 'Add Company To Consolidation List',
                    collapsible: false,
                    defaults: {
                        anchor: '100%'
                    },
                    layout: 'vbox',
                    padding: '0 0 0 10', //(top, right, bottom, left).
                    items: [{
                            xtype: 'fieldcontainer',
                            layout: 'vbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    name: 'project_project_id',
                                    fieldLabel: 'Project',
                                    enforceMaxLength: true,
                                    forceSelection: true,
                                    displayField: 'name',
                                    width    : 400,
                                    valueField: 'project_id',
                                    queryMode: 'local',
                                    tpl: Ext.create('Ext.XTemplate',
                                        '<table class="x-grid-table" width="500px" >',
                                        '<tr class="x-grid-row">',
                                        '<th width="15px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                                        '<th width="100px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                                        '</tr>',
                                        '<tpl for=".">',
                                        '<tr class="x-boundlist-item">',
                                        '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                                        '<td ><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
                                        '</tr>',
                                        '</tpl>',
                                        '</table>'
                                    ),
                                    enableKeyEvents: true,
                                    listeners: {
                                        keyup: function (field) {
                                            var searchString = field.getRawValue().toString().toLowerCase();
                                            if(searchString == null){
                                                return false;
                                            }
                                            if (searchString) {
                                                this.store.filterBy(function (record, id) {
                                                    if (record.get('name') == null || record.get('code') == null) {
                                                        return false;
                                                    }else{
                                                        if (record.get('name').toString().toLowerCase().indexOf(searchString) > -1) {
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
                                    }, 
                                },
                                {
                                    xtype: 'combobox',
                                    name: 'pt_pt_id',
                                    fieldLabel: 'PT',
                                    enforceMaxLength: true,
                                    forceSelection: true,
                                    displayField: 'name',
                                    valueField: 'pt_id',
                                    width    : 400,
                                    queryMode: 'local',
                                    tpl: Ext.create('Ext.XTemplate',
                                        '<table class="x-grid-table" width="500px" >',
                                        '<tr class="x-grid-row">',
                                        '<th width="15px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                                        '<th width="100px"><div class="x-column-header x-column-header-inner">PT</div></th>',
                                        '</tr>',
                                        '<tpl for=".">',
                                        '<tr class="x-boundlist-item">',
                                        '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                                        '<td ><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
                                        '</tr>',
                                        '</tpl>',
                                        '</table>'
                                    ),
                                    enableKeyEvents: true,
                                    queryMode: 'local',
                                    listeners: {
                                        keyup: function (field) {
                                            var searchString = field.getRawValue().toString().toLowerCase();
                                            if(searchString == null){
                                                return false;
                                            }
                                            if (searchString) {
                                                this.store.filterBy(function (record, id) {
                                                    if (record.get('name') == null || record.get('code') == null) {
                                                        return false;
                                                    }else{
                                                        if (record.get('name').toString().toLowerCase().indexOf(searchString) > -1) {
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
                                    }, 
                                },
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Percentage ',
                                    emptyText: '',
                                    value: 100,
                                    width    : 180,
                                    name: 'percentage',
                                    allowBlank: false,
                                    hidden: false,
                                    maxValue: 100,
                                    minValue: 10,
                                    allowNegative: false,
                                    allowDecimals: false,
                                    listeners: {
                                        change: function (component, newValue, oldValue) {
                                            if (newValue > 100 && newValue < 10)
                                                component.setValue(100);
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    action: 'addtolist',
                                    itemId: 'btnAdd',
                                    padding: 5,
                                    width: 100,
                                    iconCls: 'icon-approve',
                                    text: 'Add To List'
                                }
                            ]
                        }

                    ]
                },
                {
                    // Fieldset in Column 1
                    xtype: 'fieldset',
                    title: 'Add Consolidation Group to List',
                    collapsible: false,
                    defaults: {
                        anchor: '100%'
                    },
                    layout: 'vbox',
                    padding: '0 0 0 10', //(top, right, bottom, left).
                    items: [{
                            xtype: 'fieldcontainer',
                            layout: 'vbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'consolidationcombobox',
                                    name: 'consol_consolidation_id',
                                    fieldLabel: 'Group',
									width    : 400,
                                    enforceMaxLength: true,
                                    forceSelection: true,
                                    queryMode: 'local',
                                },
                                {
                                    xtype: 'button',
                                    action: 'addtolistconsol',
                                    itemId: 'btnAdd',
                                    padding: 5,
                                    width: 100,
                                    iconCls: 'icon-approve',
                                    text: 'Add To List'
                                }
                            ]
                        }

                    ]
                },
                {
                    xtype: 'masterconsolidationdetailgrid',
                    closable: false,
                    name: 'masterconsolidationdetailgrid',
                    title: 'Detail Company ',
                    flex: 1,
                    itemId: 'tabDetailCompany',
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        
                        {
                                xtype: 'ptprojectcombobox',
                                fieldLabel:'PT Induk ',
                                emptyText: 'Select Company',
                                name: 'pt_pt_idref',
                                allowBlank: false,
                                queryMode: 'local',
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
                                }, 
                        }

                    ]
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function() {
        var x = [{
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                padding: 6,
                type: 'hbox'
            },
            items: [{
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
                    handler: function() {
                        this.up('window').close();
                    }
                }
            ]
        }];
        return x;
    },
});