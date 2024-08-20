Ext.define('Cashier.view.reportkwitansi.FormData', {
    extend       : 'Cashier.library.template.view.FormData',
    alias        : 'widget.reportkwitansiformdata',
    id           : 'reportkwitansiID',
    frame        : true,
    autoScroll   : false,
    anchorSize   : 100,
    bodyBorder   : true,
    bodyPadding  : 5,
    maxHeight    : 220,
    bodyStyle    : 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me      = this;
        var mystore = Ext.create('Ext.data.Store', {
            alias   : 'ptstore',
            autoLoad: false,
            fields  : [
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

        var storePrefixReceipt = Ext.create('Ext.data.Store', {
            alias   : 'prefixreceiptstore',
            autoLoad: true,
            fields  : [
            {
                name: 'prefix_receipt',
                type: 'string'
            }
            ]
        });

        Ext.applyIf(me, {
            defaults: {
                labelAlign    : 'left',
                labelSeparator: ' ',
                labelClsExtra : 'small',
                fieldStyle    : 'margin-bottom:3px;',
                anchor        : '100%'
            },
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
                    xtype: 'hiddenfield',
                    name: 'project_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'pt_name'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'pt_pt_id'
                },
                {
                    xtype    : 'panel',
                    layout   : 'vbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border   : false,
                    padding  : '0 0 0 20px',
                    items    : [
                        {
                            xtype           : 'combobox',
                            name            : 'pt_id',
                            fieldLabel      : 'PT/Project',
                            emptyText       : 'Select PT/Project',
                            displayField    : 'name',
                            valueField      : 'multiprojectdetail_id',
                            forceSelection  : true,
                            allowBlank      : false,
                            enableKeyEvents : true,
                            enforceMaxLength: true,
                            typeAhead       : false,
                            queryMode       : 'local',
                            width           : 482,
                            flex            : 2,
                            store           : mystore,
                            matchFieldWidth : false,
                            tpl             : Ext.create('Ext.XTemplate',
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
                                buffer: 300
                            }
                        },
                        {
                            xtype     : 'fieldcontainer',
                            fieldLabel: 'Status Receipt',
                            visible   : false,
                            layout    : 'hbox',
                            items     : [
                                     {
                                       xtype         : 'combobox',
                                       name          : 'statusreceipt',
                                       valueField    : 'statusreceipt',
                                       queryMode     : 'local',
                                       editable      : false,
                                       dvalue        : 'ALL',
                                       store         : ['ALL','NEW', 'USED', 'VOID', 'DELETE'],
                                       autoSelect    : true,
                                       forceSelection: true,
                                       listeners     : {
                                            afterrender: function() {
                                               this.setValue(this.dvalue);
                                            }
                                        }
                                    }
                            ]
                        },
                        {
                            xtype : 'fieldcontainer',
                            layout: 'hbox',
                            width : '100%',
                            items : [
                                {
                                    xtype          : 'combobox',
                                    fieldLabel     : 'Prefix Receipt',
                                    name           : 'prefix_receipt',
                                    displayField    : 'prefix_receipt',
                                    allowBlank     : true,
                                    forceSelection : true,
                                    enableKeyEvents : true,
                                    store           : storePrefixReceipt,
                                    enforceMaxLength: true,
                                    typeAhead       : false,
                                    queryMode       : 'local',
                                    matchFieldWidth : true,
                                    emptyText       : 'All',
                                    tpl             : Ext.create('Ext.XTemplate',
                                        '<table class="x-grid-table" width="100%">',
                                            '<tr class="x-grid-row">',
                                                '<th ><div class="x-column-header x-column-header-inner">Prefix</div></th>',
                                            '</tr>',
                                            '<tpl for=".">',
                                                '<tr class="x-boundlist-item">',
                                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{prefix_receipt}</div></td>',
                                                '</tr>',
                                            '</tpl>',
                                        '</table>'
                                    ),
                                },
                                {
                                    xtype     : 'checkboxfield',
                                    boxLabel  : 'All',
                                    name      : 'prefix_all',
                                    inputValue: 1,
                                    margin    : '3 0 0 5',
                                    checked   : true
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
                                       editable      : false,
                                       dvalue        : 'DEFAULT',
                                       store         : ['DEFAULT','EXCEL'],
                                       autoSelect    : true,
                                       forceSelection: true,
                                       listeners     : {
                                            afterrender: function() {
                                               this.setValue(this.dvalue);
                                            }
                                        }
                                    }
                            ]
                        },
                        {
                            xtype     : 'fieldcontainer',
                            fieldLabel: 'Date',
                            id        : 'periodeDate',
                            layout    : 'hbox',
                            items     : [
                                {
                                    xtype       : 'combobox',
                                    name        : 'datetype',
                                    id          : 'datetype',
                                    valueField  : 'datetypeid',
                                    displayField: 'datetypename',
                                    emptyText   : 'Date type',
                                    queryMode   : 'local',
                                    dvalue      : 1,
                                    editable    : false,
                                    store       : Ext.create('Ext.data.Store', {
                                        fields: ['datetypeid', 'datetypename'],
                                        data  : [
                                            {'datetypeid': 1, 'datetypename': 'Kwitansi Date'},
                                            {'datetypeid': 2, 'datetypename': 'Voucher Date'},
                                            {'datetypeid': 3, 'datetypename': 'Due Date'},
                                        ]
                                    }),
                                    autoSelect    : true,
                                    forceSelection: true,
                                    allowBlank    : false,
                                    listeners     : {
                                        afterrender: function() {
                                           this.setValue(this.dvalue);
                                        }
                                    }
                                },
                                {
                                    xtype       : 'datefield',
                                    fieldLabel  : '',
                                    emptyText   : 'From Date',
                                    name        : 'from_date',
                                    id          : 'form_date',
                                    allowBlank  : false,
                                    format      : 'd-m-Y',
                                    width       : 100,
                                    submitFormat: 'Y-m-d',
                                    margin      : '0 0 0 10',
                                    listeners   : {
                                        change: function(dp, date) {
                                            var untildate = Ext.getCmp('until_date');
                                            untildate.setMinValue(date);
                                            untildate.setValue('');
                                        }
                                    }
                                },
                                {
                                    xtype : 'label',
                                    text  : 'To',
                                    margin: '2 0 2 10'
                                },
                                {
                                    xtype       : 'datefield',
                                    fieldLabel  : '',
                                    emptyText   : 'Until Date',
                                    name        : 'until_date',
                                    id          : 'until_date',
                                    allowBlank  : false,
                                    width       : 100,
                                    format      : 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    margin      : '0 0 0 10'
                                }
                            ]
                        },
                        
                    ]
                },
            ],
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
                  type  : 'hbox'
                }, items: [
                    {
                        xtype: 'tbspacer',
                        flex : 1
                    },
                    {
                        xtype   : 'button',
                        action  : 'submit',
                        padding : 5,
                        width   : 75,
                        flex    : 1,
                        maxWidth: 75,
                        iconCls : 'icon-search',
                        text    : 'Submit',
                    },
                    {
                        xtype  : 'button',
                        action : 'cancel',
                        padding: 5,
                        width  : 75,
                        iconCls: 'icon-cancel',
                        text   : 'Close',
                        handler: function () {
                            this.up('window').close();
                        }
                    },
                    {
                        xtype: 'tbspacer',
                        flex : 1
                    }
                ]
            }
        ];
        return x;
    },

});
