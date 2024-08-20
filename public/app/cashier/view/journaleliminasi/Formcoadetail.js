Ext.define('Cashier.view.journaleliminasi.Formcoadetail', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.journaleliminasiformcoadetail',
    requires: ['Cashier.view.journaleliminasi.Gridsubcoadetail'],
    frame: true,
    minimizable: false,
    autoScroll: true,
    anchorSize: 100,
    height: 470,
    kosongGa:-1,
    bodyBorder: true,
    bodyPadding: 10,
    rowIndex:-1,
    id: 'journalformcoadetailID',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'voucherdetail_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kelsub_kelsub_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'indexdata'
                },

                {
                    xtype: 'hiddenfield',
                    name: 'cashflowtype'
                },
                
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        
                    {
                    xtype: 'combobox',
                    allowBlank: false,
                    name: 'coa_coa_id',
                    fieldLabel: 'Coa Name',
                    displayField: 'name',
                    valueField: 'coa_id',
                    width: 520,
                    queryMode:'local',
                    forceSelection:true,
                    matchFieldWidth: false,
                    tpl: Ext.create('Ext.XTemplate',
                          '<table class="x-grid-table" width="620px" >',
                            '<tr class="x-grid-row">',
                                '<th width="13px"><div class="x-column-header x-column-header-inner">Coa Account</div></th>',               
                                '<th width="60px"><div class="x-column-header x-column-header-inner">Name</div></th>', 
                                '<th width="10px"><div class="x-column-header x-column-header-inner">Type</div></th>',   
                                '<th width="10px"><div class="x-column-header x-column-header-inner">Sub</div></th>',               
                            '</tr>',
                            '<tpl for=".">',
                                '<tr class="x-boundlist-item">',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{coa}</div></td>',                    
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{type}</div></td>',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{kelsub_kelsub}</div></td>',                    
                                '</tr>',
                            '</tpl>',
                         '</table>'
                     ),  
                    absoluteReadOnly: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
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
                            xtype: 'splitter',
                            width: '10',
                        },
                        {
                            xtype: 'textfield',
                            name: 'coa_name',
                            fieldLabel: 'Coa Name',
                            anchor: '-5',
                            readOnly:true,
                            hidden: true,
                            emptyText: 'Auto Value',
                            width:200 
                       },
                        {
                            xtype: 'splitter',
                            width: '10',
                        },
                         {
                    xtype: 'textfield',
                    name: 'coa_coa',
                    emptyText: 'Acc No.',
                    anchor: '-5',
                    width:250 ,
                    readOnly:true

                },
//                
                    ]
                },
