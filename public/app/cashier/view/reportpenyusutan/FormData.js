Ext.define('Cashier.view.reportpenyusutan.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.reportpenyusutanformdata',
    requires: ['Cashier.library.template.combobox.Coagrid'],
    layout: 'vbox',
    bodyStyle: 'background-color:#dfe8f5;',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [{
                xtype: 'tbspacer',
                height: 10
            }, {
                xtype: 'hiddenfield',
                name: 'hideparam',
                value: 'default'
            }, {
                xtype: 'panel',
                layout: 'vbox',
                bodyStyle: 'background-color:#dfe8f5;',
                border: false,
                padding: '0 0 0 20px',
                items: [{
                    xtype: 'fieldcontainer',
                    fieldLabel: 'PT',
                    layout: 'hbox',
                    items: [{
                        //xtype: 'ptcombobox',
                        xtype: 'projectptcombobox',
                        fieldLabel: '',
                        emptyText: 'Select PT',
                        name: 'pt_id',
                        allowBlank: false,
                        forceSelection: true,
                        rowdata: null,
                        enableKeyEvents: true,
                        tpl: Ext.create('Ext.XTemplate',
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
                            buffer:300
                        }
                    }]
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Code Account',
                    layout: 'hbox',
                    items: [{
                        xtype: 'coacombogrid',
                        fieldLabel: '',
                        emptyText: 'Select COA',
                        name: 'from_coa_id',
                        allowBlank: false,
                        enableKeyEvents: true
                    }, {
                        xtype: 'label',
                        forId: 'lbl1',
                        text: 'To',
                        margin: '2 10 0 10'
                    }, {
                        xtype: 'coacombogrid',
                        fieldLabel: '',
                        emptyText: 'Select COA',
                        name: 'until_coa_id',
                        allowBlank: false,
                        enableKeyEvents: true
                    }]
                },/* {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Year',
                    layout: 'hbox',
                    items: me.generateYearField()
                }, */{
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Tanggal Transaksi',
                    layout: 'hbox',
                    items: [{
                            xtype: 'datefield',
                            fieldLabel: '',
                            emptyText: 'From Date',
                            name: 'fromdate',
                            allowBlank: false,
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            altFormats: 'd-m-Y|Y-m-d|dmY|Ymd|mdY|dmy|ymd|mdy'
                        }, {
                            xtype: 'label',
                            forId: 'lbl1',
                            text: 'To',
                            margin: '2 10 0 10'
                        },

                        {
                            xtype: 'datefield',
                            fieldLabel: '',
                            emptyText: 'Until Date',
                            name: 'untildate',
                            allowBlank: false,
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            altFormats: 'd-m-Y|Y-m-d|dmY|Ymd|mdY|dmy|ymd|mdy'
                        }
                    ]
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Type',
                    layout: 'hbox',
                    items: [{
                        xtype: 'combobox',
                        fieldLabel: '',
                        emptyText: '',
                        name: 'type_tr',
                        allowBlank: false,
                        valueField: 'val',
                        displayField: 'disp',
                        dvalue: 'DEFAULT',
                        store: ['DEFAULT', 'EXCEL'],
                        autoSelect: true,
                        forceSelection: true,
                        listeners: {
                            afterrender: function() {
                                this.setValue(this.dvalue);
                            }
                        }
                    }],
                }]
            }, {
                xtype: 'panel',
                layout: 'hbox',
                border: false,
                padding: '10px 0 0 210px',
                bodyStyle:'background-color:#dfe8f5', 
                items: [{
                    xtype: 'button',
                    action: 'submit',
                    itemId: 'btnSubmit',
                    iconCls: 'icon-print',
                    text: 'Submit',
                    padding: 5,
                }, 
                {
                    xtype: 'splitter',
                    width: '10'
                },
                {
                    xtype: 'button',
                    action: 'cancel',
                    itemId: 'btnCancel',
                    iconCls: 'icon-cancel',
                    padding: 5,
                    text: 'Cancel',
                    handler: function() {
                        this.up('window').close();
                    }
                }]
            }],
        });
        me.callParent(arguments);
    },
    generateYearField: function() {
        var now = new Date();
        var year = now.getFullYear();
        var year_choose = [];

        for (var i = year; i >= year - 10; i--) {
            year_choose.push(i);
        }

        var x = [{
            xtype: 'combobox',
            fieldLabel: '',
            emptyText: '',
            name: 'year_tr',
            allowBlank: false,
            valueField: 'val',
            displayField: 'disp',
            dvalue: year,
            store: year_choose,
            autoSelect: true,
            forceSelection: true,
            listeners: {
                afterrender: function() {
                    this.setValue(this.dvalue);
                }
            }
        }];

        return x;
    }
});