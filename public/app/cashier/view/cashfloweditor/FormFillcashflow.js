Ext.define('Cashier.view.cashfloweditor.FormFillcashflow', {
    extend       : 'Cashier.library.template.view.FormData',
    requires     : ['Ext.EventObject'],
    alias        : 'widget.cashfloweditorformfillcashflow',
    anchorSize   : 100,
    bodyBorder   : true,
    bodyStyle    : 'border-top:none;border-left:none;border-right:none;',
    deletedRows  : [],
    editedRow    : -1,
    id           : 'journaldetail_id',
    initComponent: function () {
        var me        = this;
        var d         = new Date();
        var year      = d.getFullYear();
        var month     = d.getMonth();
        var day       = d.getDate();
        var startDate = new Date(year, month-3, day);


        Ext.applyIf(me, {
            defaults: {
                labelAlign    : 'left',
                labelSeparator: ' ',
                labelClsExtra : 'small',
                fieldStyle    : 'margin-bottom:3px;',
                anchor        : '90%'
            },
            items: [
            {
                xtype: 'hiddenfield',
                name : 'hideparam',
            },
            {
                xtype: 'hiddenfield',
                name : 'user_id',
                value: apps.uid
            },
            {
                xtype: 'hiddenfield',
                name : 'pt_id',
            },
            {
                xtype: 'hiddenfield',
                name : 'project_id',
            },
            {
                xtype: 'hiddenfield',
                name : 'cashflowtype_id',
            },
            {
                xtype: 'hiddenfield',
                name : 'setupcashflow_id',
            },
            {
                xtype           : 'projectptcombobox',
                fieldLabel      : 'Select PT ',
                itemId          : 'fd_pt_id' + me.uniquename,
                id              : 'pt_id' + me.uniquename,
                width           : 300,
                name            : 'projectpt_id',
                emptyText       : 'Select Project - PT ',
                readOnly        : true,
                allowBlank      : false,
                enforceMaxLength: true,
                displayField    : 'ptname',
                valueField      : 'projectpt_id',
                margin          : '0 0 6 0',
                absoluteReadOnly: true,
                enableKeyEvents : true,
                rowdata         : null,
                forceSelection  : false,
                typeAhead       : false,
                queryMode       : 'local',
                matchFieldWidth : false,
                tpl             : Ext.create('Ext.XTemplate',
                    '<table class="x-grid-table" width="600px">',
                    '<tr class="x-grid-row">',
                    '<th width="70px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                    '<th width="330px"><div class="x-column-header x-column-header-inner">Company</div></th>',
                    '<th width="200px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                    '</tr>',
                    '<tpl for=".">',
                    '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{ptname}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{projectname}</div></td>',
                    '</tr>',
                    '</tpl>',
                    '</table>'
                    ),
                      // listeners: {
                      //     keyup: function (field) {
                      //         var searchString = field.getValue();
                      //         if (searchString) {
                      //             this.store.filterBy(function (record, id) {
                      //                 if (record.get('ptname').toString().toLowerCase().indexOf(searchString) > -1) {
                      //                     return true;
                      //                     this.store.clearFilter(true);
                      //                 } else if (record.get('code').toString().toLowerCase().indexOf(searchString) > -1) {
                      //                     return true;
                      //                     this.store.clearFilter(true);
                      //                 } else {
                      //                     return false;
                      //                     this.store.clearFilter(true);
                      //                 }
                      //             });
                      //         }
                      //     },
                      //     buffer: 300,
                      // },
            },
            {
                xtype          : 'coacombogrid',
                name           : 'coa',
                emptyText      : 'Select COA',
                fieldLabel     : 'COA',
                allowBlank     : false,
                forceSelection : true,
                enableKeyEvents: true,
                typeAhead      : false,
                listeners      : {
                    keyup: function (field) {
                        var c            = 0;
                        var searchString = field.getValue();
                        if (searchString) {
                            this.store.filterBy(function (record, id) {
                                if (record.get('coa').toString().toLowerCase().indexOf(searchString) > -1) {
                                    return true;
                                    this.store.clearFilter(true);
                                } else if (record.get('name').toString().toLowerCase().indexOf(searchString) > -1) {
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
                xtype         : 'cashflowsetupcombobox',
                fieldLabel    : 'Cashflow',
                name          : 'setupcashflowtype_id_fill',
                displayField  : 'cashflowtype',
                flex          : 2,
                emptyText     : 'Select Cashflow',
                forceSelection: true,
                typeAhead     : false,
                allowBlank    : false,
                listeners     : {
                    keyup: function (field) {
                        var c            = 0;
                        var searchString = field.getValue();
                        if (searchString) {
                            this.store.filterBy(function (record, id) {
                                if (record.get('cashflowtype').toString().toLowerCase().indexOf(searchString) > -1) {
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
                xtype     : 'fieldcontainer',
                fieldLabel: 'Periode',
                layout    : 'hbox',
                items     : [
                {
                    xtype           : 'datefield',
                    emptyText       : 'From Date',
                    name            : 'fromdate',
                    itemId          : 'ff_fromdate',
                    id              : 'fromdate_ff',
                    format          : 'd-m-Y',
                    submitFormat    : 'Y-m-d',
                    enforceMaxLength: true,
                    enableKeyEvents : true,
                    allowBlank      : false,
                    value           : startDate
                },
                {
                    xtype : 'label',
                    forId : 'lbl1',
                    text  : 'To',
                    margin: '2 10 0 10'
                },
                {
                    xtype           : 'datefield',
                    itemId          : 'ff_untildate',
                    id              : 'untildate_ff',
                    fieldLabel      : '',
                    emptyText       : 'Until Date',
                    name            : 'untildate',
                    enforceMaxLength: true,
                    enableKeyEvents : true,
                    allowBlank      : false,
                    format          : 'd-m-Y',
                    submitFormat    : 'Y-m-d',
                    value           : new Date()
                }
                ]
            },
            {
                xtype          : 'prefixcashflowcombobox',
                name           : 'prefix_id',
                emptyText      : 'Select Prefix',
                fieldLabel     : 'Prefix',
                allowBlank     : true,
                forceSelection : false,
                enableKeyEvents: true,
                dvalue         : 0,
                typeAhead      : false,
                listeners      : {
                    keyup: function (field) {
                        var c            = 0;
                        var searchString = field.getValue();
                        if (searchString) {
                            this.store.filterBy(function (record, id) {
                                if (record.get('prefix').toString().toLowerCase().indexOf(searchString) > -1) {
                                    return true;
                                    this.store.clearFilter(true);
                                } else if (record.get('description').toString().toLowerCase().indexOf(searchString) > -1) {
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
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
        },
        generateDockedItem: function () {
            var x = [
            {
                xtype : 'toolbar',
                dock  : 'bottom',
                ui    : 'footer',
                layout: {
                    padding: 6,
                    type   : 'hbox'
                },
                items: [
                {
                    xtype  : 'button',
                    action : 'fillcashflow',
                    itemId : 'btnUpdatefill',
                    padding: 5,
                    width  : 75,              iconCls: 'icon-save',
                    text   : 'Update'
                },
                {
                    xtype  : 'button',
                    action : 'cancel',
                    itemId : 'btnCancel',
                    padding: 5,
                    width  : 75,
                    iconCls: 'icon-cancel',
                    text   : 'Cancel',
                    handler: function () {
                        this.up('window').close();
                    }
                }]
            }];
            return x;
        },
    }
);