//                {
//                    xtype: 'textfield',
//                    name: 'coa_coa',
//                    fieldLabel: 'Coa account',
//                    enforceMaxLength: true,
//                    maxLength: 50,
//                    anchor: '-5',
//                    readOnly:true
//
//                },
//                {
//                    xtype: 'textfield',
//                    name: 'coa_name',
//                    fieldLabel: 'Coa Description',
//                    enforceMaxLength: true,
//                    maxLength: 50,
//                    anchor: '-5',
//                    readOnly:true
//
//                },
//                

                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Kel Sub',
                            name: 'kelsub_kelsub',
                            emptyText: 'Auto Value',
                            width: 200,
                            readOnly: true,
                            allowBlank: true,

                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10',
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Kel Sub Desc',
                            name: 'kelsub_description',
                            emptyText: 'Auto Value',
                            width: 300,
                            readOnly: true,
                            allowBlank: true,

                            enableKeyEvents: true,
                            rowdata: null
                        }
                    ]
                },

                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    defaultType: 'radiofield',
                    items:
                            [
                                {
                                    xtype: 'label',
                                    forId: 'type',
                                    text: 'Type:',
                                    margin: '0 70 0 0'
                                },
                                {
                                    boxLabel: 'Debet',
                                    name: 'type_acc',
                                    inputValue: 'D',
                                    id: 'radio1_acc'
                                },
                                {
                                    xtype: 'splitter', width: 30,
                                },
                                {
                                    boxLabel: 'Credit',
                                    name: 'type_acc',
                                    inputValue: 'C',
                                    id: 'radio2_acc'
                                }
                            ]
                },

                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'label',
                            itemId: 'affiliasiNameId',
                            id: 'affiliasiNameId',
                            text: '',
                            hidden: true,
                            width: 50,
                        },
                        {
                            xtype: 'splitter',
                            width: '53',
                        },
                        {
                            xtype: 'textfield',
                            name: 'unit_number',
                            //fieldLabel: 'Description',
                            enforceMaxLength: true,
                            maxLength: 50,
                            anchor: '-5',
                            flex: 2,
                            hidden: true,
                            disabled: true,
                        },
                        {
                            xtype: 'textfield',
                            name: 'subgl_subgl_id',
                            enforceMaxLength: true,
                            hidden: true,
                            maxLength: 50,
                            anchor: '-5',
                            flex: 2
                        },
                        {
                            xtype: 'textfield',
                            name: 'subgl_description',
                            enforceMaxLength: true,
                            readOnly:true,
                            hidden: true,
                            width: 200,
                            maxLength: 50,
                            anchor: '-5'
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnBrowseUnitsub',
                            action: 'browseUnitsub',
                            name: 'browseUnitsub',
                            hidden: true,
                            padding: 5,
                            width: 30,
                            height: 25,
                            iconCls: 'icon-search',
                            text: ''
                        },
                        /*
                        {
                            xtype: 'combobox',
                            forceSelection: true,
                            hidden: true,
                            name: 'subgl_subgl_id',
                            displayField: 'code',
                            valueField: 'subgl_id',
                            queryMode: 'local',
                            //pageSize: 25,
                            tpl: Ext.create('Ext.XTemplate',
                                    '<table class="x-grid-table" width="700px" >',
                                    '<tr class="x-grid-row">',
                                    '<th width="100px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                                    '<th width="100px"><div class="x-column-header x-column-header-inner">Code 1</div></th>',
                                    '<th width="100px"><div class="x-column-header x-column-header-inner">Code 2</div></th>',
                                    '<th width="100px"><div class="x-column-header x-column-header-inner">Code 3</div></th>',
                                    '<th width="150px"><div class="x-column-header x-column-header-inner">Description</div></th>',
                                    '</tr>',
                                    '<tpl for=".">',
                                    '<tr class="x-boundlist-item">',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{code2}</div></td>',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{code3}</div></td>',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{code4}</div></td>',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
                                    '</tr>',
                                    '</tpl>',
                                    '</table>'
                                    ),
                            flex: 2,
                            typeAhead: false,
                            listeners: {
                                keyup: function (field) {
                                    var c = 0;
                                    var searchString = field.getValue();

                                    if (searchString.length > 0) {

                                        this.store.filterBy(function (record, id) {
                                            if (record.get('code').toLowerCase().indexOf(field.getValue()) > -1) {
                                                return true;
                                                this.store.clearFilter(true);
                                            } else if (record.get('description').toLowerCase().indexOf(field.getValue()) > -1) {
                                                return true;

                                            } else {
                                                return false;
                                                this.store.clearFilter(true);
                                            }
                                        });
                                    }

                                },
                                buffer: 300,
                            },
                            displayTpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                    '{code} - {description}',
                                    '</tpl>'
                                    )
                        },
                        */
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            queryMode:'local',
                            fieldLabel: 'Cashflow ',
                            anchor: '-5',
                            forceSelection:true,
                            hidden: true,
                            name: 'cashflow',
                            emptyText: 'O',
                            //store: ['O','I'],
                            store: [],
                            width: 200,
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Cashflow ',
                            forceSelection: true,
                            name: 'cashflowtype_cashflowtype_id',
                            displayField: 'cashflowtype',
                            valueField: 'cashflowtype_id',
                            flex: 2
                        },
                        {
                            xtype: 'splitter',
                            width: '10',
                        },
                        {
                            xtype: 'xmoneyfield',
                            name: 'amount',
                            fieldLabel: 'Debet',
                            emptyText: 'Debet',
                            anchor: '-5',
                            allowBlank: true,
                        },
                        {
                            xtype: 'xmoneyfield',
                            name: 'amountc',
                            fieldLabel: 'Credit',
                            emptyText: 'Credit',
                            anchor: '-5',
                            allowBlank:  true,
                        },
                        
                    ]
                },
                
                
            
                
                  
//                {
//                    xtype: 'textfield',
//                    name: 'type',
//                    fieldLabel: 'Data Flow',
//                    enforceMaxLength: true,
//                    maxLength: 30,
//                    anchor: '-5',
//                    readOnly:true
//
//                },
//                {
//                    xtype: 'textfield',
//                    itemId: 'attributevalue',
//                    name: 'persen',
//                    fieldLabel: 'Persen',
//                    enforceMaxLength: true,
//                    maxLength: 50,
//                    anchor: '-5',
//                    allowBlank: false,
//
//                },
               
            {
                    xtype: 'textareafield',
                    name: 'remarks',
                    fieldLabel: 'Description',
                    enforceMaxLength: true,
                    maxLength: 200,
                    anchor: '-5'

                },
            
            
                {xtype: 'journaleliminasisubcoadetailgrid',
                    itemId:'journaleliminasisubcoadetail_grid',
                    name:'journaleliminasisubcoadetailgrid',
                    hidden:true
                }
                 
            
            
            
            
            ],
            
        });

        me.callParent(arguments);
    },
    generateDockedItem: function() {
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
                action: 'savenew',
                itemId: 'btnSaveNew',
                padding: 5,
                width: 105,
                iconCls: 'icon-save',
                text: 'Save & New'
            },
           
            {
                xtype: 'button',
                action: 'save',
                itemId: 'btnSave',
                padding: 5,
                width: 75,
                iconCls: 'icon-save',
                text: 'Save'
            },

            {
                xtype: 'button',
                action: 'directsave',
                itemId: 'btnDirectSave',
                padding: 5,
                width: 105,
                iconCls: 'icon-save',
                text: 'SAVE'
            },
            
            
            {
                xtype: 'button',
                action: 'cancel',
                itemId: 'btnCancel',
                padding: 5,
                width: 75,
                iconCls: 'icon-cancel',
                text: 'Cancel',
                handler: function() {
                    this.up('window').close();
                }
            }
            ]
        }
        ];
        return x;
    },
});

