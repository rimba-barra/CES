Ext.define('Cashier.view.persentasepajak.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.persentasepajakformsearch',
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
                    xtype: 'masterpajakcombobox',
                    fieldLabel:'Pajak',
                    emptyText: 'Select Pajak',
                    name: 'tipepajak_id',
                    enableKeyEvents: true,
                    margin: '10 0 0 0'
                },
                {
                    xtype: 'mastertipepajakcombo',
                    fieldLabel:'Tipe Pajak',
                    emptyText: 'Select Tipe Pajak',
                    name: 'tipepajakdetail_id',
                    enableKeyEvents: true,
                    margin: '10 0 0 0'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    fieldLabel: 'Persentase',
                    anchor: '99%',
                    margin: '10 0 0 0',
                    default: {
                        layout: 'anchor'
                    },
                    items: [
                        {
                            xtype: 'numberfield',
                            width: 100,
                            name: 'persentase_from'
                        },
                        {
                            xtype: 'label',
                            text: 'To',
                            margin: '0 5 0 5'
                        },
                        {
                            xtype: 'numberfield',
                            width: 100,
                            name: 'persentase_to'
                        },
                    ]
                }
            ],
            dockedItems: me.generateDockedItems()
        })

        me.callParent(arguments);
    }
})