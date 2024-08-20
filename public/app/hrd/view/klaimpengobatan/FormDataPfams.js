Ext.define('Hrd.view.klaimpengobatan.FormDataPfams', {
    alias: 'widget.klaimpengobatanformdatapfams',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.library.template.view.MoneyField','Hrd.view.klaimpengobatan.GridDataPfams'],
    frame: true,
    autoScroll: true,
    height:570,
    uniquename: "_klaimpengobatanformdatapfams",
    deletedData: {},
    initComponent: function () {
        var me = this;
        var cbf = new Hrd.template.ComboBoxFields();
        Ext.applyIf(me, {
            defaults: {},
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
                            xtype: 'hiddenfield',
                            id: 'project_id' + me.uniquename,
                            name: 'project_id',
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'pt_id' + me.uniquename,
                            name: 'pt_id',
                        },
                        {
                            xtype: 'klaimpengobatangriddatapfams',
                            height: 300,
                            style: 'padding: 10 0 10 0'
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
                                    anchor: '100%',
                                    itemId: 'project_name'+ me.uniquename,
                                    id: 'project_name'+ me.uniquename,
                                    name: 'project_name',
                                    fieldLabel: 'Project',
                                    emptyText: 'Project',
                                    width: 300,
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '130'
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    itemId: 'pt_name'+ me.uniquename,
                                    id: 'pt_name'+ me.uniquename,
                                    name: 'pt_name',
                                    fieldLabel: 'PT',
                                    emptyText: 'PT',
                                    width: 300,
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    allowBlank: true,
                                    enableKeyEvents: true,
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
                                    xtype: 'combobox',
                                    name: 'code',
                                    fieldLabel: 'Department',
                                    width: 300,
                                    displayField: 'department',
                                    valueField: 'code',
                                    action: 'resetdetail',
                                    readOnly: false,
                                    allowBlank: false,
                                    emptyText: 'Select Data',
                                    matchFieldWidth: false,
                                    typeAhead: true,
                                    queryMode: 'local',
                                    tpl: Ext.create('Ext.XTemplate',
                                            '<table class="x-grid-table" width="500px" >',
                                            '<tr class="x-grid-row">',
                                            '<th width="100px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                                            '<th width="200px"><div class="x-column-header x-column-header-inner">Name</div></th>',
                                            '</tr>',
                                            '<tpl for=".">',
                                            '<tr class="x-boundlist-item">',
                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                                            '<td><div class="x-grid-cell x-grid-cell-inner">{department}</div></td>',
                                            '</tr>',
                                            '</tpl>',
                                            '</table>'
                                            ),
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
                                    xtype: 'datefield',
                                    fieldLabel: 'Reg Date',
                                    itemId: 'reg_date' + me.uniquename,
                                    id: 'reg_date' + me.uniquename,
                                    name: 'reg_date',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    emptyText: 'Tanggal Klaim ESS',
                                    width: 300,
                                    readOnly: false,
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '130'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Due Date',
                                    itemId: 'duedate' + me.uniquename,
                                    id: 'duedate' + me.uniquename,
                                    name: 'duedate',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    emptyText: 'Tanggal Klaim',
                                    width: 300,
                                    readOnly: false,
                                    allowBlank: false,
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
                                    fieldLabel: 'Data Flow',
                                    itemId: 'dataflow' + me.uniquename,
                                    id: 'dataflow' + me.uniquename,
                                    name: 'dataflow',
                                    emptyText: 'Data Flow',
                                    width: 300,
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '130'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Vendor',
                                    itemId: 'vendor' + me.uniquename,
                                    id: 'vendor' + me.uniquename,
                                    name: 'vendor',
                                    emptyText: 'Vendor',
                                    width: 300,
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
                                    xtype: 'combobox',
                                    fieldLabel: 'Payment Type',
                                    itemId: 'payment_method' + me.uniquename,
                                    id: 'payment_method' + me.uniquename,
                                    name: 'payment_method',
                                    emptyText: 'Payment Type',
                                    width: 300,
                                    readOnly: false,
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null,
                                    store : new Ext.data.SimpleStore({
                                    data : [['TRANSFER', 'TRANSFER'], ['CEK/GIRO', 'CEK/GIRO'], ['CASH', 'CASH']],
                                        fields : ['value', 'text']
                                    }),
                                    valueField : 'value',
                                    displayField : 'text',
                                    value:'TRANSFER',
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
                                    xtype: 'textareafield',
                                    fieldLabel: 'Description',
                                    itemId: 'description' + me.uniquename,
                                    id: 'description' + me.uniquename,
                                    name: 'description',
                                    emptyText: 'Description',
                                    width: 300,
                                    readOnly: false,
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                

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
                        action: 'process',
                        itemId: 'btnProcess',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Process'
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