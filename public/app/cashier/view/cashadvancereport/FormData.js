Ext.define('Cashier.view.cashadvancereport.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.cashadvancereportformdata',
    layout: 'vbox',
    padding: '0 0 0 10',
    bodyStyle: 'background-color:#dfe8f5;',
    border: false,
    uniquename:'_fcashadvancereport',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
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
                    xtype: 'splitter',
                    width: '20'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 1200,
                    items: [
                        {
                            xtype: 'label',
                            forId: 'labelpt'+me.uniquename,
                            text: 'Company',
                            width: 100
                        },
                        {
                            xtype: 'ptusercombobox',
                            itemId: 'fd_frompt'+me.uniquename,
                            id: 'frompt'+me.uniquename,
                            name: 'frompt',
                            fieldLabel: '',
                            emptyText: '',
                            width: 200,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            forceSelection: true,
                            rowdata: null,
                            listeners: {
                                keyup: function (field) {
                                    var searchString = field.getRawValue().toString().toLowerCase();
                                    if(searchString == null){
                                        return false;
                                    }
                                    if (searchString) {
                                        this.store.filterBy(function (record, id) {
                                            if (record.get('ptname') == null || record.get('ptcode') == null || record.get('projectname') == null) {
                                                return false;
                                            }else{
                                                if (record.get('ptname').toString().toLowerCase().indexOf(searchString) > -1) {
                                                    return true;
                                                    this.store.clearFilter(true);
                                                } else if (record.get('ptcode').toString().toLowerCase().indexOf(searchString) > -1) {
                                                    return true;
                                                    this.store.clearFilter(true);
                                                } else if (record.get('projectname').toString().toLowerCase().indexOf(searchString) > -1) {
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
                        },
                        {
                            xtype: 'label',
                            forId: 'labelpt'+me.uniquename,
                            text: 'To',
                            width: 30,
                            margin: '0 0 0 20'
                        },
                        {
                            xtype: 'ptusercombobox',
                            fieldLabel: '',
                            itemId: 'fd_untilpt'+me.uniquename,
                            id: 'untilpt'+me.uniquename,
                            name: 'untilpt',
                            emptyText: '',
                            width: 200,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            forceSelection: true,
                            listeners: {
                                keyup: function (field) {
                                    var searchString = field.getRawValue().toString().toLowerCase();
                                    if(searchString == null){
                                        return false;
                                    }
                                    if (searchString) {
                                        this.store.filterBy(function (record, id) {
                                            if (record.get('ptname') == null || record.get('ptcode') == null || record.get('projectname') == null) {
                                                return false;
                                            }else{
                                                if (record.get('ptname').toString().toLowerCase().indexOf(searchString) > -1) {
                                                    return true;
                                                    this.store.clearFilter(true);
                                                } else if (record.get('ptcode').toString().toLowerCase().indexOf(searchString) > -1) {
                                                    return true;
                                                    this.store.clearFilter(true);
                                                } else if (record.get('projectname').toString().toLowerCase().indexOf(searchString) > -1) {
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
                    width: 1200,
                    items: [
                        {
                            xtype: 'label',
                            forId: 'labelprefix'+me.uniquename,
                            text: 'Prefix',
                            width: 100
                        },
                        {
                            xtype: 'voucherprefixcashcombobox',
                            fieldLabel: '',
                            itemId: 'fd_prefixcash'+me.uniquename,
                            id: 'prefixcash'+me.uniquename,
                            name: 'prefixcash',
                            emptyText: '',
                            width: 200,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            forceSelection:true,
                            displayField: 'coa',
                            valueField: 'prefix_id',
                            tpl: Ext.create('Ext.XTemplate',
                                '<table class="x-grid-table" width="900px" >',
                                    '<tr class="x-grid-row">',                
                                        '<th width="50px"><div class="x-column-header x-column-header-inner">Coa</div></th>',
                                        '<th width="150px"><div class="x-column-header x-column-header-inner">Description</div></th>',
                                        '<th width="50px"><div class="x-column-header x-column-header-inner">Prefix</div></th>',
                                        '<th width="100px"><div class="x-column-header x-column-header-inner">Prefix Desc.</div></th>',
                                        '<th width="150px"><div class="x-column-header x-column-header-inner">PT</div></th>',
                                    '</tr>',
                                    '<tpl for=".">',
                                        '<tr class="x-boundlist-item">',                    
                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{coa}</div></td>',
                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{coaname}</div></td>',
                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{prefix}</div></td>',
                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{prefixdesc}</div></td>',
                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{ptname}</div></td>',
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
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 1200,
                    items: [
                        {
                            xtype: 'label',
                            forId: 'labelperiode'+me.uniquename,
                            text: 'Report Period',
                            width: 100
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: '',
                            itemId: 'fd_fromperiode'+me.uniquename,
                            id: 'fromperiode'+me.uniquename,
                            name: 'fromperiode',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            emptyText: 'From Date',
                            width: 100,
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            altFormats: 'd-m-Y|Y-m-d|dmY|Ymd|mdY|dmy|ymd|mdy'
                        },
                        {
                            xtype: 'label',
                            forId: 'labelpt'+me.uniquename,
                            text: 'To',
                            width: 30,
                            margin: '0 0 0 10'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: '',
                            itemId: 'fd_untilperiode'+me.uniquename,
                            id: 'untilperiode'+me.uniquename,
                            name: 'untilperiode',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            emptyText: 'Until Date',
                            width: 100,
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            altFormats: 'd-m-Y|Y-m-d|dmY|Ymd|mdY|dmy|ymd|mdy'
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 1200,
                    items: [
                        {
                            xtype: 'label',
                            forId: 'labelperiode2'+me.uniquename,
                            text: 'Period Close Date',
                            width: 100
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: '',
                            itemId: 'fd_fromclosedate'+me.uniquename,
                            id: 'fromclosedate'+me.uniquename,
                            name: 'fromclosedate',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            emptyText: 'From Date',
                            width: 100,
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            disabled:true,
                            altFormats: 'd-m-Y|Y-m-d|dmY|Ymd|mdY|dmy|ymd|mdy'
                        },
                        {
                            xtype: 'label',
                            forId: 'labelpt'+me.uniquename,
                            text: 'To',
                            width: 30,
                            margin: '0 0 0 10'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: '',
                            itemId: 'fd_untilclosedate'+me.uniquename,
                            id: 'untilclosedate'+me.uniquename,
                            name: 'untilclosedate',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            emptyText: 'Until Date',
                            width: 100,
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            disabled:true,
                            altFormats: 'd-m-Y|Y-m-d|dmY|Ymd|mdY|dmy|ymd|mdy'
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            itemId: 'fd_byrealization2'+me.uniquename,
                            name: 'byclosedate',
                            boxLabel: 'By Project Close Date',
                            padding: '0 0 0 15',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: '1',
                            uncheckedValue: '0',
                            checked: false
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
                    width: 1200,
                    items: [
                        {
                            xtype: 'label',
                            forId: 'fd_cutoff'+me.uniquename,
                            text: 'Cut-off Date',
                            width: 100
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: '',
                            itemId: 'fd_cutoff'+me.uniquename,
                            id: 'cutoff'+me.uniquename,
                            name: 'cutoff_date',
                            emptyText: '',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 100,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            altFormats: 'd-m-Y|Y-m-d|dmY|Ymd|mdY|dmy|ymd|mdy'
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            itemId: 'fd_byrealization'+me.uniquename,
                            name: 'byrealization',
                            boxLabel: 'By Realization Date',
                            padding: '0 0 0 15',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: '1',
                            uncheckedValue: '0',
                            checked: false
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
                    width: 1200,
                    items: [
                        {
                            xtype: 'label',
                            forId: 'fd_fromdepartment'+me.uniquename,
                            text: 'Department',
                            width: 100
                        },
                        {
                            xtype: 'departmentcombobox',
                            fieldLabel: '',
                            itemId: 'fd_fromdepartment'+me.uniquename,
                            id: 'fromdepartment'+me.uniquename,
                            name: 'fromdepartment',
                            emptyText: '',
                            width: 200,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            itemId: 'fd_alldepartment'+me.uniquename,
                            name: 'alldepartment',
                            boxLabel: 'All Department',
                            padding: '0 0 0 15',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: '1',
                            uncheckedValue: '0',
                            checked: true
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
                    width: 1200,
                    items: [
                        {
                            xtype: 'label',
                            forId: 'fd_fromstaff'+me.uniquename,
                            text: 'Staff Name',
                            width: 100
                        },
                        {
                            xtype: 'employeehrdcombobox',
                            fieldLabel: '',
                            itemId: 'fd_fromstaff'+me.uniquename,
                            id: 'fromstaff'+me.uniquename,
                            name: 'fromstaff',
                            emptyText: '',
                            width: 200,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            itemId: 'fd_allstaff'+me.uniquename,
                            name: 'allstaff',
                            boxLabel: 'All Staff',
                            padding: '0 0 0 15',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: '1',
                            uncheckedValue: '0',
                            checked: true
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
                    width: 1200,
                    items: [
                        {
                            xtype: 'label',
                            forId: 'fd_cashstatus'+me.uniquename,
                            text: 'Cash Status',
                            width: 100
                        },
                        {
                            boxLabel: 'Unpaid Cashbon',
                            xtype: 'radiofield',
                            name: 'cashstatus',
                            inputValue: 2,
                            id: 'radio1',
                            checked:true,
                        },
                        {
                            boxLabel: 'Active Only',
                            xtype: 'radiofield',
                            name: 'cashstatus',
                            inputValue: 4,
                            id: 'radio4',
                            margin: '0 0 0 45'
                        },
                        {
                            boxLabel: 'Closed',
                            xtype: 'radiofield',
                            name: 'cashstatus',
                            inputValue: 3,
                            id: 'radio2',
                            margin: '0 0 0 61'
                        },
                        {
                            boxLabel: 'Both All',
                            xtype: 'radiofield',
                            name: 'cashstatus',
                            inputValue: 5,
                            id: 'radio5',
                            margin: '0 0 0 80',
                            listeners: {
                                render: function(c) {
                                 Ext.QuickTips.register({
                                   target: c.getEl(),
                                   text: 'Opsi ini akan menampilkan data dengan cash status "Active Only" dan "Closed".',
                                   enabled: true,
                                   showDelay: 20,
                                   trackMouse: true,
                                   autoShow: true
                                 });
                               }
                           } 
                        },
                        {
                            boxLabel: 'All Status',
                            xtype: 'radiofield',
                            name: 'cashstatus',
                            inputValue: 1,
                            id: 'radio3',
                            margin: '0 0 0 50'
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 1200,
                    items: [
                        {
                            xtype: 'label',
                            forId: 'fd_sortby'+me.uniquename,
                            text: 'Sort By',
                            width: 100
                        },
                        {
                            boxLabel: 'Cashbon No.',
                            xtype: 'radiofield',
                            name: 'sortby',
                            inputValue: 1,
                            id: 'radiosortby1'+me.uniquename,
                            allowBlank: false,
                            checked: true,
                        },
                        {
                            boxLabel: 'Cashbon Date',
                            xtype: 'radiofield',
                            name: 'sortby',
                            inputValue: 2,
                            id: 'radiosortby2'+me.uniquename,
                            allowBlank: false,
                            margin: '0 0 0 65'
                        },
                        {
                            boxLabel: 'Cashbon Amount',
                            xtype: 'radiofield',
                            name: 'sortby',
                            inputValue: 3,
                            id: 'radiosortby3'+me.uniquename,
                            allowBlank: false,
                            margin: '0 0 0 46'
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 1200,
                    items: [
                        {
                            xtype: 'label',
                            forId: 'fd_groupby'+me.uniquename,
                            text: 'Group By',
                            width: 100
                        },
                        {
                            boxLabel: 'Department',
                            xtype: 'radiofield',
                            name: 'grouptype',
                            inputValue: 'departmentcompany',
                            id: 'radiogrouptype1'+me.uniquename,
                            checked:true
                        },
                        {
                            boxLabel: 'Staff',
                            xtype: 'radiofield',
                            name: 'grouptype',
                            inputValue: 'staff',
                            id: 'radiogrouptype2'+me.uniquename,
                            margin: '0 0 0 69'
                        },
                        {
                            boxLabel: 'No Group',
                            xtype: 'radiofield',
                            name: 'grouptype',
                            inputValue: 'nogroup',
                            id: 'radiogrouptype3'+me.uniquename,
                            margin: '0 0 0 96'
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 1200,
                    items: [
                        {
                            xtype: 'label',
                            forId: 'fd_dtlvoucher'+me.uniquename,
                            text: 'Detail Voucher',
                            width: 100
                        },
                        {
                            boxLabel: 'Yes',
                            name: 'detailvoucher',
                            xtype: 'radiofield',
                            inputValue: 1,
                            id: 'radiodetailvoucher1'+me.uniquename,
                            allowBlank: false
                        },
                        {
                            boxLabel: 'No',
                            name: 'detailvoucher',
                            xtype: 'radiofield',
                            inputValue: 0,
                            id: 'radiodetailvoucher2'+me.uniquename,
                            allowBlank: false,
                            checked: true,
                            margin: '0 0 0 114'
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 1200,
                    items: [
                        {
                            xtype: 'label',
                            text: 'Late Fee',
                            width: 100
                        },
                        {
                            boxLabel: 'Yes',
                            name: 'latefee',
                            xtype: 'radiofield',
                            inputValue: 1,
                            id: 'latefee1'+me.uniquename,
                            checked: false,
                            allowBlank: false
                        },
                        {
                            boxLabel: 'No',
                            name: 'latefee',
                            xtype: 'radiofield',
                            inputValue: 2,
                            id: 'latefee2'+me.uniquename,
                            allowBlank: false,
                            checked: false,
                            margin: '0 0 0 114'
                        },
                        {
                            boxLabel: 'All',
                            name: 'latefee',
                            xtype: 'radiofield',
                            inputValue: 0,
                            id: 'latefee3'+me.uniquename,
                            allowBlank: false,
                            checked: true,
                            margin: '0 0 0 114'
                        },
                        {
                            boxLabel: 'Hide',
                            name: 'latefee',
                            xtype: 'radiofield',
                            inputValue: 3,
                            id: 'latefee4'+me.uniquename,
                            allowBlank: false,
                            checked: false,
                            margin: '0 0 0 114'
                        },
                    ]
                },
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 1200,
                    items: [
                        {
                            xtype: 'button',
                            action: 'submit',
                            itemId: 'btnSubmit',
                            iconCls: 'icon-print',
                            text: 'Submit',
                            padding: 5,
                        },
                        {
                            xtype: 'button',
                            action: 'cancel',
                            itemId: 'btnCancel',
                            iconCls: 'icon-cancel',
                            padding: 5,
                            text: 'Cancel',
                            margin: '0 0 0 5',
                            handler: function () {
                                this.up('window').close();
                            }
                        }
                    ]
                },
                 
            ],
        });
        me.callParent(arguments);
    },
});
