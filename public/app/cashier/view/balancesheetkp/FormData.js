Ext.define('Cashier.view.balancesheetkp.FormData', {
    extend       : 'Ext.form.Panel',
    alias        : 'widget.balancesheetkpformdata',
    layout       : 'vbox',
    bodyStyle    : 'background-color:#dfe8f5;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype : 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'hiddenfield',
                    name : 'hideparam',
                    value: 'default'
                },
                
                {
                    xtype    : 'panel',
                    layout   : 'vbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border   : false,
                    padding  : '0 0 0 20px',
                    items    : [
						{
                            xtype     : 'fieldcontainer',
                            fieldLabel: 'PT',
                            layout    : 'hbox',
                            items     : [                               
                                    {
                                        xtype          : 'projectptcombobox',
                                        fieldLabel     : '',
                                        emptyText      : 'Select PT',
                                        name           : 'pt_id',
                                        queryMode      : 'local',
                                        forceSelection : true,
                                        queryMode      : 'local',
                                        rowdata        : null,
                                        allowBlank     : false,
                                        enableKeyEvents: true,
                                        tpl            : Ext.create('Ext.XTemplate',
                                            '<table class="x-grid-table" width="500px">',
                                            '<tr class="x-grid-row">',
                                            '<th width="50px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                                            '<th width="200px"><div class="x-column-header x-column-header-inner">Company</div></th>',
                                            '<th width="190px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                                            '</tr>',
                                            '<tpl for=".">',
                                            '<tr class="x-boundlist-item">',
                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{ptcode}</div></td>',
                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{ptname}</div></td>',
                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{projectname}</div></td>',
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
                                                        if (record.get('ptname') == null || record.get('ptcode') == null) {
                                                            return false;
                                                        }else{
                                                            if (record.get('ptname').toString().toLowerCase().indexOf(searchString) > -1) {
                                                                return true;
                                                                this.store.clearFilter(true);
                                                            } else if (record.get('ptcode').toString().toLowerCase().indexOf(searchString) > -1) {
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
                                            buffer: 300
                                        },
                                    }
                            ]
                        },  
                        {
                            xtype     : 'fieldcontainer',
                            fieldLabel: 'Report Type',
                            padding   : '0 0 0 20px',
                            hidden    : true,
                            layout    : 'vbox',
                            items     : [
                                {
                                    boxLabel  : 'This Month',
                                    xtype     : 'radiofield',
                                    name      : 'reporttype',
                                    inputValue: '1',
                                    id        : 'radio1'
                                },
                                {
                                    boxLabel  : 'This Month vs Last Month',
                                    xtype     : 'radiofield',
                                    name      : 'reporttype',
                                    inputValue: '2',
                                    id        : 'radio2',
                                    checked   : true,
                                },
                                {
                                    boxLabel  : 'This Month vs Budget',
                                    xtype     : 'radiofield',
                                    name      : 'reporttype',
                                    inputValue: '3',
                                    id        : 'radio3'
                                },
                                {
                                    boxLabel  : 'This Month vs This Month Last Year',
                                    xtype     : 'radiofield',
                                    name      : 'reporttype',
                                    inputValue: '4',
                                    id        : 'radio4'
                                },
                            ]
                        }
                    ]
                },
                {
                    xtype    : 'panel',
                    layout   : 'vbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border   : false,
                    padding  : '0 0 0 20px',
                    items    : [
                        {
                            xtype     : 'fieldcontainer',
                            fieldLabel: 'Level',
                            layout    : 'hbox',
                            items     : [
                                {
                                    xtype         : 'levelcombobox',
                                    fieldLabel    : '',
                                    emptyText     : 'Select Level',
                                    name          : 'level',
                                    forceSelection: true,
                                    value         : 3,
                                    allowBlank    : false,
                                }
                            ]
                        },  
                        {
                            xtype     : 'fieldcontainer',
                            fieldLabel: 'Periode',
                            layout    : 'hbox',
                            items     : [
                                {
                                    xtype         : 'monthcombobox',
                                    fieldLabel    : '',
                                    emptyText     : 'Month',
                                    forceSelection: true,
                                    name          : 'monthdata',
                                    allowBlank    : false,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype     : 'yearcombobox',
                                    fieldLabel: '',
                                    emptyText : 'Year',
                                    name      : 'yeardata',
                                    allowBlank: false,
                                }
                            ]
                        },  
                        {
                            xtype     : 'fieldcontainer',
                            fieldLabel: 'Report Type',
                            layout    : 'hbox',
                            items     : [
                                {
                                    xtype         : 'combobox',
                                    name          : 'reporttype',
                                    valueField    : 'reporttype',
                                    queryMode     : 'local',
                                    store         : ['VERSI 1','VERSI 2', 'VERSI 3', 'EXCEL'],
                                    autoSelect    : true,
                                    forceSelection: true
                                }
                            ]
                        },  
                        {
                            xtype     : 'fieldcontainer',
                            layout    : 'hbox',
                            align     : 'right',
                            items     : [
                                {
                                    xtype      : 'fieldcontainer',
                                    fieldLabel : 'Layout Type',
                                    defaultType: 'radiofield',
                                    defaults   : {
                                        flex: 1
                                    },
                                    layout: 'hbox',
                                    items : [
                                        {
                                            boxLabel  : 'POTRAIT',
                                            name      : 'layouttype',
                                            inputValue: 'P',
                                            id        : 'radio1_layout',
                                            allowBlank: false,
                                            checked   : false,
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '10'
                                        },
                                        {
                                            boxLabel  : 'LANDSCAPE',
                                            name      : 'layouttype',
                                            inputValue: 'L',
                                            id        : 'radio2_layout',
                                            allowBlank: false,
                                            checked   : true,
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
                },  
                {
                    xtype : 'tbspacer',
                    height: 20
                },
                {
                    xtype  : 'panel',
                    layout : 'hbox',
                    border : false,
                    padding: '0 0 0 200px',
                    items  : [
                        {
                            xtype  : 'button',
                            action : 'submit',
                            itemId : 'btnSubmit',
                            iconCls: 'icon-print',
                            text   : 'Submit',
                            padding: 5,
                        },
                        {
                            xtype  : 'button',
                            action : 'cancel',
                            itemId : 'btnCancel',
                            iconCls: 'icon-cancel',
                            padding: 5,
                            text   : 'Cancel',
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
