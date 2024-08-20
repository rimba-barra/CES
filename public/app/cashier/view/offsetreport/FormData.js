Ext.define('Cashier.view.offsetreport.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.offsetreportformdata',
    layout: 'vbox',
    padding: '0 0 0 10',
    bodyStyle: 'background-color:#dfe8f5;',
    border: false,
    width: 400,
    uniquename:'_foffsetreport',
    id: 'offsetreportID',
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
                },
                {
                    xtype: 'ptprojectcombobox',
                    fieldLabel:'PT',
                    emptyText: 'Select PT',
                    name: 'pt_id',
                    allowBlank: false,
                    margin: '0 0 5 0',
                    enableKeyEvents: true,
                    width: 400
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Report Date',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: '',
                            emptyText: 'From Date',
                            name: 'periodefrom',
                            allowBlank: false,
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 90
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
                            name: 'periodeto',
                            allowBlank: false,
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 90
                        }
                    ]
                },
                {
                    xtype: 'coacombobox',
                    fieldLabel: 'Account Code',
                    emptyText: 'Account Code',
                    name: 'coa_id',
                    margin: '0 0 5 0',
                    allowBlank: false,
                    enableKeyEvents : true,
                    forceSelection: true,
                    typeAhead: true,
                    enableKeyEvents: true,
                    width: 400,
                    tpl: Ext.create('Ext.XTemplate',
                        '<table class="x-grid-table" width="300px" >',
                            '<tr class="x-grid-row">',
                                '<th width="100px"><div class="x-column-header x-column-header-inner">Coa</div></th>',
                                '<th width="300px"><div class="x-column-header x-column-header-inner">Name</div></th>',
                                '<th width="100px"><div class="x-column-header x-column-header-inner">Sub Group Code</div></th>',
                                '<th width="250px"><div class="x-column-header x-column-header-inner">Sub Group Name</div></th>',
                            '</tr>',
                            '<tpl for=".">',
                                '<tr class="x-boundlist-item">',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{coa}</div></td>',
                                    '<td><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
                                    '<td align="center"><div class="x-grid-cell x-grid-cell-inner">{kelsub}</div></td>',
                                    '<td><div class="x-grid-cell x-grid-cell-inner">{kelsub_description}</div></td>',
                                '</tr>',
                            '</tpl>',
                        '</table>'
                    ),
                    displayTpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">',
                            '{coa} - {name}',
                        '</tpl>'
                    ),
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
                                    } else if (record.get('coa').indexOf(searchString) > -1) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                });
                            }
                        },
                        buffer: 300,
                    },
                },  
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Account Type',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: '',
                            emptyText: 'Select Type',
                            name: 'account_type',
                            margin: '0 0 5 0',
                            enableKeyEvents : true,
                            width: 90,
                            store: Ext.create('Ext.data.Store', {
                                fields: ['param', 'label'],
                                data: [
                                    {'param': 'D', 'label': 'Debet'},
                                    {'param': 'C', 'label': 'Credit'}
                                ]
                            }),
                            displayField: 'label',
                            valueField: 'param'
                        },
                        {
                            xtype: 'button',
                            text: 'Add Account',
                            name: 'addaccount',
                            margin: '0 0 0 5'
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Output Type',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: '',
                            name: 'output_type',
                            enableKeyEvents : true,
                            store: Ext.create('Ext.data.Store', {
                                fields: ['param', 'label'],
                                data: [
                                    {'param': '1', 'label': 'DEFAULT'},
                                    {'param': '2', 'label': 'JOURNAL OFFSET'},
                                    {'param': '3', 'label': 'EXCEL'},
                                ]
                            }),
                            displayField: 'label',
                            valueField: 'param',
                            value: '1',
                            editable: false
                        },
                    ]
                },                
                {
                    xtype: 'datefield',
                    fieldLabel: 'Journal Date',
                    margin: '0 0 5 0',
                    name: 'journal_date',
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    altFormats: 'd-m-Y|Y-m-d|dmY|Ymd|mdY|dmy|ymd|mdy'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'tabpanel',
                            itemId: 'panelGrid',
                            name: 'panel',
                            activeTab: 0,
                            region: 'center',
                            layout: 'hbox',
                            id: 'TabAccount',
                            width: '99%',
                            items: [
                                {
                                    xtype: 'offsetreportgrid',
                                    closable: false,
                                    name: 'offsetreportgrid',
                                    title: 'Selected Account',
                                    flex: 1,
                                    itemId: 'TabAccount',
                                },
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    margin: '10 0 0 250',
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
