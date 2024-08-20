Ext.define('Gl.library.template.combobox.Prefixcombobox', {
    extend: 'Gl.library.component.Combobox',
    alias: 'widget.prefixcombobox',
    store: 'Prefixcombo', //masuk dalam store
    fieldLabel: 'Prefix',
    displayField: 'prefix', //mengambil data dari store
    valueField: 'prefix_id', //mengambil data dari store
    matchFieldWidth: false,
    tpl: Ext.create('Ext.XTemplate',
            '<table class="x-grid-table" width="700" >',
            '<tr class="x-grid-row">',
            '<th width="80"><div class="x-column-header x-column-header-inner">Prefix</div></th>',
            '<th width="250"><div class="x-column-header x-column-header-inner">Description</div></th>',
            '</tr>',
            '<tpl for=".">',
            '<tr class="x-boundlist-item">',
            '<td ><div class="x-grid-cell x-grid-cell-inner">{prefix}</div></td>',
            '<td ><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
            '</tr>',
            '</tpl>',
            '</table>'
            ),
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


