Ext.define('Cashier.view.mastercheque.FormSearch', {
    extend       : 'Cashier.library.template.view.FormSearch',
    alias        : 'widget.masterchequeformsearch',
    id           : 'masterchequeformsearchID',
    initComponent: function () {
        var me   = this;
        var proj = apps.project;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items   : [

                {
                    xtype           : 'textfield',
                    itemId          : 'fsms_name',
                    name            : 'cheque_no',
                    fieldLabel      : 'No. Cheque',
                    enforceMaxLength: true,
                    maskRe          : /[^\`\"\']/,
                    emptyText       : 'Input No. Cheque',
                    maxLength       : 50
                },
                {
                    xtype     : 'combobox',
                    name      : 'type',
                    fieldLabel: 'Type',
                    store     : Ext.create('Ext.data.Store', {
                        fields: ['type', 'name'],
                        data  : [
                            {'type': '', 'name': 'ALL TYPE'},
                            {'type': 'C', 'name': 'Cheque'},
                            {'type': 'G', 'name': 'Giro'}
                        ]
                    }),
                    valueField    : 'type',
                    autoSelect:true,
                    forceSelection: true,
                    displayField  : 'name',
                    queryMode     : 'local',
                    anchor        : '-5',
                    emptyText     : 'All Type',
                    dvalue    : '',
                    listeners     : {
                        afterrender: function() {
                           this.setValue(this.dvalue);    
                        }
                    }
                },
                {
                    xtype     : 'textfield',
                    itemId    : 'fsms_series',
                    name      : 'series',
                    fieldLabel: 'Series',
                    emptyText       : 'Input Series',
                },
                {
                    xtype           : 'combobox',
                    name            : 'project_id',
                    fieldLabel      : 'Project',
                    displayField    : 'project_name',
                    valueField      : 'project_project_id',
                    enableKeyEvents : true,
                    forceSelection  : true,
                    width           : '300',
                    queryMode       : 'local',
                    rowdata         : null,
                    allowBlank      : false,
                    msgTarget       : "side",
                    enforceMaxLength: true,
                    blankText       : 'This should not be blank!',
                    listeners       : {
                        keyup: function (field) {
                            var searchString = field.getRawValue().toString().toLowerCase();
                            if(searchString == null){
                                return false;
                            }
                            if (searchString) {
                                this.store.filterBy(function (record, id) {
                                    if (record.get('project_name').toString().toLowerCase().indexOf(searchString) > -1) {
                                        this.proj = record.data.project_project_id;
                                        return true;
                                    } else {
                                        return false;
                                    }
                                });
                            }
                        },
                        buffer: 300,
                    },
                },
                {
                    xtype           : 'combobox',
                    name            : 'pt_id',
                    fieldLabel      : 'Company',
                    displayField    : 'name',
                    valueField      : 'pt_id',
                    forceSelection  : true,
                    allowBlank      : false,
                    readOnly        : false,
                    enforceMaxLength: true,
                    queryMode       : 'local',
                    rowdata         : null,
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
                    absoluteReadOnly: true,
                    enableKeyEvents : true,
                    rowdata         : null,
                    typeAhead       : false,
                    listeners       : {
                        keyup: function (field,v) {
                            var win      = field.up('window'),
                                form     = win.down('form');
                            var dataform = form.getForm().getValues();
                            var projID   = dataform.project_id;
                              // this.store.clearFilter(true);
                            var searchString = field.getRawValue().toString().toLowerCase();
                            if(searchString == null){
                                this.store.filterBy(function (record, id) {
                                    return record.data.project_project_id == projID;
                                });
                            }
                            if (searchString) {
                                this.store.filterBy(function (record, id) {
                                    if (record.get('name').toString().toLowerCase().indexOf(searchString) > -1 && record.data.project_project_id == projID) {
                                        return true;
                                        this.store.clearFilter(true);
                                    } else if (record.get('code').toString().toLowerCase().indexOf(searchString) > -1 && record.data.project_project_id == projID) {
                                        return true;
                                        this.store.clearFilter(true);
                                    } else {
                                        return false;
                                        this.store.clearFilter(true);
                                    }
                                });
                            }else{
                                this.store.filterBy(function (record, id) {
                                    return record.data.project_project_id == projID;
                                });
                            }
                        },
                        buffer: 300,
                    },
                },
                {
                    xtype         : 'combobox',
                    name          : 'bank_name',
                    fieldLabel    : 'Bank',
                    displayField  : 'bank_name',
                    valueField    : 'bank_id',
                    queryMode     : 'local',
                    forceSelection: true,
                    hidden        : true,
                    listeners       : {
                        keyup: function (field) {
                            var searchString = field.getRawValue().toString().toLowerCase();
                            if(searchString == null){
                                return false;
                            }
                            if (searchString) {
                                this.store.filterBy(function (record, id) {
                                    if (record.get('project_name').toString().toLowerCase().indexOf(searchString) > -1) {
                                        this.proj = record.data.project_project_id;
                                        return true;
                                    } else {
                                        return false;
                                    }
                                });
                            }
                        },
                        buffer: 300,
                    },
                },
                {
                    xtype       : 'combobox',
                    name        : 'voucherprefix_voucherprefix_id',
                    fieldLabel  : 'Bank',
                    displayField: 'coa_name',
                    valueField  : 'voucherprefix_id',
                    queryMode   : 'local',
                    forceSelection: true,
                    hidden        : false,
                },
  //                {
  //                    xtype: 'hiddenfield',
  //                    name: 'project_id'
  //                },

                {
                    xtype       : 'datefield',
                    fieldLabel  : 'Issued Date Start',
                    name        : 'issued_date_start',
                    format      : 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    emptyText       : 'Input Issued Date Start',
                },
                {
                    xtype       : 'datefield',
                    fieldLabel  : 'Issued Date End',
                    name        : 'issued_date_end',
                    format      : 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    emptyText       : 'Input Issued Date End',
                },
                  {
                    xtype         : 'combobox',
                    name          : 'status',
                    fieldLabel    : 'Status ',
                    queryMode     : 'local',
                    valueField    : 'status',
                    forceSelection: true,
                    emptyText       : 'Select Status',
                    displayField  : 'description',
                    store         : new Ext.data.JsonStore({
                        fields: ['status', 'description'],
                        data  : [
                            {status: 'New', description: 'New'},
                            {status: 'Cleared', description: 'Cleared'},
                            {status: 'Issued', description: 'Issued'},
                        ]
                    }),
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
