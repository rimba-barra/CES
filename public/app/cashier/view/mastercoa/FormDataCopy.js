Ext.define('Cashier.view.mastercoa.FormDataCopy', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.mastercoaformdatacopy',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    deletedRows: [],
    editedRow: -1,
    id: 'mastercoaid',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '97%'
            },
            items: [{
                xtype: 'hiddenfield',
                name: 'coa_id'
            },
            {
                xtype: 'combobox',
                name: 'project_id',
                fieldLabel: 'Project',
                displayField: 'project_name',
                valueField: 'project_project_id',
                width: 200,
                queryMode: 'local',
                allowBlank: false,
                msgTarget: "side",
                enforceMaxLength: true,
                blankText: 'This should not be blank!',
                tpl: Ext.create('Ext.XTemplate',
                    '<table class="x-grid-table" width="500px">',
                    '<tr class="x-grid-row">',
                    '<th width="40px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                    '<th width="200px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                    '</tr>',
                    '<tpl for=".">',
                    '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{project_name}</div></td>',
                    '</tr>',
                    '</tpl>',
                    '</table>'
                    ),
            },
            {
                xtype: 'combobox',
                name: 'pt_id',
                fieldLabel: 'PT',
                displayField: 'name',
                valueField: 'pt_id',
                forceSelection: true,
                allowBlank: false,
                readOnly: false,
                enforceMaxLength: true,
                queryMode: 'local',
                rowdata: null,
                matchFieldWidth: false,
                width: 200,
                msgTarget: "side",
                blankText: 'This should not be blank!',
                tpl: Ext.create('Ext.XTemplate',
                    '<table class="x-grid-table" width="500px">',
                    '<tr class="x-grid-row">',
                    '<th width="40px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                    '<th width="200px"><div class="x-column-header x-column-header-inner">Company</div></th>',
                    '<th width="200px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                    '</tr>',
                    '<tpl for=".">',
                    '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{project_name}</div></td>',
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
                name: 'copy_project_id',
                fieldLabel: 'Copy to Project',
                displayField: 'project_name',
                valueField: 'project_project_id',
                width: 200,
                queryMode: 'local',
                allowBlank: false,
                msgTarget: "side",
                enforceMaxLength: true,
                blankText: 'This should not be blank!',
            },
            {
                xtype: 'combobox',
                name: 'copy_pt_id',
                fieldLabel: 'Copy to PT',
                displayField: 'name',
                valueField: 'pt_id',
                forceSelection: true,
                width: 200,
                allowBlank: false,
                readOnly: false,
                enforceMaxLength: true,
                queryMode: 'local',
                rowdata: null,
                matchFieldWidth: false,
                msgTarget: "side",
                blankText: 'This should not be blank!',
                tpl: Ext.create('Ext.XTemplate',
                    '<table class="x-grid-table" width="500px">',
                    '<tr class="x-grid-row">',
                    '<th width="40px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                    '<th width="200px"><div class="x-column-header x-column-header-inner">Company</div></th>',
                    '<th width="200px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                    '</tr>',
                    '<tpl for=".">',
                    '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{project_name}</div></td>',
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
                xtype: 'radiogroup',
                fieldLabel: 'Copy Method',
                columns: 3,
                vertical: true,
                width: 200,
                allowBlank: false,
                items: [
                { boxLabel: 'Selected Data', name: 'copy_method', inputValue: 1, checked: true },
                { boxLabel: 'All Data', name: 'copy_method', inputValue: 0 }
                ]
            },
            {
                xtype: 'radiogroup',
                fieldLabel: 'Copy Sub Group',
                columns: 3,
                vertical: true,
                width: 200,
                allowBlank: false,
                items: [
                { boxLabel: 'Yes', name: 'copy_sub_group', inputValue: 1, checked: true },
                { boxLabel: 'No', name: 'copy_sub_group', inputValue: 0 }
                ]
            }
            ],
            dockedItems: me.generateDockedItem()
        });

me.callParent(arguments);
},
generateDockedItem: function () {
    var x = [
    {
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
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
            width: 75, iconCls: 'icon-save',
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
});

