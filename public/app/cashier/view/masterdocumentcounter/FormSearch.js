Ext.define('Cashier.view.masterdocumentcounter.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.masterdocumentcounterformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                width: '100%',
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '90%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'projectcombobox',
                    fieldLabel:'Project',
                    emptyText: 'Select Project',
                    name: 'project_id',
                    allowBlank: false,
                    enableKeyEvents: true,
                    tpl: Ext.create('Ext.XTemplate',
                        '<table class="x-grid-table" width="250px" >',
                        '<tr class="x-grid-row">',
                            
                            '<th width="200px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                        '</tr>',
                        '<tpl for=".">',
                            '<tr class="x-boundlist-item">',
                                '<td><div class="x-grid-cell x-grid-cell-inner">{projectname}</div></td>',
                            '</tr>',
                        '</tpl>',
                        '</table>'
                    )
                },
                {
                    xtype: 'ptprojectcombobox',
                    fieldLabel:'PT',
                    emptyText: 'Select PT',
                    name: 'pt_id',
                    allowBlank: false,
                    enableKeyEvents: true,
                    margin: '10 0 0 0'
                },
                {
                    xtype: 'textfield',
                    name: 'counter_type',
                    fieldLabel: 'Counter Type',
                    margin: '10 0 0 0'
                },
                {
                    xtype: 'textfield',
                    name: 'year',
                    fieldLabel: 'Year',
                    margin: '10 0 0 0'
                },
                {
                    xtype: 'textfield',
                    name: 'month',
                    fieldLabel: 'Month',
                    margin: '10 0 0 0'
                }
            ],
            dockedItems: me.generateDockedItems()
        })

        me.callParent(arguments);
    }
})