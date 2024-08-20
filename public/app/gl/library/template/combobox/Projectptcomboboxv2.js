Ext.define('Gl.library.template.combobox.Projectptcomboboxv2', {
    extend: 'Gl.library.component.Combobox', 
    alias: 'widget.projectptcomboboxv2',
    store: 'Projectptv2', //masuk dalam store
   // store: 'Masterdata.store.ProjectProjectpt', //masuk dalam store
    fieldLabel: 'Project PT',
    //displayField: 'Projectpt_name', //mengambil data dari store
    displayField: 'pt_name', //mengambil data dari store
    valueField: 'pt_id', //mengambil data dari store
    matchFieldWidth: false,
    typeAhead: true,
    tpl: Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="500px" >',
            '<tr class="x-grid-row">',
                '<th width="50px"><div class="x-column-header x-column-header-inner">PROJECT PT</div></th>',
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{ptname}</div></td>',
                '</tr>',
            '</tpl>',
         '</table>'
     ), 
    initComponent: function() {
        var me = this;       
        me.callParent(arguments);
       
    }
})


