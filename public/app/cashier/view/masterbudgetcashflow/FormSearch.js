Ext.define('Cashier.view.masterbudgetcashflow.FormSearch',{
    extend       : 'Cashier.library.template.view.FormSearch',
    alias        : 'widget.masterbudgetcashflowformsearch',
    initComponent: function() {
        var me                = this;
        var cashflowtypeStore = Ext.create('Ext.data.Store', {
            alias   : 'cashflowtypeStore',
            autoLoad: false,
            fields  : [
                {
                    name: 'cashflowtype_id',
                    type: 'int'
                },
                {
                    name: 'cashflowtype',
                    type: 'string'
                }
            ],
            sorters: [{
                property : 'cashflowtype',
                direction: 'ASC'
              }],
        });

        var coaStore = Ext.create('Ext.data.Store', {
            alias   : 'coaStore',
            autoLoad: false,
            fields  : [
                {
                    name: 'coa_id',
                    type: 'int'
                },
                {
                    name: 'coa',
                    type: 'string'
                },{
                    name: 'description',
                    type: 'string'
                }
            ],
            sorters: [{
                property : 'coa',
                direction: 'ASC'
              }],
        });

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items   : [
                {
                    xtype: 'hiddenfield',
                    name : 'project_id',
                    value: apps.project
                },
                {
                    xtype: 'hiddenfield',
                    name : 'pt_id',
                    value: apps.pt
                },
                {
                    xtype           : 'combobox',
                    name            : 'projectpt_id',
                    fieldLabel      : 'Company',
                    displayField    : 'name',
                    valueField      : 'pt_projectpt_id',
                    value           : apps.projectpt,
                    forceSelection  : false,
                    allowBlank      : false,
                    readOnly        : false,
                    enforceMaxLength: true,
                    queryMode       : 'local',
                    rowdata         : null,
                    matchFieldWidth : false,
                    tpl             : Ext.create('Ext.XTemplate',
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
                    enableKeyEvents : true,
                    rowdata         : null,
                    forceSelection  : false,
                    typeAhead       : false,
                    listeners       : {
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
                    xtype           : 'combobox',
                    itemId          : 'fsms_coa',
                    name            : 'coa_cf',
                    fieldLabel      : 'COA',
                    valueField      : 'coa_id',
                    emptyText       : 'Select COA',
                    displayField    : 'coa',
                    forceSelection  : true,
                    enableKeyEvents : true,
                    queryMode       : 'local',
                    store           : coaStore,
                    enforceMaxLength: true,
                    maxLength       : 50,
                    matchFieldWidth : false,
                    tpl             : Ext.create('Ext.XTemplate',
                        '<table class="x-grid-table" width="400px">',
                        '<tr class="x-grid-row">',
                        '<th width="20%"><div class="x-column-header x-column-header-inner">COA</div></th>',
                        '<th width="80%"><div class="x-column-header x-column-header-inner">Description</div></th>',
                        '</tr>',
                        '<tpl for=".">',
                        '<tr class="x-boundlist-item">',
                        '<td ><div class="x-grid-cell x-grid-cell-inner">{coa}</div></td>',
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
                                    if (record.get('coa').toString().toLowerCase().indexOf(searchString) > -1) {
                                        return true;
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
                        buffer: 300
                    }
                },
                {
                    xtype           : 'combobox',
                    itemId          : 'fsms_cashflowtype',
                    name            : 'cashflowtype',
                    valueField      : 'cashflowtype_id',
                    fieldLabel      : 'Cashflow Type',
                    emptyText       : 'Select Cashflow Type',
                    displayField    : 'cashflowtype',
                    forceSelection  : true,
                    enableKeyEvents : true,
                    queryMode       : 'local',
                    store           : cashflowtypeStore,
                    enforceMaxLength: true,
                    maxLength       : 50,
                    matchFieldWidth : true,
                    tpl             : Ext.create('Ext.XTemplate',
                        '<table class="x-grid-table" width="100%">',
                        '<tr class="x-grid-row">',
                        '<th width="100%"><div class="x-column-header x-column-header-inner">Cashflow Type</div></th>',
                        '</tr>',
                        '<tpl for=".">',
                        '<tr class="x-boundlist-item">',
                        '<td ><div class="x-grid-cell x-grid-cell-inner">{cashflowtype}</div></td>',
                        '</tr>',
                        '</tpl>',
                        '</table>'
                        ),
                    listeners : {
                        keyup: function (field) {
                            var searchString = field.getRawValue().toString().toLowerCase();
                            if (searchString) {
                                this.store.filterBy(function (record, id) {
                                    if (record.get('cashflowtype').toString().toLowerCase().indexOf(searchString) > -1) {
                                        return true;
                                    } else {
                                        return false;
                                        this.store.clearFilter(true);
                                    }
                                });
                            }
                        },
                        buffer: 300
                    }
                },
                {
                    xtype         : 'combobox',
                    name          : 'department_id',
                    fieldLabel    : 'Department',
                    editable      : false,
                    forceSelection: true,
                    displayField  : 'name',
                    valueField    : 'department_id',
                    queryMode     : 'local'
                },
                {
                    xtype       : 'combobox',
                    name        : 'year',
                    fieldLabel  : 'Periode',
                    displayField: 'txt',
                    valueField  : 'year',
                    queryMode   : 'local',
                    store       : new Ext.data.JsonStore({
                        alias : 'yearStore',
                        fields: ['year', 'txt'],
                    }),
                    autoSelect    : true,
                    forceSelection: true
                },
                {
                    xtype         : 'combobox',
                    name          : 'budget_type',
                    fieldLabel    : 'Type',
                    queryMode     : 'local',
                    valueField    : 'budget_type',
                    value         : 'RAKER',
                    forceSelection: true,
                    editable      : false,
                    displayField  : 'txt',
                    store         : new Ext.data.JsonStore({
                        fields: ['budget_type', 'txt'],
                        data  : [
                                // {budget_type: 'ALL', txt: 'ALL'},
                            {budget_type: 'RAKER', txt: 'RAKER'},
                            {budget_type: 'MIDRAKER', txt: 'MIDRAKER'},
                            {budget_type: 'RAKER BOD', txt: 'RAKER BOD'},
                            {budget_type: 'RAKER PROJECT', txt: 'RAKER PROJECT'},
                            {budget_type: 'MIDRAKER BOD', txt: 'MIDRAKER BOD'},
                            {budget_type: 'MIDRAKER PROJECT', txt: 'MIDRAKER PROJECT'},
                        ]
                    }),
                    autoSelect    : true,
                    forceSelection: true,
                    listeners     : {
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
