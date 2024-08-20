Ext.define('Cashier.view.masterfixedasset.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.masterfixedassetformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    deletedRows: [],
    editedRow: -1,
    id: 'fixedasset_id',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '97%'
            },
            items: [
            {
                xtype: 'hiddenfield',
                name: 'hideparam',
                value: 'default'
            },
            {
                xtype: 'hiddenfield',
                name: 'fixedasset_id'
            },
            {
                xtype: 'projectcombobox',
                fieldLabel:'Project',
                emptyText: 'Select Project',
                name: 'project_id',
                allowBlank: false,
                enableKeyEvents: true,
                margin: '0 0 5 0',
                enforeMaxLength: true,
                tpl: Ext.create('Ext.XTemplate',
                    '<table class="x-grid-table" width="250px" >',
                    '<tr class="x-grid-row">',

                    '<th width="200px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                    '</tr>',
                    '<tpl for=".">',
                    '<tr class="x-boundlist-item">',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{projectname}</div></td>',
                    '</tr>',
                    '</tpl>',
                    '</table>'
                    ),   
            },
            {
                xtype: 'ptprojectcombobox',
                fieldLabel:'PT',
                emptyText: 'Select PT',
                name: 'pt_id',
                allowBlank: false,
                margin: '0 0 5 0',
                enableKeyEvents: true,
                listeners: {
                    keyup: function (field) {
                        var searchString = field.getRawValue().toString().toLowerCase();
                        if(searchString == null){
                            return false;
                        }
                        if (searchString) {
                            this.store.filterBy(function (record, id) {
                                if (record.get('ptname') == null || record.get('code') == null) {
                                    return false;
                                }else{
                                    if (record.get('ptname').toString().toLowerCase().indexOf(searchString) > -1) {
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
                xtype: 'datefield',
                fieldLabel:'Buy Date',
                name: 'voucher_date',
                emptyText: 'Select Date',
                allowBlank: false,
                format: 'd-m-Y',
                submitFormat: 'Y-m-d'
            },
            {
                xtype: 'textfield',
                name: 'voucher_no',
                emptyText: 'Input Voucher No',
                fieldLabel: 'Voucher No',
                allowBlank: false
            },
            {
                xtype: 'coacombogrid',
                emptyText: 'Select COA',
                name: 'coa',
                allowBlank: false,
                enableKeyEvents: true,
                typeAhead: true,
                fieldLabel: 'COA',
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
                xtype: 'textareafield',
                name: 'description',
                emptyText: 'Input Description',
                fieldLabel: 'Description'
            },
            {
                xtype: 'xmoneyfield',
                name: 'amount',
                fieldLabel: 'Amount',
                emptyText: 'Input Amount',
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
                anchor: '-5',
                allowBlank: false
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                bodyBorder: false,
                defaults: {
                    layout: 'fit'
                },
                anchor: '-10',
                items: [

                {
                    xtype: 'numberfield',
                    minValue: 0,
                    name: 'month_lifetime',
                    fieldLabel: 'Life Time',
                    emptyText: 'Input Life Time',
                    allowBlank: false,
                    width:'50%'
                },
                {
                    xtype:'label',
                    itemId:'labelFile',
                    text:'Months',
                    margin: '5px 0px 0px 10px',
                }
                ]
            },
            {
                xtype: 'combobox',
                name: 'status',
                fieldLabel: 'Status',
                queryMode: 'local',
                valueField: 'status',
                value: '',
                allowBlank: false,
                emptyText: 'Select Status',
                forceSelection: true,
                displayField: 'txt',
                editable: false,
                store: new Ext.data.JsonStore({
                    fields: ['status', 'txt'],
                    data: [
                    {status: 'ACTIVE', txt: 'ACTIVE'},
                    {status: 'SOLD', txt: 'SOLD'},
                    {status: 'REMOVED', txt: 'REMOVED'},
                    ]
                }),
                autoSelect:true,
                forceSelection:true,
                listeners: {
                    afterrender: function() {
                        this.setValue(this.value);    
                    }
                }
            },
            {
                xtype: 'datefield',
                fieldLabel:'Sell Date',
                hidden: true,
                name: 'sell_date',
                emptyText: 'Select Date',
                format: 'd-m-Y',
                submitFormat: 'Y-m-d'
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
            action: 'save',
            itemId: 'btnSave',
            padding: 5,
            width: 75, iconCls: 'icon-save',
            text: 'Save'
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

