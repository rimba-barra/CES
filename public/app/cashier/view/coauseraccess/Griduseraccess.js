Ext.define('Cashier.view.coauseraccess.Griduseraccess', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.coauseraccessgriduseraccess',
    store: 'Coauseraccess',
    bindPrefixName: 'Coauseraccess',
    itemId: 'Coauseraccess',
    newButtonLabel: 'Add New',
    uniquename: '_coauseraccessgriduseraccess',
    requires: [
        'Cashier.library.template.component.Ptbyusercombobox',
    ],
    initComponent: function () {
        var me = this;
        
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            columns: [
                {
                    xtype: 'rownumberer',
                    resizable:true,
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa',
                    width: 120,
                    dataIndex: 'coa',
                    hideable: false,
                    text: 'Coa'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coaname',
                    width: 600,
                    dataIndex: 'coaname',
                    hideable: false,
                    text: 'Coa Name'
                },
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;
        var mystore = Ext.create('Ext.data.Store', {
            alias: 'ptstore',
            autoLoad: false,
            fields: [
            {
                name: 'projectpt_id',
                type: 'int'
            },
            {
                name: 'project_id',
                type: 'int'
            },
            {
                name: 'projectname',
                type: 'string'
            },
            {
                name: 'pt_id',
                type: 'int'
            }, 
            {
                name: 'pt_name',
                type: 'string'
            },
            {
                name: 'ptcode',
                type: 'string'
            },
            {
                name: 'ptname',
                type: 'string'
            },
            ]
        });
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'projectptcombobox',
                        itemId: 'fs_pt_id',
                        fieldLabel: 'Select PT ',
                        name: 'projectpt_id',
                        forceSelection: true,
                        queryMode: 'local',
                        emptyText: 'Select Project - PT ',
                        enableKeyEvents: true,
                        displayField: 'pt_name',
                        valueField: 'projectpt_id',
                        queryMode: 'local',
                        store : mystore,
                        anchor:'-15',
                        tpl: Ext.create('Ext.XTemplate',
                                    '<table class="x-grid-table" width="600px">',
                                    '<tr class="x-grid-row">',
                                    '<th width="70px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                                    '<th width="330px"><div class="x-column-header x-column-header-inner">Company</div></th>',
                                    '<th width="200px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                                    '</tr>',
                                    '<tpl for=".">',
                                    '<tr class="x-boundlist-item">',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{ptcode}</div></td>',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{pt_name}</div></td>',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{projectname}</div></td>',
                                    '</tr>',
                                    '</tpl>',
                                    '</table>'
                                    ),
                            // listConfig: {
                                listeners: {
                                    keyup: function (field) {
                                        var searchString = field.getRawValue().toString().toLowerCase();
                                        if(searchString == null){
                                            return false;
                                        }
                                        if (searchString) {
                                            this.store.filterBy(function (record, id) {
                                                if (record.get('pt_name') == null || record.get('ptcode') == null) {
                                                    return false;
                                                }else{
                                                    if (record.get('pt_name').toString().toLowerCase().indexOf(searchString) > -1) {
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
                                },

                    },
//                    {
//                        xtype: 'ptprojectcombobox',
//                        fieldLabel: 'Select PT ',
//                        itemId: 'fd_pt_id' + me.uniquename,
//                        id: 'pt_id' + me.uniquename,
//                        name: 'pt_id',
//                        width: 300,
//                        emptyText: 'Select Project - PT ',
//                        readOnly: false,
//                        allowBlank: false,
//                        enforceMaxLength: true,
//                        margin: '0 0 0 10',
//                        absoluteReadOnly: true,
//                        enableKeyEvents: true,
//                        rowdata: null,
//                        forceSelection: false,
//                        typeAhead: false,
//                        queryMode: 'local',
//                        matchFieldWidth: false,
//                        listeners: {
//                            keyup: function (field) {
//                                var searchString = field.getValue();
//                                if (searchString) {
//                                    this.store.filterBy(function (record, id) {
//                                        if (record.get('ptname').toString().toLowerCase().indexOf(searchString) > -1) {
//                                            return true;
//                                            this.store.clearFilter(true);
//                                        } else if (record.get('code').toString().toLowerCase().indexOf(searchString) > -1) {
//                                            return true;
//                                            this.store.clearFilter(true);
//                                        } else {
//                                            return false;
//                                            this.store.clearFilter(true);
//                                        }
//                                    });
//                                }
//                            },
//                            buffer: 300,
//                        },
//                    },
                    {
                        xtype: 'usermodulecashiercombobox',
                        fieldLabel: 'User access',
                        itemId: 'fd_user_id' + me.uniquename,
                        id: 'user_id' + me.uniquename,
                        name: 'user_id',
                        width: 300,
                        emptyText: 'Select user name',
                        readOnly: false,
                        allowBlank: false,
                        enforceMaxLength: true,
                        margin: '0 0 0 10',
                        enableKeyEvents: true,
                        rowdata: null
                    },
                    {
                        xtype: 'button',
                        name: 'btnsave',
                        action: 'btnsave',
                        id: 'btnsave',
                        text: 'Save',
                        margin: '0 0 0 30',
                        iconCls: 'icon-save',
                    },
                     {
                        xtype: 'button',
                        name: 'btncopy',
                        action: 'create',
                        id: 'btnCopy',
                        text: 'Copy COA Access',
                        margin: '0 0 0 0',
                        iconCls: 'icon-save',
                    },
                     {
                        xtype: 'button',
                        name: 'btncopy',
                        action: 'grantall',
                        id: 'btnGrant',
                        text: 'Grant All COA',
                        margin: '0 0 0 0',
                        iconCls: 'icon-save',
                        disabled:true
                    }
                ]
            },
           /* {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            } */
        ];
        return dockedItems;
    },
});


