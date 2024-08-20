Ext.define('Cashier.view.subaccountgroup.FormDataMerge', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.subaccountgroupformdatamerge',
    // requires: ['Cashier.library.template.component.Facilitiestypecombobox'],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 200,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;
        var mystore = Ext.create('Ext.data.Store', {
            alias: 'kelsubdata',
            autoLoad: false,
            fields: [
            {
                name: 'project_id',
                type: 'int'
            },
            {
                name: 'pt_id',
                type: 'int'
            }, 
            {
                name: 'kelsub_id',
                type: 'int'
            },
            {
                name: 'kelsub',
                type: 'string'
            },
            {
                name: 'fullnamekelsub',
                type: 'string'
            },
            {
                name: 'description',
                type: 'string'
            },

            ]
        });
        var mystore1 = Ext.create('Ext.data.Store', {
            alias: 'kelsubdata2',
            autoLoad: false,
            fields: [
            {
                name: 'project_id',
                type: 'int'
            },
            {
                name: 'pt_id',
                type: 'int'
            }, 
            {
                name: 'kelsub_id',
                type: 'int'
            },
            {
                name: 'kelsub',
                type: 'string'
            },
            {
                name: 'fullnamekelsub',
                type: 'string'
            },
            {
                name: 'description',
                type: 'string'
            },
            ]
        });
        Ext.applyIf(me, {
            defaults: {
                //labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
            {
                xtype: 'hiddenfield',
                name: 'hideparam',
                value: 'defaultdata'
            },
            {
                xtype: 'hiddenfield',
                name: 'pt_id',
            },
            {
                xtype: 'hiddenfield',
                name: 'project_id',
            },
            {
                xtype: 'projectptallcombobox',
                fieldLabel: 'Pt/Company',
                itemId: 'fdms_projectpts_id',
                id: 'fdms_projectpts_id',
                name: 'projectpt_id',
                emptyText: 'Project Company',
                allowBlank: false,
                margin: '0 0 5px 0',
                enforceMaxLength: true,
                enableKeyEvents: true,
                forceSelection: true,
                rowdata: null,
                listeners : {
                    keyup: function (field) {
                        if (field.getValue() !=null) {
                        var searchString = field.getValue().toString().toLowerCase();
                            if (searchString) {
                                this.store.filterBy(function (record, id) {
                                    if (record.get('ptname').toString().toLowerCase().indexOf(searchString) > -1) {
                                        return true;
                                        this.store.clearFilter(true);
                                    } else if (record.get('ptcode').toString().toLowerCase().indexOf(searchString) > -1) {
                                        return true;
                                        this.store.clearFilter(true);
                                    } else {
                                        return false;
                                        this.store.clearFilter(true);
                                    }
                                });
                            }
                            }
                        }
                    ,
                    buffer:300
                }
            },
            {
                xtype: 'combobox',
                itemId: 'fdms_description',
                name: 'kelsub_deleted',
                fieldLabel: 'Will Be Deleted',
                emptyText: 'Select Kelsub',
                displayField: 'fullnamekelsub',
                valueField: 'kelsub_id',
                enforceMaxLength: true,
                store : mystore,
                queryMode: 'local',
                maskRe: /[^\`\"\']/,
                allowBlank: true,
                enableKeyEvents: true,
                enforceMaxLength: true,
                forceSelection: true,
                typeAhead:false,
                matchFieldWidth: false,
                tpl: Ext.create('Ext.XTemplate',
                    '<table class="x-grid-table" width="410px">',
                    '<tr class="x-grid-row">',
                    '<th width="40px"><div class="x-column-header x-column-header-inner">Kelsub</div></th>',
                    '<th width="200px"><div class="x-column-header x-column-header-inner">Description</div></th>',
                    '</tr>',
                    '<tpl for=".">',
                    '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{kelsub}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
                    '</tr>',
                    '</tpl>',
                    '</table>'
                    ),
                listeners : {
                    keyup: function (field) {
                        var searchString = field.getRawValue().toString().toLowerCase();
                        if (searchString) {
                            this.store.filterBy(function (record, id) {
                                if (record.get('fullnamekelsub').toString().toLowerCase().indexOf(searchString) > -1) {
                                    return true;
                                    this.store.clearFilter(true);
                                } else if (record.get('description').toString().toLowerCase().indexOf(searchString) > -1) {
                                    return true;
                                    this.store.clearFilter(true);
                                } else {
                                    return false;
                                    this.store.clearFilter(true);
                                }
                            });
                        }
                    },
                    buffer:300
                }
            },
            {
                xtype: 'combobox',
                itemId: 'fdms_kelsub2',
                name: 'kelsub_keep',
                fieldLabel: 'Will Be Keep',
                emptyText: 'Select Kelsub',
                displayField: 'fullnamekelsub',
                valueField: 'kelsub_id',
                enforceMaxLength: true,
                forceSelection: true,
                store : mystore1,
                queryMode: 'local',
                maskRe: /[^\`\"\']/,
                allowBlank: false,
                enableKeyEvents: true,
                enforceMaxLength: true,
                typeAhead:false,
                matchFieldWidth: false,
                tpl: Ext.create('Ext.XTemplate',
                    '<table class="x-grid-table" width="410px">',
                    '<tr class="x-grid-row">',
                    '<th width="40px"><div class="x-column-header x-column-header-inner">Kelsub</div></th>',
                    '<th width="200px"><div class="x-column-header x-column-header-inner">Description</div></th>',
                    '</tr>',
                    '<tpl for=".">',
                    '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{kelsub}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
                    '</tr>',
                    '</tpl>',
                    '</table>'
                    ),
                listeners : {
                    keyup: function (field) {
                        var searchString = field.getValue().toString().toLowerCase();
                        if (searchString) {
                            this.store.filterBy(function (record, id) {
                                if (record.get('fullnamekelsub').toString().toLowerCase().indexOf(searchString) > -1) {
                                    return true;
                                    this.store.clearFilter(true);
                                } else if (record.get('description').toString().toLowerCase().indexOf(searchString) > -1) {
                                    return true;
                                    this.store.clearFilter(true);
                                } else {
                                    return false;
                                    this.store.clearFilter(true);
                                }
                            });
                        }
                    },
                    buffer:300
                }
            },


            ],
            dockedItems: me.generateDockedItem()
        });

me.callParent(arguments);
}
});

