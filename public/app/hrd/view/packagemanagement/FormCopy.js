Ext.define('Hrd.view.packagemanagement.FormCopy', {
    alias: 'widget.packagemanagementformcopy',
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
					xtype       : 'combobox',
					name        : 'project_id',
					fieldLabel  : 'Project',
					displayField: 'name',
					valueField  : 'project_id',
					width		: 400,
					allowBlank	: false,
					queryMode	: 'local',
					editable	: true
				},
				{
					xtype       : 'combobox',
					name        : 'pt_id',
					fieldLabel  : 'PT',
					displayField: 'name',
					valueField  : 'pt_id',
					width		: 400,
					allowBlank	: false,
					queryMode	: 'local',
					editable	: true
				}
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});