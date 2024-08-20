Ext.define('Cashier.view.reportbankpaymentvoucher.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.reportbankpaymentvoucherformdata',
    frame: true,
    autoScroll: false,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    minHeight: 150,
    maxHeight: 345,
    autoHeight: true,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    deletedRows: [],
    editedRow: -1,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'project_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'pt_pt_id'
                },
                {
                    xtype: 'combobox',
                    name: 'projectpt_id',
                    fieldLabel: 'Company',
                    displayField: 'name',
                    valueField: 'pt_projectpt_id',
                    forceSelection: true,
                    allowBlank: false,
                    readOnly: false,
                    width: 250,
                    enforceMaxLength: true,
                    queryMode: 'local',
                    rowdata: null,
                    matchFieldWidth: false,
                    tpl: Ext.create('Ext.XTemplate',
                            '<table class="x-grid-table" width="300px">',
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
                    name: 'voucherprefix_voucherprefix_id',
                    fieldLabel: 'Prefix',
                    displayField: 'description',
                    valueField: 'prefix_prefix_id',
                    width: 430,
                    forceSelection: true,
                    allowBlank: false,
                    readOnly: true,
                    enforceMaxLength: true,
                    queryMode: 'local',
                    rowdata: null,
                    msgTarget: "side",
                    blankText: 'This should not be blank!',
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
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 100,
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Periode  ',
                            name: 'from',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 250,
                            emptyText: 'Manual Input',
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            hideTrigger: false,
                            onDownArrow: Ext.emptyFn,
                            listeners: {
                                render: function () {
                                    var picker = this.getPicker();
                                    picker.on("select", function () {
                                        this.hide();
                                    });
                                    //  this.triggerCell.hide();
                                    this.inputCell.on("click", function () {
                                        if (picker.hidden)
                                            picker.show();
                                        else
                                            picker.hide();
                                    });
                                }
                            }
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'To ',
                            name: 'to',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 250,
                            emptyText: 'Manual Input',
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            hideTrigger: false,
                            onDownArrow: Ext.emptyFn,
                            listeners: {
                                render: function () {
                                    var picker = this.getPicker();
                                    picker.on("select", function () {
                                        this.hide();
                                    });
                                    //  this.triggerCell.hide();
                                    this.inputCell.on("click", function () {
                                        if (picker.hidden)
                                            picker.show();
                                        else
                                            picker.hide();
                                    });
                                }
                            }
                        },
                    ]
                },
                {
                    xtype: 'combobox',
                    name: 'dataflow',
                    fieldLabel: 'Dataflow ',
                    queryMode: 'local',
                    valueField: 'status',
                    allowBlank: false,
                    forceSelection: true,
                    msgTarget: "side",
                    blankText: 'This should not be blank!',
                    displayField: 'description',
                    value: 'ALL',
                    store: new Ext.data.JsonStore({
                        fields: ['status', 'description'],
                        data: [
                            {status: 'ALL', description: 'ALL'},
                            {status: 'I', description: 'IN'},
                            {status: 'O', description: 'OUT'},
                        ]
                    }),
                },
              
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 300,
                    items: [
                    ]
                },
                //Rizal 9 Mei 2019
                {
                    xtype: 'combobox',
                    name: 'rangeapprove_rangeapprove_id',
                    fieldLabel: 'Range Approval',
                    displayField: 'range',
                    valueField: 'rangeapprove_id',
                    width: 430,
                    forceSelection: true,
                    enforceMaxLength: true,
                    queryMode: 'local',
                    rowdata: null,
                    msgTarget: "side",
                    matchFieldWidth: false,
                },
                  {
                    xtype: 'checkboxfield',
                    name: 'generate_all',
                    fieldLabel: 'Generate All Data',
                    msgTarget: "side",
                    checked:true,
                    inputValue: '1',
                    uncheckedValue: '0',
                    rowdata: null,
                },
                 {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Group By',
                            padding: '0 0 0 20px',
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'None',
                                    xtype: 'radiofield',
                                    name: 'group_by',
                                    inputValue: '1',
                                    id: 'groupby_1',
                                    checked:true
                                },
                                {
                                    xtype: 'splitter',
                                    width: '50'
                                },
                                {
                                    boxLabel: 'Approval Limit',
                                    xtype: 'radiofield',
                                    name: 'group_by',
                                    inputValue: '2',
                                    id: 'groupby_2'
                                },
                                
                            ]
                        },

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
                                       dvalue: 'TEMPLATE-1 Default',
                                       store:['TEMPLATE-1 Default','TEMPLATE-2 Merge Amount','TEMPLATE-3 Potrait'], // ,'TEMPLATE-3' versi potrait versi 1
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
                                xtype: 'checkboxfield',
                                name: 'all_payment_type',
                                fieldLabel: 'All Payment Type',
                                msgTarget: "side",
                                checked:false,
                                inputValue: '1',
                                uncheckedValue: '0',
                                rowdata: null,
                            },
                       
                 
                //
            ],
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
                    type: 'hbox'
                }, items: [
                    {
                        xtype: 'button',
                        action: 'select',
                        padding: 5,
                        width: 75,
                        flex: 1,
                        maxWidth: 75,
                        iconCls: 'icon-search',
                        text: 'Process',
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Close',
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

