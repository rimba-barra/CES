Ext.define('Gl.library.template.combobox.CoaSettingCombobox', {
    extend: 'Gl.library.component.Combobox',
    alias: 'widget.coasettingcombobox',
    store: 'CoaSettingCombo', //masuk dalam store
    fieldLabel: 'Coa',
    displayField: 'coacode', //mengambil data dari store
    valueField: 'coa', //mengambil data dari store  
    matchFieldWidth: false,
    matchFieldWidth: false,
    tpl: Ext.create('Ext.XTemplate',
            '<table class="x-grid-table" width="700" >',
            '<tr class="x-grid-row">',
            '<th width="80"><div class="x-column-header x-column-header-inner">Coa</div></th>',
            '<th width="250"><div class="x-column-header x-column-header-inner">Coa Name</div></th>',
            '<th width="80"><div class="x-column-header x-column-header-inner">Type</div></th>',
            '<th width="300"><div class="x-column-header x-column-header-inner">Group Sub</div></th>',
            '</tr>',
            '<tpl for=".">',
            '<tr class="x-boundlist-item">',
            '<td ><div class="x-grid-cell x-grid-cell-inner">{coa}</div></td>',
            '<td ><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
            '<td ><div class="x-grid-cell x-grid-cell-inner">{type}</div></td>',
            '<td ><div class="x-grid-cell x-grid-cell-inner">{kelsub}</div></td>',
            '</tr>',
            '</tpl>',
            '</table>'
            ),
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


