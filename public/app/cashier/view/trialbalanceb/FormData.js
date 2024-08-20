Ext.define('Cashier.view.trialbalanceb.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.trialbalancebformdata',
    requires: ['Cashier.library.template.combobox.Coagrid'],
    layout: 'vbox',
    bodyStyle: 'background-color:#dfe8f5;',
    id: 'trialbalancebID',
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
                name: 'project_project_id',
                type: 'int'
            },
            {
                name: 'project_name',
                type: 'string'
            },
            ]
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
                xtype: 'panel',
                layout: 'vbox',
                bodyStyle: 'background-color:#dfe8f5;',
                border: false,
                padding: '0 0 0 20px',
                items: [
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Detail',
                    padding: '0 0 0 20px',
                    layout: 'hbox',
                    items: [
                    {
                        boxLabel: 'Yes',
                        xtype: 'radiofield',
                        name: 'detaildata',
                        inputValue: '1',
                        id: 'tb_detailyes',
                        checked:true
                    },
                    {
                        xtype: 'splitter',
                        width: '50'
                    },
                    {
                        boxLabel: 'No',
                        xtype: 'radiofield',
                        name: 'detaildata',
                        inputValue: '2',
                        id: 'tb_detailno'
                    }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Header',
                    padding: '0 0 0 20px',
                    layout: 'hbox',
                    items: [
                    {
                        boxLabel: 'Yes',
                        xtype: 'radiofield',
                        name: 'headerdata',
                        inputValue: '1',
                        id: 'tb_headeryes'
                    },
                    {
                        xtype: 'splitter',
                        width: '50'
                    },
                    {
                        boxLabel: 'No',
                        xtype: 'radiofield',
                        name: 'headerdata',
                        inputValue: '2',
                        id: 'tb_headerno',
                        checked:true
                    }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Show Sub',
                    padding: '0 0 0 20px',
                    layout: 'hbox',
                    items: [
                    {
                        boxLabel: 'Yes',
                        xtype: 'radiofield',
                        name: 'subdata',
                        inputValue: '1',
                        id: 'subyes'
                    },
                    {
                        xtype: 'splitter',
                        width: '50'
                    },
                    {
                        boxLabel: 'No',
                        xtype: 'radiofield',
                        name: 'subdata',
                        inputValue: '2',
                        id: 'subno',
                        checked:true
                    }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Template',
                    padding: '0 0 0 20px',
                    layout: 'hbox',
                    items: [
                    {
                        boxLabel: 'TB 01',
                        xtype: 'radiofield',
                        name: 'templatedata',
                        inputValue: '1',
                        id: 'template01'
                    },
                    {
                        xtype: 'splitter',
                        width: '37'
                    },
                    {
                        boxLabel: 'TB 02',
                        xtype: 'radiofield',
                        name: 'templatedata',
                        inputValue: '2',
                        id: 'template02',
                        checked:true
                    },
                    {
                        xtype: 'splitter',
                        width: '30'
                    },
                    {
                        boxLabel: 'TB Not Balance',
                        xtype: 'radiofield',
                        name: 'templatedata',
                        inputValue: '3',
                        hidden: true,
                        id: 'template03'
                    }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Voucher Sort',
                    padding: '0 0 0 20px',
                    layout: 'hbox',
                    items: [
                    {
                        boxLabel: 'Asc',
                        xtype: 'radiofield',
                        name: 'sortdata',
                        inputValue: '1',
                        id: 'sort01',
                        checked:true
                    },
                    {
                        xtype: 'splitter',
                        width: '49'
                    },
                    {
                        boxLabel: 'Desc',
                        xtype: 'radiofield',
                        name: 'sortdata',
                        inputValue: '2',
                        id: 'sort02'
                    }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Merge Bank',
                    padding: '0 0 0 20px',
                    layout: 'hbox',
                    items: [
                    {
                        boxLabel: 'No',
                        xtype: 'radiofield',
                        name: 'mergebank',
                        inputValue: '1',
                        id: 'mergebank1',
                        checked:true
                    },
                    {
                        xtype: 'splitter',
                        width: '53'
                    },
                    {
                        boxLabel: 'Yes',
                        xtype: 'radiofield',
                        name: 'mergebank',
                        inputValue: '2',
                        id: 'mergebank2'
                    }
                    ]
                },
                {
                    xtype: 'combobox',
                    name: 'pt_id',
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
                            var searchString = field.getRawValue().toString().toLowerCase();
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

                ]
            },
            {
                xtype: 'panel',
                layout: 'vbox',                   
                bodyStyle: 'background-color:#dfe8f5;',
                border: false,
                padding: '0 0 0 20px',
                items: [
                        // {
                        //     xtype: 'fieldcontainer',
                        //     fieldLabel: 'PT',
                        //     layout: 'hbox',
                        //     items: [                               
                        //             {
                        //                 xtype: 'ptprojectcombobox',
                        //                 fieldLabel:'',
                        //                 emptyText: 'Select PT',
                        //                 name: 'pt_id',
                        //                 allowBlank: false,
                        //                 enableKeyEvents: true
                        //             },
                        //     ]
                        // },
                        
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Kode Account',
                            layout: 'hbox',
                            items: [
                            {
                                xtype: 'coacombogrid',
                                fieldLabel:'',
                                emptyText: 'Select COA',
                                name: 'from_coa_id',
                                allowBlank: false,
                                enableKeyEvents: true,
                                typeAhead: true,
                                forceSelection: true,
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
                                xtype: 'coacombogrid',
                                fieldLabel:'',
                                emptyText: 'Select COA',
                                name: 'until_coa_id',
                                allowBlank: false,
                                enableKeyEvents: true,
                                typeAhead: true,
                                forceSelection: true,
                                listeners: {
                                    keyup: function (field) {
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
                            }
                            ]
                        },  
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Tanggal Transaksi',
                            layout: 'hbox',
                            items: [
                            {
                                xtype: 'datefield',
                                fieldLabel:'',
                                emptyText: 'From Date',
                                name: 'fromdate',
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
                                fieldLabel:'',
                                emptyText: 'Until Date',
                                name: 'untildate',
                                allowBlank: false,
                                format: 'd-m-Y',
                                submitFormat: 'Y-m-d',
                                altFormats: 'd-m-Y|Y-m-d|dmY|Ymd|mdY|dmy|ymd|mdy'
                            }
                            ]
                        },  
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Report Type',
                            layout: 'hbox',
                            items: [
                            {
                             xtype:'combobox',
                             name:'reporttype',
                             valueField: 'reporttype',
                             queryMode:'local',
                             dvalue: 'DEFAULT',
                             store:['DEFAULT','EXCEL','EXCEL-2'],
                             autoSelect:true,
                             forceSelection:true,
                             listeners: {
                                afterrender: function() {
                                 this.setValue(this.dvalue);    
                             }
                         }
                     },
                     {
                        xtype: 'splitter',
                        width: '20'
                    },
                    {
                        xtype: 'checkboxfield',
                        fieldLabel: '',
                        name: 'recalculatetb',
                        boxLabel: 'Re-Calculate TB',
                        padding: '0 0 0 0',
                        margin: '0 0 0 0',
                        boxLabelCls: 'x-form-cb-label small',
                        inputValue: '1',
                        uncheckedValue: '0',
                        checked: false
                    }

                    ]
                }
                ]
            },                 
            {
                xtype: 'panel',
                layout: 'hbox',
                border: false,
                padding: '0 0 0 200px',
                bodyStyle: 'background-color:#dfe8f5;',
                items: [
                {
                    xtype: 'button',
                    action: 'submit',
                    itemId: 'btnSubmit',
                    iconCls: 'icon-save',
                    text: 'Submit',
                    padding: 5,
                },
                {
                    xtype: 'splitter',
                    width: '20'
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
