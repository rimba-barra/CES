Ext.define('Cashier.view.masterprefix.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.masterprefixformsearch',
    initComponent: function () {
        var me = this;


        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
//                {
//                    xtype: 'hiddenfield',
//                    name: 'project_id'
//                },
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
                    //readOnly: true,
                    //fieldStyle: 'background-color:#eee;background-image: none;'
                },
                {
                    xtype: 'combobox',
                    name: 'pt_id',
                    fieldLabel: 'Company',
                    displayField: 'name',
                    valueField: 'pt_id',
                    width: 250,
                    forceSelection: false,
                    allowBlank: false,
                    readOnly: false,
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
                    name: 'prefix',
                    fieldLabel: 'Prefix',
                    maxLength: 90
                },
                {
                    xtype: 'textfield',
                    name: 'description',
                    fieldLabel: 'Description',
                    enforceMaxLength: true,
                    maxLength: 50
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
