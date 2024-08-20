Ext.define('Cashier.view.unpaidcheque.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.unpaidchequeformdata',
    layout: 'vbox',
    padding: '0 0 0 10',
    bodyStyle: 'background-color:#dfe8f5;',
    border: false,
    uniquename:'_funpaidcheque',
    id: 'unpaidchequeID',
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
                    forceSelection: true,
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
                    xtype: 'combobox',
                    fieldLabel: 'Cheque Type',
                    name: 'type',
                    enableKeyEvents: true,
                    store: Ext.create('Ext.data.Store', {
                        fields: ['param', 'label'],
                        data: [
                            {'param': '', 'label': 'ALL'},
                            {'param': 'IN', 'label': 'IN'},
                            {'param': 'OUT', 'label': 'OUT'}
                        ]
                    }),
                    displayField: 'label',
                    valueField: 'param',
                    value: ''
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Cheque Status',
                    name: 'status',
                    enableKeyEvents: true,
                    store: Ext.create('Ext.data.Store', {
                        fields: ['param', 'label'],
                        data: [
                            {'param': '', 'label': 'ALL'},
                            {'param': 'New', 'label': 'NEW'},
                            {'param': 'Issued', 'label': 'ISSUED'},
                            {'param': 'Cleared', 'label': 'CLEARED'},
                            {'param': 'Void', 'label': 'VOID'},
                            {'param': 'Canceled', 'label': 'CANCELED'}
                        ]
                    }),
                    displayField: 'label',
                    valueField: 'param',
                    value: ''
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    fieldLabel: 'Bank Prefix',
                    items: [
                        {
                            xtype: 'prefixcombobox',
                            name: 'prefix_id',
                            fieldLabel: '',
                            tpl: Ext.create('Ext.XTemplate',
                                '<table class="x-grid-table" width="500px" >',
                                    '<tr class="x-grid-row">',
                                        '<th width="100px"><div class="x-column-header x-column-header-inner">Prefix</div></th>',
                                        '<th width="200px"><div class="x-column-header x-column-header-inner">Description</div></th>',
                                    '</tr>',
                                    '<tpl for=".">',
                                        '<tr class="x-boundlist-item">',
                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{prefix}</div></td>',
                                            '<td><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
                                        '</tr>',
                                    '</tpl>',
                                '</table>'
                            ),
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'prefix_all',
                            boxLabel: 'All',
                            padding: '0 0 0 0',
                            margin: '0 0 0 5',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: '1',
                            uncheckedValue: '0',
                            checked: true
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
