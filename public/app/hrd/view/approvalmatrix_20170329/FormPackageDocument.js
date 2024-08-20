Ext.define('Hrd.view.approvalmatrix.FormPackageDocument', {
    alias: 'widget.packagemanagementformpackagedocument',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    deletedData: {},
    initComponent: function () {
        var me = this;
        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    xtype: 'combobox',
                    name: 'pmdocument_id',
                    fieldLabel: 'Package Document',
                    width: 450,
                    displayField: 'code',
                    valueField: 'pmdocument_id',
                    action: 'resetdetail',
                    readOnly: false,
                    allowBlank: false,
                    matchFieldWidth: false,
                    tpl: Ext.create('Ext.XTemplate',
                    '<table class="x-grid-table" width="500px" >',
                      '<tr class="x-grid-row">',
                          '<th width="100px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                          '<th width="200px"><div class="x-column-header x-column-header-inner">Name</div></th>',
                      '</tr>',
                      '<tpl for=".">',
                          '<tr class="x-boundlist-item">',
                              '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                              '<td><div class="x-grid-cell x-grid-cell-inner">{package_name}</div></td>',
                              
                          '</tr>',
                      '</tpl>',
                   '</table>'
                    ),
                },


            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});