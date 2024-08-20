Ext.define('Hrd.view.accessgroupdetail.FormCopy', {
    alias: 'widget.accessgroupdetailformcopy',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    deletedData: {},
    initComponent: function () {
        var me = this;
      //  var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    xtype: 'combobox',
                    name: 'accessgroup_id',
                    fieldLabel: 'Access Group',
                    width: 400,
                    displayField: 'accessgroup',
                    valueField: 'accessgroup_id',
                    //action: 'resetdetail',
                    readOnly: false,
                    allowBlank: false,
                    matchFieldWidth: false,
					selectOnFocus :true,
					queryMode: 'local',
                    tpl: Ext.create('Ext.XTemplate',
                    '<table class="x-grid-table" width="500px" >',
                      '<tr class="x-grid-row">',
                          '<th width="50px"><div class="x-column-header x-column-header-inner">Level</div></th>',
                          '<th width="150px"><div class="x-column-header x-column-header-inner">Name</div></th>',
                      '</tr>',
                      '<tpl for=".">',
                          '<tr class="x-boundlist-item">',
                              '<td ><div class="x-grid-cell x-grid-cell-inner">{index_no}</div></td>',
                              '<td><div class="x-grid-cell x-grid-cell-inner">{accessgroup}</div></td>',                              
                          '</tr>',
                      '</tpl>',
                   '</table>'
                    ),
                }

            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});