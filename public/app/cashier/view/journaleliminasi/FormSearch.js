Ext.define('Cashier.view.journaleliminasi.FormSearch',{
    extend:'Cashier.library.template.view.FormSearch',
    alias:'widget.journaleliminasiformsearch',
    id: 'journalformsearchID',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [

            {
                xtype: 'textfield',
                itemId: 'fsms_idjournal',
                name: 'journalID',
                fieldLabel: 'Journal ELIMINASI ID',
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
                maxLength: 50,
                emptyText: 'cth: VC201901010001'
            },
            {
                xtype: 'textfield',
                itemId: 'fsms_voucherno',
                name: 'voucher_no',
                fieldLabel: 'Journal Eliminasi No',
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
                maxLength: 50,
                emptyText: 'cth: M2019/01/0002'
            },
               /* {
                    xtype: 'textfield',
                    itemId: 'fsms_name',
                    name: 'name',
                    fieldLabel: 'Customer Name',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },
                */
                {
                    xtype: 'textfield',
                    itemId: 'fsms_description',
                    name: 'description',
                    fieldLabel: 'Description',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50,
                    emptyText: 'Input Description'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_coa',
                    name: 'coa',
                    fieldLabel: 'By COA',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 9,
                    emptyText: '00.00.000'
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Journal Date',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 300,
                    items: [
                    {
                        xtype: 'datefield',
                        fieldLabel: '',
                        name: 'journal_dates',
                        format: 'd-m-Y',
                        submitFormat: 'Y-m-d',
                        emptyText: 'From',
                        width: 125
                    },
                    {
                        xtype: 'splitter',
                        width: '10'
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: '',
                        name: 'journal_datef',
                        format: 'd-m-Y',
                        submitFormat: 'Y-m-d',
                        emptyText: 'To',
                        width: 125
                    },
                    ]
                },
                {
                    xtype:'combobox',
                    name:'filterby',
                    valueField: 'filterby',
                    fieldLabel: 'Filter By',
                    queryMode:'local',
                    value: 'COA REFF PT',
                    store:['COA REFF PT','GROUP'],
                    autoSelect:true,
                    forceSelection:true,
                    editable:false
                },
                {
                    xtype: 'combobox',
                    name: 'consolidation_id',
                    fieldLabel: 'Group',
                    displayField: 'group_consolidation',
                    valueField: 'consolidation_id',
                    id: 'consolidation_id',
                    itemId: 'consolidation_id',
                    visible:false,
                    forceSelection: true,
                    allowBlank: false,
                    readOnly: false,
                    enforceMaxLength: true,
                    queryMode: 'local',
                    rowdata: null,
                    matchFieldWidth: true,
                    emptyText: 'Select Group'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'ptid',
                    name: 'pt_id'
                },
                {
                    xtype: 'combobox',
                    name: 'pt_id_src',
                    visible:false,
                    fieldLabel: 'Coa Reff PT',
                    displayField: 'name',
                    valueField: 'pt_projectpt_id',
                    readOnly: false,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    matchFieldWidth: false,
                    rowdata: null,
                    queryMode: 'local',
                    forceSelection:true,
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
                    xtype: 'combobox',
                    name: 'project_id',
                    fieldLabel: 'Coa Reff Project',
                    displayField: 'project_name',
                    valueField: 'project_project_id',
                    queryMode:'local',
                    forceSelection:true,
                    allowBlank: true,
                    rowdata: null,
                    hidden: true,

                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Tahun',
                    hidden: true,
                    layout: 'hbox',
                    items: [
                    {
                        xtype: 'yearcombobox',
                        fieldLabel:'',
                        emptyText: 'Year',
                        name: 'yeardata',
                        allowBlank: false,
                    }
                    ]
                }
                ],
                dockedItems: me.generateDockedItems()
            });

me.callParent(arguments);
}
});
