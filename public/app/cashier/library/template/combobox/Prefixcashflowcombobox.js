Ext.define('Cashier.library.template.combobox.Prefixcashflowcombobox', {
    extend         : 'Cashier.library.component.Combobox',
    alias          : 'widget.prefixcashflowcombobox',
    store          : 'Prefixcashflowcombo',
    fieldLabel     : 'Prefix',
    dynamicdata    : 0,
    displayField   : 'prefix',
    valueField     : 'prefix_id',
    matchFieldWidth: false,
    typeAhead      : true,
    tpl            : Ext.create('Ext.XTemplate',
    '<table class="x-grid-table" width="500px" >',
            '<tr class="x-grid-row">',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Prefix</div></th>',
                '<th width="200px"><div class="x-column-header x-column-header-inner">Description</div></th>',
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{prefix}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
                '</tr>',
            '</tpl>',
    '</table>'
    ),
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
})