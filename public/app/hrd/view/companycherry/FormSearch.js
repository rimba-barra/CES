Ext.define('Hrd.view.companycherry.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.companycherryformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    xtype: 'combobox',
                    name: 'ptpt_id',
                    fieldLabel: 'Pt',
                    width:250,
                    displayField: 'ptpt_name',
                    valueField: 'ptpt_id',
                    readOnly: false,
                    allowBlank: true,
                    matchFieldWidth: false,
                    selectOnFocus :true,
                    queryMode: 'local',
                    tpl: Ext.create('Ext.XTemplate',
                    '<table class="x-grid-table" width="300px" >',
                      '<tr class="x-grid-row">',
                          '<th width="100px"><div class="x-column-header x-column-header-inner">Pt Name</div></th>',
                      '</tr>',
                      '<tpl for=".">',
                          '<tr class="x-boundlist-item">',
                              '<td><div class="x-grid-cell x-grid-cell-inner">{ptpt_name}</div></td>',                              
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