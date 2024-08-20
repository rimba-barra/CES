Ext.define('Cashier.library.template.component.Ptbyusercombobox', {
   // extend: 'Ext.form.field.ComboBox',
   extend: 'Cashier.library.component.Combobox',
    queryMode: 'local',
    alias: 'widget.ptbyusercombobox',
   // requires:['Cashier.store.Masterpenandatangan'],
    store: 'Ptbyusermulti',
    fieldLabel: 'Company',
    displayField: 'ptname',
    valueField: 'projectpt_id',
    allowBlank: false,
    blankText: 'This should not be blank!',
    matchFieldWidth: false,
    typeAhead: true,
    tpl: Ext.create('Ext.XTemplate',
            '<table class="x-grid-table" width="700" >',
            '<tr class="x-grid-row">',
            '<th width="250"><div class="x-column-header x-column-header-inner">Project Name</div></th>',
            '<th width="80"><div class="x-column-header x-column-header-inner">Pt Code</div></th>',
            '<th width="300"><div class="x-column-header x-column-header-inner">Pt Name</div></th>',
            '</tr>',
            '<tpl for=".">',
            '<tr class="x-boundlist-item">',
            '<td ><div class="x-grid-cell x-grid-cell-inner">{projectname}</div></td>',
            '<td ><div class="x-grid-cell x-grid-cell-inner">{ptcode}</div></td>',
            '<td ><div class="x-grid-cell x-grid-cell-inner">{ptname}</div></td>',
            '</tr>',
            '</tpl>',
            '</table>'
            ),
    //addBlankValue:true,
    initComponent: function(config) {
        var me = this;

        me.callParent(config);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})