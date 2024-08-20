Ext.define('Cashier.view.writeoff.FormSearch',{
    extend:'Cashier.library.template.view.FormSearch',
    alias:'widget.writeoffformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                
                {
                    xtype: 'combobox',
                    name: 'project_id',
                    fieldLabel: 'Project',
                    displayField: 'project_name',
                    valueField: 'project_project_id',
                    width: '300',
                    queryMode: 'local',
                    allowBlank: false,
                    msgTarget: "side",
                    enforceMaxLength: true,
                    blankText: 'This should not be blank!',
                },
                {
                    xtype: 'combobox',
                    name: 'pt_id',
                    fieldLabel: 'Company',
                    displayField: 'name',
                    valueField: 'pt_id',
                    forceSelection: false,
                    allowBlank: true,
                    readOnly: false,
                    hidden: false,
                    enforceMaxLength: true,
                    queryMode: 'local',
                    rowdata: null,
                    matchFieldWidth: false,
                    tpl: Ext.create('Ext.XTemplate',
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
                    enableKeyEvents: true,
                    rowdata: null,
                    forceSelection: false,
                    typeAhead: false,
                    listeners: {
                        keyup: function (field) {
                            var searchString = field.getValue();
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
                        buffer: 300,
                    },
                },
                {
                    xtype: 'textfield',
                    itemId: 'writeoff_unit_number',
                    name: 'writeoff_unit_number',
                    fieldLabel: 'Unit Number',
                    anchor:'-15'
                },
                {
                    xtype: 'textfield',
                    itemId: 'writeoff_cluster',
                    name: 'writeoff_cluster',
                    fieldLabel: 'Cluster',
                    anchor:'-15'
                },
                {
                    xtype: 'textfield',
                    itemId: 'writeoff_customer_name',
                    name: 'writeoff_customer_name',
                    fieldLabel: 'Customer Name',
                    anchor:'-15'
                },
                {
                    xtype: 'textfield',
                    itemId: 'writeoff_purchaseletter_no',
                    name: 'writeoff_purchaseletter_no',
                    fieldLabel: 'Purchaseletter No',
                    anchor:'-15'
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});