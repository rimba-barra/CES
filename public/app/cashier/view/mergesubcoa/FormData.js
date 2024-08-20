Ext.define('Cashier.view.mergesubcoa.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.mergesubcoaformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 500,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: "_fdmergesubcoa",
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    id: 'hideparam' + me.uniquename,
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'mergesubcoa_id' + me.uniquename,
                    name: 'mergesubcoa_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'kasbon_id' + me.uniquename,
                    name: 'kasbon_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'voucher_id' + me.uniquename,
                    name: 'voucher_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'kasbank_id' + me.uniquename,
                    name: 'kasbank_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'approvename' + me.uniquename,
                    name: 'approvename',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'status' + me.uniquename,
                    name: 'status',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'projectname' + me.uniquename,
                    name: 'projectname',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'ptname',
                    name: 'ptname',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'prefixdept' + me.uniquename,
                    name: 'prefixdept',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'other_made_by' + me.uniquename,
                    name: 'other_made_by',
                },
                {
                    // Fieldset in Column 1
                    xtype: 'fieldset',
                    title: 'Will be kept',
                    collapsible: false,
                    defaults: {
                        anchor: '100%'
                    },
                    layout: 'vbox',
                    padding: '0 0 0 10', //(top, right, bottom, left).
                    items: [
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
                                    xtype: 'ptusercomboboxpersh',
                                    itemId: 'fd_pt_id_44',
                                    id: 'pt_id_44',
                                    name: 'pt_id',
                                    fieldLabel: 'PT / Company',
                                    emptyText: 'Select PT / Company',
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null,
                                    labelWidth: 130,
                                    // forceSelection: true,
                                    listeners: {
                                    keyup: function (field) {
                                        var searchString = field.getRawValue().toString().toLowerCase();
                                        if(searchString == null){
                                            return false;
                                        }
                                        if (searchString) {
                                            this.store.filterBy(function (record, id) {
                                                if (record.get('ptname') == null || record.get('ptcode') == null || record.get('projectcode') == null) {
                                                    return false;
                                                }else{
                                                    if (record.get('ptname').toString().toLowerCase().indexOf(searchString) > -1) {
                                                        return true;
                                                        this.store.clearFilter(true);
                                                    } else if (record.get('ptcode').toString().toLowerCase().indexOf(searchString) > -1) {
                                                        return true;
                                                        this.store.clearFilter(true);
                                                    } else if (record.get('projectcode').toString().toLowerCase().indexOf(searchString) > -1) {
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
                                    xtype: 'subglcombobox',
                                    fieldLabel: 'Sub Account',
                                   // valueField: 'code',
                                    itemId: 'fd_subgl_id' + me.uniquename,
                                    id: 'subgl_id_b123',
                                    name: 'subgl_id',
                                    width: 400,
                                    emptyText: 'Ketik Sub Account',
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null,
                                    queryMode: 'remote',
                                    forceSelection:true,
                                    queryMode: 'remote',
                                    minChars: 2,
                                    forceSelection:true,
                                    typeAhead:false,
                                    labelWidth: 130,
                                    tpl: Ext.create('Ext.XTemplate',
                                            '<table class="x-grid-table" width="700" >',
                                            '<tr class="x-grid-row">',
                                                '<th width="80"><div class="x-column-header x-column-header-inner">Kelsub</div></th>',
                                                '<th width="80"><div class="x-column-header x-column-header-inner">Subcode</div></th>',
                                                '<th width="80"><div class="x-column-header x-column-header-inner">Code 1</div></th>',
                                                '<th width="80"><div class="x-column-header x-column-header-inner">Code 2</div></th>',
                                                '<th width="80"><div class="x-column-header x-column-header-inner">Code 3</div></th>',
                                                '<th width="80"><div class="x-column-header x-column-header-inner">Code 4</div></th>',
                                                '<th width="250"><div class="x-column-header x-column-header-inner">Description</div></th>',
                                                '<th width="100"><div class="x-column-header x-column-header-inner">Unit ID EREMS</div></th>',
                                                '<th width="130"><div class="x-column-header x-column-header-inner">Unit Number EREMS</div></th>',
                                                '<th width="130"><div class="x-column-header x-column-header-inner">Status Unit</div></th>',
                                            '</tr>',
                                            '<tpl for=".">',
                                            '<tr class="x-boundlist-item">',
                                                '<td ><div class="x-grid-cell x-grid-cell-inner">{kelsub}</div></td>',
                                                '<td ><div class="x-grid-cell x-grid-cell-inner">{subcode}</div></td>',
                                                '<td ><div class="x-grid-cell x-grid-cell-inner">{code1}</div></td>',
                                                '<td ><div class="x-grid-cell x-grid-cell-inner">{code2}</div></td>',
                                                '<td ><div class="x-grid-cell x-grid-cell-inner">{code3}</div></td>',
                                                '<td ><div class="x-grid-cell x-grid-cell-inner">{code4}</div></td>',
                                                '<td ><div class="x-grid-cell x-grid-cell-inner">{subdesc}</div></td>',
                                                '<td ><div class="x-grid-cell x-grid-cell-inner">{unit_id}</div></td>',
                                                '<td ><div class="x-grid-cell x-grid-cell-inner">{unit_number}</div></td>',
                                                '<td ><div class="x-grid-cell x-grid-cell-inner">{status_unit}</div></td>',
                                            '</tr>',
                                            '</tpl>',
                                            '</table>'
                                    ),
                                },
                                {
                                    fieldLabel: '',
                                    xtype: 'textfield',
                                    name: 'code1',
                                    width: 70,
                                    readOnly: true,
                                    emptyText: 'Code 1',
                                    margin: '0 0 0 20'
                                },
                                {
                                    fieldLabel: '',
                                    xtype: 'textfield',
                                    name: 'code2',
                                    width: 70,
                                    readOnly: true,
                                    emptyText: 'Code 2',
                                    labelSeparator: ' ',
                                    margin: '0 0 0 5'
                                },
                                {
                                    fieldLabel: '',
                                    xtype: 'textfield',
                                    name: 'code3',
                                    width: 70,
                                    readOnly: true,
                                    emptyText: 'Code 3',
                                    labelSeparator: ' ',
                                    margin: '0 0 0 5'
                                },
                                {
                                    fieldLabel: '',
                                    xtype: 'textfield',
                                    name: 'code4',
                                    width: 70,
                                    readOnly: true,
                                    emptyText: 'Code 4',
                                    labelSeparator: ' ',
                                    margin: '0 0 0 5'
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
                                    fieldLabel: 'Description',
                                    xtype: 'textfield',
                                    name: 'subdesc',
                                    width: 485,
                                    readOnly: true,
                                    emptyText: 'Auto',
                                    labelWidth: 130,
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
                                    xtype: 'textfield',
                                    itemId: 'fs_subgroup' + me.uniquename,
                                    name: 'subgroup_name',
                                    id: 'subgroup' + me.uniquename,
                                    fieldLabel: 'Sub Group',
                                    emptyText: 'Auto',
                                    width: 230,
                                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                    readOnly: true,
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 30,
                                    labelWidth: 130,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '5'
                                },
                                {
                                    xtype: 'textfield',
                                  
                                    itemId: 'fd_' + me.uniquename,
                                    id: 'subgroup_desc' + me.uniquename,
                                    name: 'subgroup_desc',
                                    emptyText: 'Auto',
                                    width: 250,
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
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
                                    xtype: 'textfield',
                                    itemId: 'fs_unit_id' + me.uniquename,
                                    name: 'unit_id',
                                    id: 'unit_id' + me.uniquename,
                                    fieldLabel: 'Unit ID EREMS',
                                    emptyText: 'Auto',
                                    width: 400,
                                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                    readOnly: true,
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 30,
                                    labelWidth: 130,
                                },
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
                                    xtype: 'textfield',
                                    itemId: 'fs_unit_number' + me.uniquename,
                                    name: 'unit_number',
                                    id: 'unit_number' + me.uniquename,
                                    fieldLabel: 'Unit Number EREMS',
                                    emptyText: 'Auto',
                                    width: 400,
                                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                    readOnly: true,
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 30,
                                    labelWidth: 130,
                                },
                            ]
                        },
                    ]
                },
                {
                    // Fieldset in Column 1
                    xtype: 'fieldset',
                    title: 'Will be deleted',
                    collapsible: false,
                    defaults: {
                        anchor: '100%'
                    },
                    layout: 'vbox',
                    padding: '10 10 10 10', //(top, right, bottom, left).
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
                                    xtype: 'tabpanel',
                                    itemId: 'mergesubcoatab',
                                    name: 'mergesubcoatab',
                                    width: 875,
                                    height: 200,
                                    activeTab: 0,
                                    defaults: {layout: 'fit'},
                                    items: [
                                        {
                                            title: 'SUB ACCOUNT',
                                            xtype: 'mergesubcoagriddetail',
                                            name: 'gridtabmergesubcoadetail',
                                            id: 'gridtabmergesubcoadetail',
                                            readOnly: false,
                                        },
                                        
                                    ],
                                }
                            ]
                        },
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var me = this;
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                padding: '0 0 0 0',
                layout: {
                    padding: 6,
                    type: 'hbox',
                },
                items: [
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
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                align: 'right',
                                bodyBorder: false,
                                defaults: {
                                    layout: 'fit'
                                },
                                items: [
                                    {
                                        xtype: 'button',
                                        action: 'save',
                                        itemId: 'btnSave',
                                        padding: 5,
                                        width: 75,
                                        iconCls: 'icon-save',
                                        text: 'Merge'
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
                                    },
                                ]
                            },
                        ]
                    },
                ]
            }
        ];
        return x;
    }
});

