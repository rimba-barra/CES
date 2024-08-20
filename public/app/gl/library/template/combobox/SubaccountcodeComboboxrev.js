Ext.define('Gl.library.template.combobox.SubaccountcodeComboboxrev', {
    extend: 'Gl.library.component.Combobox', 
    alias: 'widget.subaccountcodecomboboxrev',
    store: 'Subaccountcode', //masuk dalam store
    fieldLabel: 'Sub Account',
    displayField: 'code', //mengambil data dari store
    valueField: 'subgl_id', //mengambil data dari store  
    queryMode: 'local',
    matchFieldWidth: false,
    tpl: Ext.create('Ext.XTemplate',
            '<table class="x-grid-table" width="700" >',
            '<tr class="x-grid-row">',
            '<th width="80"><div class="x-column-header x-column-header-inner">Sub Group</div></th>',
            '<th width="80"><div class="x-column-header x-column-header-inner">Code</div></th>',
            '<th width="250"><div class="x-column-header x-column-header-inner">Description</div></th>',
            '</tr>',
            '<tpl for=".">',
            '<tr class="x-boundlist-item">',
            '<td ><div class="x-grid-cell x-grid-cell-inner">{accountgroup}</div></td>',
            '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
            '<td ><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
            '</tr>',
            '</tpl>',
            '</table>'
            ),

    /*
    listConfig: {
        getInnerTpl: function() {
            return '<div data-qtip="{code} with code : {description}">{code} ({description})</div>';
        }
    },
    */
    initComponent: function() {
        var me = this;       
        me.callParent(arguments);
       
    }
})


