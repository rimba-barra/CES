Ext.define('Cashier.view.subaccounttransaction.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.subaccounttransactionformdata',
    layout: 'vbox',
    bodyStyle: 'background-color:#dfe8f5;',
    id: 'subaccounttransactionID',
    initComponent: function () {
        var me = this;
        var mystore = Ext.create('Ext.data.Store', {
            alias: 'ptstore',
            autoLoad: false,
            fields: [
            {
                name: 'multiprojectdetail_id',
                type: 'int'
            },
            {
                name: 'pt_id',
                type: 'int'
            }, 
            {
                name: 'code',
                type: 'string'
            },
            {
                name: 'name',
                type: 'string'
            },
            {
                name: 'ptname',
                type: 'string'
            },
            {
                name: 'project_id',
                type: 'int'
            },
            {
                name: 'project_name',
                type: 'string'
            },
            ]
        });
        var fromcode = Ext.create('Ext.data.Store', {
            autoLoad: false,
            storeId : 'fromCode',
            fields: [{
                name: 'subgl_id',
                type: 'int'
            },
            {
                name: 'code',
                type: 'string'
            },
            {
                name: 'code1',
                type: 'string'
            },
            {
                name: 'code2',
                type: 'string'
            },
            {
                name: 'code3',
                type: 'string'
            },
            {
                name: 'code4',
                type: 'string'
            },
            {
                name: 'description',
                type: 'string'
            },
            {
                name: 'kelsub_id',
                type: 'int'
            },
            {
                name: 'kelsub',
                type: 'string'
            }
            ],
        });
        var untilcode = Ext.create('Ext.data.Store', {
            autoLoad: false,
            storeId : 'untilCode',
            fields: [{
                name: 'subgl_id',
                type: 'int'
            },
            {
                name: 'code',
                type: 'string'
            },
            {
                name: 'code1',
                type: 'string'
            },
            {
                name: 'code2',
                type: 'string'
            },
            {
                name: 'code3',
                type: 'string'
            },
            {
                name: 'code4',
                type: 'string'
            },
            {
                name: 'description',
                type: 'string'
            },
            {
                name: 'kelsub_id',
                type: 'int'
            },
            {
                name: 'kelsub',
                type: 'string'
            }
            ],
        });
        var code = Ext.create('Ext.data.Store', {
            autoLoad: false,
            storeId : 'storeCode',
            fields: [{
                name: 'subgl_id',
                type: 'int'
            },
            {
                name: 'code',
                type: 'string'
            },
            {
                name: 'code1',
                type: 'string'
            },
            {
                name: 'code2',
                type: 'string'
            },
            {
                name: 'code3',
                type: 'string'
            },
            {
                name: 'code4',
                type: 'string'
            },
            {
                name: 'description',
                type: 'string'
            },
            {
                name: 'kelsub_id',
                type: 'int'
            }
            ],
        });

        var codeuntil = Ext.create('Ext.data.Store', {
            autoLoad: false,
            storeId : 'storeuntilCode',
            fields: [{
                name: 'subgl_id',
                type: 'int'
            },
            {
                name: 'code',
                type: 'string'
            },
            {
                name: 'code1',
                type: 'string'
            },
            {
                name: 'code2',
                type: 'string'
            },
            {
                name: 'code3',
                type: 'string'
            },
            {
                name: 'code4',
                type: 'string'
            },
            {
                name: 'description',
                type: 'string'
            },
            {
                name: 'kelsub_id',
                type: 'int'
            }
            ],
        });

        var code2 = Ext.create('Ext.data.Store', {
            autoLoad: false,
            storeId : 'storeCode2',
            fields: [
            {
                name: 'subgl_id',
                type: 'int'
            },
            {
                name: 'code2',
                type: 'string'
            },
            ],
        });

        Ext.applyIf(me, {
            items: [
            {
                xtype: 'tbspacer',
                height: 10
            },
            {
                xtype: 'hiddenfield',
                name: 'hideparam',
                value: 'default'
            },
            {
                xtype: 'hiddenfield',
                name: 'paramfromcoa',
                value: ''
            },
            {
                xtype: 'hiddenfield',
                name: 'paramfromcoa_id',
                value: '0'
            },
            {
                xtype: 'hiddenfield',
                name: 'paramuntilcoa',
                value: ''
            },
            {
                xtype: 'hiddenfield',
                name: 'paramuntilcoa_id',
                value: '0'
            },
            {
                xtype: 'hiddenfield',
                name: 'pt_id',
            },
            {
                xtype: 'panel',
                layout: 'vbox',
                itemId: 'item_panel_radio',
                bodyStyle: 'background-color:#dfe8f5;',
                border: false,
                padding: '0 0 0 20px',
                items: [
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Report By',
                    padding: '0 0 0 20px',
                    layout: 'hbox',
                    items: [
                    {
                        boxLabel: 'Account Code',
                        xtype: 'radiofield',
                        name: 'sat_reportby',
                        inputValue: '1',
                        id: 'radio1',
                        checked:true
                    },
                    {
                        xtype: 'splitter',
                        width: '50'
                    },
                    {
                        boxLabel: 'Sub Account Code',
                        xtype: 'radiofield',
                        name: 'sat_reportby',
                        inputValue: '2',
                        id: 'radio2'
                    },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Voucher',
                    padding: '0 0 0 20px',
                    layout: 'hbox',
                    items: [
                    {
                        boxLabel: 'All',
                        xtype: 'radiofield',
                        name: 'voucherdata',
                        inputValue: '1',
                        id: 'radiovoucher1',
                        checked:true
                    },
                    {
                        xtype: 'splitter',
                        width: '114'
                    },
                    {
                        boxLabel: 'Cash Flow',
                        xtype: 'radiofield',
                        name: 'voucherdata',
                        inputValue: '2',
                        id: 'radiovoucher2'
                    }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Sub',
                    padding: '0 0 0 20px',
                    layout: 'hbox',
                    items: [
                    {
                        boxLabel: 'Complete',
                        xtype: 'radiofield',
                        name: 'subdata',
                        inputValue: '1',
                        id: 'radiosub1',
                        checked:true
                    },
                    {
                        xtype: 'splitter',
                        width: '78'
                    },
                    {
                        boxLabel: 'By Sub',
                        xtype: 'radiofield',
                        name: 'subdata',
                        inputValue: '2',
                        id: 'radiosub2'
                    }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Detail',
                    padding: '0 0 0 20px',
                    layout: 'hbox',
                    items: [
                    {
                        boxLabel: 'Yes',
                        xtype: 'radiofield',
                        name: 'detaildatasub',
                        inputValue: '1',
                        id: 'radiodetailsub2',
                        checked:true
                    },

                    {
                        xtype: 'splitter',
                        width: '114'
                    },

                    {
                        boxLabel: 'No',
                        xtype: 'radiofield',
                        name: 'detaildatasub',
                        inputValue: '2',
                        id: 'radiodetailsub1'
                    },

                    ]
                }

                ]
            },
              /* {
                    xtype: 'tbspacer',
                    height: 20
                },
                */
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,
                    padding: '0 0 0 20px',
                    items: [         
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Format Report',
                        layout: 'hbox',
                        items: [
                        {
                         xtype:'combobox',
                         name:'formatreport',
                         valueField: 'formatreport',
                         queryMode:'local',
                         dvalue: 'FORMAT-2 (Default)',
                         store:['FORMAT-1','FORMAT-2 (Default)','FORMAT-3','ACC-VS-SUBACC','TB-VS-SUBACC'],
                         autoSelect:true,
                         forceSelection:true,
                         listeners: {
                            afterrender: function() {
                             this.setValue(this.dvalue);    
                         }
                     }
                 }
                 ]
             },
             {
                xtype: 'fieldcontainer',
                fieldLabel: 'Project',
                layout: 'hbox',
                hidden:true,
                items: [                               
                {
                    xtype: 'combobox',
                    fieldLabel:'',
                    emptyText: 'Select Project',
                    name: 'project_id',
                    allowBlank: false,
                    enableKeyEvents: true,
                    tpl: Ext.create('Ext.XTemplate',
                      '<table class="x-grid-table" width="250px" >',
                      '<tr class="x-grid-row">',

                      '<th width="200px"><div class="x-column-header x-column-header-inner">Name</div></th>',
                      '</tr>',
                      '<tpl for=".">',
                      '<tr class="x-boundlist-item">',
                      '<td><div class="x-grid-cell x-grid-cell-inner">{pt_name}</div></td>',
                      '</tr>',
                      '</tpl>',
                      '</table>'
                      ),    
                },
                ]
            },
            {
                xtype: 'combobox',
                name: 'projectpt_id',
                fieldLabel: 'Company',
                emptyText: 'Select Company',
                displayField: 'name',
                valueField: 'multiprojectdetail_id',
                forceSelection: true,
                allowBlank: false,
                enableKeyEvents: true,
                enforceMaxLength: true,
                typeAhead:false,
                queryMode: 'local',
                width:482,
                flex: 2,
                store : mystore,
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
                listeners : {
                    keyup: function (field) {
                        var searchString = field.getValue().toString().toLowerCase();
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
                    buffer:300
                }
            },
            {
                xtype: 'fieldcontainer',
                fieldLabel: 'Transaction Date',
                layout: 'hbox',
                items: [
                {
                    xtype: 'datefield',
                    fieldLabel: '',
                    emptyText: 'From Date',
                    name: 'subfromdate',
                    allowBlank: false,
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    altFormats: 'd-m-Y|Y-m-d|dmY|Ymd|mdY|dmy|ymd|mdy'
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
                    name: 'subuntildate',
                    allowBlank: false,
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    altFormats: 'd-m-Y|Y-m-d|dmY|Ymd|mdY|dmy|ymd|mdy'
                }
                ]
            },
            {
                xtype: 'fieldcontainer',
                fieldLabel: 'Account Code',
                layout: 'hbox',
                items: [

                {
                    xtype: 'coacombobox',
                    fieldLabel: '',
                    emptyText: 'From COA',
                    name: 'sub_coa_from_id',
                    allowBlank: false,
                    enableKeyEvents : true,
                    typeAhead: true,
                    forceSelection: true,
                    tpl: Ext.create('Ext.XTemplate',
                        '<table class="x-grid-table" width="500px" >',
                        '<tr class="x-grid-row">',
                        '<th width="100px"><div class="x-column-header x-column-header-inner">Coa</div></th>',
                        '<th width="200px"><div class="x-column-header x-column-header-inner">Name</div></th>',
                        '</tr>',
                        '<tpl for=".">',
                        '<tr class="x-boundlist-item">',
                        '<td ><div class="x-grid-cell x-grid-cell-inner">{coa}</div></td>',
                        '<td><div class="x-grid-cell x-grid-cell-inner">{coaname}</div></td>',
                        '</tr>',
                        '</tpl>',
                        '</table>'
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
                                        store.clearFilter(true);
                                    } else if (record.get('coa').indexOf(searchString) > -1) {
                                        return true;
                                        store.clearFilter(true);
                                    } else {
                                        return false;
                                        store.clearFilter(true);
                                    }
                                });
                            }
                        },
                        buffer: 300,
                    },

                },

                {
                    xtype: 'label',
                    forId: 'lbl1',
                    text: 'To',
                    margin: '2 10 0 10'
                },
                {
                    xtype: 'coacombobox',
                    fieldLabel: '',
                    emptyText: 'Until COA',
                    name: 'sub_coa_until_id',
                    allowBlank: false,
                    enableKeyEvents : true,
                    typeAhead: true,
                    forceSelection: true,
                    tpl: Ext.create('Ext.XTemplate',
                        '<table class="x-grid-table" width="500px" >',
                        '<tr class="x-grid-row">',
                        '<th width="100px"><div class="x-column-header x-column-header-inner">Coa</div></th>',
                        '<th width="200px"><div class="x-column-header x-column-header-inner">Name</div></th>',
                        '</tr>',
                        '<tpl for=".">',
                        '<tr class="x-boundlist-item">',
                        '<td ><div class="x-grid-cell x-grid-cell-inner">{coa}</div></td>',
                        '<td><div class="x-grid-cell x-grid-cell-inner">{coaname}</div></td>',
                        '</tr>',
                        '</tpl>',
                        '</table>'
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
                                        store.clearFilter(true);
                                    } else if (record.get('coa').indexOf(searchString) > -1) {
                                        return true;
                                        store.clearFilter(true);
                                    } else {
                                        return false;
                                        store.clearFilter(true);
                                    }
                                });
                            }
                        },
                        buffer: 300,
                    },
                },
                ]
            },                     
            {
                xtype: 'fieldcontainer',
                fieldLabel: 'Sub Account Group',
                itemId: 'item_sag',
                layout: 'hbox',
                items: [
                {
                    xtype: 'subaccountgroupcombobox',
                    fieldLabel: '',
                    emptyText: 'Select Sub ',
                    name: 'sub_kelsub_id',
                    allowBlank: false,
                    enableKeyEvents : true
                },
                {
                    xtype: 'splitter',
                    width: '5'
                },
                {
                    xtype: 'checkboxfield',
                    fieldLabel: '',
                    name: 'subaccgroup_all',
                    boxLabel: 'All',
                    padding: '0 0 0 0',
                    margin: '0 0 0 0',
                    boxLabelCls: 'x-form-cb-label small',
                    inputValue: '1',
                    uncheckedValue: '0',
                    checked: false
                },
                ]
            },
            {
                xtype: 'fieldcontainer',
                fieldLabel: 'Sub Account Code',
                hidden:false,
                itemId: 'item_sac',
                name: 'subgl',
                layout: 'hbox',
                items: [
                               /*
                                {
                                    
                                    xtype: 'subaccountcodecomboboxgrid',
                                    fieldLabel: '',
                                    emptyText: 'Select From ',
                                    name: 'sub_fromsubgl_id',
                                    id : 'combo1',
                                    allowBlank: false,
                                },
                                */
                                
                                {
                                    xtype: 'combo',
                                    fieldLabel: '',
                                    itemId: 'fd_subgl_id34',
                                    id: 'combo1',
                                    name: 'sub_fromsubgl_id',
                                    emptyText: 'Ketik Sub Code...',
                                    width: 150,
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null,
                                    store:fromcode,
                                    queryMode: 'local',
                                    minChars: 2,
                                    forceSelection:true,
                                    valueField: 'subgl_id',
                                    displayField: 'code',
                                    matchFieldWidth: false,
                                    // typeAhead:false
                                    tpl: Ext.create('Ext.XTemplate',
                                        '<table class="x-grid-table" width="700px">',
                                        '<tr class="x-grid-row" w>',
                                        '<th width="10%"><div class="x-column-header x-column-header-inner">Kelsub</div></th>',
                                        '<th width="20%"><div class="x-column-header x-column-header-inner">Sub Code</div></th>',
                                        '<th width="15%"><div class="x-column-header x-column-header-inner">Code 1</div></th>',
                                        '<th width="10%"><div class="x-column-header x-column-header-inner">Code 2</div></th>',
                                        '<th width="10%"><div class="x-column-header x-column-header-inner">Code 3</div></th>',
                                        '<th width="10%"><div class="x-column-header x-column-header-inner">Code 4</div></th>',
                                        '<th width="35%"><div class="x-column-header x-column-header-inner">Description</div></th>',
                                        '</tr>',
                                        '<tpl for=".">',
                                        '<tr class="x-boundlist-item">',
                                        '<td ><div class="x-grid-cell x-grid-cell-inner">{kelsub}</div></td>',
                                        '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                                        '<td><div class="x-grid-cell x-grid-cell-inner">{code1}</div></td>',
                                        '<td><div class="x-grid-cell x-grid-cell-inner">{code2}</div></td>',
                                        '<td><div class="x-grid-cell x-grid-cell-inner">{code3}</div></td>',
                                        '<td><div class="x-grid-cell x-grid-cell-inner">{code4}</div></td>',
                                        '<td><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
                                        '</tr>',
                                        '</tpl>',
                                        '</table>'
                                        ), 
                                },

                                {
                                    xtype: 'label',
                                    forId: 'lbl1',
                                    text: 'To',
                                    margin: '2 10 0 10'
                                },

                                {
                                    xtype: 'combo',
                                    fieldLabel: '',
                                    itemId: 'fd_subgl_id35',
                                    id: 'combo2',
                                    name: 'sub_untilsubgl_id',
                                    emptyText: 'Ketik Sub Code...',
                                    width: 150,
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null,
                                    queryMode: 'local',
                                    minChars: 2,
                                    store:untilcode,
                                    forceSelection:true,
                                    valueField: 'subgl_id',
                                    displayField: 'code',
                                    matchFieldWidth: false,
                                    // typeAhead:false
                                    tpl: Ext.create('Ext.XTemplate',
                                        '<table class="x-grid-table" width="700px">',
                                        '<tr class="x-grid-row" w>',
                                        '<th width="10%"><div class="x-column-header x-column-header-inner">Kelsub</div></th>',
                                        '<th width="20%"><div class="x-column-header x-column-header-inner">Sub Code</div></th>',
                                        '<th width="15%"><div class="x-column-header x-column-header-inner">Code 1</div></th>',
                                        '<th width="10%"><div class="x-column-header x-column-header-inner">Code 2</div></th>',
                                        '<th width="10%"><div class="x-column-header x-column-header-inner">Code 3</div></th>',
                                        '<th width="10%"><div class="x-column-header x-column-header-inner">Code 4</div></th>',
                                        '<th width="35%"><div class="x-column-header x-column-header-inner">Description</div></th>',
                                        '</tr>',
                                        '<tpl for=".">',
                                        '<tr class="x-boundlist-item">',
                                        '<td ><div class="x-grid-cell x-grid-cell-inner">{kelsub}</div></td>',
                                        '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                                        '<td><div class="x-grid-cell x-grid-cell-inner">{code1}</div></td>',
                                        '<td><div class="x-grid-cell x-grid-cell-inner">{code2}</div></td>',
                                        '<td><div class="x-grid-cell x-grid-cell-inner">{code3}</div></td>',
                                        '<td><div class="x-grid-cell x-grid-cell-inner">{code4}</div></td>',
                                        '<td><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
                                        '</tr>',
                                        '</tpl>',
                                        '</table>'
                                        ), 
                                },
                                /*
                               {
                                    
                                    xtype: 'subaccountcodecomboboxgrid',
                                    fieldLabel: '',
                                    emptyText: 'Select Until ',
                                    name: 'sub_untilsubgl_id',
                                    id: 'combo2',
                                    allowBlank: false,
                                },
                                */
                                {
                                    xtype: 'splitter',
                                    width: '5'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    name: 'subacccode_all',
                                    boxLabel: 'All',
                                    padding: '0 0 0 0',
                                    margin: '0 0 0 0',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    checked: false
                                },


                                ]
                            },
                            {
                                xtype: 'fieldcontainer',
                                fieldLabel: 'Code 1',
                                itemId: 'item_code1',
                                layout: 'hbox',
                                name: 'sub1',
                                hidden:true,
                                items: [
                                {

                                    xtype: 'combo',
                                    fieldLabel: '',
                                    emptyText: 'Select From ',
                                    name: 'fromsub1',
                                    queryMode: 'local',
                                    enableKeyEvents: true,
                                    // typeAhead:false,
                                    store:code,
                                    forceSelection:true,
                                    allowBlank: false,
                                    valueField: 'code1',
                                    displayField: 'code1',
                                    matchFieldWidth: false,
                                    tpl: Ext.create('Ext.XTemplate',
                                        '<table class="x-grid-table" width="600px">',
                                        '<tr class="x-grid-row" w>',
                                        '<th width="20%"><div class="x-column-header x-column-header-inner">Sub Code</div></th>',
                                        '<th width="15%"><div class="x-column-header x-column-header-inner">Code 1</div></th>',
                                        '<th width="10%"><div class="x-column-header x-column-header-inner">Code 2</div></th>',
                                        '<th width="10%"><div class="x-column-header x-column-header-inner">Code 3</div></th>',
                                        '<th width="10%"><div class="x-column-header x-column-header-inner">Code 4</div></th>',
                                        '<th width="45%"><div class="x-column-header x-column-header-inner">Description</div></th>',
                                        '</tr>',
                                        '<tpl for=".">',
                                        '<tr class="x-boundlist-item">',
                                        '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                                        '<td><div class="x-grid-cell x-grid-cell-inner">{code1}</div></td>',
                                        '<td><div class="x-grid-cell x-grid-cell-inner">{code2}</div></td>',
                                        '<td><div class="x-grid-cell x-grid-cell-inner">{code3}</div></td>',
                                        '<td><div class="x-grid-cell x-grid-cell-inner">{code4}</div></td>',
                                        '<td><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
                                        '</tr>',
                                        '</tpl>',
                                        '</table>'
                                        ),   
                                },
                                {
                                    xtype: 'label',
                                    forId: 'lbl1',
                                    text: 'To',
                                    margin: '2 10 0 10'
                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: '',
                                    emptyText: 'Select Until ',
                                    name: 'untilsub1',
                                    queryMode: 'local',
                                    enableKeyEvents: true,
                                    forceSelection:true,
                                    typeAhead:false,
                                    store:codeuntil,
                                    allowBlank: false,
                                    valueField: 'code1',
                                    displayField: 'code1',
                                    matchFieldWidth: false,
                                    tpl: Ext.create('Ext.XTemplate',
                                        '<table class="x-grid-table" width="600px">',
                                        '<tr class="x-grid-row" w>',
                                        '<th width="20%"><div class="x-column-header x-column-header-inner">Sub Code</div></th>',
                                        '<th width="15%"><div class="x-column-header x-column-header-inner">Code 1</div></th>',
                                        '<th width="10%"><div class="x-column-header x-column-header-inner">Code 2</div></th>',
                                        '<th width="10%"><div class="x-column-header x-column-header-inner">Code 3</div></th>',
                                        '<th width="10%"><div class="x-column-header x-column-header-inner">Code 4</div></th>',
                                        '<th width="45%"><div class="x-column-header x-column-header-inner">Description</div></th>',
                                        '</tr>',
                                        '<tpl for=".">',
                                        '<tr class="x-boundlist-item">',
                                        '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                                        '<td><div class="x-grid-cell x-grid-cell-inner">{code1}</div></td>',
                                        '<td><div class="x-grid-cell x-grid-cell-inner">{code2}</div></td>',
                                        '<td><div class="x-grid-cell x-grid-cell-inner">{code3}</div></td>',
                                        '<td><div class="x-grid-cell x-grid-cell-inner">{code4}</div></td>',
                                        '<td><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
                                        '</tr>',
                                        '</tpl>',
                                        '</table>'
                                        ),   
                                },                                
                                ]
                            },
                            {
                                xtype: 'fieldcontainer',
                                fieldLabel: 'Code 2',
                                itemId: 'item_code2',
                                name: 'sub2',
                                hidden:true,
                                layout: 'hbox',
                                items: [
                                {

                                    xtype: 'combo',
                                    fieldLabel: '',
                                    emptyText: 'Select From ',
                                    name: 'fromsub2',
                                    queryMode: 'local',
                                    forceSelection:true,
                                    store:code2,
                                    allowBlank: false,
                                    valueField: 'code2',
                                    displayField: 'code2',
                                    tpl: Ext.create('Ext.XTemplate',
                                        '<table class="x-grid-table" width="100%">',
                                        '<tr class="x-grid-row" w>',
                                        '<th><div class="x-column-header x-column-header-inner">Code 2</div></th>',
                                        '</tr>',
                                        '<tpl for=".">',
                                        '<tr class="x-boundlist-item">',
                                        '<td><div class="x-grid-cell x-grid-cell-inner">{code2}</div></td>',
                                        '</tr>',
                                        '</tpl>',
                                        '</table>'
                                        ), 
                                },
                                {
                                    xtype: 'label',
                                    forId: 'lbl1',
                                    text: 'To',
                                    margin: '2 10 0 10'
                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: '',
                                    emptyText: 'Select Until ',
                                    name: 'untilsub2',
                                    queryMode: 'local',
                                    forceSelection:true,
                                    store:code2,
                                    allowBlank: false,
                                    valueField: 'code2',
                                    displayField: 'code2',
                                    tpl: Ext.create('Ext.XTemplate',
                                        '<table class="x-grid-table" width="100%">',
                                        '<tr class="x-grid-row" w>',
                                        '<th><div class="x-column-header x-column-header-inner">Code 2</div></th>',
                                        '</tr>',
                                        '<tpl for=".">',
                                        '<tr class="x-boundlist-item">',
                                        '<td><div class="x-grid-cell x-grid-cell-inner">{code2}</div></td>',
                                        '</tr>',
                                        '</tpl>',
                                        '</table>'
                                        ), 
                                },                                
                                ]
                            },
                            {
                                xtype: 'fieldcontainer',
                                fieldLabel: 'Code 3',
                                itemId: 'item_code3',
                                layout: 'hbox',
                                name: 'sub3',
                                hidden:true,
                                items: [
                                {

                                    xtype: 'combo',
                                    fieldLabel: '',
                                    emptyText: 'Select From ',
                                    name: 'fromsub3',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'label',
                                    forId: 'lbl1',
                                    text: 'To',
                                    margin: '2 10 0 10'
                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: '',
                                    emptyText: 'Select Until ',
                                    name: 'untilsub3',
                                    allowBlank: false,
                                },                                
                                ]
                            },
                            {
                                xtype: 'fieldcontainer',
                                fieldLabel: 'Code 4',
                                itemId: 'item_code4',
                                name: 'sub4',
                                hidden:true,
                                layout: 'hbox',
                                items: [
                                {

                                    xtype: 'combo',
                                    fieldLabel: '',
                                    emptyText: 'Select From ',
                                    name: 'fromsub4',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'label',
                                    forId: 'lbl1',
                                    text: 'To',
                                    margin: '2 10 0 10'
                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: '',
                                    emptyText: 'Select Until ',
                                    name: 'untilsub4',
                                    allowBlank: false,
                                },                                
                                ]
                            },
                            {
                                xtype: 'fieldcontainer',
                                fieldLabel: 'Report Type',
                                itemId: 'item_rt',
                                layout: 'hbox',
                                items: [
                                {
                                 xtype:'combobox',
                                 name:'reporttype',
                                 valueField: 'reporttype',
                                 queryMode:'local',
                                 dvalue: 'DEFAULT',
                                 store:['DEFAULT','EXCEL','EXCEL 2'],
                                 autoSelect:true,
                                 forceSelection:true,
                                 listeners: {
                                    afterrender: function() {
                                     this.setValue(this.dvalue);    
                                 }
                             }
                         }
                         ]
                     }
                     ]
                 },
               /* {
                    xtype: 'tbspacer',
                    height: 15
                },
                */
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    bodyStyle: 'background-color:#dfe8f5;',
                    padding: '0 0 0 200px',
                    items: [
                    {
                        xtype: 'button',
                        action: 'submit',
                        itemId: 'btnSubmit',
                        iconCls: 'icon-search',
                        text: 'Submit',
                        padding: 5,
                    },
                    {
                        xtype: 'tbspacer',
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        iconCls: 'icon-cancel',
                        padding: 5,
                        text: 'Cancel',
                        handler: function () {
                            this.up('window').close();
                        }
                    }
                    ]
                }
                ],
            });
me.callParent(arguments);
},
});
