Ext.define('Cashier.view.masterbudgetcoa.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.masterbudgetcoaformsearch',
    initComponent: function () {
        var me = this;


        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
               
                {
                    xtype: 'hiddenfield',
                    name: 'project_id',
                    value: apps.project
                },
                {
                    xtype: 'hiddenfield',
                    name: 'pt_id',
                    value: apps.pt
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_name',
                    name: 'name',
                    fieldLabel: 'COA',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_description',
                    name: 'description',
                    fieldLabel: 'Description',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },
                {
                    xtype: 'combobox',
                    name: 'projectpt_id',
                    fieldLabel: 'Company / Project',
                    displayField: 'name',
                    valueField: 'pt_projectpt_id',
                    forceSelection: false,
                    allowBlank: false,
                    value: apps.projectpt,
                    readOnly: false,
                    enforceMaxLength: true,
                    queryMode: 'local',
                    rowdata: null,
                    matchFieldWidth: false,
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
                    absoluteReadOnly: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    forceSelection: false,
                    typeAhead: false,
                    listeners: {
                        keyup: function (field) {
                            var searchString = field.getValue();
                            if (searchString) {
                                this.store.filterBy(function (record, id) {
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
                                });
                            }
                        },
                        buffer: 300,
                    },
                },
                {
                    xtype: 'combobox',
                    name: 'department_id',
                    fieldLabel: 'Department',
                    displayField: 'name',
                    forceSelection: true,
                    valueField: 'department_id',
                    queryMode: 'local'
                },
                {
                    xtype: 'combobox',
                    name: 'year',
                    fieldLabel: 'Periode',
                    displayField: 'year',
                    valueField: 'year',
                    queryMode: 'local',
                    allowBlank: false,
                    value: (new Date()).getFullYear()
                },
                {
                    xtype: 'combobox',
                    name: 'journal_status',
                    fieldLabel: 'Journal Status',
                    queryMode: 'local',
                    valueField: 'journal_status',
                    value: '2',
                    forceSelection: true,
                    displayField: 'txt',
                    store: new Ext.data.JsonStore({
                        fields: ['journal_status', 'txt'],
                        data: [
                            {journal_status: '2', txt: 'ALL'},
                            {journal_status: '1', txt: 'Journal'},
                            {journal_status: '0', txt: 'No Journal'},
                        ]
                    }),
                    autoSelect:true,
                    forceSelection:true,
                    listeners: {
                        afterrender: function() {
                        this.setValue(this.value);    
                        }
                    }
                },
                {
                    xtype: 'combobox',
                    name: 'budget_type',
                    fieldLabel: 'Type',
                    queryMode: 'local',
                    valueField: 'budget_type',
                    value: 'ALL',
                    forceSelection: true,
                    displayField: 'txt',
                    store: new Ext.data.JsonStore({
                        fields: ['budget_type', 'txt'],
                        data: [
                            {budget_type: 'ALL', txt: 'ALL'},
                            {budget_type: 'RAKER', txt: 'RAKER'},
                            {budget_type: 'MIDRAKER', txt: 'MIDRAKER'},
                            {budget_type: 'RAKER BOD', txt: 'RAKER BOD'},
                            {budget_type: 'RAKER PROJECT', txt: 'RAKER PROJECT'},
                            {budget_type: 'MIDRAKER BOD', txt: 'MIDRAKER BOD'},
                            {budget_type: 'MIDRAKER PROJECT', txt: 'MIDRAKER PROJECT'},
                        ]
                    }),
                    autoSelect:true,
                    forceSelection:true,
                    listeners: {
                        afterrender: function() {
                        this.setValue(this.value);    
                        }
                    }
                },
                {
                    xtype: 'combobox',
                    name: 'coa_nl',
                    fieldLabel: 'COA N / L',
                    queryMode: 'local',
                    valueField: 'coa_nl',
                    value: 'ALL',
                    forceSelection: true,
                    displayField: 'txt',
                    store: new Ext.data.JsonStore({
                        fields: ['coa_nl', 'txt'],
                        data: [
                            {coa_nl: 'ALL', txt: 'ALL'},
                            {coa_nl: 'N', txt: 'N'},
                            {coa_nl: 'L', txt: 'L'},
                        ]
                    }),
                    autoSelect:true,
                    forceSelection:true,
                    listeners: {
                        afterrender: function() {
                        this.setValue(this.value);    
                        }
                    }
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
