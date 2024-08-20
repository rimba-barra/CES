Ext.define('Erems.library.template.component.Kewarganegaraancombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.kewarganegaraancombobox',
    store: 'Kewarganegaraan', //masuk dalam store
    fieldLabel: 'Kewarganegaraan',
    displayField: 'kewarganegaraan', //mengambil data dari store
    valueField: 'kewarganegaraan', //mengambil data dari store
    matchFieldWidth: false,
    typeAhead: true,
    tpl: Ext.create('Ext.XTemplate',
            '<table class="x-grid-table" width="700" >',
            '<tr class="x-grid-row">',
            '<th width="10"><div class="x-column-header x-column-header-inner">Status</div></th>',
            '<th width="30"><div class="x-column-header x-column-header-inner">Description</div></th>',
            '</tr>',
            '<tpl for=".">',
            '<tr class="x-boundlist-item">',
            '<td align="center"><div class="x-grid-cell x-grid-cell-inner">{kewarganegaraan}</div></td>',
            '<td align="left"><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
            '</tr>',
            '</tpl>',
            '</table>'
            ),
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    },
})


