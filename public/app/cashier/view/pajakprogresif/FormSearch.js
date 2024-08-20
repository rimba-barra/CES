Ext.define('Cashier.view.pajakprogresif.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.pajakprogresifformsearch',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
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
                    hidden: true,
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
                }
                
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
