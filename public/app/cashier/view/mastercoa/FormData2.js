Ext.define('Cashier.view.mastercoa.FormData2', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.mastercoaformdata2',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    deletedRows: [],
    editedRow: -1,
    id: 'mastercoaid2',
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
                    // width: '300',
                    queryMode: 'local',
                    allowBlank: false,
                    msgTarget: "side",
                    enforceMaxLength: true,
                    blankText: 'This should not be blank!',
                },
                {
                    xtype: 'combobox',
                    name: 'pt_pt_id',
                    fieldLabel: 'Company',
                    displayField: 'name',
                    valueField: 'pt_id',
                    forceSelection: false,
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
                    // anchor: '-5',
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
                    // anchor: '-5'
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
                    // width: 400,
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
                    // anchor: '-5',
                    allowBlank: true,
                    readOnly: true,
                    name: 'parent_name',
                    itemId: 'fdms_parent_name',
                    id: 'fdms_parent_name',
                    flex: 1
                },
                {
                    xtype: 'combobox',
                    name: 'type',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['type', 'name'],
                        data: [
                            {'type': 'C', 'name': 'Credit'},
                            {'type': 'D', 'name': 'Debet'}
                        ]
                    }),
                    fieldLabel: 'Account Type',
                    readOnly: true,
                    valueField: 'type',
                    displayField: 'name'
                },
                {
                    xtype: 'combobox',
                    name: 'is_journal',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['is_journal', 'name'],
                        data: [
                            {'is_journal': '1', 'name': 'Journal'},
                            {'is_journal': '0', 'name': 'No Journal'}
                        ]
                    }),
                    fieldLabel: 'Status of Journal',
                    readOnly: true,
                    valueField: 'is_journal',
                    displayField: 'name'
                },
                {
                    xtype: 'combobox',
                    name: 'report',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['value', 'name'],
                        data: [
                            {'value': 'N', 'name': 'Neraca'},
                            {'value': 'L', 'name': 'Profit Loss'}
                        ]
                    }),
                    fieldLabel: 'Status of Report',
                    readOnly: true,
                    valueField: 'value',
                    displayField: 'name'
                },
                {
                    xtype: 'numberfield',
                    // anchor: '100%',
                    itemId: 'fdms_level',
                    name: 'level',
                    allowBlank: false,
                    fieldLabel: 'Account Level',
                    maxValue: 12,
                    minValue: 1,
                    readOnly: true,
                },
                {
                    xtype: 'subaccountgroupcombobox',
                    emptyText: '',
                    fieldLabel: 'Sub Account Group',
                    // anchor: '-5',
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
                    readOnly: true
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

