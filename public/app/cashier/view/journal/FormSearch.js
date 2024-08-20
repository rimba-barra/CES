Ext.define('Cashier.view.journal.FormSearch',{
    extend:'Cashier.library.template.view.FormSearch',
    alias:'widget.journalformsearch',
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
                    fieldLabel: 'Journal ID',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50,
                    emptyText: 'cth: VC201901010001'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_voucherno',
                    name: 'voucher_no',
                    fieldLabel: 'Journal No',
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
                    maxLength: 50
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_description_detail',
                    name: 'description_detail',
                    fieldLabel: 'Description Detail Journal',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_description_subdetail',
                    name: 'description_subdetail',
                    fieldLabel: 'Description Sub Detail Journal',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
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
                /*{
                    xtype: 'combobox',
                    name: 'pt_id',
                    fieldLabel: 'Company',
                    displayField: 'name',
                    valueField: 'pt_id',
                    readOnly: false,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    forceSelection:true,
                },*/
                {
                    xtype: 'hiddenfield',
                    name: 'pt_pt_id'
                },
                {
                    xtype: 'combobox',
                    name: 'project_id',
                    fieldLabel: 'Project',
                    displayField: 'project_name',
                    valueField: 'project_project_id',
                    queryMode:'local',
                    forceSelection:true,
                    allowBlank: true,
                    rowdata: null,
                    
                },
                {
                    xtype: 'combobox',
                    name: 'pt_id',
                    fieldLabel: 'Company',
                    displayField: 'name',
                    valueField: 'pt_projectpt_id',
                    forceSelection: false,
                    allowBlank: false,
                    readOnly: false,
                    enforceMaxLength: true,
                    queryMode: 'local',
                    rowdata: null,
                    matchFieldWidth: false,
                    tpl: Ext.create('Ext.XTemplate',
                            '<table class="x-grid-table" width="500px">',
                            '<tr class="x-grid-row">',
                            '<th width="40px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                            '<th width="300px"><div class="x-column-header x-column-header-inner">Company</div></th>',
                            '</tr>',
                            '<tpl for=".">',
                            '<tr class="x-boundlist-item">',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
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
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Amount',
                    layout: 'vbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 300,
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: '',
                                    name: 'amount_search_type',
                                    id: 'amount_search_type',
                                    width: 250,
                                    queryMode: 'local',
                                    store: Ext.create('Ext.data.Store', {
                                        fields: ['value', 'name'],
                                        data : [
                                            {"value":"between", "name":"Between"},
                                            {"value":"equal", "name":"Equal"},
                                            {"value":"like", "name":"Like"}
                                        ]
                                    }),
                                    displayField: 'name',
                                    valueField: 'value',
                                    forceSelection:true,
                                    allowBlank: true,
                                    rowdata: null,
                                    value: 'between'
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
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '',
                                    name: 'amount_from',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    emptyText: 'From',
                                    width: 125
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '',
                                    name: 'amount_to',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    emptyText: 'To',
                                    width: 125
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
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '',
                                    name: 'amount',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    emptyText: 'Amount',
                                    width: 250
                                },
                            ]
                        }          
                    ]
                },
                {
                    xtype: 'combobox',
                    name: 'voucherprefix_voucherprefix_id',
                    fieldLabel: 'Prefix',
                    displayField: 'description',
                    valueField: 'prefix_prefix_id',
                    width: 430,
                    //forceSelection: true,
                    allowBlank: true,
                    readOnly: true,
                    enforceMaxLength: true,
                    queryMode: 'local',
                    rowdata: null,
                    msgTarget: "side",
                    matchFieldWidth: false,
                    tpl: Ext.create('Ext.XTemplate',
                            '<table class="x-grid-table" width="430px" >',
                            '<tr class="x-grid-row">',
                            '<th width="50px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                            '<th width="380px"><div class="x-column-header x-column-header-inner">Description</div></th>',
                            '</tr>',
                            '<tpl for=".">',
                            '<tr class="x-boundlist-item">',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{prefix_prefix}</div></td>',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
                            '</tr>',
                            '</tpl>',
                            '</table>'
                            ),
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Invoice No',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 300,
                    items: [
                             {
                                xtype: 'textfield',
                                name: 'invoice_no',
                                fieldLabel: '',
                                enforceMaxLength: true,
                                maskRe: /[^\`\"\']/,
                                anchor: '-5',
                                allowBlank: true,
                                maxLength : 8
                            }
                            ]
                },
                {
                    xtype: 'textfield',
                    itemId: 'kelsub',
                    name: 'kelsub',
                    fieldLabel: 'Sub Account Code',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/
                },
                {
                    xtype: 'textfield',
                    itemId: 'kelsub_desc',
                    name: 'kelsub_desc',
                    fieldLabel: 'Sub Account Description',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
