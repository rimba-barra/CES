Ext.define('Cashier.view.masterreceipt.FormSearch',{
    extend:'Cashier.library.template.view.FormSearch',
    alias:'widget.masterreceiptformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                
                {
                    xtype: 'projectcombobox',
                    name: 'project_id',
                    fieldLabel: 'Project',
                    width: '300',
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    tpl: Ext.create('Ext.XTemplate',
                        '<table class="x-grid-table" width="250px" >',
                        '<tr class="x-grid-row">',
                        '<th width="40px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                        '<th width="200px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                        '</tr>',
                        '<tpl for=".">',
                        '<tr class="x-boundlist-item">',
                        '<td><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                        '<td><div class="x-grid-cell x-grid-cell-inner">{projectname}</div></td>',
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
                                    if (record.get('projectname') == null) {
                                        return false;
                                    }else{
                                        if (record.get('projectname').toString().toLowerCase().indexOf(searchString) > -1) {
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
                    xtype: 'ptprojectcombobox',
                    fieldLabel:'PT',
                    emptyText: 'Select PT',
                    name: 'pt_id',
                    allowBlank: false,
                    margin: '0 0 5 0',
                    enableKeyEvents: true,
                },
                {
                    xtype: 'textfield',
                    itemId: 'receipt_no',
                    emptyText: 'Input Receipt No',
                    name: 'receipt_no',
                    fieldLabel: 'Receipt No',
                    anchor:'-15'
                },
                {
                    xtype: 'combobox',
                    name: 'status',
                    fieldLabel: 'Status',
                    queryMode: 'local',
                    valueField: 'status',
                    allowBlank: true,
                    forceSelection: true,
                    displayField: 'description',
                    value:'',
                    store: new Ext.data.JsonStore({
                        fields: ['status', 'description'],
                        data: [
                            {status: '', description: 'ALL'},
                            {status: 'new', description: 'NEW'},
                            {status: 'used', description: 'USED'},
                            {status: 'external-used', description: 'USED (External)'}, // Buat Receipt yang dipakai di APPS lain
                            {status: 'void', description: 'VOID'},
                            {status: 'delete', description: 'DELETE'},
                        ]
                    }),
                    listeners: {
                        afterrender: function() {
                            this.setValue(this.value);
                        }
                    }
                },
                {
                    xtype: 'combobox',
                    name: 'receipt_type',
                    fieldLabel: 'Type',
                    queryMode: 'local',
                    valueField: 'receipt_type',
                    allowBlank: true,
                    forceSelection: true,
                    value:'',
                    displayField: 'description',
                    store: new Ext.data.JsonStore({
                        fields: ['receipt_type', 'description'],
                        data: [
                            {receipt_type: '', description: 'ALL'},
                            {receipt_type: 'default', description: 'DEFAULT'},
                            {receipt_type: 'rs', description: 'RS'},
                        ]
                    }),
                    listeners: {
                        afterrender: function() {
                            this.setValue(this.value);
                        }
                    }
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});