Ext.define('Cashier.view.deptaccess.Griduseraccess', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.deptaccessgriduseraccess',
    store: 'Deptaccess',
    bindPrefixName: 'Deptaccess',
    itemId: 'Deptaccess',
    newButtonLabel: 'Add New',
    uniquename: '_deptaccessgriduseraccess',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            viewConfig: {},
            columns: [{
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    header: 'Dept Access ID',
                    dataIndex: 'deptaccess_id',
                    hidden: true
                },
                {
                    xtype: 'gridcolumn',
                    header: 'Department ID',
                    dataIndex: 'department_id',
                    hidden: true
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_department',
                    width: 600,
                    dataIndex: 'department',
                    hideable: false,
                    text: 'Department',
                    renderer: function(value, meta, rec) {
                        return rec.data.code + ' - ' + rec.data.department;
                    }
                },
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [{
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [{
                        xtype: 'hiddenfield',
                        itemId: 'ptid',
                        name: 'pt_id'
                    },
                    {
                        xtype: 'hiddenfield',
                        itemId: 'projectid',
                        name: 'project_id'
                    },
                    {
                        xtype: 'projectptcombobox',
                        fieldLabel: 'Select PT ',
                        itemId: 'fd_pt_id' + me.uniquename,
                        id: 'pt_id' + me.uniquename,
                        width: 300,
                        name: 'projectpt_id',
                        emptyText: 'Select Project - PT ',
                        readOnly: false,
                        allowBlank: false,
                        enforceMaxLength: true,
                        displayField: 'ptname',
                        valueField: 'projectpt_id',
                        margin: '0 0 0 10',
                        absoluteReadOnly: true,
                        enableKeyEvents: true,
                        rowdata: null,
                        forceSelection: false,
                        typeAhead: false,
                        queryMode: 'local',
                        matchFieldWidth: false,
                        tpl: Ext.create('Ext.XTemplate',
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
                        listeners: {
                            keyup: function(field) {
                                var searchString = field.getValue();
                                if (searchString) {
                                    this.store.filterBy(function(record, id) {
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
                                    });
                                }
                            },
                            buffer: 300,
                        },
                    },

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
                        name: 'btngrant',
                        action: 'grantall',
                        id: 'btnGrant',
                        text: 'Grant All Department',
                        margin: '0 0 0 0',
                        iconCls: 'icon-save',
                    }
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }
        ];
        return dockedItems;
    },
});