Ext.define('Cashier.view.masterbankrate.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.masterbankrateformsearch',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                xtype: 'combobox',
                width: '100%',
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '91%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'project_id',
                    value: parseInt(apps.project)
                },
                {
                    xtype: 'projectptcombobox',
                    fieldLabel:'Company',
                    emptyText: 'Select Company',
                    name: 'pt_id',
                    allowBlank: true,
                    enableKeyEvents: true,
                    margin: '0 0 5 0',
                    enforeMaxLength: true,
                    forceSelection:true
                },
                {
                    xtype: 'voucherprefixcombobox',
                    fieldLabel:'Bank',
                    emptyText: 'Select Bank',
                    name: 'voucherprefix_id',
                    allowBlank: true,
                    enableKeyEvents: true,
                    margin: '0 0 5 0',
                    enforeMaxLength: true,
                    tpl: Ext.create('Ext.XTemplate',
                        '<table class="x-grid-table" width="500px" >',
                            '<tr class="x-grid-row">',                
                                '<th width="50px"><div class="x-column-header x-column-header-inner">Prefix</div></th>',
                                '<th width="100px"><div class="x-column-header x-column-header-inner">Bank Account</div></th>',
                                '<th width="50px"><div class="x-column-header x-column-header-inner">Coa</div></th>',
                                '<th width="50px"><div class="x-column-header x-column-header-inner">In / Out</div></th>',
                            '</tr>',
                            '<tpl for=".">',
                                '<tr class="x-boundlist-item">',                    
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{prefix}</div></td>',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{coaname}</div></td>',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{coa}</div></td>',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{in_out}</div></td>',
                                '</tr>',
                            '</tpl>',
                        '</table>'
                    ),
                    displayTpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">{coaname}</tpl>'
                    )
                },
                {
                    xtype: 'datefield',
                    fieldLabel:'Period',
                    emptyText: 'Select Period',
                    name: 'periode',
                    allowBlank: true,
                    margin: '0 0 5 0',
                    enableKeyEvents: true,
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
