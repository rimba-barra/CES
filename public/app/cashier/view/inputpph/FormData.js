Ext.define('Cashier.view.inputpph.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.inputpphformdata',
    layout: 'vbox',
    padding: '0 20 0 10',
    bodyStyle: 'background-color:#dfe8f5;padding-left: 10px;',
    border: false,
    height: 700,
    uniquename:'_finputpph',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                width: '100%'
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
                    xtype: 'projectptcombobox',
                    fieldLabel:'Project / PT',
                    emptyText: 'Select Project / PT',
                    name: 'projectpt_id',
                    allowBlank: false,
                    enableKeyEvents: true,
                    margin: '0 0 5 0',
                    width: 500,
                    enforeMaxLength: true,
                    valueField: 'projectpt_id',
                    value: parseInt(apps.projectpt),
                    tpl: Ext.create('Ext.XTemplate',
                        '<table class="x-grid-table" width="700px">',
                            '<tr class="x-grid-row">',
                                '<th width="15%"><div class="x-column-header x-column-header-inner">Project Code</div></th>',
                                '<th width="35%"><div class="x-column-header x-column-header-inner">Project Name</div></th>',
                                '<th width="10%"><div class="x-column-header x-column-header-inner">PT Code</div></th>',
                                '<th width="40%"><div class="x-column-header x-column-header-inner">PT Name</div></th>',
                            '</tr>',
                            '<tpl for=".">',
                                '<tr class="x-boundlist-item">',
                                    '<td><div class="x-grid-cell x-grid-cell-inner">{projectcode}</div></td>',
                                    '<td><div class="x-grid-cell x-grid-cell-inner">{projectname}</div></td>',
                                    '<td><div class="x-grid-cell x-grid-cell-inner">{ptcode}</div></td>',
                                    '<td><div class="x-grid-cell x-grid-cell-inner">{pt_name}</div></td>',
                                '</tr>',
                            '</tpl>',
                        '</table>'
                    ),   
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'COA',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [

                        {
                            xtype: 'coacombobox',
                            fieldLabel: '',
                            emptyText: 'From COA',
                            name: 'coafrom',
                            allowBlank: false,
                            enableKeyEvents : true,
                            forceSelection: true,
                            typeAhead: true,
                            tpl: Ext.create('Ext.XTemplate',
                                '<table class="x-grid-table" width="800px" >',
                                    '<tr class="x-grid-row">',
                                        '<th width="100px"><div class="x-column-header x-column-header-inner">Coa</div></th>',
                                        '<th width="300px"><div class="x-column-header x-column-header-inner">Name</div></th>',
                                        '<th width="100px"><div class="x-column-header x-column-header-inner">Sub Group</div></th>',
                                        '<th width="300px"><div class="x-column-header x-column-header-inner">Sub Group Description</div></th>',
                                    '</tr>',
                                    '<tpl for=".">',
                                        '<tr class="x-boundlist-item">',
                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{coa}</div></td>',
                                            '<td><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
                                            '<td><div class="x-grid-cell x-grid-cell-inner">{kelsub}</div></td>',
                                            '<td><div class="x-grid-cell x-grid-cell-inner">{kelsub_description}</div></td>',
                                        '</tr>',
                                    '</tpl>',
                                '</table>'
                            ),
                            listeners: {
                                keyup: function (field) {
                                    var me = this;
                                    var c = 0;
                                    if (field != null) {
                                        var searchString = field.getValue();
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
                            name: 'coato',
                            allowBlank: false,
                            enableKeyEvents : true,
                            typeAhead: true,
                            forceSelection: true,
                            tpl: Ext.create('Ext.XTemplate',
                                '<table class="x-grid-table" width="800px" >',
                                    '<tr class="x-grid-row">',
                                        '<th width="100px"><div class="x-column-header x-column-header-inner">Coa</div></th>',
                                        '<th width="300px"><div class="x-column-header x-column-header-inner">Name</div></th>',
                                        '<th width="100px"><div class="x-column-header x-column-header-inner">Sub Group</div></th>',
                                        '<th width="300px"><div class="x-column-header x-column-header-inner">Sub Group Description</div></th>',
                                    '</tr>',
                                    '<tpl for=".">',
                                        '<tr class="x-boundlist-item">',
                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{coa}</div></td>',
                                            '<td><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
                                            '<td><div class="x-grid-cell x-grid-cell-inner">{kelsub}</div></td>',
                                            '<td><div class="x-grid-cell x-grid-cell-inner">{kelsub_description}</div></td>',
                                        '</tr>',
                                    '</tpl>',
                                '</table>'
                            ),    
                            listeners: {
                                keyup: function (field) {
                                    var me = this;
                                    var c = 0;
                                    if (field != null) {
                                        var searchString = field.getValue();
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
                                    }
                                },
                                buffer: 300,
                            },
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Sub COA',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        {
                            xtype: 'subaccountgroupcombobox',
                            fieldLabel: '',
                            emptyText: 'Select Sub Account Group',
                            name: 'kelsub_id',
                            allowBlank: false,
                            enableKeyEvents : true,
                            typeAhead: true,
                            forceSelection: true
                        },
                        {
                            xtype: 'subglcombobox',
                            name: 'subgl_id',
                            id: 'inputpph_subgl_id',
                            margin: '0 5 0 5',
                            fieldLabel: '',
                            emptyText: 'Type some character..',
                            enableKeyEvents: true,
                            forceSelection: false,
                            typeAhead: false
                        },
                        {
                            xtype: 'textfield',
                            name: 'subgl_description',
                            readOnly: true,
                            margin: '0 5 0 5',
                            id: 'inputpph_subgl_description',
                            width: 300
                        },
                        {
                            xtype: 'checkbox',
                            name: 'all_sub',
                            boxLabel: 'All Sub',
                            inputValue: 1,
                            uncheckedValue: 0,
                            // listeners: {
                            //     change: function (el, newValue, oldValue, eOpts) {
                            //         if (newValue === true) {
                            //             Ext.getCmp('inputpph_subgl_id').setValue('');
                            //             Ext.getCmp('inputpph_subgl_description').setValue('');
                            //             Ext.getCmp('inputpph_subgl_id').setReadOnly(true);
                            //         } else {
                            //             Ext.getCmp('inputpph_subgl_id').setValue('');
                            //             Ext.getCmp('inputpph_subgl_description').setValue('');
                            //             Ext.getCmp('inputpph_subgl_id').setReadOnly(false);
                            //         }
                            //     }
                            // }
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Date',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: '',
                            emptyText: 'From Date',
                            name: 'date_from',
                            allowBlank: false,
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d'
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
                            name: 'date_to',
                            allowBlank: false,
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d'
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Voucher No.',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        {
                            xtype: 'vouchernocombobox',
                            name: 'voucher_no_from',
                            emptyText: 'From',
                            fieldLabel: '',
                            valueField: 'voucher_no',
                            displayField: 'voucher_no',
                            forceSelection: true,
                            allowBlank: false,
                        },
                        {
                            xtype: 'label',
                            forId: 'lbl1',
                            text: 'To',
                            margin: '2 10 0 10'
                        },
                        {
                            xtype: 'vouchernocombobox',
                            name: 'voucher_no_until',
                            emptyText: 'Until',
                            fieldLabel: '',
                            valueField: 'voucher_no',
                            displayField: 'voucher_no',
                            forceSelection: true,
                            allowBlank: false,
                        },
                        {
                            xtype: 'button',
                            action: 'search',
                            itemId: 'btnSearch',
                            iconCls: 'icon-search',
                            text: 'Search',
                            padding: 5,
                            margin: '0 0 0 10'
                        },
                        {
                            xtype: 'button',
                            action: 'update',
                            itemId: 'btnUpdate',
                            iconCls: 'icon-save',
                            padding: 5,
                            text: 'Update',
                            margin: '0 0 0 5'
                        },
                        {
                            xtype: 'button',
                            action: 'report',
                            itemId: 'btnReport',
                            iconCls: 'icon-excel',
                            padding: 5,
                            text: 'Report',
                            margin: '0 0 0 5'
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
                    items: [
                        {
                            xtype: 'tabpanel',
                            itemId: 'paneljurnalpph',
                            name: 'panel',
                            activeTab: 0,
                            region: 'center',
                            layout: 'hbox',
                            id: 'Tabpaneljurnalpph',
                            width: '99%',
                            height: 250,
                            items: [
                                {
                                    xtype: 'inputpphgrid',
                                    closable: false,
                                    name: 'inputpphgrid',
                                    title: 'Input PPH',
                                    flex: 1,
                                    itemId: 'Tabpaneljurnalpph',
                                },
                            ]
                        }
                    ]
                },              
            ],
        });
        me.callParent(arguments);
    },
});
