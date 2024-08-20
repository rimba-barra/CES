Ext.define('Cashier.view.mastercoa.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.mastercoaformdata',
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
                anchor: '100%'
            },
            items: [{
                xtype: 'hiddenfield',
                name: 'coa_id'
            },
            {
                xtype: 'hiddenfield',
                value: apps.uid,
                name: 'modiby'
            },
            {
                xtype: 'combobox',
                name: 'project_project_id',
                fieldLabel: 'Project',
                displayField: 'project_name',
                valueField: 'project_project_id',
                width: '300',
                queryMode: 'local',
                // allowBlank: false,
                msgTarget: "side",
                enforceMaxLength: true,
                blankText: 'This should not be blank!',
                enableKeyEvents: true,
                forceSelection: true,
                listeners: {
                    keyup: function (field) {
                        var searchString = field.getRawValue().toString().toLowerCase();
                        if(searchString == null){
                            return false;
                        }
                        if (searchString) {
                            this.store.filterBy(function (record, id) {
                                if (record.get('project_name') == null) {
                                    return false;
                                }else{
                                    if (record.get('project_name').toString().toLowerCase().indexOf(searchString) > -1) {
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
                fieldLabel: 'Company',
                displayField: 'name',
                valueField: 'pt_id',
                forceSelection: true,
                allowBlank: false,
                readOnly: false,
                enforceMaxLength: true,
                queryMode: 'local',
                rowdata: null,
                matchFieldWidth: false,
                msgTarget: "side",
                enableKeyEvents: true,
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
                xtype: 'textfield',
                itemId: 'fdms_coacode',
                    //emptyText: 'Insert with number',
                    name: 'coa',
                    msgTarget: "side",
                    blankText: 'This should not be blank!',
                    fieldLabel: 'Chart of Account(COA)',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maxLength: 9,
                    absoluteReadOnly: true,
                    anchor: '-5',
                    enableKeyEvents: true,

                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_name',
                    name: 'name',
                    msgTarget: "side",
                    blankText: 'This should not be blank!',
                    fieldLabel: 'Account Name',
                    //emptyText: 'Insert with string',
                    allowBlank: false,
                    enforceMaxLength: true,
                    //absoluteReadOnly: true,
                    maxLength: 100,
                    anchor: '-5'
                },

                {
                    xtype: 'combobox',
                    allowBlank: true,
                    name: 'parent_id',
                    msgTarget: "side",
                    blankText: 'This should not be blank!',
                    fieldLabel: 'Coa Parent',
                    flex: 2,
                    displayField: 'coa',
                    valueField: 'coa_id',
                    width: 400,
                    queryMode: 'local',
                    //forceSelection:true,
                    tpl: Ext.create('Ext.XTemplate',
                        '<table class="x-grid-table" width="500px" >',
                        '<tr class="x-grid-row">',
                        '<th width="15px"><div class="x-column-header x-column-header-inner">Coa Account</div></th>',
                        '<th width="100px"><div class="x-column-header x-column-header-inner">Name</div></th>',
                        '</tr>',
                        '<tpl for=".">',
                        '<tr class="x-boundlist-item">',
                        '<td ><div class="x-grid-cell x-grid-cell-inner">{coa}</div></td>',
                        '<td ><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
                        '</tr>',
                        '</tpl>',
                        '</table>'
                        ),
                    absoluteReadOnly: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    forceSelection: true,
                    typeAhead: false,
                    listeners: {
                        keyup: function (field) {
                            var c = 0;
                            var searchString = field.getValue().toLowerCase();
                            if (searchString) {
                                this.store.filterBy(function (record, id) {
                                    if (record.get('name').toLowerCase().indexOf(searchString) > -1) {
                                        return true;
                                        this.store.clearFilter(true);
                                    } else if (record.get('coa').indexOf(searchString) > -1) {
                                        return true;
                                        this.store.clearFilter(true);
                                    } else {
                                        return false;
                                        this.store.clearFilter(true);
                                    }
                                });
                            }
                        },
                        buffer: 300,
                    },
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Parent COA Name',
                    anchor: '-5',
                    allowBlank: true,
                    readOnly: true,
                    name: 'parent_name',
                    itemId: 'fdms_parent_name',
                    id: 'fdms_parent_name',
                    flex: 1
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Account Type',
                    defaultType: 'radiofield',
                    defaults: {
                        flex: 3
                    },
                    layout: 'hbox',
                    name: 'typeoption',
                    items: [
                    {
                        boxLabel: 'Debet',
                        name: 'type',
                        inputValue: 'D',
                        id: 'radio1',
                        checked : true
                    },
                    {
                        boxLabel: 'Credit',
                        name: 'type',
                        inputValue: 'C',
                        id: 'radio2'
                    }
                    ]

                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Status of Journal',
                    defaultType: 'radiofield',
                    itemId: 'datajournal',
                    defaults: {
                        flex: 3
                    },
                    layout: 'hbox',
                    items: [
                    {
                        boxLabel: 'Journal',
                        name: 'is_journal',
                        inputValue: '1',
                        id: 'radio3'
                    },
                    {
                        boxLabel: 'No Journal',
                        name: 'is_journal',
                        inputValue: '0',
                        id: 'radio4'
                    }
                    ]

                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Status of Report',
                    defaultType: 'radiofield',
                    defaults: {
                        flex: 1
                    },
                    layout: 'hbox',
                    items: [
                    {
                        boxLabel: 'Neraca',
                        name: 'report',
                        inputValue: 'N',
                        id: 'radio5'
                    },
                    {
                        boxLabel: 'Profit Loss',
                        name: 'report',
                        inputValue: 'L',
                        id: 'radio6'
                    }
                    ]

                },
                {
                    xtype: 'numberfield',
                    anchor: '100%',
                    itemId: 'fdms_level',
                    name: 'level',
                    allowBlank: false,
                    fieldLabel: 'Account Level',
                    maxValue: 12,
                    minValue: 1,
                    readOnly: false,
                },
            /*    {
                    xtype: 'combobox',
                    name: 'kelsub_kelsub_id',
                    fieldLabel: 'Sub Account Group',
                    queryMode: 'local',
                    valueField: 'kelsub_kelsub_id',
                    allowBlank: true,
                    msgTarget: "side",
                    blankText: 'This should not be blank!',
                  //  forceSelection: true,
                    displayField: 'description',
                    tpl: Ext.create('Ext.XTemplate',
                            '<table class="x-grid-table" width="350" >',
                            '<tr class="x-grid-row">',
                            '<th width="50"><div class="x-column-header x-column-header-inner">Sub Group</div></th>',
                            '<th width="250"><div class="x-column-header x-column-header-inner">Description</div></th>',
                            '</tr>',
                            '<tpl for=".">',
                            '<tr class="x-boundlist-item">',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{kelsub}</div></td>',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
                            '</tr>',
                            '</tpl>',
                            '</table>'
                            ),
                    absoluteReadOnly: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    forceSelection: false,
                    typeAhead: false,
                    listeners: {
                        keyup: function (field) {
                            var c = 0;
                            var searchString = field.getValue().toLowerCase();

                            if (searchString) {
                                this.store.filterBy(function (record, id) {
                                    if (record.get('description').toLowerCase().indexOf(searchString) > -1) {
                                        return true;
                                        this.store.clearFilter(true);
                                    } else if (record.get('kelsub').indexOf(searchString) > -1) {
                                        return true;
                                        this.store.clearFilter(true);
                                    } else {
                                        return false;
                                        this.store.clearFilter(true);
                                    }
                                });
                            }
                        },
                        buffer: 300,
                    },
                },
                */

                {
                    xtype: 'subaccountgroupcombobox',
                    emptyText: 'Please Select',
                    fieldLabel: 'Sub Account Group',
                    anchor: '-5',
                    allowBlank: true,
                    name: 'kelsub_kelsub_id',
                    itemId: 'fdms_kelsub_id',
                    id: 'fdms_kelsub_id',
                    forceSelection: true,
                    flex: 1
                },
                {
                    xtype: 'combobox',
                    name: 'group_gl',
                    fieldLabel: 'Acc. Code Group',
                    queryMode: 'local',
                    valueField: 'status',
                    allowBlank: true,
                    msgTarget: "side",
                    blankText: 'This should not be blank!',
                    forceSelection: true,
                    displayField: 'description',
                    store: new Ext.data.JsonStore({
                        fields: ['status', 'description'],
                        data: [
                        {status: 'A', description: 'Active'},
                        {status: 'P', description: 'Passive'},
                        ]
                    }),
                },
                {
                    xtype: 'checkboxfield',
                    itemId: 'is_create_setupcashflow',
                    name: 'is_create_setupcashflow',
                    boxLabel: 'Create setup cashflow too ?',
                    inputValue: '1',
                    uncheckedValue: '0',
                    width: 100
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    width: '100%',
                    name: 'setupcashflow_container',
                    hidden: true,
                    items: [
                        {
                            xtype: 'cashflowtypecomboboxv2',
                            itemId: 'fdms_cashflowtype_id',
                            id: 'fdms_cashflowtype_id',
                            name: 'cashflowtype_id',
                            fieldLabel: 'Cashflow Name',
                            allowBlank: true,
                        },
                        {
                            xtype: 'departmentcombobox',
                            itemId: 'fdms_department_id',
                            id: 'fdms_department_id',
                            name: 'department_id',
                            fieldLabel: 'Department',
                            allowBlank: true,
                        },
                    ],
                },
                {
                  xtype: 'box',
                  autoEl: {cn: '<div style="font-size:8px"><hr>* Petunjuk pengisian Level COA : <br>10.00.000 = Level 1 (tidak punya parent) <br>11.00.000 = Level 2 (anak dari level 1) <br>11.10.000 = Level 3 (anak dari level 2)<br><br>*Status Journal : Jika Journal maka masuk ke transaksi. Jika coa tsb sebagai parent maka No Journal</div>'}
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

