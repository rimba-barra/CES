Ext.define('Hrd.view.worklocationprojectpt.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.worklocationprojectptformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'WorkLocation',
                    name: 'worklocation_id',
                    width:200,
                    displayField: 'worklocation',
                    valueField: 'worklocation_id',
                },

                {
                    xtype: 'combobox',
                    name: 'projectpt_id',
                    fieldLabel: 'Projectpt',
                    width:200,
                    displayField: 'project_name',
                    valueField: 'projectpt_id',
                    readOnly: false,
                    allowBlank: true,
                    matchFieldWidth: false,
                    selectOnFocus :true,
                    queryMode: 'local',
                    tpl: Ext.create('Ext.XTemplate',
                    '<table class="x-grid-table" width="500px" >',
                      '<tr class="x-grid-row">',
                          '<th width="100px"><div class="x-column-header x-column-header-inner">Project Name</div></th>',
                          '<th width="100px"><div class="x-column-header x-column-header-inner">Pt Name</div></th>',
                      '</tr>',
                      '<tpl for=".">',
                          '<tr class="x-boundlist-item">',
                              '<td ><div class="x-grid-cell x-grid-cell-inner">{project_name}</div></td>',
                                '<td><div class="x-grid-cell x-grid-cell-inner">{pt_name}</div></td>',                              
                            '</tr>',
                        '</tpl>',
                    '</table>'
                    )
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});